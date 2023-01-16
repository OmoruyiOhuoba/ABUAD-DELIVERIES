import React, {useState} from "react";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import UserDashboardNavBar from "./Dashboard/UserDashboardNavBar";
import {useSelector} from "react-redux";
import history from '../history';
import Autocomplete from "react-google-autocomplete";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import NavBar from "./Layout/NavBar"

const Prices = () => {
    const [pickupoutskirt, setPickupoutskirt] = useState("");
    const [pickupweight, setPickupweight] = useState("");
    const [pickupquantity, setPickupquantity] = useState("");
    const [deliveryoutskirt, setDeliveryoutskirt] = useState("");
    const [pickupcharge, setPickupcharge] = useState("");

    const [distanceInKm, setDistanceInKm] = useState(0);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [weightinkg, setWeightinkg] = useState(0);
    const [pickupaddress, setPickupaddress] = useState("");
    const [deliveryaddress, setDeliveryaddress] = useState("");





    var pickupplaceid = "";
    var deliveryplaceid = "";

    var service = new window.google.maps.DistanceMatrixService();

//Initial Formula
const calculatePrice = Math.ceil( ((500 * 1) + (((distanceInKm / 1000) * 40) * 1) + (((timeInSeconds / 60) * 15) * 1) + (pickupweight * 1)) );


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
    

    return(
        <div id="toppage3">
            <NavBar />

            <div className="form-top">

        <p className="ontop-form ontop-form2 ontop-dash ontop-dash1"><b> Check Price</b></p>



        </div>

        <div>
        <br/>
        <h1 className="color-color" style={{}}>₦ {calculatePrice}</h1>
        </div>
        <br/>
      


        <div className="contactForm">
            <form id="myForm">

            <div className="radio-group">
            <input type="radio" id="delivery" name="options" value="yes-delivery" 
            checked={pickupcharge === 500} onClick={(e) => setPickupcharge(500)}/>
            <label htmlFor="delivery" className="radio-label">Driver Pick-up</label>
            <br/>
            <br/>
            <input type="radio" id="pick-up" name="options" value="no-delivery"
            checked={pickupcharge === 0} onClick={(e) => setPickupcharge(0)}/>
            <label htmlFor="pick-up" className="radio-label">Customer Drop-off</label>
            <p style={{display: checkerTwo() ? "block" : "none"}} className="drop-off-p"><br/><b>
            Drop-off Address: IEEE Office E25, Second Floor, Engineering Building, Afe Babalola University, Ado Ektit, Ekiti.</b></p>

            </div>

        <div className="pickupinfo" style={{display: checker() ? "block" : "none"}}      >

        <br/>
        <br/>
        <div className="form-top">         
                   <p className="ontop-form ontop-form2 ontop-dash ontop-dash2"><b>Pick up</b> Info </p>
           </div>

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
                 <input type="text" name="state" id="state" value="Ekiti" required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                 <label className="label-class">State</label>
            </div>

          {/*  <div class="input-group outskirt">
            <label className="outskirt" style={{textAlign: "left"}}>Is the pick-up address at the outskirts of Lagos? e.g after Ojodu Berger(Arepo, Mowe)/ beyond Ajah(Epe)</label>
               
            </div>

            <div className="radio-group">
            <input type="radio" id="yespickupoutskirt" name="pickupoutskirt" value="yespickupoutskirt" 
            checked={pickupoutskirt === 300} onClick={(e) => setPickupoutskirt(300)}/>
            <label htmlFor="yespickupoutskirt" className="radio-label">Yes, at outskirts</label>
            <br/>
            <br/>
            <input type="radio" id="nopickupoutskirt" name="pickupoutskirt" value="nopickupoutskirt"
            checked={pickupoutskirt === 0} onClick={(e) => setPickupoutskirt(0)}/>
            <label htmlFor="nopickupoutskirt" className="radio-label">No, within Lagos</label>

            </div>

*/}
            <div class="input-group">
                <input type="number" name="pickupweight" id="pickupweight" onChange={checkWeight} max="10" required />
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



           
<p className="ontop-form ontop-form2 ontop-dash ontop-dash2"><b>Delivery</b> Info</p>

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
                 <input type="text" name="deliverystate"id="deliverystate" value="Ekiti" required />
                 <span class="highlight"></span>
                 <span class="bar"></span>
                 <label className="label-class">State</label>
            </div>

            {/*<div class="input-group outskirt">
            <label className="outskirt" style={{textAlign: "left"}}>Is the delivery address at the outskirts of Lagos? e.g after Ojodu Berger(Arepo, Mowe)/ beyond Ajah(Epe)</label>
               
            </div>

            <div className="radio-group">
            <input type="radio" id="yesdeliveryoutskirt" name="deliveryoutskirt" value="yesdeliveryoutskirt" 
            checked={deliveryoutskirt === 300} onClick={(e) => setDeliveryoutskirt(300)}/>
            <label htmlFor="yesdeliveryoutskirt" className="radio-label">Yes, at outskirts</label>
            <br/>
            <br/>
            <input type="radio" id="nodeliveryoutskirt" name="deliveryoutskirt" value="nodeliveryoutskirt"
            checked={deliveryoutskirt === 0} onClick={(e) => setDeliveryoutskirt(0)}/>
            <label htmlFor="nodeliveryoutskirt" className="radio-label">No, within Lagos</label>

                </div> */}

            <div class="input-group" style={{display: checkerTwo() ? "block" : "none"}}>
                <input type="number" name="pickupweight" id="pickupweight" onChange={checkWeight} max="10" required />
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
                <br/>
                <br/>
          {/**  <div className="buttonPosition">
                <h1 className="color-color" style={{}}>Price: ₦ {Amount}</h1>
                <br/>
                <p className="very-small color-color">*Fill all fields for accurate estimate</p>
                <br/>
                <br/>
              </div>*/} 
              <br/>
              <br/>
              <br/>
              <br/>
            </form>
        </div>

        </div>
    )
}

export default Prices;




