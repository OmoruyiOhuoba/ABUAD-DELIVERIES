import React from "react";
import googleplay from "../../assets/googleplay.png";
import appstore from "../../assets/appstore.jpg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import linkedin from "../../assets/linkedin.svg";
import { Link } from "react-router-dom";
import Logo2 from "../../assets/logo-4.png";

const Footer = () => {


    return(
        <div className="footer">
            <div className="below-footer">
            <p className="last">© {new Date().getFullYear()} ABUAD Deliveries Ltd. All Rights Reserved.</p>            </div>

        </div>
    )
}

export default Footer;