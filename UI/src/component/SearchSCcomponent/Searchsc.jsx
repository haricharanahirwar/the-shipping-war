import './Searchsc.css';
import apiClient from '../../utils/apiClient';
import { useState, useEffect } from 'react';
import { __subcategoryapiurl } from '../../API_URL';
import { Link, useParams } from 'react-router-dom';

function Searchsc() {
  const params = useParams();
  const [scList, setSubCatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await apiClient.get(__subcategoryapiurl + 'fetch', {
          params: { catnm: params.catnm }
        });
        setSubCatList(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError('Unable to load subcategories');
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [params.catnm]);

  return (
    <>
      <div className="modern-container">
        <div className="modern-card fade-in">
          <h1 className="modern-heading">
            SubCategory List <span className="text-primary">&gt;&gt;</span> {params.catnm}
          </h1>
          
          {error && (
            <div className="alert-modern alert-danger-modern mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p className="mt-3">Loading subcategories...</p>
            </div>
          ) : (
            <center>
              <div id="main">
                {scList.length > 0 ? (
                  scList.map((row) => (
                    <div className="main_part" key={row._id}>
                      <Link to="/showproduct">
                        <img src={row.subcaticonnm} height={120} width={150} alt={row.subcatnm} />
                        <br />
                        <b>{row.subcatnm}</b>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No subcategories available for {params.catnm}</p>
                )}
              </div>
            </center>
          )}
        </div>
      </div>
    </>
  );
}

export default Searchsc;
