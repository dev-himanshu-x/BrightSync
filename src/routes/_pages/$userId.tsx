import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  Modal,
  Form,
  Input,
  Button,
  message,
  Avatar,
  Tag,
  Dropdown,
  DatePicker,
  Checkbox,
  Popconfirm,
} from "antd";
import {
  LogoutOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import dayjs, { Dayjs } from "dayjs";
import Calender from "@/components/calender";
import { useParams } from "@tanstack/react-router";

type User = {
  id: string;
  name: string;
  role: "hr" | "employee";
};

type Task = {
  id?: string;
  task: string;
  assignedTo: string;
  assignedBy: string;
  status: "pending" | "completed";
  assignedDate: string;
  deadline: string;
};

const base_url = "http://localhost:3333";

export const Route = createFileRoute("/_pages/$userId")({
  beforeLoad: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      throw redirect({ to: "/signin" });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  const params = useParams({ from: "/_pages/$userId" });
  const initialEmployeeId = params.userId === "hr1" ? "" : params.userId;
  const navigate = useNavigate();
  const loggedUser: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(
    initialEmployeeId,
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    axios.get(base_url + "/users").then((res) => {
      setUsers(res.data);
    });
    refreshTasks();
  }, []);

  const refreshTasks = () => {
    axios.get(base_url + "/tasks").then((res) => {
      setTasks(res.data);
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate({ to: "/signin" });
  };

  const handleEmployeeChange = (value?: string) => {
    if (!value) {
      return;
    }

    const selectedUser = users.find((u) => u.id === value);
    if (!selectedUser) return;
    setSelectedEmployeeId(value);
    navigate({
      to: "/$userId",
      params: {
        userId: selectedUser.id,
      },
    });
  };

  const onSelectDate = (date: Dayjs) => {
    setSelectedDate(date);
    if (loggedUser.role === "hr" && !selectedEmployeeId) {
      message.warning("Please select a user first");
      return;
    }
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    const assignTo =
      loggedUser.role === "employee" ? loggedUser.id : selectedEmployeeId;
    if (!assignTo) return;
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const deadline = values.deadline
      ? values.deadline.format("YYYY-MM-DD HH:mm")
      : formattedDate;
    const exists = tasks.find(
      (t) =>
        t.assignedTo === assignTo &&
        t.assignedDate === formattedDate &&
        t.task === values.taskTitle,
    );
    if (exists) {
      message.error("Same Task Already Exist");
      setIsModalOpen(false);
      form.resetFields();
      return;
    }
    const newTask: Task = {
      task: values.taskTitle,
      assignedTo: assignTo,
      assignedBy: loggedUser.id,
      status: "pending",
      assignedDate: formattedDate,
      deadline: deadline,
    };
    axios.post(base_url + "/tasks", newTask).then(() => {
      form.resetFields();
      setIsModalOpen(false);
      refreshTasks();
    });
  };

  const handleDeleteTask = (taskId: string) => {
    axios.delete(base_url + "/tasks/" + taskId).then(() => {
      message.success("Task deleted");
      refreshTasks();
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    editForm.setFieldsValue({
      taskTitle: task.task,
      deadline: task.deadline ? dayjs(task.deadline) : undefined,
    });
    setIsEditModalOpen(true);
  };

  const onEditFinish = (values: any) => {
    if (!editingTask?.id) return;
    const deadline = values.deadline
      ? values.deadline.format("YYYY-MM-DD HH:mm")
      : editingTask.deadline;
    axios
      .patch(base_url + "/tasks/" + editingTask.id, {
        task: values.taskTitle,
        deadline: deadline,
      })
      .then(() => {
        editForm.resetFields();
        setIsEditModalOpen(false);
        setEditingTask(null);
        refreshTasks();
      });
  };

  const handleToggleComplete = (task: Task) => {
    if (!task.id) return;
    axios
      .patch(base_url + "/tasks/" + task.id, {
        status: task.status === "completed" ? "pending" : "completed",
      })
      .then(() => {
        refreshTasks();
      });
  };

  const filteredTasks =
    loggedUser.role === "hr"
      ? tasks.filter((task) => task.assignedTo === selectedEmployeeId)
      : tasks.filter((task) => task.assignedTo === loggedUser.id);

  const upcomingTasks = filteredTasks
    .sort((a, b) => dayjs(a.assignedDate).diff(dayjs(b.assignedDate)));

  const getTaskColor = (task: Task) => {
    if (task.status === "completed") {
      return { bg: "#f3f4f6", border: "#d1d5db" }; // grey
    }
    if (task.deadline && dayjs(task.deadline).isBefore(dayjs())) {
      return { bg: "#fee2e2", border: "#fca5a5" }; // red
    }
    if (task.assignedBy && task.assignedBy === task.assignedTo) {
      return { bg: "#d1fae5", border: "#6ee7b7" }; // green - self assigned
    }
    return { bg: "#dbeafe", border: "#93c5fd" }; // blue - HR assigned
  };

  const profileMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sign out",
      danger: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-6 px-6 h-16 max-w-[1440px] mx-auto">
          {/* Left - Logo */}
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 34,
                height: 34,
                background:
                  "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
                borderRadius: 10,
              }}
            >
              <CalendarOutlined style={{ color: "#fff", fontSize: 16 }} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Bright
            </span>
          </div>

          {/* Right - Profile */}
          <Dropdown
            menu={{
              items: profileMenuItems,
              onClick: ({ key }) => {
                if (key === "logout") handleLogout();
              },
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-xl border border-transparent hover:border-gray-200 hover:bg-white transition-all">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800 leading-tight">
                  {loggedUser.name}
                </div>
                <div className="text-xs text-gray-400 leading-tight">
                  {loggedUser.role === "hr" ? "HR Manager" : "Employee"}
                </div>
              </div>
              <Avatar
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  fontWeight: 600,
                }}
                size={36}
              >
                {loggedUser.name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </div>
          </Dropdown>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-[1440px] mx-auto lg:items-start">
        {/* Calendar Section */}
        <div className="flex-1 min-w-0">
          <Calender tasks={filteredTasks} onSelectDate={onSelectDate} />
        </div>

        {/* Right Sidebar - matches calendar height */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 lg:max-h-[calc(100vh-6rem)] lg:sticky lg:top-[5rem]">
          {/* Employee Select - for HR only */}
          {loggedUser.role === "hr" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                Employee
              </label>
              <Select
                allowClear
                value={selectedEmployeeId || undefined}
                placeholder="Select Employee"
                style={{ width: "100%" }}
                size="large"
                onChange={handleEmployeeChange}
                options={users
                  .filter((u) => u.role === "employee")
                  .map((emp) => ({
                    label: emp.name,
                    value: String(emp.id),
                  }))}
              />
            </div>
          )}

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 min-h-0 flex flex-col">
            <div className="px-4 pt-4 pb-3 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-800">
                Upcoming Tasks
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Click on a date in the calendar to add a task
              </p>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">

              {upcomingTasks.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                  No upcoming tasks
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => {
                    const taskDate = dayjs(task.assignedDate);
                    const isToday = taskDate.isSame(dayjs(), "day");
                    const isOverdue =
                      task.status !== "completed" &&
                      task.deadline &&
                      dayjs(task.deadline).isBefore(dayjs());
                    const taskColor = getTaskColor(task);
                    return (
                      <div
                        key={task.id || index}
                        className={`p-3 rounded-lg border transition-colors ${
                          task.status === "completed"
                            ? "border-gray-200 bg-gray-50"
                            : isOverdue
                              ? "border-red-200 bg-red-50/30"
                              : "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30"
                        }`}
                        style={{
                          borderLeft: `4px solid ${taskColor.border}`,
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            {loggedUser.role === "employee" && (
                              <Checkbox
                                checked={task.status === "completed"}
                                onChange={() => handleToggleComplete(task)}
                                className="mt-0.5"
                              />
                            )}
                            <p
                              className={`text-sm font-medium leading-snug ${
                                task.status === "completed"
                                  ? "text-gray-400 line-through"
                                  : isOverdue
                                    ? "text-red-600"
                                    : "text-gray-800"
                              }`}
                            >
                              {task.task}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {isToday && task.status !== "completed" && (
                              <Tag color="blue" className="text-xs">
                                Today
                              </Tag>
                            )}
                            {isOverdue && (
                              <Tag color="red" className="text-xs">
                                Overdue
                              </Tag>
                            )}
                            {task.status === "completed" && (
                              <Tag color="default" className="text-xs">
                                Done
                              </Tag>
                            )}
                            {loggedUser.role === "hr" && (
                              <>
                                <EditOutlined
                                  className="text-gray-400 hover:text-indigo-500 cursor-pointer"
                                  style={{ fontSize: 16 }}
                                  onClick={() => handleEditTask(task)}
                                />
                                <Popconfirm
                                  title="Delete this task?"
                                  onConfirm={() =>
                                    task.id && handleDeleteTask(task.id)
                                  }
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined
                                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                                    style={{ fontSize: 16 }}
                                  />
                                </Popconfirm>
                              </>
                            )}
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-2 mt-2 ${loggedUser.role === "employee" ? "ml-6" : ""}`}
                        >
                          <CalendarOutlined
                            className={`text-xs ${isOverdue ? "text-red-400" : "text-gray-400"}`}
                          />
                          <span
                            className={`text-xs ${isOverdue ? "text-red-500" : "text-gray-500"}`}
                          >
                            {taskDate.format("ddd, MMM D")}
                          </span>
                        </div>
                        {task.deadline && (
                          <div
                            className={`flex items-center gap-2 mt-1 ${loggedUser.role === "employee" ? "ml-6" : ""}`}
                          >
                            <ClockCircleOutlined
                              className={`text-xs ${isOverdue ? "text-red-400" : "text-gray-400"}`}
                            />
                            <span
                              className={`text-xs ${isOverdue ? "text-red-500" : "text-gray-500"}`}
                            >
                              Deadline:{" "}
                              {dayjs(task.deadline).format("ddd, MMM D h:mm A")}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal
        title="Assign Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p className="text-sm text-gray-500 mb-4">
          {selectedDate.format("dddd, MMMM D, YYYY")}
        </p>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="taskTitle" rules={[{ required: true }]}>
            <Input placeholder="Task title" size="large" />
          </Form.Item>

          <Form.Item
            name="deadline"
            rules={[{ required: true, message: "Please select a deadline" }]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              size="large"
              style={{ width: "100%" }}
              disabledDate={(current) => current.isBefore(selectedDate, "day")}
              placeholder="Select deadline"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            style={{ backgroundColor: "#4f46e5" }}
          >
            Assign Task
          </Button>
        </Form>
      </Modal>

      {/* Edit Task Modal - HR only */}
      <Modal
        title="Edit Task"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form form={editForm} onFinish={onEditFinish}>
          <Form.Item name="taskTitle" rules={[{ required: true }]}>
            <Input placeholder="Task title" size="large" />
          </Form.Item>

          <Form.Item
            name="deadline"
            rules={[{ required: true, message: "Please select a deadline" }]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              size="large"
              style={{ width: "100%" }}
              placeholder="Select deadline"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            style={{ backgroundColor: "#4f46e5" }}
          >
            Update Task
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
