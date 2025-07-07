import axios from 'axios';
import { useState, useEffect } from 'react';
import { __bidapiurl, __shipmentapiurl } from '../../API_URL';
import { useParams, useNavigate } from 'react-router-dom';

function Bidproduct() {
  const params = useParams();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState([]);
  const [currentPrice, setCurrentPrice] = useState([]);
  const [bidPrice, setBidPrice] = useState([]);
  const [output, setOutput] = useState();

  useEffect(() => {
    axios
      .get(__shipmentapiurl + "fetch", {
        params: { _id: params._id },
      })
      .then((response) => {
        console.log(response.data[0]);
        setProductDetails(response.data[0]);
      });
  }, []);

  useEffect(() => {
    if (!productDetails.baseprice) return;

    axios
      .get(__bidapiurl + "fetch", { params: { p_id: params._id } })
      .then((response1) => {

        const bids = response1.data;

        if (!Array.isArray(bids) || bids.length === 0) {
          setCurrentPrice(productDetails.baseprice);
        } else {
          const minBid = bids.reduce(
            (min, bid) => (bid.bidprice < min ? bid.bidprice : min),
            bids[0].bidprice
          );
          setCurrentPrice(minBid);
        }
      })
      .catch(() => {
        setCurrentPrice(productDetails.baseprice);
      });
  }, [productDetails, params._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var bidDetails = {
      p_id: params._id,
      u_id: localStorage.getItem("email"),
      bidprice: parseInt(bidPrice),
    };
    axios
      .post(__bidapiurl + "save", bidDetails)
      .then(() => {
        console.log("data updated");
        
        setOutput("Bid updated successfully....");
        setBidPrice("");
        navigate("/bidp/" + params._id);
      })
      .catch(() => {
        setOutput("Unable to bid , please try again....");
        setBidPrice("");
      });
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-12">
            <h1 className="mb-4">Bid Product Here!!!</h1>
            <font style={{ color: "black" }}>{output}</font>

            <table className="table">
              <tbody>
                <tr>
                  <td><strong>ProductID:</strong></td>
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
                    <form>
                      <input
                        type="text"
                        className="form-control"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        // min={(currentPrice > 0 ? currentPrice : productDetails.baseprice) + 1}
                        // required
                      />
                      <br />
                      <button type="button" onClick={handleSubmit} className="btn btn-danger">Bid Product</button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Bidproduct;
