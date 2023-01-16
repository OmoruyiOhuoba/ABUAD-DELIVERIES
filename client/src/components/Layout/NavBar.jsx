import React, { useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import Logo from "../../assets/logo-2.png";
import Globe from "../../assets/globe.svg";
import Search from "../../assets/loupe.svg";
import {Link} from "react-router-dom";

const NavBar = () => {
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);

  const props = useSpring({
    opacity: open ? 1 : 0,
    zIndex: open ? 1 : -1,
    minHeight: open ? '50%' : '0%',
    config: { ...config.molasses, duration: 450 },
  });

  return (
    <div className='sticky'>
      <header className='header'>
          <a href="/"><img src={Logo} className= "logo" alt="logo"/></a>
        <nav>
          <ul className='nav-links'>
            <li className='nav-item'>
              <Link
                to='/whoweare'
                onClick={() => setActive('whoweare')}
                className={active === 'whoweare' ? 'active' : null}
              >
                ABOUT US
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/prices'//https://drive.google.com/file/d/1UKgl3LlcsRoFq7IhGR8evzOeMsl9hfYj/view?usp=sharing
                onClick={() => setActive('prices')}
                className={active === 'prices' ? 'active' : null}
              >
                PRICES
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/signinuserorrider'
                onClick={() => setActive('sign-in')}
                className={active === 'sign-in' ? 'active' : null}
              >
                SIGN IN
              </Link>
            </li>
            <li className='nav-item cont'>
              <Link
                to='/signupuserorrider'
                onClick={() => setActive('sign-up')}
                className={active === 'sign-up' ? 'active' : null}
              >
                SIGN UP 
              </Link>
            </li>
                       
          </ul>
          <div onClick={() => setOpen(!open)} className='hamburger'>
            <div className={open ? 'hamburger-icon none' : 'hamburger-icon'}>
              <span className="cross"></span>
              <span className="cross"></span>
            </div>
          </div>
        </nav>
        <animated.div style={props} className='menubar'>
          <ul className='menu-links'>
            <li className='nav-item dropped'>
              <Link
                to='/whoweare'
                onClick={() => setActive('whoweare')}
                className={active === 'whoweare' ? 'active' : null}
              >
                ABOUT US
              </Link>
            </li>
            <li className='nav-item dropped'>
              <Link
                to='/prices'
                onClick={() => setActive('prices')}
                className={active === 'prices' ? 'active' : null}
              >
                PRICES
              </Link>
            </li>
            <li className='nav-item dropped'>
              <Link
                to='/signinuserorrider'
                onClick={() => setActive('sign-in')}
                className={active === 'sign-in' ? 'active' : null}
              >
                SIGN IN
              </Link>
            </li>
            <li className='nav-item dropped'>
              <Link
                to='/signupuserorrider'
                onClick={() => setActive('sign-up')}
                className={active === 'sign-up' ? 'active' : null}
              >
                SIGN UP
              </Link>
            </li>
     
          </ul>
        </animated.div>
        <a href="https://www.google.com/search?q=ABUAD+Deliveries&biw=1280&bih=689&sxsrf=AJOqlzW6Bo1n8MzCoV3TsxKSQwWUKdaEAw%3A1673575133880&ei=3brAY9CbNf2mkdUPuoepiAs&ved=0ahUKEwiQ_u-aucP8AhV9U6QEHbpDCrEQ4dUDCA8&uact=5&oq=ABUAD+Deliveries&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCCEQoAE6CggAEB4QogQQsAM6CAgAEKIEELADOgQIIxAnOgUIABCRAjoFCC4QgAQ6CAguELEDEIMBOggILhCDARCxAzoICAAQgAQQsQM6CwguEIAEELEDEIMBOgQIABBDOgQILhBDOgoIABCABBCHAhAUOggIABCxAxCDAToECC4QJzoHCC4QsQMQQzoKCC4QxwEQrwEQQzoHCAAQsQMQQzoLCAAQgAQQsQMQgwE6BQgAEIAEOgYIABAWEB46BwghEKABEApKBAhBGAFKBAhGGABQ_gZY1SNg2yZoA3AAeACAAZwCiAHJFpIBBjAuMTQuMpgBAKABAcgBBMABAQ&sclient=gws-wiz-serp"><img src={Search} alt="search" className="nav-icon-1"/></a>
       <a href="https://www.google.com/search?q=ABUAD+Deliveries&biw=1280&bih=689&sxsrf=AJOqlzW6Bo1n8MzCoV3TsxKSQwWUKdaEAw%3A1673575133880&ei=3brAY9CbNf2mkdUPuoepiAs&ved=0ahUKEwiQ_u-aucP8AhV9U6QEHbpDCrEQ4dUDCA8&uact=5&oq=ABUAD+Deliveries&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCCEQoAE6CggAEB4QogQQsAM6CAgAEKIEELADOgQIIxAnOgUIABCRAjoFCC4QgAQ6CAguELEDEIMBOggILhCDARCxAzoICAAQgAQQsQM6CwguEIAEELEDEIMBOgQIABBDOgQILhBDOgoIABCABBCHAhAUOggIABCxAxCDAToECC4QJzoHCC4QsQMQQzoKCC4QxwEQrwEQQzoHCAAQsQMQQzoLCAAQgAQQsQMQgwE6BQgAEIAEOgYIABAWEB46BwghEKABEApKBAhBGAFKBAhGGABQ_gZY1SNg2yZoA3AAeACAAZwCiAHJFpIBBjAuMTQuMpgBAKABAcgBBMABAQ&sclient=gws-wiz-serp"><img src={Globe} alt="globe" className="nav-icon-2"/></a> 
      </header>
      <div className="below-header">
      <p className="below-p">nav</p>
      </div>
    </div>
  );
};

export default NavBar;




