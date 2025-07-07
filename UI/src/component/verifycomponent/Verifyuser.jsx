import { Navigate , useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { __userapiurl } from '../../API_URL';
import axios from 'axios';

function Verifyuser()
{
    const params = useParams(); 

    useEffect(()=>{

     axios.get(__userapiurl+"fetch",{
        params :  {"email":params.vemail} 
    }).then((response)=>{
        if(response.data[0].__v==0)
        {
            var updateDetails={"condition_obj":{"email":params.vemail},"content_obj":{"status":1,"__v":1}}; 
            axios.patch(__userapiurl+"update",updateDetails).then((response)=>{
               console.log("User verified....");    
            });    
        }       
     });
    },[]);

    return(
        <div>
            <Navigate to='/login' />
        </div>
    )
}

export default Verifyuser;