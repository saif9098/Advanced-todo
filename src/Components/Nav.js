import React from 'react'
import logo from '../images/logo.png'
import icon from '../images/Icon.png'
import { useInfo } from '../context/nav'

const Nav = () => {
  const [key,setKey]=useInfo();

  const handleBar =()=>{
    setKey({...key, bar:!key.bar})
  }

  const handleList =()=>{
    setKey({...key, list:!key.list})
  }
  const handleDark =()=>{
    setKey({...key, dark:!key.dark})
  }
  return (
    <nav >
    <div className="d-flex justify-content-between align-items-center flex-wrap px-5 fs-5" id={key.dark? "navbar2":"navbar"}>
    <div className="d-flex gap-3 flex-wrap align-items-center">
    <i class= "fa-solid fa-bars"
    onClick={handleBar}
    style={{cursor:"pointer"}}
   />
    <img src={logo} alt="logo" />
    </div>
    <div className="d-flex gap-4 flex-wrap">
    <i class="fa-solid fa-magnifying-glass"></i>
    {key.list?(<img src={icon}
    onClick={handleList}
    style={{cursor:"pointer"}}
    />): ( <i class= "fa-solid fa-list"
      onClick={handleList}
      style={{cursor:"pointer"}}
     />)}
    
    <i class={key.dark ? "fa-regular fa-sun" : "fa-regular fa-moon"}
       onClick={handleDark}
       style={{cursor:"pointer"}}
      />
    </div>
    </div>
    </nav>
  )
}

export default Nav
