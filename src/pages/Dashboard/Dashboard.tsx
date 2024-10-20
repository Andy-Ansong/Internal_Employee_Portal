import React from 'react';
import './styles.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Employee Portal Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/teams">Teams</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/tasks">Tasks</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </nav>
      </header>

      <div className="dashboard-content">
        <section className="statistics">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Projects</h3>
              <p>12 Active</p>
            </div>
            <div className="stat-item">
              <h3>Tasks</h3>
              <p>34 Pending</p>
            </div>
            <div className="stat-item">
              <h3>Teams</h3>
              <p>5 Teams</p>
            </div>
            <div className="stat-item">
              <h3>Notifications</h3>
              <p>7 Unread</p>
            </div>
          </div>
        </section>

        <section className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            <li>Completed task: Update the project report - 2 hours ago</li>
            <li>Joined the meeting: Engineering Team Sync - 4 hours ago</li>
            <li>Reviewed new project proposal - 6 hours ago</li>
            <li>Marked task: Fix UI bugs as complete - 1 day ago</li>
          </ul>
        </section>

        <section className="tasks-summary">
          <h2>Tasks Summary</h2>
          <div className="tasks-grid">
            <div className="task-item">
              <h3>Design Website Mockups</h3>
              <p>Status: In Progress</p>
              <p>Due: 20th October</p>
            </div>
            <div className="task-item">
              <h3>Backend API Integration</h3>
              <p>Status: Pending</p>
              <p>Due: 22nd October</p>
            </div>
            <div className="task-item">
              <h3>Prepare Marketing Materials</h3>
              <p>Status: Completed</p>
              <p>Due: 15th October</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
