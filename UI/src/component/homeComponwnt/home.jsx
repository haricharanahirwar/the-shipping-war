import Footer from "../footercomponents/Footer";
import Navbar from "../navbarcomponents/Navbar";
import Slider from "../SliderComponents/Slider";
import Testimonial from "../TestimonialComponents/Testimonial";
import About from "./AboutComponents/About";
import Company from "./Companydatacomponents/Company";
// import Our from "./ourcomponent/Our";
import Service from "./ServiceComponents/Service";          
function Home(){
    return(
        <>
    
    <Slider />
     <About />
     {/* <Our /> */}
    <Company />
    <Service />
    <Testimonial />
    < Footer />
  
        </>
    )
}
export default Home;