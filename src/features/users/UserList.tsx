// src/features/users/UserList.tsx
import React, { useEffect, useState } from "react";
import { fetchUsers } from "./userAPI";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>사용자 목록</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.userId}>
            {user.email} ({user.nickname})
          </li>
        ))}
      </ul>
    </div>
  );
}
