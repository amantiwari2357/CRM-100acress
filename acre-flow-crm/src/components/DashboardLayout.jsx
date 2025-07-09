import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, userRole = 'employee' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') : '';

  const userName = typeof window !== 'undefined' ? localStorage.getItem('') : '';


  const getRoleTitle = (role) => {
    switch (role) {
      case 'super-admin': return 'BOSS';
      case 'head-admin': return 'Head Admin';
      case 'team-leader': return 'Team Leader';
      case 'employee': return 'Employee';
      default: return 'User';
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <Sidebar
          userRole={userRole}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="main-content-wrapper">
          {/* Header */}
          <header className="dashboard-header">
            <div className="header-left">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="menu-button"
              >
                <Menu className="menu-icon" />
              </button>
              <h1 className="user-greeting">
                Hello {userName ? `${userName} (${getRoleTitle(userRole)})` : getRoleTitle(userRole)}
              </h1>
            </div>

            <div className="header-right">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />
              </div>
              <button className="notification-button">
                <Bell className="bell-icon" />
                <span className="notification-dot"></span>
              </button>
            </div>
          </header>

          {/* Main */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
          background-color: #f9fafb;
        }

        .main-content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .dashboard-header {
           background: linear-gradient(145deg, #1e293b, #111827);
          border-bottom: 1px solid #f3f4f6;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

     .menu-button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #ffffff; /* solid white base */
  border: 1px solid #e5e7eb; /* light gray border for structure */
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
}

.menu-button:hover {
  background-color: #f9fafb; /* elegant hover */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* soft hover shadow */
}

.menu-button:active {
  transform: scale(0.98); /* slight click effect */
}


        .menu-icon {
          width: 20px;
          height: 20px;
          color: #4b5563;
        }

        .user-greeting {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 16px;
          height: 16px;
        }

        .search-input {
          padding: 0.5rem 1rem 0.5rem 2rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          background-color: #f9fafb;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }

        .search-input:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px #3b82f6;
        }

        .notification-button {
         color: #9ca3af;
          position: relative;
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .notification-button:hover {
  background-color: #334155; /* Tailwind's slate-800 */
  color: #ffffff;
}


        .bell-icon {
          width: 20px;
          height: 20px;
          color: white;
        }

        .notification-dot {
          position: absolute;
          top: 0.4rem;
          right: 0.4rem;
          background-color: #ef4444;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          background-color: #f9fafb;
        }
      `}</style>
    </>
  );
};

export default DashboardLayout;
