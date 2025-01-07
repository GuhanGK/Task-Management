import React, { useState } from "react";
import ProfileImg from "../../../assets/profileImg.svg";
import { Button } from "antd";
import ListTableView from "../ListView";
import CardView from "../CardView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../../Redux/Auth";

const DataView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    navigate("/login");
  };
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="text-[#2F2F2F] text-[24px] font-semibold">
            TaskBuddy
          </h3>
          <div className="flex gap-3">
            <p
              className={
                activeTab === 1
                  ? "w-fit border-b border-black text-[16px] font-semibold cursor-pointer"
                  : "text-[16px] font-semibold cursor-pointer"
              }
              onClick={() => setActiveTab(1)}
            >
              List
            </p>
            <p
              className={
                activeTab === 2
                  ? "w-fit border-b border-black text-[16px] font-semibold cursor-pointer"
                  : "text-[16px] font-semibold cursor-pointer"
              }
              onClick={() => setActiveTab(2)}
            >
              Board
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <img src={ProfileImg} alt="ProfileImg" />
            <p className="text-[16px] font-bold text-[#00000099]">Guhan</p>
          </div>
          <div>
            <Button
              className="w-[108px] h-[40px] bg-[#7B198426] rounded-[12px] text-[12px] font-semibold"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      {activeTab === 1 && (
        <div className="mt-4">
          <ListTableView />
        </div>
      )}
      {activeTab === 2 && (
        <div className="mt-4">
          <CardView />
        </div>
      )}
    </>
  );
};

export default DataView;
