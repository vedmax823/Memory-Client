import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../hooks/useUserStore";

const Header = () => {
  const [name, setName] = useState("");
  const setUser = useUserStore(state => state.setUser);
  const ls = useMemo(() => {
    return new SecureLS();
  }, []);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    ls.remove("userToken");
    navigate("login");
  }, [ls, navigate]);

  useEffect(() => {
    try {
      const token = ls.get("userToken");
      const decodedToken: User = jwtDecode(token);
      setUser(decodedToken);
      setName(decodedToken.name);
    } catch {
      logout();
    }
  }, [ls, logout]);

  return (
    <div className="bg-pink-300">
      <header className="flex justify-between items-center bg-white bg-opacity-70 p-6 shadow-lg">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            Memory
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg text-gray-700">{name}</span>
          <button
            onClick={logout}
            className="py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
