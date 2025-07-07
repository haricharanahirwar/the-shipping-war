import './AddSubCategory.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { __categoryapiurl, __subcategoryapiurl } from '../../API_URL';

function AddSubCategory() {

  const [file, setFile] = useState();
  const [catName, setCatName] = useState();
  const [subCatName, setSubCatName] = useState();
  const [output, setOutput] = useState();
  const [cList, setCatList] = useState([]);

  useEffect(() => {
    axios.get(__categoryapiurl + "fetch").then((response) => {
      setCatList(response.data);

    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append('catnm', catName);
    formData.append('subcatnm', subCatName);
    formData.append('subcaticon', file);
    const config = {
      'content-type': 'multipart/form-data'
    };
    axios.post(__subcategoryapiurl + "save", formData, config).then((response) => {
      setCatName("");
      setSubCatName("");
      setOutput("SubCategory Added Successfully....");
    });
  };

  return (
    <>
      {/* About Start */}
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5 align-items-center">
            <div class="col-lg-12">
              <h1 class="mb-4">Add SubCategory <span class="text-primary text-uppercase">Here!!!</span></h1>
              <font style={{ "color": "blue" }} >{output}</font>
              <form>
                <div class="form-group">
                  <label for="catnm">Category Name:</label>
                  <select class="form-control" value={catName} onChange={e => setCatName(e.target.value)}>
                    <option>Select Category</option>
                    {
                      cList.map((row) => (
                        <option>{row.catnm}</option>
                      ))
                    }
                  </select>
                </div>
                <br />
                <div class="form-group">
                  <label for="catnm">SubCategory Name:</label>
                  <input type="text" class="form-control" value={subCatName} onChange={e => setSubCatName(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                  <label for="file">SubCategory Icon:</label>
                  <input type="file" class="form-control" onChange={handleChange} />
                </div>
                <br />
                <button onClick={handleSubmit} type="button" class="btn btn-danger">Add SubCategory</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  )
}

export default AddSubCategory;


