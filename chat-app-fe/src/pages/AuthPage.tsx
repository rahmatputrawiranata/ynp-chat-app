import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import { AuthInterface } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
        const resps = await fetch(`${BASE_URL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form)
        });
        if(resps.ok) {
          const data: AuthInterface = await resps.json();

          localStorage.setItem('username', data.username);
          localStorage.setItem('access_token', data.access_token);
          
        }else{
          const data: {message: string} = await resps.json();
          alert(data.message);
        }

        navigate('/')
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="
              bg-blue-500 
              hover:bg-blue-700 
              text-white 
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register / Login
          </button>
        </div>
      </form>
    </div>
    )
}


export default HomePage;