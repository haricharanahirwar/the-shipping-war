import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../API_URL.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [output, setOutput] = useState();
  const [type, setType] = useState('password');
  const [passwordtext, setShowpasswordText] = useState("show password");
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is Required!!");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is Required!!");
      return false;
    } 
   
    setPasswordError("");
    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const isvalidateEmail = validateEmail("email");
    const isvalidatePassword = validatePassword("password");
    const loginDetails = {
      email: email,
      password: password
    };
    if (isvalidateEmail && isvalidatePassword) {
      axios.post(__userapiurl + "login", loginDetails).then((response) => {
         const user = response.data.userDetails;
      //  console.log(response.data);
        
        localStorage.setItem("tokan", response.data.token);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("mobile", user.mobile);
        localStorage.setItem("address", user.address);
        localStorage.setItem("city", user.city);
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("role", user.role);
        localStorage.setItem("info", user.info);
        user.role == "admin" ? navigate("/admin") : navigate("/user");
      }).catch((error) => {
          setEmail("");
          setPassword("");
          setOutput("Invalid user or please verify your account....");
          console.log(error);
          
        });


    }

  }

  const handletogglepassword = () => {
    if (type == 'password') {
      setType('text')
      setShowpasswordText("hide password")
    }
    else {
      setType('password')
      setShowpasswordText("show password")
    }
  }

  return (
    <>
      {/* Login Start */}
      <div class="d-flex justify-content-center align-items-center py-5 ">

        <div class=" col-10 col-sm-6 col-md-6 col-lg-4 shadow rounded " id='divbox'>

          <h2 style={{ 'color': 'white' }} >{output}</h2>
          <h1 class="mb-4 text-light text-center ">Login </h1>
          <form>
            <div class="form-group">

              <input type="email" placeholder='Email' class="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              {emailError&&(<span style={{'color':'black'}}>{emailError}</span>)}
            </div>
            <br />
            <div class="form-group">

              <input type={type} placeholder='Password' class="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              {
                passwordError&&(<span style={{'color':'black'}}>{passwordError}</span>)
              }
            </div>

            <input type="checkbox" onClick={handletogglepassword} /> <label htmlFor="" className='text-light'>{passwordtext}</label><br /><br />
            <button type="button" class="btn btn-primary w-100 py-2" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>


      {/* Login End */}
    </>
  )
}

export default Login;