import React, { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import useAsyncEffect from "use-async-effect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  useAsyncEffect(async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setBalance(res.data.balance);
  }, [[balance]]);
  useAsyncEffect(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <div className="flex justify-center bg-gray-100 h-max">
      <div className="rounded-lg bg-white w-max text-center p-2 h-max px-4 border-2 border-black flex flex-col justify-center">
        <AppBar />
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
