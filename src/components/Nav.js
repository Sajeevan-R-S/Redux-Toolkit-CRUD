import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Nav = () => {


  const navigate = useNavigate();
  const users = useSelector((state) => state.userDetail.users)

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      backgroundColor: "blue",
      color: "white",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
    }}>
      <h3 onClick={() => navigate('/') }>RT SM</h3>
      <h4>All Users ({users.length}) </h4>
    </div>
  )
}

export default Nav