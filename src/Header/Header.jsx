import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Logoicon from "../Image/logo-icon.png";
import Logotext from "../Image/logo-text.png";
import Logolight from "../Image/logo-light-text.png";

function Header(props) {
   const { user } = useContext(AuthContext);
   const { loading, error, dispatch } = useContext(AuthContext);

   const handleLogout = () => {
      dispatch("LOGOUT");
      localStorage.removeItem("user");
   };

   return (
      <header className="topbar" data-navbarbg="skin6">
         <nav className="navbar top-navbar navbar-expand-md">
            <div className="navbar-header" data-logobg="skin6">
               <a
                  className="nav-toggler waves-effect waves-light d-block d-md-none"
                  href="#"
               >
                  <i className="ti-menu ti-close"></i>
               </a>
               <div className="navbar-brand">
                  <Link to="/">
                     {/* <b className='logo-icon'>
								<img
									src={Logoicon}
									alt='homepage'
									className='dark-logo'
								/>
								<img
									src={Logoicon}
									alt='homepage'
									className='light-logo'
								/>
							</b> */}
                     <span className="logo-text">
                        {/* <img
									src={Logotext}
									alt='homepage'
									className='dark-logo'
								/>
								<img
									src={Logolight}
									className='light-logo'
									alt='homepage'
								/> */}
                        <span>Admin Page</span>
                     </span>
                  </Link>
               </div>
               {/* <a
						className='topbartoggler d-block d-md-none waves-effect waves-light'
						href='#'
						data-toggle='collapse'
						data-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<i className='ti-more'></i>
					</a> */}
            </div>
            <div
               className="navbar-collapse collapse"
               id="navbarSupportedContent"
            >
               <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
                  <li className="nav-item dropdown">
                     {/* <a
								className='nav-link dropdown-toggle'
								href='#'
								id='navbarDropdown'
								role='button'
								data-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'>
								<i data-feather='settings' className='svg-icon'></i>
							</a> */}
                     <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                     >
                        <a className="dropdown-item" href="#">
                           Action
                        </a>
                        <a className="dropdown-item" href="#">
                           Another action
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                           Something else here
                        </a>
                     </div>
                  </li>
               </ul>
               <ul className="navbar-nav float-right">
                  <li className="nav-item">
                     <Link to="/login" className="nav-link">
                        <span className="ml-2 d-none d-lg-inline-block">
                           <span>Login</span>
                        </span>
                     </Link>
                  </li>
                  <li className="nav-item dropdown">
                     <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                     >
                        {/* <img
									src='../assets/images/users/IMG_6225.jpg'
									alt='user'
									className='rounded-circle'
									width='40'
								/> */}
                        <span className="ml-2 d-none d-lg-inline-block">
                           <span>Hello,</span>{" "}
                           <span className="text-dark">
                              {user ? user.email : ""}
                           </span>{" "}
                           <i
                              data-feather="chevron-down"
                              className="svg-icon"
                           ></i>
                        </span>
                     </a>
                     <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                        <a className="dropdown-item" onClick={handleLogout}>
                           <i
                              data-feather="power"
                              className="svg-icon mr-2 ml-1"
                           ></i>
                           Logout
                        </a>
                     </div>
                  </li>
               </ul>
            </div>
         </nav>
      </header>
   );
}

export default Header;
