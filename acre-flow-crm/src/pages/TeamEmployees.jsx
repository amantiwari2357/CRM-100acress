import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, UserCheck, UserX, Mail, Phone, Download } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

const TeamEmployees = ({ userRole = 'team-leader' }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching team employees data
    const fetchEmployees = async () => {
      try {
        // Mock data for team employees
        const mockEmployees = [
          {
            id: 1,
            name: 'Rahul Kumar',
            email: 'rahul.kumar@100acres.com',
            phone: '+91 9876543210',
            role: 'employee',
            department: 'Sales',
            status: 'active',
            joiningDate: '2024-01-15',
            lastLogin: '2024-01-20',
            tasksCompleted: 25,
            leadsAssigned: 15
          },
          {
            id: 2,
            name: 'Priya Singh',
            email: 'priya.singh@100acres.com',
            phone: '+91 9876543211',
            role: 'employee',
            department: 'Sales',
            status: 'active',
            joiningDate: '2024-02-01',
            lastLogin: '2024-01-19',
            tasksCompleted: 18,
            leadsAssigned: 12
          },
          {
            id: 3,
            name: 'Amit Sharma',
            email: 'amit.sharma@100acres.com',
            phone: '+91 9876543212',
            role: 'employee',
            department: 'Sales',
            status: 'inactive',
            joiningDate: '2023-12-10',
            lastLogin: '2024-01-10',
            tasksCompleted: 8,
            leadsAssigned: 5
          },
          {
            id: 4,
            name: 'Sneha Patel',
            email: 'sneha.patel@100acres.com',
            phone: '+91 9876543213',
            role: 'employee',
            department: 'Sales',
            status: 'active',
            joiningDate: '2024-01-20',
            lastLogin: '2024-01-20',
            tasksCompleted: 12,
            leadsAssigned: 8
          }
        ];
        setEmployees(mockEmployees);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load employee data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [toast]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (employeeId) => {
    setEmployees(employees.map(emp => {
      if (emp.id === employeeId) {
        const newStatus = emp.status === 'active' ? 'inactive' : 'active';
        toast({
          title: "Status Updated",
          description: `${emp.name} is now ${newStatus}`,
        });
        return { ...emp, status: newStatus };
      }
      return emp;
    }));
  };

  const handleExportData = () => {
    toast({
      title: "Export Initiated",
      description: "Employee data is being prepared for download.",
    });
    console.log("Exporting employee data:", filteredEmployees);
  };

  const getStatusBadgeStyles = (status) => {
    return status === 'active'
      ? { backgroundColor: '#d1fae5', color: '#10b981', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }
      : { backgroundColor: '#fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' };
  };

  if (loading) {
    return (
      <DashboardLayout userRole={userRole}>
        <style jsx>{`
          .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 384px; /* min-h-96 */
          }
          .loading-content {
            text-align: center;
          }
          .spinner-wrapper {
            width: 64px; /* w-16 */
            height: 64px; /* h-16 */
            background-color: #16a34a; /* bg-green-600 */
            border-radius: 9999px; /* rounded-full */
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px auto; /* mx-auto mb-4 */
          }
          .spinner {
            width: 24px; /* w-6 */
            height: 24px; /* h-6 */
            border: 2px solid white;
            border-top-color: transparent;
            border-radius: 9999px; /* rounded-full */
            animation: spin 1s linear infinite;
          }
          .loading-text {
            color: #4b5563; /* text-gray-600 */
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <div className="loading-container">
          <div className="loading-content">
            <div className="spinner-wrapper">
              <div className="spinner"></div>
            </div>
            <p className="loading-text">Loading employees...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={userRole}>
      <style jsx>{`
        .page-spacing {
          padding: 24px;
        }

        .header-section {
          display: flex;
          flex-wrap: wrap; /* Allow items to wrap on smaller screens */
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px; /* Added gap for spacing between elements */
          background-color: white; /* Added background for consistency */
          padding: 24px; /* Added padding for consistency */
          border-radius: 8px; /* Added border-radius for consistency */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Added shadow for consistency */
          border: 1px solid #e2e8f0; /* Added border for consistency */
        }

        .header-title {
          font-size: 30px;
          font-weight: 700;
          color: #1a202c;
          width: 100%; /* Take full width on smaller screens */
          margin-bottom: 16px; /* Space below title when wrapped */
        }

        @media (min-width: 768px) {
          .header-title {
            width: auto; /* Revert to auto width on larger screens */
            margin-bottom: 0;
          }
        }

        .header-subtitle {
          color: #4a5568;
          margin-top: 8px;
        }

        .action-buttons-group {
          display: flex;
          gap: 12px;
        }

        .add-button, .export-button {
          background-color: #16a34a;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s ease-in-out;
          border: none;
          cursor: pointer;
        }

        .add-button:hover, .export-button:hover {
          background-color: #15803d;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .stat-content {
          display: flex;
          align-items: center;
        }

        .stat-icon-wrapper {
          padding: 8px;
          border-radius: 8px;
        }

        .stat-icon-wrapper.blue { background-color: #e0f2fe; }
        .stat-icon-wrapper.green { background-color: #d1fae5; }
        .stat-icon-wrapper.orange { background-color: #fff7ed; }
        .stat-icon-wrapper.purple { background-color: #f3e8ff; }

        .stat-icon {
          height: 20px;
          width: 20px;
        }

        .stat-icon.blue { color: #2563eb; }
        .stat-icon.green { color: #16a34a; }
        .stat-icon.orange { color: #ea580c; }
        .stat-icon.purple { color: #9333ea; }

        .stat-details {
          margin-left: 16px;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 500;
          color: #4a5568;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
        }

        /* Updated filter controls styling for placement in header */
        .filter-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-grow: 1; /* Allow filter controls to take available space */
        }

        @media (min-width: 768px) {
          .filter-controls {
            flex-direction: row;
            justify-content: flex-end; /* Align to the right in the header */
            flex-grow: 0; /* Don't grow excessively when row */
          }
        }

        .search-input-wrapper {
          position: relative;
          width: 100%; /* Take full width within its flex item */
        }

        @media (min-width: 768px) {
          .search-input-wrapper {
            width: auto; /* Auto width on larger screens */
            min-width: 250px; /* Give it a minimum width */
          }
        }

        .search-icon {
          height: 16px;
          width: 16px;
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 8px 16px 8px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          outline: none;
        }

        .search-input:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px #22c55e;
        }

        .status-select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          outline: none;
        }

        .status-select:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px #22c55e;
        }

        .employee-table-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          overflow-x: auto;
        }

        .employee-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .employee-table th, .employee-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          text-align: left;
        }

        .employee-table th {
          background-color: #f9fafb;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
        }

        .employee-table tbody tr:hover {
          background-color: #f3f4f6;
        }

        .employee-name-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .employee-avatar {
          width: 36px;
          height: 36px;
          background-color: #d1fae5;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #16a34a;
          flex-shrink: 0;
        }

        .employee-contact-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .employee-contact-item {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #4a5568;
        }
        
        .contact-icon-small {
            width: 14px;
            height: 14px;
            color: #6b7280;
        }

        .performance-numbers {
            font-weight: 600;
        }
        .performance-numbers.green { color: #16a34a; }
        .performance-numbers.blue { color: #2563eb; }

        .action-buttons-table {
          display: flex;
          gap: 4px;
        }

        .action-button-table {
          padding: 6px;
          background-color: transparent;
          border: none;
          border-radius: 6px;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;
        }

        .action-button-table:hover {
          background-color: #f3f4f6;
        }

        .action-button-table .icon-red { color: #dc2626; width: 16px; height: 16px; }
        .action-button-table .icon-green { color: #16a34a; width: 16px; height: 16px; }
        .action-button-table .icon-blue { color: #2563eb; width: 16px; height: 16px; }

        .no-employees-found {
          text-align: center;
          padding-top: 48px;
          padding-bottom: 48px;
        }

        .no-employees-icon {
          height: 48px;
          width: 48px;
          color: #9ca3af;
          margin: 0 auto 16px auto;
        }

        .no-employees-title {
          font-size: 18px;
          font-weight: 500;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .no-employees-message {
          color: #6b7280;
        }
      `}</style>
      <div className="page-spacing">
        <div className="header-section">
         
          <div className="action-buttons-group">
            <button className="export-button" onClick={handleExportData}>
              <Download size={16} />
              Export Data
            </button>
          </div>
          {/* Moved Filter Controls into the Header Section */}
          <div className="filter-controls">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search employees by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper blue">
                <UserCheck className="stat-icon blue" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Employees</p>
                <p className="stat-value">{employees.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper green">
                <UserCheck className="stat-icon green" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Active</p>
                <p className="stat-value">
                  {employees.filter(emp => emp.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper orange">
                <UserCheck className="stat-icon orange" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Tasks</p>
                <p className="stat-value">
                  {employees.reduce((sum, emp) => sum + emp.tasksCompleted, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper purple">
                <UserCheck className="stat-icon purple" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Leads</p>
                <p className="stat-value">
                  {employees.reduce((sum, emp) => sum + emp.leadsAssigned, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="employee-table-container">
          {filteredEmployees.length > 0 ? (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Contact Info</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Performance</th>
                  <th>Joining Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-name-cell">
                        <div className="employee-avatar">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <strong>{employee.name}</strong>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="employee-contact-info">
                        <div className="employee-contact-item">
                            <Mail className="contact-icon-small" /> {employee.email}
                        </div>
                        <div className="employee-contact-item">
                            <Phone className="contact-icon-small" /> {employee.phone}
                        </div>
                      </div>
                    </td>
                    <td>{employee.department}</td>
                    <td>
                      <span style={getStatusBadgeStyles(employee.status)}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <p>Tasks: <span className="performance-numbers green">{employee.tasksCompleted}</span></p>
                      <p>Leads: <span className="performance-numbers blue">{employee.leadsAssigned}</span></p>
                    </td>
                    <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons-table">
                        <button
                          onClick={() => handleToggleStatus(employee.id)}
                          className="action-button-table"
                          title={employee.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {employee.status === 'active' ? (
                            <UserX className="icon-red" />
                          ) : (
                            <UserCheck className="icon-green" />
                          )}
                        </button>
                        <button className="action-button-table" title="Edit Employee">
                          <Edit className="icon-blue" />
                        </button>
                        <button className="action-button-table" title="Remove Employee">
                          <Trash2 className="icon-red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-employees-found">
              <UserX className="no-employees-icon" />
              <h3 className="no-employees-title">No employees found</h3>
              <p className="no-employees-message">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Add your first employee to get started.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamEmployees;