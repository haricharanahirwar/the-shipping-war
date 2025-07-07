import './Addproduct.css';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { __categoryapiurl , __shipmentapiurl, __subcategoryapiurl } from '../../API_URL';

function Addproduct() {

  const [ cList , setCatList ] = useState([]);
  const [ scList , setSubCatList ] = useState([]);
  const [categorynm, setCategorynm] = useState();
  const [subcategorynm, setSubCategorynm] = useState();
  const [baseamount, setBaseAmount] = useState();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [file, setFile] = useState();
  const [output,setOutput]=useState();
  
  
  useEffect(()=>{
    axios.get(__categoryapiurl+"fetch").then((response)=>{
        setCatList(response.data);
    }).catch((error)=>{
        console.log(error);        
        });  
  },[]);

  useEffect(()=>{
    if(categorynm)
    {
     axios.get(__subcategoryapiurl+"fetch",{
        params : {"catnm":categorynm}        
     }).then((response)=>{
        setSubCatList(response.data);
     }).catch((error)=>{
        console.log(error);        
     });
    }   
  },[categorynm]);

    const handleChange=(event)=>{
      setFile(event.target.files[0]);
    };

  const handledescription=(event)=>{
      setDescription(event.target.files[0]);
    };


   const handleSubmit=(event)=>{
        event.preventDefault();
        var formData = new FormData();
        formData.append('subcatnm', subcategorynm);
        formData.append('catnm',categorynm);
        formData.append('baseprice', baseamount);
        formData.append('title', title);
        formData.append('useremail', localStorage.getItem('email'));
        formData.append('description', description);
        formData.append('picon', file);
        const config = {
            'content-type': 'multipart/form-data'
        };
        axios.post(__shipmentapiurl+"save", formData, config).then((response) => {
          setCategorynm("");
          setSubCategorynm("");
          setBaseAmount('');
          setCategorynm('')
          setSubCatList('')
          setTitle('')
         
          
          setOutput("Product Added Successfully....");
        }).catch((error)=>{
          console.log(error);
          
        })
      };

  return (
    <>
    {/* About Start */}
<div class="container-xxl py-5">
    <div class="container">
        <div class="row g-5 align-items-center">
<div class="col-lg-12">

<h1 class="mb-4">Add Shipping <span class="text-primary text-uppercase">Product Here!!!</span></h1>
<form>
  {output}
  <div class="form-group">
    <label for="title">Title:</label>
    <input type="text" class="form-control" placeholder="Add Shipment Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
  </div>
  <br/>
  
  <div class="form-group">
    <label for="catnm">Category Name:</label>
    <select class="form-control" value={categorynm}
                onChange={(e) => setCategorynm(e.target.value)} >
        <option>Select Category</option>
        {
         cList.map((row)=>(
            <option>{row.catnm}</option>      
         ))   
        }
    </select>
  </div>
  <br/>

  <div class="form-group">
    <label for="subcatnm">SubCategory Name:</label>
    <select class="form-control"  value={subcategorynm} onChange={(e) => setSubCategorynm(e.target.value)} >
        <option>Select SubCategory</option>
        {
        scList && scList.map((row)=>(
            <option>{row.subcatnm}</option>      
         ))   
        }
    </select>
  </div>
  <br/>

  <div class="form-group">
    <label for="description">Shipment Description:</label><br />
    <input type="file" className='form-conrol' accept='.pdf,.doc,.docx' onChange={handledescription} />
  </div>
  <br/>

  <div class="form-group">
    <label for="amount">Base Amount For Shipment:</label>
    <input type="text" class="form-control" placeholder="Add Shipment Amount" value={baseamount} onChange={(e)=>(setBaseAmount(e.target.value))}/>
  </div>
  <br/>


  <div class="form-group">
    <label for="file">Shipment Photos:</label>
    <input type="file" class="form-control" multiple onChange={handleChange}/>
  </div>
  <br/>


  <button  type="button" class="btn btn-danger" onClick={handleSubmit}>Add Shipment</button>
</form>
</div>
        </div>
    </div>
</div>
{/* About End */}
    </>
  )
}

export default Addproduct;
  

