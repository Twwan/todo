import React from "react";
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className='headerLeft'>
                <Link to="/lists/1" style={{textDecoration: "none"}}><span>Какой-то туду</span></Link>
            </div>
        </div>
    )
}

export default Header