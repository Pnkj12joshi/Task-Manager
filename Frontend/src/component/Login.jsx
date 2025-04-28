import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [country, setcountry] = useState("");
  const [isLogin, setIsLogin] = useState(true); // true = Login form, false = Signup form

  // Logic for login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem("token",data.token);
      console.log(data.token);

      if (data) {
        navigate("/dashboard");
      }
      setemail("");
      setpassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Logic for signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        country,
      });

      const data = response.data;
      localStorage.setItem("token",data.token);
      console.log(data);

      if (data) {
        navigate("/dashboard");
      }
      setname("");
      setemail("");
      setpassword("");
      setcountry("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-blue-300 flex justify-center items-center h-screen w-screen">
      <div className="bg-white w-[300px] min-h-[400px] p-6 rounded-xl shadow-lg">
        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Signup"}
          </h1>

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {!isLogin && (
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            {isLogin ? "Login" : "Signup"}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all duration-200"
          >
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
