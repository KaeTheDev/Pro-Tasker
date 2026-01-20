import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
    const auth = useContext(AuthContext);
    if(!auth) throw new Error("AuthContext must be used within AuthProvider");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            await auth.login(email, password);
            setError("");
            alert("Login successful"); // redirect to dashboard
        } catch(err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
          <h1 className="text-xl font-bold mb-4">Login</h1>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button className="bg-blue-500 text-white p-2 rounded">Login</button>
          </form>
        </div>
      );    
};

export default Login;