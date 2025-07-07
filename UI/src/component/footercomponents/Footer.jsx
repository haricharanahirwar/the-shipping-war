import { Link } from "react-router-dom";

function Footer(){
    return(
        <>
             {/* info section */}
 <section class="info_section ">
 <div class="container ">
   <div class="row  mb-3 pb-4">
     <div class="col-md-3 info_logo">
       <div class="logo-box">
         <img src="/assets/images/logo-white.png" alt="" />
         <span>
           Shipping War
         </span>
       </div>
       <p>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedconsectetur
       </p>
       <div class="info_social">
         <div>
           <a href="">
             <img src="/assets/images/fb.png" alt="" />
           </a>
         </div>
         <div>
           <a href="">
             <img src="/assets/images/twitter.png" alt="" />
           </a>
         </div>
         <div>
           <a href="">
             <img src="/assets/images/g-plus.png" alt="" />
           </a>
         </div>
         <div>
           <a href="">
             <img src="/assets/images/linkedin.png" alt="" />
           </a>
         </div>
       </div>
     </div>
     <div class="col-md-3 info_address">
       <h5>
         Address
       </h5>
       <p>
         Ataldwar,LIG colony indore india
       </p>
       <p>
         (+91) 8522369417
       </p>
       <p>
         +91 1234567890
       </p>
       <p>
         <a href="">
           ShippingWar@gmail.com
         </a>
       </p>
     </div>
     <div class="col-md-3 info_links">

       <div class="info_nav ">
         <nav class="">
           <ul>
             <h5>
               Links
             </h5>
             <li>
               <a ><Link to="/"> Home</Link></a>
             </li>
             <li>
               <a ><Link to="/About">About</Link></a>
             </li>
             <li>
               <a ><Link to="/Service"> Service</Link></a>
             </li>
             <li>
               <a><Link to="/Register">Register</Link> </a>
             </li>
             <li>
               <a> <Link to="/Login">login</Link></a>
             </li>
             <li>
               <a ><Link to="/Contact"> Contact</Link></a>
             </li>
             <li>
               <button onClick={()=>{
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
               }} ><img src="./assets/images/back-to-top.png" /></button>
             </li>
                

           </ul>
         </nav>
       </div>
     </div>
     <div class="col-md-3 info_news">
       <h5>
         Newsletter
       </h5>
       <form action="">
         <div>
           <input type="text" placeholder="Your Name" />
         </div>
         <div>
           <input type="email" placeholder="Email" />
         </div>
         <div class="d-flex justify-content-end">
           <button type="submit">
             Subscribe
           </button>
           
         </div>
         
       </form>
     </div>
   </div>


 </div>
</section>
{/* end info section */}

{/* footer section */}
<section class="container-fluid footer_section">
 <p>
   
   <a>this is shipping war</a>
 </p>
</section>
{/* footer section */}
        </>
    )
}

export default Footer;