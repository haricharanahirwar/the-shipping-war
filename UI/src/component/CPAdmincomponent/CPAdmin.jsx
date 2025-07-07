import './CPAdmin.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useNavigate } from 'react-router-dom';

function CPAdmin() {

  const navigate = useNavigate();
  const [ opassword , setOldPassword ] = useState();
  const [ npassword , setNewPassword ] = useState();
  const [ cnpassword , setConfirmNewPassword ] = useState();
  const [ output , setOutput ] = useState();     
  
  const handleSubmit=()=>{
    const email = localStorage.getItem("email");
    axios.get(__userapiurl+"fetch",{
        params :  {"email":email,"password":opassword} 
    }).then((response)=>{
        if(npassword==cnpassword)
        {
            var update_details={"condition_obj":{"email":email} ,"content_obj":{"password":cnpassword}};
            axios.patch(__userapiurl+"update",update_details).then((response)=>{
            alert("Password changed successfully....");
            navigate("/logout");
        });    
        }
        else
        {
            setOutput("New & Confirm New Password Mismatch....");
            setNewPassword("");
            setConfirmNewPassword("");    
        }
    }).catch((error)=>{
        setOutput("Invalid old password , plase try again....");
        setOldPassword("");        
    });
  };

  return (
    <>
    {/* About Start */}
<div class="container-xxl py-5">
    <div class="container">
        <div class="row g-5 align-items-center">
<div class="col-lg-12">
<h2 style={{'color':'orange'}} >{output}</h2>              
<h1 class="mb-4">Change Password <span class="text-primary text-uppercase"> Here!!!</span></h1>
<form>
  <div class="form-group">
    <label for="pwd">Old Password:</label>
    <input type="password" class="form-control" value={opassword} onChange={(e)=>{ setOldPassword(e.target.value)}} />
  </div>
  <br/>
  <div class="form-group">
    <label for="pwd">New Password:</label>
    <input type="password" class="form-control" value={npassword} onChange={(e)=>{ setNewPassword(e.target.value)}} />
  </div>
  <br/>
  <div class="form-group">
    <label for="pwd">Confirm New Password:</label>
    <input type="password" class="form-control" value={cnpassword} onChange={(e)=>{ setConfirmNewPassword(e.target.value)}} />
  </div>
  <br/>
  <button type="button" class="btn btn-warning" onClick={handleSubmit}>Submit</button>
</form>

</div>
        </div>
    </div>
</div>
{/* About End */}
    </>
  )
}

export default CPAdmin;
  

