import React, {useState} from "react";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import UserDashboardNavBar from "./UserDashboardNavBar";
import {useSelector} from "react-redux";
import history from '../../history';
import Autocomplete from "react-google-autocomplete";




const UserDashboardHome = () => {

    const publicKey = "pk_live_5fa881ddfe08bb07ee07e8736d52c73cd379b129";
    const [pickupcharge, setPickupcharge] = useState("");
    const [pickupaddress, setPickupaddress] = useState("");
    const [pickupoutskirt, setPickupoutskirt] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pickupdate, setPickupdate] = useState("");
    const [pickupitem, setPickupitem] = useState("");
    const [pickupweight, setPickupweight] = useState(0);
    const [weightinkg, setWeightinkg] = useState(0);
    const [pickupquantity, setPickupquantity] = useState("");
    const [deliveryaddress, setDeliveryaddress] = useState("");
    const [deliveryoutskirt, setDeliveryoutskirt] = useState("");
    const [deliveryname, setDeliveryname] = useState("");
    const [deliveryphonenumber, setDeliveryphonenumber] = useState(1234567890);
    const [deliveryemail, setDeliveryemail] = useState("");
    const [distanceInKm, setDistanceInKm] = useState(0);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const status= "Received";


    var pickupplaceid = "";
    var deliveryplaceid = "";

    var service = new window.google.maps.DistanceMatrixService();

//Initial Formula
const calculatePrice = Math.ceil( ((500 * 1) + (((distanceInKm / 1000) * 40) * 1) + (((timeInSeconds / 60) * 15) * 1) + (pickupweight * 1)));


//Use pricedisplayfor use to display & send RealPriceToCityRunner to paystack !!!!!!!!!!!

const PriceDisplayForUser = () => {
  if(calculatePrice===500){
    return 0;
  } else if (calculatePrice > 100 && calculatePrice < 900){
      return 900;
  } else{return calculatePrice}
}

//The final Display Price for customers
//const priceToDisplay = checkedPrice;

const calculateRealPriceToSendToPaystack = Math.ceil(((PriceDisplayForUser() * 1) + (((0.015*PriceDisplayForUser()) + 100)*1)) * 100);

const RealPriceToCityRunner = () =>{
    if(PriceDisplayForUser() > 127000){
      return (PriceDisplayForUser() * 1) ;

    } else {return calculateRealPriceToSendToPaystack} 
}


    const amount = calculateRealPriceToSendToPaystack;
    const amountInNaira = calculatePrice;

    const { auth } = useSelector( state => ({
    auth: state.auth,
    })); 

    const user = auth.user.id; 
    const data = {
        user, pickupitem, pickupaddress, name, phone, email, pickupdate , amountInNaira, weightinkg, pickupquantity, 
        deliveryaddress, deliveryname, deliveryphonenumber, deliveryemail, status
    };

 

    const OnSubmit = () => {
        axios.post("/api/abuaddeliveries/order", data) 
        .then((res) => {
            alert("Please note that order will be processed upon confirmation of payment.\n \n Kindly ignore if you already have an e-wallet with CityRuner Deliveries")
            console.log(`first message: ${res.data}`);
        }).catch((error) => {
            console.log(error);
        });
        

        axios.post(`/api/abuaddeliveries/userupdate/${data.user}`, data)
        .then((res) => {
            console.log(`this is from the second success msg: ${res.data}`);
            window.location.href = "https://paystack.com/pay/cityrunnerltd";

        })
        .catch((error) => {
          console.log(error);
      });

    }

    const CheckPrice = () => {
        window.location.href = "https://docs.google.com/document/d/1UKgl3LlcsRoFq7IhGR8evzOeMsl9hfYj/edit";

    }


    const Nothing = () => {
        axios.post("/api/abuaddeliveries/order", data) 
        .then((res) => {
            alert("Please note that order will be processed upon confirmation of payment.\n \n Kindly ignore if you already have an e-wallet with CityRuner Deliveries")
            console.log(`first message: ${res.data}`);
        }).catch((error) => {
            console.log(error);
        });
        

        axios.post(`/api/abuaddeliveries/userupdate/${data.user}`, data)
        .then((res) => {
            console.log(`this is from the second success msg: ${res.data}`);
            history.push("/paymentpagesuccess");

        })
        .catch((error) => {
          console.log(error);
      });

    } 

    const componentProps = {
        email,
        amount,
        metadata: {
          name,
          phone,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => {
          axios.post("/api/abuaddeliveries/order", data) 
          .then((res) => {
              console.log(`first message: ${res.data}`);
              alert("Order Received!! \n Confirmation email sent");
          }).catch((error) => {
              console.log(error);
          });

          axios.post(`/api/abuaddeliveries/userupdate/${data.user}`, data)
          .then((res) => {
              console.log(`this is from the second success msg: ${res.data}`);
          })
          .catch((error) => {
            console.log(error);
        });

        axios.post("/api/abuaddeliveries/orderreceived", data) 
          .then((res) => {
              console.log(`Third message: ${res.data}`);
              alert("Order Received!! \n Confirmation email sent");
          }).catch((error) => {
              console.log(error);
          });

        window.location.href = "/PaymentSuccess";

        },
        onClose: () => alert("Wait! Don't leave me :("),
      }


      

      const checker = () => {
        if (pickupcharge===500){
          return true
        }else{return false}
      }
    
      const checkerTwo = () => {
        if(pickupcharge===0){
          return true
        }else{return false}
    
      }

    const checkWeight = (e) => {

        setWeightinkg(e.target.value);

        if( (e.target.value > 5) && (e.target.value <= 6) ){
            setPickupweight(200);
        }
        else if( (e.target.value > 6) && (e.target.value <= 7) ){
            setPickupweight(400);

        }
        else if( (e.target.value > 7) && (e.target.value <= 8) ){
            setPickupweight(600);

        }else if( (e.target.value > 8) && (e.target.value <= 9) ){
                setPickupweight(800);

        }else if( (e.target.value > 9) && (e.target.value <= 10) ){
                setPickupweight(1000);
        } 
    }

    return(
        <div>
            <UserDashboardNavBar /> 
            <div className ="contactBody">
                <br/>
               
            <div className="form-top">
            <h1>₦ {calculatePrice} </h1>
            <p className="ontop-form ontop-form2 ontop-dash ontop-dash1"><b>User</b> Pick up Info</p>
            <br/>
            <br/>
            
 
            </div>
            <div className="contactForm">
            <form id="myForm">

            <div className="radio-group"> 
            <input type="radio" id="citypick" name="select" value="cityrunner" 
            checked={pickupcharge === 500} onClick={(e) => setPickupcharge(500)}/>
            <label htmlFor="citypick" className="radio-label">Driver Pick-up</label>
            <br/>
            <br/>
            <input type="radio" id="userdrop" name="select" value="user"
            checked={pickupcharge === 0} onClick={(e) => setPickupcharge(0)}/> 
            <label htmlFor="userdrop" className="radio-label">Customer Drop-off</label>
            <p style={{display: checkerTwo() ? "block" : "none"}} className="drop-off-p"><br/><b>
            Drop-off Address: IEEE Office E25, Second Floor, Engineering Building, Afe Babalola University, Ado Ektit, Ekiti</b></p>

            </div>



            <div class="input-group">
                <input type="text" id="name" name="name" onChange={(e)=> setName(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Your Name</label>
            </div>

            <div class="input-group">
                <input type="tel" id="phone" name="phone" onChange={(e)=>setPhone(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Your Phone Number</label>
            </div>

            <div class="input-group">
                <input type="email" id="email" name="email" onChange={(e)=> setEmail(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Your Email</label>
            </div>

            <div className="pickupinfo" style={{display: checker() ? "block" : "none"}}      >

         {/*  <div class="input-group">
                 <input type="text" id="pickupaddress" name="pickupaddress" onChange={(e)=> setPickupaddress(e.target.value)} required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                <label className="label-class">Pick-up Address</label>
         </div> */}

            <Autocomplete
                apiKey={"AIzaSyBbZVA0QFTrrlKq0IInKLdEqMoFaBqXQ3I"}
                style={{ width: "60%" }}
                onPlaceSelected={(place) => {
                console.log(place.formatted_address);
                pickupplaceid = place.formatted_address;
                setPickupaddress(place.formatted_address);
                }}
                
                options={{
                    types: ["address"],
                    componentRestrictions: { country: "ng" },
                  }}

                  placeholder="Pick-up Address"
 
  
                />

            <div class="input-group">
                 <input type="text" id="pickupstate" name="pickupstate" value="Ekiti" required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                 <label className="label-class">State</label>
            </div>

            <div class="input-group">
                <input type="date" id="pickupdate" name="pickupdate" onChange={(e)=>setPickupdate(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class label-class-special">Pick up date</label>
            </div>

            <div class="input-group">
                 <input type="text" id="pickupitem" name="pickupitem" onChange={(e)=>setPickupitem(e.target.value)} required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                <label className="label-class">Item Description</label>
            </div>

            <div class="input-group">
                <input type="number" id="pickupweight" name="pickupweight" onChange={checkWeight} max="10" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Weight (Max weight = 10kg)</label>
            </div>


            <div class="input-group">
                <input type="number" id="pickupquantity" name="pickupquantity" onChange={(e)=>setPickupquantity(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Quantity</label>
            </div>

            </div>


          
            
            
            
            
            <br/>
            <br/>
            <br/>



           
            <p className="ontop-form ontop-form2 ontop-dash ontop-dash2"><b>Delivery</b> Info</p>

          {/*  <div class="input-group">
                 <input type="text" id="deliveryname" name="deliveryname" onChange={(e)=>setDeliveryaddress(e.target.value)} required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                <label className="label-class">Delivery Address</label>
                </div> */}

            <Autocomplete
                apiKey={"AIzaSyBbZVA0QFTrrlKq0IInKLdEqMoFaBqXQ3I"}
                style={{ width: "60%" }}
                onPlaceSelected={(place) => {
                console.log(place.formatted_address);
                deliveryplaceid = place.formatted_address;
                setDeliveryaddress(place.formatted_address);

                function callback(response, status) {
                    setDistanceInKm(response.rows[0].elements[0].distance.value);
                    setTimeInSeconds(response.rows[0].elements[0].duration.value);
                    console.log(status);
                  
                  }
                
                service.getDistanceMatrix(
                    {
                        origins: [pickupplaceid],
                        destinations: [deliveryplaceid],
                        travelMode: window.google.maps.TravelMode.DRIVING,
                        unitSystem: window.google.maps.UnitSystem.METRIC,
                    }, callback );
             
                }}
                
                options={{
                    types: ["address"],
                    componentRestrictions: { country: "ng" },
                  }}
                    placeholder="Delivery Address"

                />

            <div class="input-group">
                 <input type="text" id="deliverystate" name="deliverystate" value="Ekiti" required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                 <label className="label-class">State</label>
            </div>

            <div class="input-group">
                <input type="text" id="deliveryname" name="deliveryname" onChange={(e)=>setDeliveryname(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Name</label>
            </div>

            <div class="input-group">
                <input type="tel" id="deliveryphonenumber" name="deliveryphonenumber" onChange={(e)=>setDeliveryphonenumber(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Phone Number</label>
            </div>

            <div class="input-group">
                <input type="email" id="deliveryemail" name="deliveryemail" onChange={(e)=>setDeliveryemail(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Email</label>
            </div>

            <div class="input-group" style={{display: checkerTwo() ? "block" : "none"}}>
                 <input type="text" id="pickupitem" name="pickupitem" onChange={(e)=>setPickupitem(e.target.value)} required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                <label className="label-class">Item</label>
            </div>

            <div class="input-group" style={{display: checkerTwo() ? "block" : "none"}}>
                <input type="number" id="pickupweight" name="pickupweight" onChange={checkWeight} max="10" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Weight (Max weight = 10kg)</label>
            </div>


            <div class="input-group" style={{display: checkerTwo() ? "block" : "none"}}>
                <input type="number" id="pickupquantity" name="pickupquantity" onChange={(e)=>setPickupquantity(e.target.value)} required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label-class">Quantity</label>
            </div>


          

           
            </form>

            <div className="paypay">
                 {/*
            <button className="contact-button" type="submit" onClick={CheckPrice}>Check Price</button>
            <br/>
            <br/>
            <button className="contact-button" type="submit" onClick={OnSubmit}>Create Order</button>
            <br/>
            <br/>
            <button className="contact-button" type="submit" onClick={Nothing}>Create Order <br/> (E-Wallet)</button>
        */}
            <br/>
            <br/>


           <PaystackButton {...componentProps} className="contact-button"/> 

                <br/>
                <br/>
              </div>
        </div>

        </div>  

        </div>
    )
}

export default UserDashboardHome;