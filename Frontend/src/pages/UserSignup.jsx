import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [userData, setUserData] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstname: firstname,
        lastname: lastname 
      },
      email: email,

    })
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <form onSubmit={submitHandler} action="">
           <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
            required
            value={firstname}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
            className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg "
            type="text"
            placeholder="First Name"
          />
          <input
            required
            value={lastname}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
            className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg "
            type="text"
            placeholder="Last Name"
          />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg "
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg "
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            type="password"
            placeholder="password"
          />
          <button type="submit" className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base">
            SignUp
          </button>
          <p className="text-center">
            Already have a account?
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
       <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Vroom and its affiliates to the number provided</p>
      </div>
    </div>
  );
};

export default UserSignup;
