import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  searchUser,
  showUser,
} from "../store/userDetailSlice";
import CustomModal from "../components/CustomModal";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const [searchData, setSearchData] = useState("");
  const [radioFilter, setRadioFilter] = useState("");

  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [viewUser, setViewUser] = useState(false);

  const dispatch = useDispatch();

  const { users, loading, searchItem } = useSelector(
    (state) => state.userDetail
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  console.log("form data: ", formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    setFormData({
      name: "",
      email: "",
      age: "",
      gender: "",
    });
  };

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  console.log("Search Item: ", searchItem);

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}
    >
      {loading ? (
        <h1> Loading...</h1>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "70%",
              padding: "20px",
              borderBottom: "1px solid blue",
            }}
          >
            {showPopup && (
              <CustomModal
                id={id}
                updateUser={updateUser}
                viewUser={viewUser}
                setShowPopup={setShowPopup}
              />
            )}
            {showPopup && (
              <CustomModal
                id={id}
                updateUser={updateUser}
                viewUser={viewUser}
                setShowPopup={setShowPopup}
              />
            )}
            <h1>Enter details below</h1>
            <div>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Age: </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={formData.gender === "male"}
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
                checked={formData.gender === "female"}
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
                width: "250px",
              }}
            >
              Submit
            </button>
          </div>
          <h2>Entered details</h2>
          <input
            style={{ width: "250px", padding: "10px" }}
            type="text"
            name="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search User"
          />
          <div style={{display: "flex", flexDirection: "row", gap: "40px"}}>
            <div>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={radioFilter === ""}
                onChange={() => setRadioFilter("")}
                required
              />
              <label> All</label>
            </div>
            <div>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={radioFilter === "male"}
                onChange={(e) => setRadioFilter(e.target.value)}
                required
              />
              <label> Male</label>
            </div>
            <div>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={radioFilter === "female"}
                onChange={(e) => setRadioFilter(e.target.value)}
                required
              />
              <label> Female</label>
            </div>
          </div>
          {users &&
            users
              .filter((user) => {
                if (searchItem?.trim() === "") {
                  return user;
                } else {
                  return user.name
                    .toLowerCase()
                    .includes(searchItem?.toLowerCase());
                }
              })
              .filter((user) => {
                if(radioFilter === "male"){
                  return user.gender === radioFilter
                } else if(radioFilter === "female"){
                  return user.gender === radioFilter
                } else return user
              })
              .map((user) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "40%",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid blue",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                  >
                    <h4>Name: {user.name}</h4>
                    <p>Age: {user.age} </p>
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "blue",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        padding: "5px",
                      }}
                      onClick={() => {
                        setViewUser(true);
                        setUpdateUser(false);
                        setShowPopup(true);
                        setId(user.id);
                      }}
                    >
                      View more details
                    </button>
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "green",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        padding: "5px",
                      }}
                      onClick={() => {
                        setViewUser(false);
                        setUpdateUser(true);
                        setShowPopup(true);
                        setId(user.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        padding: "5px",
                      }}
                      onClick={() => dispatch(deleteUser(user.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </>
      )}
    </div>
  );
};

export default Home;
