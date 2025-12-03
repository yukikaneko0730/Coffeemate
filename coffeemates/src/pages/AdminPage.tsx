// src/pages/AdminPage.tsx
import React from "react";

const dummyUsers = [
  { id: "u1", name: "Yuki", status: "active" },
  { id: "u2", name: "Alex", status: "banned" },
];

const AdminPage: React.FC = () => {
  return (
    <div className="admin-page">
      <header>
        <h1>Admin dashboard</h1>
        <p>Users overview (dummy data)</p>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
