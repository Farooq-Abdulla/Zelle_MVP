import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import useAsyncEffect from "use-async-effect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useAsyncEffect(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.user) {
        setUser(res.data.user);
        navigate("/update");
      }
    } catch (error) {
      navigate("/signin");
    }
  }, [navigate]);
  useEffect(() => {
    setLastName(user.lastName);
    setFirstName(user.firstName);
    setPassword(user.password);
  }, []);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Update Details"} />
          <SubHeading label={"Enter your Details to Update"} />
          <InputBox
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={user.firstName}
            label={"First Name:"}
          />
          <InputBox
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={user.lastName}
            label={"Last Name: "}
          />
          <InputBox
            value={password}
            placeholder={"enter new Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password: "}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  await axios.put(
                    "http://localhost:3000/api/v1/user/update",
                    {
                      firstName,
                      lastName,
                      password,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  alert("Details Updated");
                  navigate("/dashboard");
                } catch (error) {
                  alert("Error while updating, please try again");
                }
              }}
              label={"Update"}
            />
          </div>
          <BottomWarning
            label={"Don't want to update ?"}
            buttonText={"Go Back"}
            to={"/dashboard"}
          />
        </div>
      </div>
    </div>
  );
}
