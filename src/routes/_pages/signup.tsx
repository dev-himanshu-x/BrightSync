import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useEffect } from "react";

export const Route = createFileRoute("/_pages/signup")({
  component: Signup,
});

type FieldType = {
  name: string;
  username: string;
  password: string;
  role: "hr" | "employee";
};

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      navigate({
        to: "/$userId",
        params: { userId: user.id },
      });
    }
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    axios
      .get("http://localhost:3333/users", {
        params: { username: values.username },
      })
      .then((response) => {
        if (response.data.length > 0) {
          message.error("Username already exists");
          return;
        }

        const newUser = {
          name: values.name,
          username: values.username,
          password: values.password,
          role: values.role,
        };

        axios.post("http://localhost:3333/users", newUser).then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          message.success("Account created successfully");
          navigate({
            to: "/$userId",
            params: { userId: res.data.id },
          });
        });
      });
  };

  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-275 h-162.5 bg-white rounded-3xl shadow-xl flex overflow-hidden">
        <div className="md:flex hidden">
          <img src="/image.png" />
        </div>

        <div className="w-auto md:w-1/2 flex flex-col justify-center px-16">
          <h1 className="text-3xl font-bold mb-10">Create Account</h1>

          <Form layout="vertical" name="signup" onFinish={onFinish}>
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input size="large" placeholder="Enter your name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter a username" }]}
            >
              <Input size="large" placeholder="Choose a username" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter a password" }]}
            >
              <Input.Password size="large" placeholder="Enter password" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                size="large"
                placeholder="Select your role"
                options={[
                  { label: "HR", value: "hr" },
                  { label: "Employee", value: "employee" },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
