import React, { useState } from 'react'
import Layout from '../Components/layout/Layout'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { useInfo } from '../context/nav';
import moment from 'moment';

const Assigned = () => {
  const [task, setTask] = useState("");
  const [taskInfo, setTaskInfo] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [important, setImportant] = useState(false);
  const [notification, setNotification] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [key]=useInfo();
 

  const handleAddTask = () => {
    if (!task || !deadline) {
      alert("Please provide both task and deadline!");
      return;
    }

    const newTask = {
      task,
      createdAt: new Date().toISOString(),
      deadline: deadline.toISOString(),
      important,
      notification,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTask("");
    setDeadline(null);
    setImportant(false);
  };
  const handleToggleCompleted = (index) => {
    const updatedTasks = tasks.map((t, i) => {
      if (i === index) {
        return { ...t, completed: !t.completed }; // Toggle the completed status
      }
      return t;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };
  const handleToggleImportant = (index) => {
    const updatedTasks = tasks.map((t, i) => {
      if (i === index) {
        return { ...t, important: !t.important }; // Toggle the completed status
      }
      return t;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Remove task by index
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskInfo(null); // Clear taskInfo if the deleted task was selected
  };
  return (
    <Layout>
  <div className="d-flex" style={{ width: "100%" }}>
    <div className='px-3' style={{ flex: 1, width: "auto",paddingTop: "33px" }}>
      <h6>todo <i className="fa-solid fa-down-long"></i></h6>
      <div id={key.dark? "addTask2":"addTask"}>
        <input
          type="text"
          className="taskinput"
          placeholder="Add A Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="d-flex justify-content-between flex-wrap mt-5">
          <div className="d-flex gap-4 flex-wrap fs-5">
            <i className={notification? "fa-solid fa-bell":"fa-regular fa-bell"}
              onClick={()=>setNotification(!notification)}
              style={{ cursor: "pointer" }}
            />
            <i className="fa-solid fa-rotate" style={{ cursor: "pointer" }}></i>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              dateFormat="yyyy-MM-dd"
              customInput={
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "19px",
                  }}
                >
                  <i className="fa-regular fa-calendar"></i>
                </button>
              }
            />
          </div>
          <button
            className="btn btn-outline-success btn-sm px-3"
            onClick={handleAddTask}
          >
            ADD TASK
          </button>
        </div>
      </div>
      {key.list ? (
        // List View
        <div style={{ width: "100%" }}>
          {tasks.map((t, index) => (
            <div
              key={index}
              className={key.dark?"d-flex justify-content-between align-items-center flex-wrap p-4 bg-black border fs-5":"d-flex justify-content-between align-items-center flex-wrap p-4 bg-white border fs-5"}
              style={{
                width: "100%",
                overflowX: "hidden", // Prevent horizontal scrollbar
              }}
            >
              <div className="d-flex gap-4 align-items-center">
                <input
                  type="checkbox"
                  checked={t.completed}
                  className="form-check-input pb-1"
                  onChange={() => handleToggleCompleted(index)}
                />
                <h5  onClick={() => setTaskInfo({...t, index:index})}>{t.task}</h5>
              </div>
              <i
                className={
                  t.important ? "fa-solid fa-star" : "fa-regular fa-star"
                }
                onClick={() => handleToggleImportant(index)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      ) : (
        // Flex View
        <div className="d-flex flex-wrap gap-3">
          {tasks.map((t, index) => (
            <div
              key={index}
              className={key.dark?"d-flex justify-content-between align-items-center flex-wrap p-4 bg-black border fs-5":"d-flex justify-content-between align-items-center flex-wrap p-4 bg-white border fs-5"}
              style={{ minWidth: "300px" }}
            >
              <div className="d-flex gap-4 align-items-center me-5">
                <input
                  type="checkbox"
                  checked={t.completed}
                  className="form-check-input pb-1"
                  onChange={() => handleToggleCompleted(index)}
                />
                <h5  onClick={() => setTaskInfo({...t, index:index})}>{t.task}</h5>
              </div>
              <i
                className={
                  t.important ? "fa-solid fa-star" : "fa-regular fa-star"
                }
                onClick={() => handleToggleImportant(index)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
    <div>
      {taskInfo && <div id="taskInfo">
        <div
       
        className="d-flex justify-content-between align-items-center flex-wrap p-3  border fs-5"
        style={{
          width: "100%",
          overflowX: "hidden", // Prevent horizontal scrollbar
        }}
      >
        <div className="d-flex gap-4 align-items-center">
          <input
            type="checkbox"
            checked={taskInfo.completed}
            className="form-check-input pb-1"
            onChange={() =>{handleToggleCompleted(taskInfo.index); taskInfo.completed=!taskInfo.completed;}}
          />
          <h5>{taskInfo.task}</h5>
        </div>
        <i
          className={
            taskInfo.important ? "fa-solid fa-star" : "fa-regular fa-star"
          }
          onClick={() => {handleToggleImportant(taskInfo.index); taskInfo.important=!taskInfo.important;}}
          style={{ cursor: "pointer" }}
        />
      </div>
        <div
       
        className="d-flex gap-3 align-items-center flex-wrap p-3  border fs-5"
        style={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        
          <h3>+</h3>
          <h5>  Add Step</h5>
      
      </div>
        <div
       
        className="d-flex gap-3 align-items-center flex-wrap p-3  border fs-5"
        style={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        
      <i className={taskInfo.notification? "fa-solid fa-bell":"fa-regular fa-bell"}
     onClick={()=>taskInfo.notification=!taskInfo.notification}
      style={{ cursor: "pointer" }}
    />
          <h5>  Set Reminder</h5>
      
      </div>
        <div
       
        className="d-flex gap-3 align-items-center flex-wrap p-3  border fs-5"
        style={{
          width: "100%",
          overflowX: "hidden", // Prevent horizontal scrollbar
        }}
      >
        
      <DatePicker
      selected={deadline}
      onChange={(date) => setDeadline(date)}
      dateFormat="yyyy-MM-dd"
      customInput={
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "19px",
          }}
        >
          <i className="fa-regular fa-calendar"></i>
        </button>
      }
    />
          <h5>Add Due Date</h5>
      
      </div>
      <div
       
        className="d-flex gap-3 align-items-center flex-wrap p-3  border fs-5"
        style={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        
      <i className="fa-solid fa-rotate" style={{ cursor: "pointer" }}></i>
          <h5>  Repeat</h5>
      
      </div>
      <div
       
        className="d-flex gap-3 align-items-center flex-wrap p-3  px-5 fs-5"
        style={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        
          <h5>  Add Note</h5>
      
      </div>
      <div
       
      className="d-flex justify-content-between align-items-center flex-wrap p-3  border fs-5"
      style={{
        width: "100%",
        overflowX: "hidden",
      }}
      id='footer'
    >
      
    <i className="fa-solid fa-xmark" style={{ cursor: "pointer" }} onClick={()=>setTaskInfo(null)}></i>
    <h5>Created: {moment(taskInfo.createdAt).fromNow()}</h5>
    <i className="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={()=>handleDelete(taskInfo.index)}></i>
    
    
    </div>
        </div>}
    </div>
  </div>
</Layout>

  )
}

export default Assigned
