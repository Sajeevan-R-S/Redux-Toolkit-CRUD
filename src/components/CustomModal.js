import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../store/userDetailSlice";

const CustomModal = ({ id, setShowPopup, viewUser, updateUser }) => {
  const [updateData, setUpdateData] = useState();
  const { users, loading } = useSelector((state) => state.userDetail);

  const dispatch = useDispatch()

  const user = users?.filter((user) => user.id === id);

  console.log("USER: ", updateData);

  useEffect(() => {
    const selectedUser = users.filter((user) => user.id === id);
    setUpdateData(selectedUser[0]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(updateData));
    setShowPopup(false)
  };

  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, .5)",
        zIndex: 99,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        fontSize: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px",
          height: "400px",
          width: "300px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {viewUser && (
          <>
            <h4>Name: {user[0].name}</h4>
            <p>Email: {user[0].email} </p>
            <p>Age: {user[0].age} </p>
            <p>Gender: {user[0].gender} </p>
            <button
              style={{
                color: "white",
                backgroundColor: "blue",
                borderRadius: "5px",
                border: "none",
                outline: "none",
                padding: "5px",
                width: "90%",
                fontSize: "18px",
              }}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </>
        )}
        {updateUser && (
          <>
            <h4>Update details below</h4>
            <div>
              <label>Name: </label>
              <input 
                type="text" 
                name="name" 
                value={updateData?.name} 
                onChange={handleInputChange}
                required 
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="text"
                name="email"
                value={updateData?.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Age: </label>
              <input type="text" name="age" value={updateData?.age} onChange={handleInputChange} required />
            </div>
            <div>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={updateData?.gender === "male"}
                onChange={handleInputChange}
                required
              />
              <label> Male</label>
            </div>
            <div>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={updateData?.gender === "female"}
                onChange={handleInputChange}
                required
              />
              <label> Female</label>
            </div>
            <button
            onClick={handleSubmit}
              style={{
                color: "white",
                backgroundColor: "blue",
                borderRadius: "5px",
                border: "none",
                outline: "none",
                padding: "5px",
                width: "90%",
                fontSize: "18px",
              }}
            >
              Submit
            </button>
            <button
              style={{
                color: "white",
                backgroundColor: "blue",
                borderRadius: "5px",
                border: "none",
                outline: "none",
                padding: "5px",
                width: "90%",
                fontSize: "18px",
              }}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomModal;
