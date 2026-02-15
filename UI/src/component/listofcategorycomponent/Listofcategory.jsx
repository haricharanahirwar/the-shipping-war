import './Listofcategory.css';
import apiClient from '../../utils/apiClient';
import { useState, useEffect } from 'react';
import { __categoryapiurl } from '../../API_URL';
import { Link } from 'react-router-dom';

function Listofcategory() {
  const [cList, setCatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get(__categoryapiurl + 'fetch');
        setCatList(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Unable to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="modern-container">
        <div className="modern-card fade-in">
          <h1 className="modern-heading">Category List</h1>
          
          {error && (
            <div className="alert-modern alert-danger-modern mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p className="mt-3">Loading categories...</p>
            </div>
          ) : (
            <center>
              <div id="main-output-div">
                {cList.length > 0 ? (
                  cList.map((row) => (
                    <div className="main_part" key={row._id}>
                      <Link to={`/searchsc/${row.catnm}`}>
                        <img src={row.caticonnm} height={120} width={150} alt={row.catnm} />
                      </Link>
                      <br />
                      <b>{row.catnm}</b>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No categories available</p>
                )}
              </div>
            </center>
          )}
        </div>
      </div>
    </>
  );
}

export default Listofcategory;
