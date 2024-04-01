import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";

export const AppBar = () => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState("");
  useAsyncEffect(async () => {
    const res = await axios.get("http://localhost:3000/api/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setIcon(res.data.user.firstName[0].toUpperCase());
  }, [icon]);
  return (
    <div className="shadow h-14 flex justify-between rounded-lg border-2">
      <div className="flex flex-col justify-center h-full ml-4 cursor-pointer">
        Zelle App
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
        className="text-xs cursor-pointer text-red-400 underline hover:text-red-800"
      >
        Logout
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer">
          <div
            onClick={() => navigate("/update")}
            className="flex flex-col justify-center h-full text-xl cursor-pointer "
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};
