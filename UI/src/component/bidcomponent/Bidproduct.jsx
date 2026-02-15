import apiClient from '../../utils/apiClient';
import { useState, useEffect } from 'react';
import { __bidapiurl, __shipmentapiurl } from '../../API_URL';
import { useParams, useNavigate } from 'react-router-dom';

function Bidproduct() {
  const params = useParams();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Session check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to bid');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await apiClient.get(__shipmentapiurl + 'fetch', {
          params: { _id: params._id },
        });
        setProductDetails(response.data[0] || {});
      } catch (error) {
        console.error('Error fetching product:', error);
        setOutput('Unable to load product details');
      }
    };

    fetchProductDetails();
  }, [params._id]);

  useEffect(() => {
    if (!productDetails.baseprice) return;

    const fetchCurrentPrice = async () => {
      try {
        const response = await apiClient.get(__bidapiurl + 'fetch', {
          params: { p_id: params._id }
        });

        const bids = response.data;

        if (!Array.isArray(bids) || bids.length === 0) {
          setCurrentPrice(productDetails.baseprice);
        } else {
          const minBid = bids.reduce(
            (min, bid) => (bid.bidprice < min ? bid.bidprice : min),
            bids[0].bidprice
          );
          setCurrentPrice(minBid);
        }
      } catch (error) {
        console.error('Error fetching bids:', error);
        setCurrentPrice(productDetails.baseprice);
      }
    };

    fetchCurrentPrice();
  }, [productDetails, params._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bidPrice || parseInt(bidPrice) <= 0) {
      setOutput('Please enter a valid bid price');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const bidDetails = {
        p_id: params._id,
        u_id: localStorage.getItem('email'),
        bidprice: parseInt(bidPrice),
      };

      await apiClient.post(__bidapiurl + 'save', bidDetails);
      
      setOutput('Bid updated successfully....');
      setBidPrice('');
      
      setTimeout(() => {
        navigate('/bidp/' + params._id);
      }, 1500);
    } catch (error) {
      console.error('Bid error:', error);
      if (error.response?.status === 401) {
        setOutput('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setOutput('Unable to bid, please try again....');
      }
      setBidPrice('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-container">
      <div className="modern-card fade-in">
        <h1 className="modern-heading">Bid Product</h1>
        
        {output && (
          <div className={`alert-modern ${output.includes('successfully') ? 'alert-success-modern' : 'alert-danger-modern'} mb-4`}>
            {output}
          </div>
        )}

        <table className="table table-modern">
          <tbody>
            <tr>
              <td><strong>Product ID:</strong></td>
              <td>{params._id}</td>
            </tr>
            <tr>
              <td><strong>Base Price:</strong></td>
              <td>&#8377;{productDetails.baseprice}</td>
            </tr>
            <tr>
              <td><strong>Auction Current Price:</strong></td>
              <td>&#8377;{currentPrice}</td>
            </tr>
            <tr>
              <td><strong>Enter Your Bid Price:</strong></td>
              <td>
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    className="form-control form-control-modern mb-3"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    placeholder="Enter bid amount"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary-modern"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Placing Bid...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-gavel me-2"></i>
                        Place Bid
                      </>
                    )}
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bidproduct;
