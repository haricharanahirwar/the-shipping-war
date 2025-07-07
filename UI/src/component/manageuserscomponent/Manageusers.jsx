import './Manageusers.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';

function Manageusers() {

  const [ users , setUserDetails ] = useState([]);  

  useEffect(()=>{
    axios.get(__userapiurl+"fetch",{
        params :  {"role":"user"} 
    }).then((response)=>{
        //console.log(response.data);
        setUserDetails(response.data);
    }).catch((error)=>{
        console.log(error);        
    });  
  });   
   
   
const manageuserstatus=(_id,s)=>{
    if(s=="active")
    {
        var update_details={"condition_obj":{"_id":_id} ,"content_obj":{"status":1}};
        axios.patch(__userapiurl+"update",update_details).then((response)=>{
              alert("User activated successfully....");
              navigate("/manageusers");
        });    
    }
    else if(s=="inactive")
    {
        var update_details={"condition_obj":{"_id":_id} ,"content_obj":{"status":0}};
        axios.patch(__userapiurl+"update",update_details).then((response)=>{
              alert("User deactivated successfully....");
              navigate("/manageusers");
        });
    }
    else
    {
        var delete_details={"data":{"_id":_id}};
        axios.delete(__userapiurl+"delete",delete_details).then((response)=>{
              alert("User deleted successfully....");
              navigate("/manageusers");
        });
    }
  };


  return (
    <>
    {/* About Start */}
<div class="container-xxl py-5">
    <div class="container">
        <div class="row g-5 align-items-center">
<div class="col-lg-12">
<h1 class="mb-4">View & Manage Users <span class="text-primary text-uppercase">Here!!!</span></h1>
<table class="table table-bordered" cellSpacing={10} cellPadding={10}>
<tr>
<th>RegId</th>
<th>Name</th>
<th>Email</th>
<th>Mobile</th>
<th>Address</th>
<th>City</th>
<th>Gender</th>
<th>Info</th>  
<th>status</th>
<th>Actions</th> 

</tr>    

{
 users.map((row)=>(
    <tr>
        <td>{row._id} </td>
        <td>{row.name} </td>
        <td>{row.email} </td>
        <td>{row.mobile} </td>
        <td>{row.address} </td>
        <td>{row.city} </td>
        <td>{row.gender} </td>
        <td>{row.info} </td>
        <td>{row.status==1 ? <font color="green">Active</font>:<font color="red">Inactive</font> }</td>
          <td>{row.status==1 ? <a style={{'color':'blue'}} onClick={()=>{manageuserstatus(row._id,'inactive')}} >ChangeStatus</a>: <a style={{'color':'blue'}} onClick={()=>{manageuserstatus(row._id,'active')}} >ChangeStatus</a>}    
        <br/>
        <a style={{'color':'red'}} onClick={()=>{manageuserstatus(row._id,'delete')}} >Delete</a>
        </td>
        
    </tr>
 ))        
}

</table>
</div>
        </div>
    </div>
</div>
{/* About End */}
    </>
  )
}

export default Manageusers;
  

