import React from 'react'
import logo from "../logo.png"
import { Link } from 'react-router-dom'
function Nav2() {
  return (
    <div className='nav2'>
      <div>
        <Link to= "/">
        <img src={logo} alt="" />
        <span>TARUN</span>
        </Link>
        
      </div>
      <div>
        <span>
          <Link to ="/About">
          About
          </Link>
        </span>
        <span><Link to ="/Contact">
          Contact
          </Link></span>
      </div>
    </div>
  )
}

export default Nav2
