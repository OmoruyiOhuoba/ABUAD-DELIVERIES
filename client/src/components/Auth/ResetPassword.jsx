import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {loginUser} from "../../actions/authActions";
import {Link} from "react-router-dom";
import backArrow from "../../assets/backarrow.svg";
import Logo from "../../assets/logo-2.png";
import history from '../../history'; 
import axios from "axios";



const ResetPassword = () => {
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [confirmPasswordErr, setConfirmPasswordErr] = useState({});



    const [userData, setUserData] = useState({
        password: "",
        errors:{},
    });


    const { auth, errors } = useSelector(state => ({
        auth: state.auth,
        errors: state.errors,
      })); 

    
      const handleChange = (event) => {
        const {name, value} =event.target;

        setUserData(prevData => {
            return {
                ...prevData, [name]: value
            }
        });

        console.log(userData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = formValidation();


      if(isValid){ 

        const sendPostRequest = async () => {
            try {
                const resp = await axios.post(`/api/abuaddeliveries${window.location.pathname}`, userData) 
                console.log(resp.data);
                alert("Password Reset Successful");
                window.location.href = "/forgotpasswordsent";
                history.push("/forgotpasswordsent");

            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
            }

            return sendPostRequest();
               /* axios.post(`/api/abuaddeliveries${window.location.pathname}`, userData) 
                .then(() => {
                    alert("passwordchangesuccessful");
                    window.location.href = "/forgotpasswordsent";
                    history.push("/forgotpasswordsent");

                }).catch((error) => {
                    console.log(error);
                }); */
                
                
        
                
        }        

        }

    const formValidation = () => {
     //   const emailErr = {};
    // const nameErr = {};
     //const emailErr = {};
     const passwordErr = {};
     const confirmPasswordErr ={};

     let isValid = true;

     
     if( userData.password === ""){
         passwordErr.passwordRequired = "The password field is required";
         isValid = false;
     }
     
     if( userData.password2 === ""){
         confirmPasswordErr.password2Required = "The confirm password field is required";
         isValid = false;
     }

     
     if( userData.password.length > 0 && userData.password.length < 8 ){
         passwordErr.passwordShort = "Password must be at least 8 characters";
         isValid = false;
     }

       
     if(userData.password.length > 30 ){
         passwordErr.passwordLong = "Password can't be more than 30 characters";
         isValid = false;
     }

     if(userData.password2 !== userData.password){
         confirmPasswordErr.unMatchPassword = "Password does not match";
         isValid = false;

     }

    
     setPasswordErr(passwordErr);
     setConfirmPasswordErr(confirmPasswordErr);
     return isValid;


    }

  
     


    return(
            <div>
            <Link to="/home" ><img className="centre-logo" src={Logo} alt="logo"/></Link> 
            <br/>


            <div className="contactForm">
            <form id="myForm">
                <br/>
                <br/>
                <br/>

                <div class="input-group outskirt2">
            <p className="outskirt2">Please reset your password</p>

            </div>
                
         {/**    <div class="input-group">
                <input type="email" name="email" onChange={handleChange} value={userData.email} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Your Email</label>
            </div>
            {Object.keys(emailErr).map((key)=> {
                return <div style={{color: "red", textAlign: "left"}}> {emailErr[key]} </div>
            })}*/}


            <div class="input-group">
                <input type="password" name="password" onChange={handleChange} value={userData.password} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Password</label> 
            </div>
            {Object.keys(passwordErr).map((key)=> {
                return <div style={{color: "red", textAlign: "left"}}> {passwordErr[key]} </div>
            })}
            

            <div class="input-group">
                <input type="password" name="password2" onChange={handleChange} value={userData.password2} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Confirm Password</label>
            </div>   
            {Object.keys(confirmPasswordErr).map((key)=> {
                return <div style={{color: "red", textAlign: "left"}}> {confirmPasswordErr[key]} </div>
            })}  


            <br/>
            <div className="buttonPosition">
                <button className="contact-button" type="submit" onClick={handleSubmit}> Reset Password </button>

                
              </div>
            </form>
        </div>




            </div>
    
    )

}

export default ResetPassword;