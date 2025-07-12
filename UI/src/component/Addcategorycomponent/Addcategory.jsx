
import axios from 'axios';
import { useState } from 'react';
import { __categoryapiurl } from '../../API_URL';

function AddCategory() {
    
    const [file, setFile] = useState();
    const [catName , setCatName] = useState();
    const [output , setOutput] = useState();
  
    const handleChange=(event)=>{
      setFile(event.target.files[0]);
    };
    
    const handleSubmit=(event)=>{
      event.preventDefault();
      var formData = new FormData();
      formData.append('catnm', catName);
      formData.append('caticon', file);
      const config = {
          'content-type': 'multipart/form-data'
      };
      axios.post(__categoryapiurl+"save", formData, config).then((response) => {
        setCatName("");
        setOutput("Category Added Successfully....");
      });
    };

  return (
    <>
    {/* About Start */}
<div class="container-xxl py-5">
    <div class="container">
        <div class="row g-5 align-items-center">
            <div class="col-lg-12">
<h1 class="mb-4">Add Category <span class="text-primary text-uppercase">Here!!!</span></h1>
<font style={{"color":"blue"}} >{output}</font>
<form>
  <div class="form-group">
    <label for="catnm">Category Name:</label>
    <input type="text" class="form-control" value={catName} onChange={e => setCatName(e.target.value)} />
  </div>
  <br/>
  <div class="form-group">
    <label for="file">Category Icon:</label>
    <input type="file" class="form-control" onChange={handleChange} />
  </div>
  <br/>
  <button onClick={handleSubmit} type="button" class="btn btn-danger">Add Category</button>
</form>
            </div>
        </div>
    </div>
</div>
{/* About End */}
    </>
  )
}

export default AddCategory;
  

