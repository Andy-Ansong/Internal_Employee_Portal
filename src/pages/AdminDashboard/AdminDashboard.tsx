import React from 'react';
import './styles.css';

// Dummy Data for the Dashboard
const totalEmployees = 150;
const departments = 5;
const newHires = 12;
const pendingLeaves = 4;
const activeTasks = [
  { id: 1, task: 'Onboard new employees', dueDate: '2024-10-22' },
  { id: 2, task: 'Review leave requests', dueDate: '2024-10-21' },
  { id: 3, task: 'Update HR policies', dueDate: '2024-10-25' },
];
const recentAnnouncements = [
  { id: 1, message: 'Team building event on Friday', date: '2024-10-18' },
  { id: 2, message: 'New health benefits package', date: '2024-10-16' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header>
        <h1>Admin/HR Dashboard</h1>
        <p>Welcome back! Here’s the latest updates in your HR department.</p>
      </header>

      <div className="dashboard-grid">
        {/* Employee Overview Section */}
        <section className="overview-card">
          <h2>Employee Overview</h2>
          <div className="overview-stats">
            <p>Total Employees: <strong>{totalEmployees}</strong></p>
            <p>Departments: <strong>{departments}</strong></p>
            <p>New Hires This Month: <strong>{newHires}</strong></p>
            <p>Pending Leave Requests: <strong>{pendingLeaves}</strong></p>
          </div>
        </section>

        {/* Task Management Section */}
        <section className="tasks-card">
          <h2>Task Management</h2>
          <ul>
            {activeTasks.map((task) => (
              <li key={task.id}>
                <p><strong>{task.task}</strong></p>
                <p>Due: {task.dueDate}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Announcements Section */}
        <section className="announcements-card">
          <h2>Recent Announcements</h2>
          <ul>
            {recentAnnouncements.map((announcement) => (
              <li key={announcement.id}>
                <p>{announcement.message}</p>
                <small>Date: {announcement.date}</small>
              </li>
            ))}
          </ul>
        </section>

        {/* Analytics Section */}
        <section className="analytics-card">
          <h2>HR Analytics</h2>
          <div className="charts">
            {/* You can integrate a charting library here, such as Chart.js */}
            <p>Employee Growth Chart Coming Soon!</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
