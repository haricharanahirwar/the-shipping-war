import './Register.css';
  import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../API_URL';

function Register() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [gender, setGender] = useState();
  const [output, setOutput] = useState();

  const handleSubmit = () => {
    const userDetails = { "name": name, "email": email, "mobile": mobile, "address": address, "city": city, "gender": gender };
    
    axios.post(__userapiurl + "save", userDetails)
    .then(() => {
        setName("");
        setEmail("");
        setMobile("");
        setCity("");
        setAddress("");
        setGender("")
        setOutput("user Register succesfuly");
    })
     .catch(() => {
        setOutput("user Register failed");
      })


  };



  return (
    <>
      {/* Register Start */}
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5 align-items-center">
            <div class="col-lg-12">
              {output}
              <h1 class="mb-4">Register <span class="text-primary text-uppercase">Here!!!</span></h1>

              <form>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <br />
                <div class="form-group">
                  <label for="email">Email address:</label>
                  <input type="email" class="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <br />
                {/* <div class="form-group">
                  <label for="pwd">Password:</label>
                  <input type="password" class="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div> */}
                <br />
                <div class="form-group">
                  <label for="mobile">Mobile:</label>
                  <input type="text" class="form-control" value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                </div>
                <br />
                <div class="form-group">
                  <label for="address">Address:</label>
                  <textarea rows="5" class="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }}></textarea>
                </div>
                <br />
                <div class="form-group">
                  <label for="city">City:</label>
                  <select class="form-control" value={city} onChange={(e) => { setCity(e.target.value) }}>
                    <option>--Select--</option>
                    <optgroup label='Madhya Pradesh'>
                      <option>Indore</option>
                      <option>Bhopal</option>
                      <option>Ujjain</option>
                    </optgroup>
                    <optgroup label='Maharashtra' >
                      <option>Mumbai</option>
                      <option>Pune</option>
                      <option>Nasik</option>
                    </optgroup>
                  </select>
                </div>
                <br />
                <div class="form-group">
                  <label for="gender">Gender:</label>
                  &nbsp;&nbsp;
                  Male <input type="radio" value="male" name="gender" onChange={(e) => { setGender(e.target.value) }} />
                  &nbsp;&nbsp;&nbsp;
                  Female <input type="radio" value="female" name="gender" onChange={(e) => { setGender(e.target.value) }} />
                </div>
                <br />
                <button type="button" class="btn btn-warning" onClick={handleSubmit}>Submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>
      {/* Register End */}
    </>

  )
}

export default Register;


