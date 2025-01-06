import React from "react";
import BgImg from "../../../assets/profile-bg.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/ArrowLeft.svg";
import profileImg from "../../../assets/prifile.png";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  const postData = useSelector((state) => state.mediaTracking.posts);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <>
      <div className="w-full">
        <ArrowLeft
          onClick={handleBack}
          className="absolute top-[6px] left-[4px]"
        />
        <img className="w-full" src={BgImg} alt="profile-background-image" />
      </div>
      <div className="absolute top-[110px] left-[16px]">
        <img src={profileImg} alt="profile-image" />
      </div>
      <div className="mt-3 flex justify-end me-2">
        <NavLink to="/profile-edit" className="w-[50%] h-[32px]">
            <Button className="w-[100%] h-[32px] border border-[#00000057] rounded-[36px]">
                Edit Profile pahe
            </Button>

        </NavLink>
      </div>
      <div className="p-2">
        <div className="mt-6">
          <p className="text-left text-[24px] font-extrabold">Sakshi Agarwal</p>
          <p className="text-left text-[14px] font-normal">
            Just someone who loves designing, sketching, and finding beauty in
            the little things 💕
          </p>
        </div>

        <h3 className="text-left text-[18px] font-semibold mt-3">My Posts</h3>
        <div className="">
          {postData?.map((post) => (
            <div key={post.id} className="grid grid-cols-[65%_32%] gap-2 mt-3">
              {post.images?.map((item, index) => (
                <div key={index} className="w-full">
                  <img
                    className="w-full block"
                    src={item}
                    alt={`PostImg${index + 1}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
