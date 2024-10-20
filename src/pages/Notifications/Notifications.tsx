import React, { useState } from 'react';
import './styles.css';

interface Notification {
  id: number;
  message: string;
  sender: string;
  date: string;
  isRead: boolean;
  category: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: 'Project ABC has a new task assigned to you.',
      sender: 'Project Manager',
      date: '2024-10-18',
      isRead: false,
      category: 'Task',
    },
    {
      id: 2,
      message: 'There is a company-wide meeting tomorrow.',
      sender: 'HR Department',
      date: '2024-10-17',
      isRead: true,
      category: 'Announcement',
    },
    {
      id: 3,
      message: 'Your leave request has been approved.',
      sender: 'HR Department',
      date: '2024-10-16',
      isRead: false,
      category: 'General',
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const filterNotifications = (category: string) => {
    return notifications.filter((notif) => notif.category === category);
  };

  return (
    <div className="notifications-page">
      <header>
        <h1>Notifications</h1>
      </header>

      <section className="notifications-list">
        {notifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
            >
              <p><strong>Message:</strong> {notif.message}</p>
              <p><strong>From:</strong> {notif.sender}</p>
              <p><strong>Date:</strong> {notif.date}</p>
              <p><strong>Category:</strong> {notif.category}</p>
              {!notif.isRead && (
                <button onClick={() => markAsRead(notif.id)}>Mark as Read</button>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Notifications;
