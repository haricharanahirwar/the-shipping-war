import './App.css'
import About from './component/homeComponwnt/AboutComponents/About';
import Contact from './component/homeComponwnt/Contactcomponents/Contact';
import Home from './component/homeComponwnt/home';
import Login from './component/homeComponwnt/LoginComponent/Login';
import Register from './component/homeComponwnt/RegisterComponent/Register';
import Service from './component/homeComponwnt/ServiceComponents/Service';
import Navbar from './component/navbarcomponents/Navbar';
import { Route ,Routes } from 'react-router-dom';
import Admin from './component/admincomponent/Admin';
import User from './component/usercomponent/User';
import Logout from './component/Logoutcomponent/Logout';
import Auth from './component/authcomponent/Auth';
import Manageusers from './component/manageuserscomponent/Manageusers';
import EPAdmin from './component/EPAdmincomponent/EPAdmin';
import CPAdmin from './component/CPAdmincomponent/CPAdmin';
import AddCategory from './component/Addcategorycomponent/Addcategory';
import AddSubCategory from './component/Addsubcategorycomponent/Addsubcategory';
import Verifyuser from './component/verifycomponent/Verifyuser';
import Listofcategory from './component/listofcategorycomponent/Listofcategory'
import Searchsc from './component/SearchSCcomponent/Searchsc'
import Search from './component/listofcategorycomponent/Listofcategory';
import Addproduct from './component/AddProductComponent/Addproduct';
import Slider from './component/SliderComponents/Slider';
import Showproduct from './component/Showproductcomponent/Showproduct'
import Bidproduct from './component/bidcomponent/Bidproduct';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/slider'element={<Slider />}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Logout' element={<Logout/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/verify/:vemail'element={<Verifyuser />}></Route>
        <Route path='/service' element={<Service/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/user' element={<User/>}></Route>
       <Route path='/Auth'element={<Auth/>}></Route>
       <Route path="/manageusers"element={<Manageusers/>}></Route>
       <Route path='/epadmin'element={<EPAdmin/>}></Route>
       <Route path='/cpadmin'element={<CPAdmin/>}></Route>
       <Route path='/addcategory'element={<AddCategory/>}></Route>
       <Route path='/addsubcategory'element={<AddSubCategory/>}></Route>
       <Route path='/listofcategory'element={<Listofcategory />}></Route>
       <Route path='/search'element={<Search />}></Route>
       <Route path="/searchsc/:catnm"element={<Searchsc />}></Route>
       <Route path='/addproduct'element={<Addproduct />}></Route>
       <Route path='/showproduct'element={<Showproduct />}></Route>
       <Route path='/bidp/:_id'element={<Bidproduct />}></Route>
       
      </Routes>
    </>
  )
}

export default App;
