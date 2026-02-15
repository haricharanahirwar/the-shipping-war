import './Addproduct.css';
import apiClient from '../../utils/apiClient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Addproduct() {
  const navigate = useNavigate();
  const [cList, setCatList] = useState([]);
  const [scList, setSubCatList] = useState([]);
  const [categorynm, setCategorynm] = useState('');
  const [subcategorynm, setSubCategorynm] = useState('');
  const [baseamount, setBaseAmount] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setOutput('Please login first!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
  }, [navigate]);

  useEffect(() => {
    apiClient.get('/category/fetch')
      .then((response) => {
        setCatList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (categorynm && categorynm !== 'Select Category') {
      apiClient.get('/subcategory/fetch', {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      setOutput('Session expired. Please login again!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    setLoading(true);
    setOutput('');

    const formData = new FormData();
    formData.append('subcatnm', subcategorynm);
    formData.append('catnm', categorynm);
    formData.append('baseprice', baseamount);
    formData.append('title', title);
    formData.append('useremail', localStorage.getItem('email'));
    formData.append('picon', file);

    const config = {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      await apiClient.post('/shipment/save', formData, config);
      setCategorynm('');
      setSubCategorynm('');
      setBaseAmount('');
      setSubCatList([]);
      setTitle('');
      setFile(null);
      setOutput("Product Added Successfully....");
      
      // Reset file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.value = '';
      }
      
      setTimeout(() => {
        setOutput('');
      }, 3000);
    } catch (error) {
      console.log(error);
      
      if (error.response?.status === 401) {
        setOutput('Session expired. Please login again!');
        setTimeout(() => {
          localStorage.clear();
          window.dispatchEvent(new Event('authStateChanged'));
          navigate('/login');
        }, 2000);
      } else {
        const errorMsg = error.response?.data?.message || "Failed to add product.";
        setOutput(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-container">
      <div className="modern-card">
        <h1 className="modern-heading">
          <i className="fas fa-box me-3"></i>
          Add Shipping Product
        </h1>

        {output && (
          <div className={`alert-modern ${output.includes('Success') ? 'alert-success-modern' : 'alert-danger-modern'}`}>
            <i className={`fas ${output.includes('Success') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
            {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-heading me-2"></i>Shipment Title
                </label>
                <input
                  type="text"
                  className="form-control-modern"
                  placeholder="Enter shipment title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-layer-group me-2"></i>Category
                </label>
                <select
                  className="form-control-modern"
                  value={categorynm}
                  onChange={(e) => setCategorynm(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {cList.map((row) => (
                    <option key={row._id} value={row.catnm}>{row.catnm}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-list me-2"></i>SubCategory
                </label>
                <select
                  className="form-control-modern"
                  value={subcategorynm}
                  onChange={(e) => setSubCategorynm(e.target.value)}
                  required
                  disabled={!categorynm || categorynm === 'Select Category'}
                >
                  <option value="">Select SubCategory</option>
                  {scList && scList.map((row) => (
                    <option key={row._id} value={row.subcatnm}>{row.subcatnm}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-dollar-sign me-2"></i>Base Amount
                </label>
                <input
                  type="number"
                  className="form-control-modern"
                  placeholder="Enter base amount"
                  value={baseamount}
                  onChange={(e) => setBaseAmount(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-image me-2"></i>Shipment Photo
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="form-control-modern"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary-modern w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Adding Product...
              </>
            ) : (
              <>
                <i className="fas fa-plus-circle me-2"></i>
                Add Shipment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
