import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../admin/Dashboard.css';

const SAMPLE_USERS = [
  { fullName: 'John Doe',       phoneNumber: '+2348011111111', createdAt: '2026-05-28 09:10 AM', idType: 'NIN' },
  { fullName: 'Sarah Johnson',  phoneNumber: '+2348022222222', createdAt: '2026-05-28 09:45 AM', idType: 'Passport' },
  { fullName: 'Michael Smith',  phoneNumber: '+2348033333333', createdAt: '2026-05-28 10:15 AM', idType: "Driver's License" },
  { fullName: 'David Wilson',   phoneNumber: '+2348044444444', createdAt: '2026-05-28 11:00 AM', idType: 'NIN' },
];

const STATS = {
  totalUsers: 4096,
  usersToday: 248,
  totalMatches: 512,
};

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '▦' },
  { label: 'Users',     icon: '◈' },
  { label: 'Matches',   icon: '◉' },
  { label: 'Settings',  icon: '◎' },
];

export default function Users() {
  const [activeNav, setActiveNav] = useState('Users');
  const [users, setUsers] = useState([])
  const today = new Date().toLocaleDateString('en-NG', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  
const logout = () => {
  localStorage.removeItem("token");
  Navigate("/login")
}

useEffect(() => {
  const fetchUsers = async () =>{
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('error ', data)
        setError(data.data.msg || " ");
        return;
      }
      // console.log("coming", data)

      setUsers(data)

    } catch (err) {
      setError(err.message);
    } finally {
      // setLoading(false);
    }
  }

  fetchUsers();
})


// console.log("dragging ", users)
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">Season of Legends</div>
        <div className="sidebar-sub">Admin Console · 2026</div>

        <div className="sidebar-divider" />

        {NAV_ITEMS.map(({ label, icon }) => (
          <Link
            to={`/${label.toLowerCase()}`}
            key={label}
            className={`menu-item${activeNav === label ? ' active' : ''}`}
            onClick={() => setActiveNav(label)}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}

        <div className="sidebar-divider" />

        <Link to="/" className="sidebar-back-btn">
          ← Enrollment Form
        </Link>
        <div onClick={logout} className="sidebar-back-btn" style={{ marginTop: 8, color: '#3a3a3a', borderColor: '#1a1a1a' }}>
          ⏻ Logout
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Users</h1>
            <div className="topbar-sub">Season of Legends 2026 · Da Axis eSports</div>
          </div>
          <div className="topbar-date">{today}</div>
        </div>

        {/* Stat Cards */}
        {/* Recent Users Table */}
        <div className="admin-table-wrap">
          <div className="admin-table-header">
            <h2>Recent Registered Athletes</h2>
            <span className="table-count">Showing {SAMPLE_USERS.length} of {STATS.totalUsers.toLocaleString()}</span>
          </div>

          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Date of Registration</th>
                  <th>Tornament ID</th>
                  <th>ID Type</th>
                </tr>
              </thead>
              <tbody>
                {users?.data?.map((user, i) => (
                  <tr key={i}>
                    <td className="td-name">{user.fullName}</td>
                    <td className="td-phone">{user.phone}</td>
                    <td className="td-date">{user.createdAt}</td>
                    <td className="td-phone">{user.tornamentId}</td>

                    <td>
                      <span className="id-badge">{user.idType}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
