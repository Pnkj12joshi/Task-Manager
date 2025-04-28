import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Tasklist = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const readTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/task/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    readTask();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/task/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedStatus(task.status);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/task/update/${editTask._id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
          status: updatedStatus,
          date_of_creation: new Date(),
          date_of_completion: new Date(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedTask = response.data;
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
      setEditTask(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setEditTask(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      <h1 className="text-center mb-8 text-blue-700 text-5xl font-extrabold drop-shadow-lg">
        My Task List
      </h1>
      
      {tasks.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No tasks found!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-300 rounded-2xl p-6 shadow-md bg-white hover:bg-blue-50 transition-all duration-300 flex justify-between items-center"
            >
              <div className="flex-1">
                <h2 className="mb-2 text-2xl text-purple-800 font-bold">
                  {task.title}
                </h2>
                <p className="mb-2 text-gray-700">{task.description}</p>
                <div className="flex items-center gap-4">
                  <p className="text-sm">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-white text-xs ${
                        task.status.toLowerCase() === "completed"
                          ? "bg-green-500"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Created:</strong> {new Date(task.date_of_creation).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 ml-6">
                <FaEdit
                  size={22}
                  className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-200"
                  onClick={() => openEditModal(task)}
                />
                <FaTrash
                  size={22}
                  className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200"
                  onClick={() => handleDelete(task._id)}
                />
              </div>
            </div>
          ))}
          
          <div className="flex w-full p-5 justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-500 p-2 px-6 rounded-lg text-white font-semibold hover:bg-green-600 transition duration-300"
            >
              Create
            </button>
            <button
              onClick={handlelogout}
              className="bg-red-500 p-2 px-6 rounded-lg text-white font-semibold hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Modal for Editing */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-2xl relative">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
              Edit Task
            </h2>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Description"
              rows="3"
              className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="w-full p-3 mb-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasklist;
