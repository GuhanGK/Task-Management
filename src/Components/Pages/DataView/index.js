import React, { useState } from "react";
import ProfileImg from "../../../assets/profileImg.svg";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import ListTableView from "../ListView";
import CardView from "../CardView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../../Redux/Auth";
import { SearchOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDatabase, ref, push } from "firebase/database";
import moment from "moment";

const DataView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [category, setCategory] = useState("");
  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    navigate("/login");
  };

  const props = {
    name: "file",
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      // if (info.file.status === 'done') {
      //   // message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const addTaskToFirebase = async (taskData) => {
    try {
      const db = getDatabase(); // Initialize Firebase Realtime Database
      const tasksRef = ref(db, "tasks"); // Reference to the "tasks" node
      await push(tasksRef, taskData); // Push the new task
      console.log("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const [nameData, setNameData] = useState('')
  console.log("nameData--->", nameData)
  const handleFormSubmit = (values) => {
    console.log("values--->", values)
    const date = values.dueOn ? values.dueOn.format('DD-MM-YYYY') : null;
    const taskData = {
      taskName: nameData,
      description: editorValue, // Add rich text description
      dueOn: date,
      taskStatus: values.taskStatus,
      createdAt: new Date().toISOString(),
    };
    console.log("taskData--->", taskData)
    addTaskToFirebase(taskData);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-between flex-col">
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
        <div className="flex flex-col justify-between gap-3">
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
      <br />
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3 items-center">
          <p>Filter By</p>
          <Select
            defaultValue="Category"
            className="filter_input_container"
            style={{
              width: 120,
            }}
            options={[
              {
                value: "todo",
                label: "TO-DO",
              },
              {
                value: "inprogress",
                label: "IN-PROGRESS",
              },
              {
                value: "completed",
                label: "COMPLETED",
              },
            ]}
          />
          <Select
            className="filter_input_container"
            defaultValue="Due Date"
            style={{
              width: 120,
            }}
            options={[
              {
                value: "due date",
                label: "Due Date",
              },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            className="search_input"
            placeholder="search"
            prefix={<SearchOutlined />}
          />
          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="w-[152px] h-[36px] rounded-[60px] bg-[#7B1984] text-[#fff] text-[14px] font-semibold"
          >
            ADD TASK
          </Button>
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

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        title="Create Task"
        width={700}
      >
        <div>
          <Input name='taskName' value={nameData ? nameData : ""} onChange={(e) => setNameData(e.target.value)}/>
          <ReactQuill
            theme="snow" // Choose the theme: 'snow' or 'bubble'
            value={editorValue} // Controlled input
            onChange={setEditorValue} // Update the state on text change
            placeholder="Write something..."
            className="mb-4"
            modules={{
              toolbar: [
                // Text formatting
                ["bold", "italic", "underline", "strike"],

                // List options
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
          />
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-[#00000099] font-semibold">Task Category</p>
              <div className="flex gap-2">
                <div
                  className={
                    category === "work"
                      ? "w-[80px] h-[30px] bg-[#7B1984] text-[#fff] text-[10px] font-bold rounded-[40px] border border-[#00000030] flex items-center justify-center cursor-pointer"
                      : "w-[80px] h-[30px] rounded-[40px] text-[10px] font-bold border border-[#00000030] flex items-center justify-center cursor-pointer"
                  }
                  onClick={() => setCategory("work")}
                >
                  Work
                </div>
                <div
                  className={
                    category === "personal"
                      ? "w-[80px] h-[30px] bg-[#7B1984] text-[#fff] text-[10px] font-bold rounded-[40px] border border-[#00000030] flex items-center justify-center cursor-pointer"
                      : "w-[80px] h-[30px] rounded-[40px] text-[10px] font-bold border border-[#00000030] flex items-center justify-center cursor-pointer"
                  }
                  onClick={() => setCategory("personal")}
                >
                  Personal
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Form
                // form={form}
                layout="vertical"
                className="flex items-center gap-3"
                onFinish={handleFormSubmit}
              >
                <Form.Item
                  label="Due on"
                  name="dueOn"
                  className="input_label text-[12px] text-[#00000099] font-semibold"
                  rules={[
                    {
                      required: true,
                      message: "Please select due date!",
                    },
                  ]}
                >
                  <DatePicker className="w-[200px] h-[32px]" />
                </Form.Item>
                <Form.Item
                  label="Task Status"
                  name="taskStatus"
                  className="input_label text-[12px] text-[#00000099] font-semibold"
                  rules={[
                    {
                      required: true,
                      message: "Please select task status!",
                    },
                  ]}
                >
                  <Select
                    defaultValue="Category"
                    className="filter_input_container"
                    style={{
                      width: 200,
                      height: 32,
                    }}
                    options={[
                      {
                        value: "todo",
                        label: "TO-DO",
                      },
                      {
                        value: "inprogress",
                        label: "IN-PROGRESS",
                      },
                      {
                        value: "completed",
                        label: "COMPLETED",
                      },
                    ]}
                  />
                </Form.Item>

                <div className="w-full">
            <Upload {...props} className="w-full">
              <Button className="w-full">Click to Upload</Button>
            </Upload>
          </div>
          <div>
          <Button htmlType="submit">Create</Button>
        </div>
              </Form>
            </div>
          </div>

        </div>

        
      </Modal>
    </>
  );
};

export default DataView;
