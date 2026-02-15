import "./Showproduct.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { __bidapiurl } from "../../API_URL";

function ShowProducts() {
  const params = useParams();
  const [pList, setPList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const [currentBids, setCurrentBids] = useState({});
  const [confirmingOrder, setConfirmingOrder] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/shipment/fetch", {
          params: params.subcatnm ? { subcatnm: params.subcatnm } : {}
        });
        setPList(response.data);
        
        // Fetch current bids for all products
        if (response.data.length > 0) {
          fetchAllBids(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setPList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.subcatnm]);

  const fetchAllBids = async (products) => {
    const bidsMap = {};
    
    for (const product of products) {
      try {
        const response = await apiClient.get(__bidapiurl + "fetch", {
          params: { p_id: product._id }
        });
        
        const bids = response.data;
        
        if (Array.isArray(bids) && bids.length > 0) {
          // Find minimum bid price
          const minBid = bids.reduce(
            (min, bid) => (bid.bidprice < min ? bid.bidprice : min),
            bids[0].bidprice
          );
          bidsMap[product._id] = minBid;
        } else {
          // No bids yet, use base price
          bidsMap[product._id] = product.baseprice;
        }
      } catch (error) {
        console.error(`Error fetching bids for product ${product._id}:`, error);
        bidsMap[product._id] = product.baseprice;
      }
    }
    
    setCurrentBids(bidsMap);
  };

  const getRemainingTime = (info) => {
    const createTime = new Date(info).getTime();
    const expiryTime = createTime + 48 * 60 * 60 * 1000;
    const now = Date.now();
    const remaining = expiryTime - now;

    if (remaining <= 0) return { expired: true, text: "Expired" };

    const hours = Math.floor((remaining % (1000 * 60 * 60 * 48)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { expired: false, text: `${hours}h ${minutes}m ${seconds}s` };
  };

  const handleConfirmOrder = async (shipmentId) => {
    if (!window.confirm('Are you sure you want to confirm this order and select the winner?')) {
      return;
    }

    setConfirmingOrder(shipmentId);

    try {
      const response = await apiClient.post('/shipment/confirm-order', {
        shipment_id: shipmentId
      });

      if (response.data.status) {
        alert(`Order confirmed! Winner: ${response.data.winner.email} with bid ₹${response.data.winner.bid_price}`);
        
        // Refresh products list
        const refreshResponse = await apiClient.get("/shipment/fetch", {
          params: params.subcatnm ? { subcatnm: params.subcatnm } : {}
        });
        setPList(refreshResponse.data);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert(error.response?.data?.message || 'Failed to confirm order');
    } finally {
      setConfirmingOrder(null);
    }
  };

  // Refresh countdown every second
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Refresh bids every 30 seconds
  useEffect(() => {
    if (pList.length > 0) {
      const interval = setInterval(() => {
        fetchAllBids(pList);
      }, 30000); // 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [pList]);

  const getStatusBadge = (product, timeRemaining) => {
    if (product.status === 'confirmed') {
      return (
        <span className="badge-modern" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
          <i className="fas fa-check-circle me-1"></i>
          Confirmed
        </span>
      );
    }
    
    if (product.status === 'completed') {
      return (
        <span className="badge-modern" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <i className="fas fa-flag-checkered me-1"></i>
          Completed
        </span>
      );
    }

    if (timeRemaining.expired) {
      return (
        <span className="badge-modern" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <i className="fas fa-clock me-1"></i>
          Expired
        </span>
      );
    }

    return (
      <span className="badge-modern badge-success">
        <i className="fas fa-check-circle me-1"></i>
        Active
      </span>
    );
  };

  const getActionButton = (product, timeRemaining) => {
    const userEmail = localStorage.getItem('email');
    const isOwner = product.useremail === userEmail;

    // If confirmed or completed, show winner info
    if (product.status === 'confirmed' || product.status === 'completed') {
      return (
        <div className="text-center">
          <small className="text-muted d-block mb-1">Winner:</small>
          <strong className="d-block" style={{ fontSize: '0.85rem' }}>
            {product.winner_email}
          </strong>
          <small className="text-success">₹{product.winning_bid}</small>
        </div>
      );
    }

    // If expired and owner, show confirm button
    if (timeRemaining.expired && isOwner) {
      return (
        <button
          className="btn btn-success-modern btn-sm"
          onClick={() => handleConfirmOrder(product._id)}
          disabled={confirmingOrder === product._id}
        >
          {confirmingOrder === product._id ? (
            <>
              <span className="spinner-border spinner-border-sm me-1"></span>
              Confirming...
            </>
          ) : (
            <>
              <i className="fas fa-check-double me-1"></i>
              Confirm Order
            </>
          )}
        </button>
      );
    }

    // If expired but not owner
    if (timeRemaining.expired) {
      return (
        <span className="text-muted">
          <i className="fas fa-hourglass-end me-1"></i>
          Awaiting Confirmation
        </span>
      );
    }

    // If active, show bid button
    return (
      <Link to={`/bidp/${product._id}`} className="btn-primary-modern btn-sm">
        <i className="fas fa-gavel me-1"></i>
        Place Bid
      </Link>
    );
  };

  return (
    <div className="modern-container">
      <div className="modern-card">
        <h1 className="modern-heading">
          <i className="fas fa-box me-3"></i>
          {params.subcatnm ? `${params.subcatnm} Products` : 'All Products'}
        </h1>

        {loading ? (
          <div className="text-center py-5">
            <div className="loading-spinner"></div>
            <p className="mt-3">Loading products...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Base Price</th>
                  <th>Current Bid</th>
                  <th>Time Remaining</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pList.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <i className="fas fa-box-open fa-3x mb-3" style={{ color: '#ccc' }}></i>
                      <p>No products found</p>
                    </td>
                  </tr>
                ) : (
                  pList.map((row) => {
                    const timeRemaining = getRemainingTime(row.info);
                    return (
                      <tr key={row._id}>
                        <td>
                          <img
                            src={row.piconnm}
                            alt={row.title}
                            style={{
                              maxWidth: "100px",
                              maxHeight: "70px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                          />
                        </td>
                        <td>
                          <strong>{row.title}</strong>
                          <br />
                          <small className="text-muted">{row.useremail}</small>
                        </td>
                        <td>{row.catnm}</td>
                        <td>{row.subcatnm}</td>
                        <td>
                          <span className="badge-modern" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                            ₹{row.baseprice}
                          </span>
                        </td>
                        <td>
                          <span className="badge-modern" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            {currentBids[row._id] ? (
                              <>
                                <i className="fas fa-gavel me-1"></i>
                                ₹{currentBids[row._id]}
                              </>
                            ) : (
                              <>
                                <i className="fas fa-spinner fa-spin me-1"></i>
                                Loading...
                              </>
                            )}
                          </span>
                        </td>
                        <td>
                          <span className={`timer-badge ${timeRemaining.expired ? 'expired' : ''}`}>
                            <i className="fas fa-clock me-1"></i>
                            {timeRemaining.text}
                          </span>
                        </td>
                        <td>
                          {getActionButton(row, timeRemaining)}
                        </td>
                        <td>
                          {getStatusBadge(row, timeRemaining)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowProducts;
