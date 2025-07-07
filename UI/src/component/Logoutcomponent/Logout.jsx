import './Logout.css';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
function Logout(){
    const Navigate=useNavigate();
    useEffect(()=>{
        Swal.fire({
            text:'Do you really want to logout?',
           icon:'warning',
           showCancelButton:true,
           confirmButtonText:'yes',
           cancelButtonText:'No',
        }).then((result)=>{
            if(result.isConfirmed){
                localStorage.removeItem("tokan");
                localStorage.removeItem("email");
                localStorage.removeItem("name");
                localStorage.removeItem("mobile");
                localStorage.removeItem("address");
                localStorage.removeItem("city")
                localStorage.removeItem("gender")
                localStorage.removeItem("role")
                localStorage.getItem("info");
                Navigate('/login');

            }
            else{
                  if(localStorage.getItem("role")=="admin"){
                    Navigate("admid")
                  }
                  else if(localStorage.getItem("rolr")=="user"){
                    Navigate("/user")
                  }
                  else{
                    Navigate("/")
                  }
            }

        })
    })
    return(
        <>
        </>
    )
}
export default Logout;