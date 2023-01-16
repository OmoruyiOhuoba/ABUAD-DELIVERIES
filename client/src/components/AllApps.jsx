import React from "react";
import {Link} from "react-router-dom";
import NavBar from "./Layout/NavBar";
import building from "../assets/building.svg";
import rightArrow from "../assets/right-arrow.svg";
import biker from "../assets/biker.svg";
import phone from "../assets/location.svg";
import phone3 from "../assets/phone3.png";
import CityIcon from "../assets/CityIcon.png";
import RiderIcon from "../assets/RiderIcon.png";


const AllApps = () => {
    return(
        <div >
            <NavBar />
           
            <div className="whoweare-div" id="toppage1">
                <h1 className="whoweare-h1">All Our Apps</h1>

            </div>

            <div className="all-second-container">
                
            <h1 className="wwa-h1-2">CityRunner Apps</h1>
                <br/>

                <div className="sub-div">
                    <img src={CityIcon} alt="biker" className="vector"/>
                    <div className="vector-text">
                        <h3 className="vector-h2">Download on iOS</h3>
                        <p className="vector-h3">Get the unbeatable CityRunner User experience on your iphone/ iPad.</p>
                       <a href="https://apps.apple.com/app/cityrunner-ltd/id1597361637" target="_blank" rel="noopener noreferrer" className="normal"><p className="vector-p">Go to App Store <img src={rightArrow} alt="arrow" className="arrow"/></p></a>
                    </div>
                </div>        
                <div className="sub-div">
                    <img src={CityIcon} alt="biker" className="vector"/>
                    <div className="vector-text">
                        <h3 className="vector-h2">Download on Android</h3>
                        <p className="vector-h3">Get the unbeatable CityRunner User experience on Android.</p>
                        <a href="https://play.google.com/store/apps/details?id=com.omoruyiohuoba.CITYRUNNERMOBILE" target="_blank" rel="noopener noreferrer" className="normal"><p className="vector-p">Go to Play Store <img src={rightArrow} alt="arrow" className="arrow"/></p></a>
                    </div>
                </div>                 
            </div>

            <div className="all-second-container">

            <h1  className="wwa-h1-2">RiderRunner Apps</h1>
                <br/>
          
                <div className="sub-div">
                    <img src={RiderIcon} alt="biker" className="vector"/>
                    <div className="vector-text">
                        <h3 className="vector-h2">Download on iOS</h3>
                        <p className="vector-h3">Get the unbeatable RiderRunner Rider experience on your iphone/ iPad.</p>
                       <a href="https://apps.apple.com/app/riderrunner-deliveries/id1597365186" target="_blank" rel="noopener noreferrer" className="normal"><p className="vector-p">Go to App Store <img src={rightArrow} alt="arrow" className="arrow"/></p></a>
                    </div>
                </div>        
                <div className="sub-div">
                    <img src={RiderIcon} alt="biker" className="vector"/>
                    <div className="vector-text">
                        <h3 className="vector-h2">Download on Android</h3>
                        <p className="vector-h3">Get the unbeatable RiderRunner Rider experience on Android.</p>
                        <a href="https://play.google.com/store/apps/details?id=com.omoruyiohuoba.RIDERRUNNERMOBILE" target="_blank" rel="noopener noreferrer" className="normal"><p className="vector-p">Go to Play Store <img src={rightArrow} alt="arrow" className="arrow"/></p></a>
                    </div>
                </div>                 
            </div>
        </div>
    ) 
} 
 
export default AllApps;