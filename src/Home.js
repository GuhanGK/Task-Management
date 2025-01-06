import React, { useEffect, useState } from "react";
import { Avatar, Button, FloatButton, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import videoImg from "./assets/videoImg.png";
import PostImg1 from "./assets/post-img-1.svg";
import PostImg2 from "./assets/post-img-2.svg";
import { ReactComponent as LikeIcon } from "./assets/like-icon.svg";
import { ReactComponent as ShareIcon } from "./assets/shareIcon.svg";
import { ReactComponent as Twitter } from "./assets/twitterIcon.svg";
import { ReactComponent as Facebook } from "./assets/facebook.svg";
import { ReactComponent as Reddit } from "./assets/reddit.svg";
import { ReactComponent as DiscordIcon } from "./assets/discord.svg";
import { ReactComponent as Whatspp } from "./assets/whatsapp.svg";
import { ReactComponent as Messenger } from "./assets/messenger.svg";
import { ReactComponent as Telegram } from "./assets/telegram.svg";
import { ReactComponent as Instagram } from "./assets/instagram.svg";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageLink, setPageLink] = useState("https://www.arnav/feed");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ pageLink });
  }, [pageLink, form]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Ashick",
      time: "2 hours ago",
      text: "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel",
      images: [PostImg2, PostImg1],
      likes: 2,
      bgColor: "#F7EBFF",
    },
    {
      id: 2,
      username: "John Doe",
      time: "5 hours ago",
      text: "Had an amazing coffee at Central Perk ☕ #FriendsFan",
      images: [videoImg],
      likes: 5,
      bgColor: "#FFFAEE",
    },
  ]);

  const ShareSites = [
    {
      key: 1,
      name: "Twitter",
      Icon: <Twitter />,
      link: "https://twitter.com",
      bgColor: "#E9F6FB",
    },
    {
      key: 2,
      name: "Facebook",
      Icon: <Facebook />,
      link: "https://facebook.com",
      bgColor: "#E7F1FD",
    },
    {
      key: 3,
      name: "Reddit",
      Icon: <Reddit />,
      link: "https://reddit.com",
      bgColor: "#FDECE7",
    },
    {
      key: 4,
      name: "DiscordIcon",
      Icon: <DiscordIcon />,
      link: "https://discord.com",
      bgColor: "#ECF5FA",
    },
    {
      key: 5,
      name: "Whatspp",
      Icon: <Whatspp />,
      link: "https://whatsapp.com",
      bgColor: "#E7FBF0",
    },
    {
      key: 6,
      name: "Messenger",
      Icon: <Messenger />,
      link: "https://messenger.com",
      bgColor: "#E5F3FE",
    },
    {
      key: 7,
      name: "Telegram",
      Icon: <Telegram />,
      link: "https://telegram.com",
      bgColor: "#E9F6FB",
    },
    {
      key: 8,
      name: "Instagram",
      Icon: <Instagram />,
      link: "https://instagram.com",
      bgColor: "#FF40C617",
    },
  ];

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="p-3">
        <div className="flex items-center gap-3">
          <NavLink to="/profile">
            <Avatar
              className="!w-[40px] !h-[40px]"
              size={64}
              icon={<UserOutlined />}
            />
          </NavLink>
          <div className="text-left">
            <p className="text-[10px] font-normal text-[#00000054]">
              Welcome Back
            </p>
            <p className="text-[16px] font-semibold">Guhan Kumar</p>
          </div>
        </div>

        <h3 className="text-left mt-6 text-[24px] font-extrabold">Feed</h3>

        {posts.map((post) => (
          <div
            key={post.id}
            className="p-3 rounded-[24px] mt-4"
            style={{ backgroundColor: post.bgColor }}
          >
            <div className="flex items-center gap-3">
              <Avatar
                className="!w-[40px] !h-[40px]"
                size={64}
                icon={<UserOutlined />}
              />
              <div className="text-left text-[12px] font-semibold">
                <p>{post.username}</p>
                <p className="text-[10px] font-normal text-[#00000054]">
                  {post.time}
                </p>
              </div>
            </div>

            <p className="text-justify mt-3 text-[12px] font-normal text-[#000000]">
              {post.text}
            </p>

            <div
              className={
                post.images.length > 1
                  ? "grid grid-cols-[65%_32%] gap-2 mt-3"
                  : "w-full flex"
              }
            >
              {post.images.map((img, index) => (
                <div key={index} className="w-full">
                  <img
                    className="w-full"
                    src={img}
                    alt={`PostImg${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1">
                <LikeIcon /> {post.likes}
              </div>
              <div>
                <Button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="w-[92px] h-[30px] bg-[#00000012] !border rounded-[36px]"
                >
                  <ShareIcon /> Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FloatButton
        className="!bg-[#000]"
        shape="circle"
        icon={<PlusOutlined className="text-[#ffffff]" />}
        style={{
          insetInlineEnd: 24 + 0 + 0 + 10,
        }}
      />

      <Modal
        open={isModalOpen}
        title="Share Post"
        onCancel={handleCloseModal}
        footer={false}
        className="share_modal_container"
      >
        <div className="flex flex-wrap gap-y-6 gap-x-4 justify-between mt-6">
          {ShareSites.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[20%] h-auto flex justify-center items-center flex-col"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[56px] h-[56px] flex justify-center items-center rounded-[50%]"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {item.Icon}
                </a>
                <p className="text-[12px] font-normal">{item.name}</p>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="text-left text-[16px] font-semibold mt-4">
            Page Link
          </h3>
          <Form
            name="layout-multiple-horizontal"
            layout="horizontal"
            form={form}
          >
            <Form.Item className="mt-2" label="" name="pageLink">
              <Input className="h-[43px] rounded-[8px]" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Home;
