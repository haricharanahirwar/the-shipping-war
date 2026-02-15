import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';

function AddCategory() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [catName, setCatName] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is logged in and is admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      setOutput('Please login first!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (role !== 'admin') {
      setOutput('Only admins can access this page!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return;
    }
  }, [navigate]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Double check role
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
      setOutput('Session expired. Please login again!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (role !== 'admin') {
      setOutput('Only admins can add categories!');
      return;
    }

    if (!catName || !file) {
      setOutput('Please fill all fields!');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const formData = new FormData();
      formData.append('catnm', catName);
      formData.append('caticon', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await apiClient.post('/category/save', formData, config);
      
      console.log('Category added successfully:', response.data);
      
      setCatName('');
      setFile(null);
      setOutput('Category Added Successfully!');
      
      // Reset file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.value = '';
      }
      
      setTimeout(() => {
        setOutput('');
      }, 3000);

    } catch (error) {
      console.error('Error adding category:', error);
      
      if (error.response?.status === 401) {
        setOutput('Session expired. Please login again!');
        setTimeout(() => {
          localStorage.clear();
          window.dispatchEvent(new Event('authStateChanged'));
          navigate('/login');
        }, 2000);
      } else {
        const errorMsg = error.response?.data?.message || 'Failed to add category. Please try again.';
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
          <i className="fas fa-layer-group me-3"></i>
          Add Category
        </h1>

        {output && (
          <div className={`alert-modern ${output.includes('Success') ? 'alert-success-modern' : 'alert-danger-modern'}`}>
            <i className={`fas ${output.includes('Success') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
            {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label-modern">
              <i className="fas fa-tag me-2"></i>
              Category Name
            </label>
            <input
              type="text"
              className="form-control-modern"
              placeholder="Enter category name"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label-modern">
              <i className="fas fa-image me-2"></i>
              Category Icon
            </label>
            <input
              type="file"
              id="fileInput"
              className="form-control-modern"
              onChange={handleChange}
              accept="image/*"
              required
            />
            {file && (
              <small className="text-muted mt-2 d-block">
                <i className="fas fa-check-circle text-success me-1"></i>
                Selected: {file.name}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary-modern w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Adding Category...
              </>
            ) : (
              <>
                <i className="fas fa-plus-circle me-2"></i>
                Add Category
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
