import React from "react";
import NavBar from "../NavBar";

const FAQs = () => {
    return( 
        <div id="toppage4">
            <NavBar /> 
            <div className="whoweare-div">
            <h1 className="whoweare-h1">Frequently Asked Questions</h1>
            </div>

            <div className="important-div">

            <div className="wwa">
            <h2 className="wwa-h1">Q: How can I make complaints/enquiries?</h2>
            <br/>
            <p>A: Please call (+234) 809 396 3988 or send an email to info@cityrunnerltd.com to contact us.</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: What is CityRunner?</h2>
            <br/>
            <p>A: CityRunner is a company that offers online deliveries and logistics services in Lagos, Nigeria.</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: How do I order/make a delivery?</h2>
            <br/>
            <p>A: Sign up as a user via this website and log in to your dashboard to place an order/delivery.</p>
            </div>

             
            <div className="wwa">
            <h2 className="wwa-h1">Q: Where do you deliver to?</h2>
            <br/>
            <p>A: At the moment, we only deliver within Lagos and also select locations at the outskirts of Lagos such as Mowe, Arepo, Epe etc.</p>
            </div> 

            <div className="wwa">
            <h2 className="wwa-h1">Q: How long does it take to deliver</h2>
            <br/>
            <p>A: All deliveries are made within 24 hours. Also, deliveries are made everyday of the week except Sunday.</p>
            </div>

                               
            <div className="wwa">
            <h2  className="wwa-h1">Q: What's the price for delivery</h2>
            <br/>
            <p>A: The price varies on the weight and distance. Check the "Prices" page for the exact price. We assure the most affordable prices in Lagos.</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: How do I pay for an order/ delivery</h2>
            <br/>
            <p>A: After you have inputed your order details, you will be able to pay directly online via debit/card or bank transfer. In addition, you can also pay directly using our payment page with the link https://paystack.com/pay/cityrunnerltd</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: How do I get a CityRunner account?</h2>
            <br/>
            <p>A: Sign up as a user in order to get a CityRunner account.</p>
            </div>

    {/*
            <div className="wwa">
            <h2 className="wwa-h1">Q: Who do I contact if I have a problem ordering online or in the case of a damaged/delayed  delivery</h2>
            <br/>
            <p>A: Reach out to us at cityrunnerltd@gmail.com or call us to make a complaint at (+234) 809 396 3988.</p>
            </div>
    */}
            <div className="wwa">
            <h2 className="wwa-h1">Q: Can I track my delivery</h2>
            <br/>
            <p>A: Details on all orders from pickup or drop-off, transit-to-destination and delivery status will be tracked in on the user dashboard.</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: How do I know if my order is confirmed</h2>
            <br/>
            <p>A: You will receive a confirmation email when your order has been made succesfully. Also, you will be able to see if CityRunner has received your order via your dashboard.</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: How do I access my delivery history</h2>
            <br/>
            <p>A: Log in to your CityRunner dashboard and navigate to "delivered" section in the navigation bar.</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: How do I partner with CityRunner as a business</h2>
            <br/>
            <p>A: Fill and submit the form on the "Become a partner" page. It can be accessed from the home page or the footer of the website.</p>
            </div>

            <div className="wwa">
            <h2 className="wwa-h1">Q: How do I become a Runner</h2>
            <br/>
            <p>A: Submit your details to us using the "Sign up Runner" link via the navigation bar or the footer.</p>
            </div>

            </div>

            
           
        </div>
    )
}

export default FAQs;