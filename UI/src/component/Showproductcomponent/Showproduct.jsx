import "./ShowProduct.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { __shipmentapiurl } from "../../API_URL";
import { Link } from "react-router-dom";

function ShowProducts() {
  const params = useParams();

  const [pList, setPList] = useState([]);
  const [tick, setTick] = useState(0);

  //  use correct state updater: setPList (not setProductList)
  useEffect(() => {
    axios
      .get(__shipmentapiurl + "fetch", {
        params: { subcatnm: params.subcatnm },
      })
      .then((response) => setPList(response.data))
      .catch((error) => console.log(error));
  }, [params.subcatnm]);

  //fixed string interpolation in return statement
  const getRemainingTime = (info) => {
    const createTime = new Date(info).getTime();
    const expiryTime = createTime + 48 * 60 * 60 * 1000;
    const now = Date.now();
    const remaining = expiryTime - now;

    if (remaining <= 0) return "Expired";

    const hours = Math.floor((remaining % (1000 * 60 * 60 * 48)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // ⏱ refresh countdown every second
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-6 align-items-center">
            <div className="col-lg-12">
              <h1 className="mb-4">
                Show Products <span className="text-secondry">&gt;&gt;</span>{" "}
                {params.subcatnm}
              </h1>
              <div className="table-responsive">
                <table className="table table-striped table-primary">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Sub Category</th>
                      <th scope="col">Base Amount</th>
                      <th scope="col">Bidding Price</th>
                      <th scope="col">Bidding Time</th>
                      <th scope="col">Bidding</th>
                      <th scope="col">Doc File</th>
                      <th scope="col">Bid Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pList.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No products found
                        </td>
                      </tr>
                    ) : (
                      pList.map((row) => (
                        <tr >
                          <td>
                            <img
                              src={`assets/uploads/shipmenticons/${row.piconnm}`}
                              alt={row.title}
                              style={{
                                maxWidth: "120px",
                                maxHeight: "80px",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                          </td>
                          
                          <td>{row.title}</td>
                          <td>{row.catnm}</td>
                          <td>{row.subcatnm}</td>
                          <td>{row.baseprice}</td>
                          <td>{row.auctionprice}</td>
                          
                          <td className="timer-flash">{getRemainingTime(row.info)}</td>
                          <td><button><Link to={`/bidp/${row._id}`}>participate</Link></button></td>
                          <td>
                            {row.descriptionnm ? (
                              <a
                                href={`assets/uploads/Description/${row.descriptionnm}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Doc
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td>{row.bid_status === 1 ? "Active" : "Deactive"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowProducts;
