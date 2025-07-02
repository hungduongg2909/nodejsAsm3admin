import "./Login.css";
import React, { useState, useEffect, useContext } from "react";
import { useHistory  } from 'react-router-dom';
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

const bcrypt = require("bcryptjs");

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [user, setUser] = useState([]);
   const { loading, error, dispatch } = useContext(AuthContext);
   const history = useHistory();

   useEffect(() => {
      const fetchData = async () => {
         const response = await UserAPI.getAllData();
         console.log(response);
         setUser(response);
      };

      fetchData();
   }, []);

   const handleSubmit = async () => {
      const findUser = user.find((value) => {
         return value.email === email;
      });

      // if (findUser && findUser.password === password) {
      // 	dispatch({ type: 'LOGIN_SUCCESS', payload: findUser });
      // 	// navigate("/")
      // } else {
      // 	alert("Email or password wrong!")
      // }

      if (findUser) {
         const isMatch = await bcrypt.compare(password, findUser.password);

         if (isMatch) {
            if (findUser.role !== "admin" && findUser.role !== "consultant") {
               alert("You are not allowed to access admin page!");
               return;
            }

            dispatch({ type: "LOGIN_SUCCESS", payload: findUser });
            // localStorage.setItem("user", JSON.stringify(findUser));
            history.push("/");
            window.location.reload();
         } else {
            alert("Email or password wrong!");
         }
      } else {
         alert("Email or password wrong!");
      }

      // if (findUser.password !== password) {
      // 	setErrorPassword(true);
      // 	return;
      // } else {
      // 	setErrorPassword(false);

      // 	localStorage.setItem('id_user', findUser._id);

      // 	localStorage.setItem('name_user', findUser.fullname);

      // 	const action = addSession(localStorage.getItem('id_user'));
      // 	dispatch(action);

      // 	setCheckPush(true);
      // }
   };

   return (
      <div className="page-wrapper">
         <div className="page-breadcrumb">
            <div className="row">
               <div class="login">
                  <div class="heading">
                     <h2>Sign in</h2>
                     <form action="#">
                        <div className="input-group input-group-lg">
                           <span className="input-group-addon">
                              <i className="fa fa-user"></i>
                           </span>
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                           />
                        </div>

                        <div className="input-group input-group-lg">
                           <span className="input-group-addon">
                              <i className="fa fa-lock"></i>
                           </span>
                           <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>

                        <button
                           type="button"
                           className="float"
                           onClick={handleSubmit}
                        >
                           Login
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
