import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, UserPlus, Building2, Users, Ticket } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const SuperAdminProfile = () => {
  const navigate = useNavigate();

  const superAdminData = {
    name: localStorage.getItem('userName') || 'Super Administrator',
    email: localStorage.getItem('userEmail') || 'superadmin@100acres.com',
    phone: '+91 9876543210',
    role: 'Super Admin',
    company: '100acres.com',
    joinDate: '2024-01-01',
    permissions: [
      'Full System Access',
      'Create Head Admins',
      'Manage All Users',
      'View All Reports',
      'System Configuration',
      'Access All Data'
    ]
  };

  const statsData = [
    { title: 'Total Users', value: '0', icon: Users, color: 'text-blue-600', cardBg: 'bg-blue-100' },
    { title: 'Active Leads', value: '0', icon: Building2, color: 'text-green-600', cardBg: 'bg-green-100' },
    { title: 'Open Tickets', value: '0', icon: Ticket, color: 'text-orange-600', cardBg: 'bg-orange-100' },
    { title: 'System Health', value: '0.0%', icon: Shield, color: 'text-emerald-600', cardBg: 'bg-emerald-100' }
  ];

  return (
    <>
      <div className="superadmin-container">
        {/* <div className="superadmin-header">
          <div className="superadmin-header-left">
            <div className="header-icon"><Building2 className="icon-white" /></div>
            <p className="panel-title">Super Admin Control Panel</p>
          </div>
          <div className="superadmin-header-right">
            <Popover>
              <PopoverTrigger asChild>
                <button className="icon-button green"><User className="icon-white" /></button>
              </PopoverTrigger>
              <PopoverContent className="popover-card">
                <div className="profile-info">
                  <div className="profile-avatar"><Shield className="icon-white" /></div>
                  <div>
                    <h3 className="profile-name">{superAdminData.name}</h3>
                    <Badge className="role-badge">{superAdminData.role}</Badge>
                  </div>
                </div>
                <div className="profile-details">
                  <div className="profile-item"><Building2 className="small-icon" />{superAdminData.company}</div>
                  <div className="profile-item"><Mail className="small-icon" />{superAdminData.email}</div>
                  <div className="profile-item"><Phone className="small-icon" />{superAdminData.phone}</div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className="icon-button blue"><Shield className="icon-white" /></button>
              </PopoverTrigger>
              <PopoverContent className="popover-card-small">
                <h4 className="permissions-title">System Permissions</h4>
                <div className="permissions-list">
                  {superAdminData.permissions.map((permission, i) => (
                    <div key={i} className="permission-item">
                      <Shield className="small-icon green" />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div> */}

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <Card key={index} className="stat-card">
              <CardContent className="stat-card-content">
                <div className="stat-card-body">
                  <div className={`stat-icon ${stat.cardBg}`}><stat.icon className={`stat-icon-inner ${stat.color}`} /></div>
                  <div>
                    <p className="stat-title">{stat.title}</p>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        .superadmin-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .superadmin-header {
          background: linear-gradient(to right, #f0fdf4, #eff6ff);
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid #bbf7d0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .superadmin-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(to bottom right, #16a34a, #15803d);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .icon-white { color: white; width: 24px; height: 24px; }

        .panel-title {
          font-size: 1.125rem;
          color: #4b5563;
          font-weight: 500;
        }

        .superadmin-header-right {
          display: flex;
          gap: 0.75rem;
        }

        .icon-button {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-button.green { background-color: #16a34a; }
        .icon-button.green:hover { background-color: #15803d; }
        .icon-button.blue { background-color: #2563eb; }
        .icon-button.blue:hover { background-color: #1d4ed8; }

        .popover-card, .popover-card-small {
          padding: 1rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          background-color: #16a34a;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-name {
          font-weight: 600;
        }

        .role-badge {
          background-color: #bbf7d0;
          color: #166534;
          font-size: 0.75rem;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .profile-item {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .small-icon {
          width: 12px;
          height: 12px;
        }

        .permissions-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .permissions-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .permission-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #f0fdf4;
          padding: 0.5rem;
          font-size: 0.75rem;
          border-radius: 0.5rem;
        }

        .permission-item .green {
          color: #16a34a;
        }

        .stats-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .stat-card {
          flex: 1;
          min-width: 200px;
          max-width: 300px;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .stat-card-content {
          padding: 1rem;
        }

        .stat-card-body {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          padding: 0.75rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon-inner {
          width: 20px;
          height: 20px;
        }

        .stat-title {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
        }
      `}</style>
    </>
  );
};

export default SuperAdminProfile;
