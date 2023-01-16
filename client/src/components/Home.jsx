import React from "react";
import LandingPageImage from "../assets/landing-page-2.JPG";
import biker from "../assets/biker.svg";
import phone from "../assets/location.svg";
import building from "../assets/building.svg";
import rightArrow from "../assets/right-arrow.svg";
import friendsEating from "../assets/friends-eating.jpg";
import happyDelivery from "../assets/happy-delivery.jpg"; 
import envelope from "../assets/envelope.png";
import shoeBox from "../assets/shoe-box.png";
import shoppingBag from "../assets/shopping-bag.png";
import box from "../assets/box.png";
import deliveryBag from "../assets/delivery-bag.png";
import weight from "../assets/weight.svg";
import dimensions from "../assets/package.svg";
import arrow1 from "../assets/arrow-1.png";
import arrow2 from "../assets/arrow-2.png";
import arrow3 from "../assets/arrow-3.png";
import arrow4 from "../assets/arrow-4.png";
import NavBar from "./Layout/NavBar";
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <NavBar />

            <div className="first-container">
                <div className="first-text">
                    <p className="first-p fc">HI, LET'S MAKE A</p>
                    <p className="second-p fc"><div className="inner"><span>
                                                    FAST FOOD<br/>
                                                    CLOTHING<br/>
                                                    GADGETS<br/>
                                                    FILES<br/>
                                                    MEDICINE<br/>
                                                    COSMETICS<br/>
                                                    FOOT WEAR<br/>
                                                    JEWELRY                                              
                                                    </span>
                                                </div>
                    </p>
                    <p className="third-p fc">DELIVERY</p>
                    <br/>                      
                 {/*   <p className="fourth-p fc">Li li la this is just dummy text as this is stil indeve lopmentso just be now it is stillbeingprogramnn edsoitisr ubOnihjvgc</p>*/}
                 <p className="fourth-p fc">Online delivery and logistics services web application. Time is money, we save you both.</p>
                    <br/>
                    <Link to="/signupuser"><button className="first-button">ORDER</button></Link>
                    <br className="noshow"/>

                </div>
                <div className="toright">
                    <br/> 
                    <br/>
                    <img src={LandingPageImage} alt="landing-page" className="landing-page-img"/>
                    <hr/>
                </div>
            </div>

            <div className="second-container">
                <div className="sub-div">
                    <img src={biker} alt="biker" className="vector"/>
                    <div className="vector-text">
                        <h3 className="vector-h2"><b>Become a Driver</b></h3>
                        <p className="vector-h3">Earn a competitive salary delivering for the leading delivery platform in ABUAD.</p>
                       <Link to="/riderrecruitment" className="normal"><p className="vector-p">Start Delivering <img src={rightArrow} alt="arrow" className="arrow"/></p></Link>
                    </div>
                </div>  
                <div className="sub-div">
                    <img src={phone} alt="biker" className="vector"/>
                    <div className="vector-text">
                        <h3 className="vector-h2">Try the App</h3>
                        <p className="vector-h3">Get the unbeatable ABUAD Deliveries User experience on our mobile app (coming soon).</p>
                       <a href="https://www.google.com/search?q=abuad+deliveries+mobile+app&oq=abuad+deliveries+mobile+app&aqs=chrome..69i57j69i61.6889j0j7&sourceid=chrome&ie=UTF-8" rel="noopener noreferrer" className="normal"><p className="vector-p">Get the app <img src={rightArrow} alt="arrow" className="arrow"/></p></a>
                    </div>
                </div>        
                <div className="sub-div">
                    <img src={building} alt="biker" className="vector"/>
                    <div className="vector-text">
                        <h3 className="vector-h2">Become a Partner</h3>
                        <p className="vector-h3">Grow your business and reach new heights by partnering with us.</p>
                        <Link to="/becomeapartner" className="normal"><p className="vector-p">Sign up your company <img src={rightArrow} alt="arrow" className="arrow"/></p></Link>
                    </div>
                </div>                 
            </div>

            <div className="third-container">
                <div className="picture-div one">
                    <img src={happyDelivery} alt="" className="picture-div-img"/>
                    <br/>
                    <br/>
                    <br className="reduce-set4"/>
                    <br className="reduce-set4"/>
                    <br className="reduce-set0"/>
                    <br className="reduce-set0"/>
                    <br className="reduce-set1" />
                    <br className="reduce-set1"  />
                    <br className="reduce-set1" />
                    <br className="reduce-set1"  />
                    <br className="reduce-set2"  />
                    <br className="reduce-set2"  />
                    <br className="reduce-set2"  />
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br className="none"/>
                    <br/>






                    <div className="picture-div-text">
                        <div className="writings">
                        <h3 className="picture-div-h3">Happiness in every box</h3>
                        <p className="picture-div-p">Deliver anything. From your favourite outfits and gadgets to documents and game consoles you love, get it all delivered from outside school into ABUAD and vice versa.</p>
                        <br/>
                        <a href="https://drive.google.com/file/d/1UKgl3LlcsRoFq7IhGR8evzOeMsl9hfYj/view?usp=sharing" className="normal"><button className="second-button">Prices </button></a>
                        <br/>
                        <br/>
                        </div>

                        <br/>
                        <br/>
                        <br/>
                    </div>

                </div>
                <div className="picture-div-two">
                    <img src={friendsEating} alt="friends-eating" className="picture-div-img-2"/>
                    <div className="picture-div-text-2">
                        <div className="writings-2">
                    <h3 className="picture-div-h3-2">You know you want it. </h3>
                    <h3 className="picture-div-h3-2">We can get it. </h3>
                        <p className="picture-div-p-2">Get it delivered right to your door. Order food from your favourite restaurants and always eat it while it's hot.</p>
                        <br/>
                        <Link to="/signupuser" className="normal"><button className="second-button">Order</button></Link>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>

            </div>
            <div className="fourth-container">
                <h1>Time is money. We save you both.</h1>
                <br/>
                <br/>
                <p className="time">Is it the right size? Ship it fast with ABUAD Deliveries!</p>
                
                <div className="visual">


                    <div className="first-level">
                        <img src={shoppingBag} alt="shopping bag" className="shoppingbag"/>
                        <img src={arrow1} alt="arrow 1" className="arrow1"/>
                        <img src={arrow2} alt="arrow 2" className="arrow2"/>
                        <img src={box} alt="box" className="box"/>
                    </div>
                    <div className="second-level">

                        <img src={deliveryBag} alt="delivery bag"  className="deliverybag"/>
                    
                    </div>
                    <div className="third-level">

                        <img src={envelope} alt="envelope" className="envelope"/>
                        <img src={arrow4} alt="arrow 4" className="arrow4"/>
                        <img src={arrow3} alt="arrow 3" className="arrow3"/>
                        <img src={shoeBox} alt="shoe-box" className="shoebox"/>
                   
                    </div>
               
            
                </div>

                <div className="measurement">

                    <div className="first-section">
                        <img src={dimensions} alt="dimensions" className="dimension"/>
                           
                        <div className="dimension-text">
                            <p className="maxsize">Max size allowed</p>
                            <b><p className="fivem">20" x 20" x 20"</p></b>
                        </div>
                        
                    </div>

                    <div className="second-section">
                        <img src={weight} alt="package" className="kg"/>

                        <div className="kg-text">
                            <p className="maxweight">Max weight</p>
                            <b><p className="tfkg">25kg</p></b>
                        </div>
                     
                    </div>
                    

           
                </div>

            </div>
           
        </div>
    )

}

export default Home;