import './Searchsc.css';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { __categoryapiurl , __subcategoryapiurl } from '../../API_URL';
import { Link , useParams } from 'react-router-dom';


function Searchsc() {

  const params = useParams();
  const [ scList , setSubCatList ] = useState([]);    

  useEffect(()=>{
    axios.get(__subcategoryapiurl+"fetch",{
        params :  {"catnm":params.catnm} 
    }).then((response)=>{
        setSubCatList(response.data);
        // console.log(scList);
    }).catch((error)=>{
        console.log(error);        
    });  
  },[]);

  return (
    <>
    {/* About Start */}
<div class="container-xxl py-5">
    <div class="container">
        <div class="row g-5 align-items-center">
            <div class="col-lg-12">
<h1 class="mb-4">SubCategory List <span class="text-primary text-uppercase">&gt;&gt;</span> {params.catnm} </h1>
<center>
<div id="main" >
{
 scList.map((row)=>(
    <div class="main_part" >
        <Link to='/showproduct' >
        <img src={`../public/assets/uploads/subcategoryicons/${row.subcaticonnm}`} height={120} width={150}/>
        <br/>
        <b>{row.subcatnm}</b>    
        </Link>
    </div>
 ))       
}
</div>
</center>
            </div>
        </div>
    </div>
</div>
{/* About End */}
    </>
  )
}

export default Searchsc;
  

