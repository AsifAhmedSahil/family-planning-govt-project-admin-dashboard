
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Dashboard = () => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  const headerItemStyle = {
    backgroundColor: '#e0e0ff',
    padding: '5px 10px',
    borderRadius: '3px',
    fontWeight: 'bold',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const subSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  };

  const progressBarStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  };

  const progressStyle = {
    height: '10px',
    borderRadius: '5px',
  };

  const completedStyle = {
    backgroundColor: '#4caf50',
    width: '100%',
  };

  const incompleteStyle = {
    backgroundColor: '#f4f4f4',
    width: '100%',
  };

  const taskStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '5px',
    backgroundColor: '#f9f9f9',
  };

  const taskInfoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const taskIconStyle = {
    marginRight: '10px',
    color: '#4caf50',
  };

  const taskTextStyle = {
    fontSize: '14px',
    color: '#333',
  };

  const taskDateStyle = {
    fontSize: '12px',
    color: '#777',
  };
  return (
    <>
    
    <h2>Welcome to the Dashboard!</h2>
    <p>This is the main content area where data and widgets will appear.</p>
    </>
  )
}

export default Dashboard

import React from 'react';


const AttendanceReport = () => {
  

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Section */}
      <div style={headerStyle}>
        <div style={headerItemStyle}>১৫ আগস্ট</div>
        <div style={headerItemStyle}>২৭ আগস্ট</div>
        <div style={headerItemStyle}>৩০ আগস্ট</div>
        <div style={headerItemStyle}>০৫ আগস্ট</div>
      </div>

      {/* Main Content */}
      <div style={sectionStyle}>
        {/* Left Section */}
        <div style={subSectionStyle}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            সক্রিয়াবর উপস্থিতি তালিকা
          </p>
          <div style={progressBarStyle}>
            <div style={{ ...progressStyle, ...completedStyle }}></div>
          </div>
          <div style={progressBarStyle}>
            <div style={{ ...progressStyle, ...incompleteStyle }}></div>
          </div>
          <div style={progressBarStyle}>
            <div style={{ ...progressStyle, ...completedStyle }}></div>
          </div>
          <div style={progressBarStyle}>
            <div style={{ ...progressStyle, ...incompleteStyle }}></div>
          </div>
        </div>

        {/* Right Section */}
        <div style={subSectionStyle}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            সক্রিয়াবর লাভার
          </p>
          <div style={taskStyle}>
            <div style={taskInfoStyle}>
              <FaCheckCircle style={taskIconStyle} />
              <span style={taskTextStyle}>
                পরিদর্শন করা হয়েছে - খানা পরিষ্কার
              </span>
            </div>
            <span style={taskDateStyle}>০৮:৩০</span>
          </div>
          <div style={taskStyle}>
            <div style={taskInfoStyle}>
              <FaCheckCircle style={taskIconStyle} />
              <span style={taskTextStyle}>
                পরিদর্শন করা হয়েছে - খানা পরিষ্কার
              </span>
            </div>
            <span style={taskDateStyle}>০৮:৩০</span>
          </div>
          <div style={taskStyle}>
            <div style={taskInfoStyle}>
              <FaTimesCircle style={{ ...taskIconStyle, color: '#f44336' }} />
              <span style={taskTextStyle}>
                পরিদর্শন করা হয়নি - খানা অপরিষ্কার
              </span>
            </div>
            <span style={taskDateStyle}>০৮:৩০</span>
          </div>
          <div style={taskStyle}>
            <div style={taskInfoStyle}>
              <FaCheckCircle style={taskIconStyle} />
              <span style={taskTextStyle}>
                পরিদর্শন করা হয়েছে - খানা পরিষ্কার
              </span>
            </div>
            <span style={taskDateStyle}>০৮:৩০</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
