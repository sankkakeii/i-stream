import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


axios.defaults.withCredentials = true;

const Home = () => {
	
	return (
  
        <><div class="shim"></div><header class="tc-header">
            <div>
                <div class="row">
                    <div class="col-xs-2">
                        {/* <a href="https://www.tunecore.com"><img src="https://www.tunecore.com/wp-content/themes/tunecore/images/tc_logo_white_blue_bg.png"></></a> */}
                        iStream
                    </div>
                </div>
                <div class="tunecore-main-menu col-xs-10 text-right visible-xl">
                    <div class="menu-container">
                        <ul>
                            <li id="menu-item-50589" class="language-menu-item menu-item menu-item-type-custom menu-item-object-custom menu-item-50589"><a href="#">Language</a></li>
                            <li id="menu-item-32816" class="btn-login menu-item menu-item-type-custom menu-item-object-custom menu-item-32816"><a href="127.0.0.1:3000/login">Login</a></li>
                            <li id="menu-item-32829" class="sign-up btn-sign-up menu-item menu-item-type-custom menu-item-object-custom menu-item-32829"><a href="127.0.0.1:3000/sign-up">Sign Up</a></li>
                        </ul>
                    </div>
                </div>

                <div class="tunecore-main-menu col-xs-10 text-right visible-lg hidden-xl visible-md">
                    <ul>
                        <li id="menu-item-50578" class="btn-login menu-item menu-item-type-custom menu-item-object-custom menu-item-50578"><a href="https://web.tunecore.com/login">Login</a></li>
                        <li id="menu-item-50579" class="sign-up btn-sign-up menu-item menu-item-type-custom menu-item-object-custom menu-item-50579"><a href="https://web.tunecore.com/signup">Sign Up</a></li>
                    </ul>
                </div>
                <div class="col-xs-10 text-right visible-xs visible-sm" style="position: fixed; right: 60px; top:0;">
                    <div class="menu-container"><ul><li id="menu-item-32833" class="btn-login menu-item menu-item-type-custom menu-item-object-custom menu-item-32833"><a href="https://web.tunecore.com/login?check=1">Login</a></li>
                        <li id="menu-item-32831" class="sign-up btn-sign-up menu-item menu-item-type-custom menu-item-object-custom menu-item-32831"><a href="https://web.tunecore.com/signup">Sign Up</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </header></>
  );

};

export default Home;
