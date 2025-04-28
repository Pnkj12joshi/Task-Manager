import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date_of_creation, setdatecreation] = useState("");
  const [date_of_complition, setdatecomplition] = useState("");
  const [status, setStatus] = useState("");

  const Addtask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");  
      const response = await axios.post("http://localhost:5000/task/create", {
        title,
        description,
        date_of_creation,
        date_of_complition,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(data);
    navigate("/tasklist");
     setTitle("");
     setDescription("");
     setdatecreation("");
     setdatecomplition("");
     setStatus("");

    }
     catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-blue-400 w-screen h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-black text-4xl font-bold mb-6">TASK MANAGER</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={Addtask} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-gray-600 mb-1">Date of Creation</label>
          <input
            type="date"
            placeholder="Date of Creation"
            value={date_of_creation}
            onChange={(e) => setdatecreation(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-gray-600 mb-1">Date of Completion </label>
          <input
            type="date"
            placeholder="Date of Completion"
            value={date_of_complition}
            onChange={(e) => setdatecomplition(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Create Task
          </button>
        </form>
      </div>
      <button className="bg-green-400 w-[100px] p-2 rounded-xl flex justify-center items-center mt-2 font-semibold cursor-pointer" onClick={()=>navigate("/tasklist")}>Task List</button>
    </div>
  );
};

export default Dashboard;
