import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"


import { OfferIcon, ExploreIcon, PersonOutlineIcon } from '../../assets'
const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const pathMathch = (route) => {
        if(location.pathname === route) {
            return true
        }
    }
    return (
        <footer>
            <div className="navbar">
                <nav className="navbarNav">
                    <ul className="navbarListItems">
                        <li className="navbarListItem"
                            onClick={() => navigate("/offers")}
                        >
                            <OfferIcon 
                                fill={pathMathch("/offers") ? "#2c2c2c" : "#8f8f8f"} 
                                width="36px" 
                                height="36px"
                            />
                            <p
                                className={pathMathch("/offers") ? "navbarListItemNameActive" : "navbarListItemName"}
                            >Offers</p>
                        </li>
                        <li className="navbarListItem"
                            onClick={() => navigate("/")}
                        >
                            <ExploreIcon 
                                fill={pathMathch("/") ? "#2c2c2c" : "#8f8f8f"} 
                                width="36px" 
                                height="36px"
                            />
                            <p
                                className={pathMathch("/") ? "navbarListItemNameActive" : "navbarListItemName"}
                            >Explore</p>
                        </li>
                        <li className="navbarListItem"
                            onClick={() => navigate("/profile")}
                        >
                            <PersonOutlineIcon 
                                fill={pathMathch("/profile") ? "#2c2c2c" : "#8f8f8f"} 
                                width="36px" 
                                height="36px"
                            />
                            <p
                                className={pathMathch("/profile") ? "navbarListItemNameActive" : "navbarListItemName"}
                            >Profile</p>
                        </li>
                    </ul>
                </nav>
            </div>    
        </footer>
    )
}

export default Navbar