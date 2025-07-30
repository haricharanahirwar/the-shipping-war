import './Addproduct.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { __categoryapiurl, __shipmentapiurl, __subcategoryapiurl } from '../../API_URL';

function Addproduct() {
  const [cList, setCatList] = useState([]);
  const [scList, setSubCatList] = useState([]);
  const [categorynm, setCategorynm] = useState('');
  const [subcategorynm, setSubCategorynm] = useState('');
  const [baseamount, setBaseAmount] = useState('');
  // const [description, setDescription] = useState(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    axios.get(__categoryapiurl + 'fetch')
      .then((response) => {
        setCatList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (categorynm) {
      axios.get(__subcategoryapiurl + 'fetch', {
        params: { "catnm": categorynm }
      }).then((response) => {
        setSubCatList(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [categorynm]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handledescription = (event) => {
    setDescription(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('subcatnm', subcategorynm);
    formData.append('catnm', categorynm);
    formData.append('baseprice', baseamount);
    formData.append('title', title);
    formData.append('useremail', localStorage.getItem('email'));
    // formData.append('description', description);
    formData.append('picon', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    axios.post(__shipmentapiurl + 'save', formData, config)
      .then((response) => {
        setCategorynm('');
        setSubCategorynm('');
        setBaseAmount('');
        setSubCatList([]);
        setTitle('');
        setDescription(null);
        setFile(null);
        setOutput("Product Added Successfully....");
      })
      .catch((error) => {
        console.log(error);
        setOutput("Failed to add product.");
      });
  };

  return (
    <>
      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-12">

              <h1 className="mb-4">
                Add Shipping <span className="text-primary text-uppercase">Product Here!!!</span>
              </h1>

              <form>
                <p className="text-success">{output}</p>

                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add Shipment Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="catnm">Category Name:</label>
                  <select
                    className="form-control"
                    value={categorynm}
                    onChange={(e) => setCategorynm(e.target.value)}
                  >
                    <option>Select Category</option>
                    {cList.map((row, index) => (
                      <option key={index}>{row.catnm}</option>
                    ))}
                  </select>
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="subcatnm">SubCategory Name:</label>
                  <select
                    className="form-control"
                    value={subcategorynm}
                    onChange={(e) => setSubCategorynm(e.target.value)}
                  >
                    <option>Select SubCategory</option>
                    {scList && scList.map((row, index) => (
                      <option key={index}>{row.subcatnm}</option>
                    ))}
                  </select>
                </div>
                <br />

                {/* <div className="form-group">
                  <label htmlFor="description">Shipment Description (PDF/DOC):</label><br />
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    onChange={handledescription}
                  />
                </div> */}
                <br />

                <div className="form-group">
                  <label htmlFor="amount">Base Amount For Shipment:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add Shipment Amount"
                    value={baseamount}
                    onChange={(e) => setBaseAmount(e.target.value)}
                  />
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="file">Shipment Photos:</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <br />

                <button type="button" className="btn btn-danger" onClick={handleSubmit}>
                  Add Shipment
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  );
}

export default Addproduct;
