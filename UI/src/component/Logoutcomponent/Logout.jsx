// import './Logout.css';
// import {useNavigate} from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { useEffect } from 'react';
// function Logout(){
//     const Navigate=useNavigate();
//     useEffect(()=>{
//         Swal.fire({
//             text:'Do you really want to logout?',
//            icon:'question',
//            showCancelButton:true,
//            confirmButtonText:'yes',
//            cancelButtonText:'No',
//              customClass: {
//    actions: 'swal-buttons-gap',
//     confirmButton: 'btn-yes',
//     cancelButton: 'btn-no'
//   },
//   buttonsStyling: false

//         }).then((result)=>{
//             if(result.isConfirmed){
//                 localStorage.removeItem("tokan");
//                 localStorage.removeItem("email");
//                 localStorage.removeItem("name");
//                 localStorage.removeItem("mobile");
//                 localStorage.removeItem("address");
//                 localStorage.removeItem("city")
//                 localStorage.removeItem("gender")
//                 localStorage.removeItem("role")
//                 localStorage.getItem("info");
//                 Navigate('/login');

//             }
//             else{
//                   if(localStorage.getItem("role")=="admin"){
//                     Navigate("admin")
//                   }
//                   else if(localStorage.getItem("rolr")=="user"){
//                     Navigate("/user")
//                   }
//                   else{
//                     Navigate("/")
//                   }
//             }

//         })
//     })
//     return(
//         <>
//         </>
//     )
// }
// export default Logout;
import './Logout.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Modern logout confirmation with gradient design
    Swal.fire({
      title: '<strong style="color: #667eea;">Logout Confirmation</strong>',
      html: '<p style="color: #666; font-size: 16px;">Are you sure you want to logout?</p>',
      icon: 'question',
      iconColor: '#667eea',
      showCancelButton: true,
      confirmButtonText: '<i class="fas fa-sign-out-alt"></i> Yes, Logout',
      cancelButtonText: '<i class="fas fa-times"></i> Cancel',
      reverseButtons: true,
      background: '#fff',
      backdrop: 'rgba(102, 126, 234, 0.2)',
      customClass: {
        popup: 'modern-swal-popup',
        title: 'modern-swal-title',
        htmlContainer: 'modern-swal-html',
        confirmButton: 'modern-swal-confirm',
        cancelButton: 'modern-swal-cancel',
        actions: 'modern-swal-actions'
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Show success message
        Swal.fire({
          title: '<strong style="color: #667eea;">Logged Out!</strong>',
          html: '<p style="color: #666;">You have been successfully logged out.</p>',
          icon: 'success',
          iconColor: '#667eea',
          timer: 1500,
          showConfirmButton: false,
          background: '#fff',
          backdrop: 'rgba(102, 126, 234, 0.2)',
          customClass: {
            popup: 'modern-swal-popup',
            title: 'modern-swal-title',
            htmlContainer: 'modern-swal-html'
          },
          showClass: {
            popup: 'animate__animated animate__zoomIn animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__zoomOut animate__faster'
          }
        });

        // Clear all localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("mobile");
        localStorage.removeItem("address");
        localStorage.removeItem("city");
        localStorage.removeItem("gender");
        localStorage.removeItem("role");
        localStorage.removeItem("info");

        // Dispatch custom event to notify Navbar of auth state change
        window.dispatchEvent(new Event('authStateChanged'));

        // Navigate to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 1500);

      } else {
        // User cancelled - go back to their dashboard
        const role = localStorage.getItem("role");

        if (role === "admin") {
          navigate("/admin");
        } 
        else if (role === "manager") {
          navigate("/manager");
        }
        else if (role === "user") {
          navigate("/user");
        } 
        else {
          navigate("/");
        }
      }
    });

  }, [navigate]);

  return null;
}

export default Logout;
