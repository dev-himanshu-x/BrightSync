import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Menu,
  Select,
  Modal,
  Form,
  Input,
  Button,
  message,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import dayjs, { Dayjs } from "dayjs";
import Calender from "@/components/calender";
import { useParams } from "@tanstack/react-router";

const { Content, Sider } = Layout;

type User = {
  id: string;
  name: string;
  role: "hr" | "employee";
};

type Task = {
  id?: string;
  title: string;
  assignedTo: string;
  completed: boolean;
  dueDate: string;
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
  if (params.userId === "hr1") {
    params.userId = "";
  }
  const navigate = useNavigate();
  const loggedUser: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(
    params.userId,
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
    if (selectedEmployeeId) {
      setIsModalOpen(true);
    }
  };

  const onFinish = (values: any) => {
    if (!selectedEmployeeId) return;
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const exists = tasks.find(
      (task) =>
        task.assignedTo === selectedEmployeeId &&
        task.dueDate === formattedDate &&
        task.title === values.taskTitle,
    );
    if (exists) {
      message.error("Same Task Already Exist");
      setIsModalOpen(false);
      form.resetFields();
      return;
    }
    const newTask: Task = {
      title: values.taskTitle,
      assignedTo: selectedEmployeeId,
      completed: false,
      dueDate: formattedDate,
    };
    axios.post(base_url + "/tasks", newTask).then(() => {
      form.resetFields();
      setIsModalOpen(false);
      refreshTasks();
    });
  };

  const filteredTasks =
    loggedUser.role === "hr"
      ? tasks.filter((task) => task.assignedTo === selectedEmployeeId)
      : tasks.filter((task) => task.assignedTo === loggedUser.id);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
          onClick={handleLogout}
        />
      </Sider>

      <Layout>
        <Content style={{ margin: 24 }}>
          {loggedUser.role === "hr" && (
            <Select
              allowClear
              value={selectedEmployeeId || undefined}
              placeholder="Select Employee"
              style={{ width: 220, marginBottom: 20 }}
              onChange={handleEmployeeChange}
              options={
                users
                  .filter((u) => u.role === "employee")
                  .map((emp) => ({
                    label: emp.name,
                    value: String(emp.id),
                  })) || null
              }
            />
          )}

          <Calender tasks={filteredTasks} onSelectDate={onSelectDate} />

          <Modal
            title="Assign Task"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form form={form} onFinish={onFinish}>
              <Form.Item name="taskTitle" rules={[{ required: true }]}>
                <Input placeholder="Task title" />
              </Form.Item>

              <Button htmlType="submit" type="primary" block>
                Assign Task
              </Button>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}
