import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import { registrateUser } from "../http/registrate";

const LoginForm : React.FC = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async() => {
    try{
      const ls = new SecureLS();
      const result = await registrateUser(name);
      ls.set("userToken", result.data.token);
      navigate("/");
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen moving-gradient">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Memory Game</h1>
        <p className="text-lg text-gray-700 mb-6">
          Enter your name to start playing!
        </p>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          placeholder="Your Name"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LoginForm;