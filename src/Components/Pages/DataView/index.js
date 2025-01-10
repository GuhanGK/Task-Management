import React, { useEffect, useState } from "react";
import ProfileImg from "../../../assets/profileImg.svg";
import { Button, DatePicker, Form, Input, message, Modal, Select, Spin, Upload } from "antd";
import ListTableView from "../ListView";
import CardView from "../CardView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../../Redux/Auth";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDatabase, ref, push, remove, update } from "firebase/database";

import {ReactComponent as TaskLogoIcon} from '../../../assets/TaskLogoIcon.svg' 
import {ReactComponent as BoardIcon} from '../../../assets/board_icon.svg' 
import {ReactComponent as ListIcon} from '../../../assets/list_icon.svg' 

import moment from "moment";
import { useSelector } from "react-redux";
import { database } from "../../FireBase/Firebase";
import { setEditTableData, setGetTasksData } from "../../../Redux/Tracking";
import fetchTasksFromFirebase from "../../FireBase/fetchData";
import dayjs from "dayjs";

// const dbRef = ref(database);

const DataView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [category, setCategory] = useState("");
  const [nameData, setNameData] = useState('')
  const EditData = useSelector((state) => state.taskTracking.editTableData)
  const getTasksData = useSelector((state) => state.taskTracking.getTasksData)
  
  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    navigate("/login");
  };

  const [taskTableData, setTaskTableData] = useState({
    todoData: [],
    inProgressData: [],
    completeData: []
  })

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    setLoading(true)
    const fetchedTasks = await fetchTasksFromFirebase();
    if(fetchedTasks){
      setLoading(false)
    }
    setTasks(fetchedTasks);
    dispatch(setGetTasksData(fetchedTasks))
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const handleClickDelete = async (record) => {
    if (!record.id) {
      alert("Record ID is missing. Cannot delete.");
      return;
    }
  
    try {
      const confirmation = window.confirm("Are you sure you want to delete this item?");
      if (confirmation) {
        const db = getDatabase(); // Initialize Realtime Database instance
        const recordRef = ref(db, `tasks/${record.id}`); // Replace "tasks" with your node name
        await remove(recordRef);
        alert("Record deleted successfully!");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting record: ", error.message);
      alert(`Failed to delete the record. Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const todoData = getTasksData?.filter((item) => item.status === 'todo')
    const inProgressData = getTasksData?.filter((item) => item.status === "inprogress")
    const completeData = getTasksData?.filter((item) => item.status === "completed")
    const todo = getTasksData?.filter((item) => item.status)
    setTaskTableData((prev) => ({
      ...prev,
      todoData: todoData,
      inProgressData: inProgressData,
      completeData: completeData
    }))
  }, [tasks, dispatch])

  console.log("tasks-->", tasks)
  const [form] = Form.useForm()
  console.log("EditData---->", EditData)
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const addTaskToFirebase = async (taskData) => {
    try {
      const tasksRef = ref(database, "tasks"); // Reference to the "tasks" node
      await push(tasksRef, taskData); // Push the new task
      message.success("Task added successfully!");
      setCategory('');
      setNameData('')
      form.resetFields()
      setIsModalOpen(false)
      fetchData();
    } catch (error) {
      message.error("Error adding task:", error);
      setIsModalOpen(false)
    }
  };


  const updateTaskInFirebase = async (taskId, updatedTaskData) => {
    try {
      const taskRef = ref(database, `tasks/${taskId}`); // Reference to the specific task
      await update(taskRef, updatedTaskData); // Update the task with the new data
      message.success("Task updated successfully!");
      setCategory('');
      setNameData('');
      form.resetFields();
      dispatch(setEditTableData({}))
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      message.error("Error updating task:", error.message);
      setIsModalOpen(false);
    }
  };

  // const handleUpdate = (values) => {
  //   const taskId = EditData?.id; 
  //   const date = values.dueOn ? values.dueOn.format('DD-MM-YYYY') : null;
  //   const plainText = editorValue ? editorValue.replace(/<\/?[^>]+(>|$)/g, "") : "";

  //   const taskData = {
  //     task: nameData,
  //     description: plainText,
  //     dueOn: date,
  //     status: values.taskStatus,
  //     category: category,
  //     createdAt: new Date().toISOString(),
  //   };
  //   updateTaskInFirebase(taskId, updatedTaskData);
  // };
  
  const handleCloseFormModal = () => {
    setCategory('');
    setNameData('')
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleFormSubmit = (values) => {
    const date = values.dueOn ? values.dueOn.format('DD-MM-YYYY') : null;
    const plainText = editorValue ? editorValue.replace(/<\/?[^>]+(>|$)/g, "") : "";
    const taskId = EditData?.id; 
    const taskData = {
      task: nameData,
      description: plainText,
      dueOn: date,
      status: values.taskStatus,
      category: category,
      createdAt: new Date().toISOString(),
    };
    console.log("taskData--->", taskData)
    if(EditData?.id) {
      updateTaskInFirebase(taskId, taskData)
    }else{
      addTaskToFirebase(taskData);
    }
    
  };

  useEffect(() => {
    if(EditData){
      form.setFieldsValue({
        dueOn: EditData.dueOn ? dayjs(EditData.dueOn, "DD-MM-YYYY") : null,
        taskStatus: EditData.status,
      });
      // form.setFieldsValue(EditData)
      setNameData(EditData.task)
      setCategory(EditData.category)
      setEditorValue(EditData.description)
    }
  }, [EditData, form])

  console.log("getValues-->", form.getFieldsValue())

  const handleClickAdd = () => {
    dispatch(setEditTableData({}))
    setIsModalOpen(!isModalOpen)
  }
  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-between flex-col">
          <h3 className="flex items-center gap-2 text-[#2F2F2F] text-[24px] font-semibold">
            <TaskLogoIcon /> TaskBuddy
          </h3>
          <div className="flex gap-6">
            <p
              className={
                activeTab === 1
                  ? "w-fit border-b border-black flex items-center gap-2 text-[16px] font-semibold cursor-pointer"
                  : "flex items-center gap-2 text-[16px] font-semibold cursor-pointer"
              }
              onClick={() => setActiveTab(1)}
            >
              <ListIcon /> List
            </p>
            <p
              className={
                activeTab === 2
                  ? "flex items-center gap-2 w-fit border-b border-black text-[16px] font-semibold cursor-pointer"
                  : "flex items-center gap-2 text-[16px] font-semibold cursor-pointer"
              }
              onClick={() => setActiveTab(2)}
            >
              <BoardIcon /> Board
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
            onClick={handleClickAdd}
            className="w-[152px] h-[36px] rounded-[60px] bg-[#7B1984] text-[#fff] text-[14px] font-semibold"
          >
            ADD TASK
          </Button>
        </div>
      </div>
      {activeTab === 1 && (
        loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : (
          <div className="mt-4">
            <ListTableView setIsModalOpen={setIsModalOpen} taskTableData={taskTableData} handleClickDelete={handleClickDelete}/>
          </div>
        )   
      )}
      {activeTab === 2 && (
        loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : (
          <div className="mt-4">
            <CardView taskTableData={taskTableData} setIsModalOpen={setIsModalOpen} handleClickDelete={handleClickDelete}/>
          </div>
        )
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        title="Create Task"
        width={700}
        footer={false}
        style={{
          top: 12
        }}
      >
        <div className="p-4">
          <Input name='taskName' value={nameData ? nameData : ""} onChange={(e) => setNameData(e.target.value)}/>
          <ReactQuill
            theme="snow" // Choose the theme: 'snow' or 'bubble'
            value={editorValue} // Controlled input
            onChange={(content) => setEditorValue(content)}  // Update the state on text change
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
          <div className="flex justify-between h-[270px]">
            
            <div className="flex items-center">
              <Form
                form={form}
                layout="vertical"
                className="flex gap-3 flex-wrap"
                onFinish={handleFormSubmit}
              >
                <div className="flex flex-col gap-3">
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
                  <DatePicker className="w-[200px] h-[32px]" format="DD-MM-YYYY" />
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
                    className="filter_input_container"
                    name="taskStatus"
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

                <div className="file_upload_container mb-4">
                  <Upload {...props} className="!w-full">
                    <Button className="!w-full">Click to Upload</Button>
                  </Upload>
                </div>
                <br/>
              <div className="flex justify-end w-full py-4 pe-3 gap-3 mt-4 absolute bottom-0 left-0 bg-[#F1F1F1]">
              <Button onClick={handleCloseFormModal} className="w-[100px] h-[40px] text-[14px] font-bold rounded-[40px]">Cancel</Button>
            <Button htmlType="submit" className="w-[100px] h-[40px] text-[14px] text-[#fff] font-bold bg-[#7B1984] rounded-[40px]">Create</Button>
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
