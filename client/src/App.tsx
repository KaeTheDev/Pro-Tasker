// function App() {
//   return (
//     <>
//        <h2 className="text-3xl text-blue-500">KaeTheDev is the GREATEST!</h2>
//     </>
//   )
// }

// export default App

// src/App.tsx

import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users"); // this hits http://localhost:3000/api/users
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.length === 0 ? (
          <li>No users found</li>
        ) : (
          users.map((user: any) => (
            <li key={user._id}>{user.name} ({user.email})</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
