import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import profile from '../../images/profile_img.jpg';
import { Menu } from './ListMenu';
import "../../styles/Layout.css";
import "../../styles/Tasks.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useInfo } from '../../context/nav';

const Layout = ({ children }) => {
  const location = useLocation();
  const sidebarMenu = Menu;
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
const [key]=useInfo();
  // Fetch tasks from localStorage and calculate today's stats
  const fetchTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date().toISOString().split('T')[0];
    const todaysTasks = tasks.filter(task => task.deadline.startsWith(today));
    const completed = todaysTasks.filter(task => task.completed).length;
    const pending = todaysTasks.length - completed;

    setCompletedTasks(completed);
    setPendingTasks(pending);
  };

  // Update tasks whenever localStorage changes or a task is modified
  useEffect(() => {
    fetchTasks();

    // Listen for storage events to auto-update
    const handleStorageChange = () => fetchTasks();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Total tasks for the graph
  const totalTasks = completedTasks + pendingTasks;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <>
      <div className="layoutbox">
      <div className={key.bar? "sidebar":"d-none"} style={key.dark? {background:"rgb(66, 65, 65)",color:"white"}:{margin:"0"}}>
          <div className={key.dark?"profileinfo bg-black":"profileinfo"}>
            <div className="profilepic">
              <img src={profile} alt="" height={120} width={120} />
            </div>
          </div>
          <div className="pt-5">
            <h5 className='text-center fw-bold'>Hey, Saif</h5>
            <div className={key.dark? "menu bg-black text-white mx-3 p-2":"menu bg-white mx-3 p-2"}>
              {sidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={key.dark? `menu-item ${isActive && "activated2"}`:`menu-item ${isActive && "activated"}`} key={menu.path}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path} className={key.dark? "text-white":""}>{menu.name}</Link>
                  </div>
                );
              })}
            
            </div>
          </div>
          <div className={key.dark? "bg-black text-white m-3 p-3 fs-5 text-center":"bg-white m-3 p-3 fs-5 text-center"}>
            + Add list
          </div>
          <div className={key.dark? "bg-black text-white m-3 pb-3":"bg-white m-3 pb-3"}>
          <div className="pb-4 border p-3">
            <div className="d-flex justify-content-between flex-wrap">
              <h6>Today's tasks</h6>
              <h6 className="border rounded-5 bg-secondary px-2">i</h6>
            </div>
            <h3>{totalTasks}</h3>
            </div>
            <div style={{ width: 120, margin: '20px auto', position: 'relative' }}>
            
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: '20px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '50%',
                }}
              ></div>
              <CircularProgressbar
                value={percentage}
                text={`${completedTasks}/${totalTasks}`}
                strokeWidth={20} // Adjust for thicker border
                styles={buildStyles({
                  textSize: '16px',
                  textColor: '#000',
                  pathColor: 'rgb(4, 26, 5)',
                  trailColor: 'rgb(22, 133, 28)',
                })}
              />
            </div>
          </div>
        </div>
        

        <div className={key.dark?"pagebox bg-black":"pagebox"} style={key.bar? {width:"81%"}:{width:"100%"}}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
