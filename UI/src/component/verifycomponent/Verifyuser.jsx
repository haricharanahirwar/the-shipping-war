import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { __userapiurl } from '../../API_URL';
import apiClient from '../../utils/apiClient';

function Verifyuser() {
  const params = useParams();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await apiClient.get(__userapiurl + 'fetch', {
          params: { email: params.vemail }
        });

        if (response.data[0]?.__v === 0) {
          const updateDetails = {
            condition_obj: { email: params.vemail },
            content_obj: { status: 1, __v: 1 }
          };
          
          await apiClient.patch(__userapiurl + 'update', updateDetails);
          console.log('User verified....');
        }
        
        setVerified(true);
      } catch (error) {
        console.error('Verification error:', error);
        setVerified(true); // Still redirect even on error
      }
    };

    verifyUser();
  }, [params.vemail]);

  if (!verified) {
    return (
      <div className="modern-container">
        <div className="modern-card text-center">
          <div className="loading-spinner"></div>
          <p className="mt-3">Verifying your account...</p>
        </div>
      </div>
    );
  }

  return <Navigate to="/login" />;
}

export default Verifyuser;
