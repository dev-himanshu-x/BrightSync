import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useEffect } from "react";

export const Route = createFileRoute("/_pages/signin")({
  component: Login,
});

type FieldType = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("user") || "{}");
    if (isAuth && isAuth !== null) {
      navigate({
        to: "/$userId",
        params: {
          userId: isAuth.id,
        },
      });
    }
  }, []);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    axios
      .get("http://localhost:3333/users", {
        params: {
          username: values.username,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];
          localStorage.setItem("user", JSON.stringify(user));
          message.success("Login successful");
          navigate({
            to: "/$userId",
            params: { userId: user.id },
          });
        } else {
          message.error("User not found");
        }
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log(errorInfo);
  };

  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-275 h-162.5 bg-white rounded-3xl shadow-xl flex overflow-hidden">
        <div className="md:flex hidden">
          <img src="/image.png" />
        </div>

        <div className="w-auto md:w-1/2 flex flex-col justify-center px-16">
          <h1 className="text-3xl font-bold mb-10">Welcome Back !</h1>

          <Form
            layout="vertical"
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input size="large" placeholder="Enter username" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password size="large" placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
