import { D as redirect } from "../_libs/tanstack__router-core.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, u as useNavigate, L as Link, H as HeadContent, S as Scripts } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { F as Form, I as Input, S as Select, B as Button, s as staticMethods } from "../_libs/antd.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tiny-warning.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/form-data.mjs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "http2";
import "../_libs/follow-redirects.mjs";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "zlib";
import "events";
import "../_libs/rc-component__resize-observer.mjs";
import "../_libs/rc-component__util.mjs";
import "../_libs/react-is.mjs";
import "../_libs/clsx.mjs";
import "../_libs/ant-design__cssinjs.mjs";
import "../_libs/emotion__hash.mjs";
import "../_libs/emotion__unitless.mjs";
import "../_libs/stylis.mjs";
import "../_libs/ant-design__cssinjs-utils.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/rc-component__tooltip.mjs";
import "../_libs/rc-component__trigger.mjs";
import "../_libs/rc-component__portal.mjs";
import "../_libs/rc-component__motion.mjs";
import "../_libs/rc-component__picker.mjs";
import "../_libs/dayjs.mjs";
import "../_libs/rc-component__checkbox.mjs";
import "../_libs/rc-component__select.mjs";
import "../_libs/rc-component__overflow.mjs";
import "../_libs/rc-component__virtual-list.mjs";
import "../_libs/ant-design__fast-color.mjs";
import "../_libs/ant-design__icons.mjs";
import "../_libs/ant-design__icons-svg.mjs";
import "../_libs/ant-design__colors.mjs";
import "../_libs/rc-component__form.mjs";
import "../_libs/rc-component__async-validator.mjs";
import "../_libs/scroll-into-view-if-needed.mjs";
import "../_libs/compute-scroll-into-view.mjs";
import "../_libs/rc-component__input.mjs";
import "../_libs/rc-component__textarea.mjs";
import "../_libs/rc-component__notification.mjs";
import "../_libs/rc-component__dialog.mjs";
import "../_libs/rc-component__pagination.mjs";
import "../_libs/rc-component__color-picker.mjs";
const appCss = "/assets/styles-DlVZa-65.css";
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const Route$3 = createFileRoute("/")({
  beforeLoad: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      throw redirect({ to: "/$userId", params: { userId: user.id } });
    }
    throw redirect({ to: "/signin" });
  }
});
const Route$2 = createFileRoute("/_pages/signup")({
  component: Signup
});
function Signup() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      navigate({
        to: "/$userId",
        params: { userId: user.id }
      });
    }
  }, []);
  const onFinish = (values) => {
    axios.get("http://localhost:3333/users", {
      params: { username: values.username }
    }).then((response) => {
      if (response.data.length > 0) {
        staticMethods.error("Username already exists");
        return;
      }
      const newUser = {
        name: values.name,
        username: values.username,
        password: values.password,
        role: values.role
      };
      axios.post("http://localhost:3333/users", newUser).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        staticMethods.success("Account created successfully");
        navigate({
          to: "/$userId",
          params: { userId: res.data.id }
        });
      });
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl w-full bg-white rounded-2xl shadow-lg flex overflow-hidden min-h-[500px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex md:w-1/2 items-center justify-center bg-gray-50 p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/image.png",
        className: "max-w-full max-h-full object-contain",
        alt: "Signup illustration"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Create Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-8", children: "Sign up to get started" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { layout: "vertical", name: "signup", onFinish, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form.Item,
          {
            label: "Name",
            name: "name",
            rules: [{ required: true, message: "Please enter your name" }],
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { size: "large", placeholder: "Enter your name" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form.Item,
          {
            label: "Username",
            name: "username",
            rules: [{ required: true, message: "Please enter a username" }],
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { size: "large", placeholder: "Choose a username" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form.Item,
          {
            label: "Password",
            name: "password",
            rules: [{ required: true, message: "Please enter a password" }],
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Password, { size: "large", placeholder: "Choose a password" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form.Item,
          {
            label: "Role",
            name: "role",
            rules: [{ required: true, message: "Please select a role" }],
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Select,
              {
                size: "large",
                placeholder: "Select your role",
                options: [
                  { label: "HR", value: "hr" },
                  { label: "Employee", value: "employee" }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "primary",
            htmlType: "submit",
            size: "large",
            className: "w-full",
            children: "Sign Up"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-gray-500", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signin", className: "text-blue-500", children: "Sign In" })
      ] })
    ] })
  ] }) });
}
const Route$1 = createFileRoute("/_pages/signin")({
  component: Login
});
function Login() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      navigate({
        to: "/$userId",
        params: {
          userId: user.id
        }
      });
    }
  }, []);
  const onFinish = (values) => {
    axios.get("http://localhost:3333/users", {
      params: {
        username: values.username
      }
    }).then((response) => {
      if (response.data.length === 0) {
        staticMethods.error("User not found");
        return;
      }
      const user = response.data[0];
      if (user.password !== values.password) {
        staticMethods.error("Invalid password");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      staticMethods.success("Login successful");
      navigate({
        to: "/$userId",
        params: { userId: user.id }
      });
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl w-full bg-white rounded-2xl shadow-lg flex overflow-hidden min-h-[500px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex md:w-1/2 items-center justify-center bg-gray-50 p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/image.png",
        className: "max-w-full max-h-full object-contain",
        alt: "Login illustration"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Welcome Back!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-8", children: "Sign in to your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Form,
        {
          layout: "vertical",
          name: "login",
          onFinish,
          onFinishFailed,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Form.Item,
              {
                label: "Username",
                name: "username",
                rules: [{ required: true, message: "Please enter username" }],
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { size: "large", placeholder: "Enter username" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Form.Item,
              {
                label: "Password",
                name: "password",
                rules: [{ required: true, message: "Please enter password" }],
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Password, { size: "large", placeholder: "Enter password" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "primary",
                htmlType: "submit",
                size: "large",
                className: "w-full",
                children: "Sign In"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-gray-500", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-blue-500", children: "Sign Up" })
      ] })
    ] })
  ] }) });
}
const $$splitComponentImporter = () => import("../_userId-532OoPmB.mjs");
const Route = createFileRoute("/_pages/$userId")({
  beforeLoad: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      throw redirect({
        to: "/signin"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const PagesSignupRoute = Route$2.update({
  id: "/_pages/signup",
  path: "/signup",
  getParentRoute: () => Route$4
});
const PagesSigninRoute = Route$1.update({
  id: "/_pages/signin",
  path: "/signin",
  getParentRoute: () => Route$4
});
const PagesUserIdRoute = Route.update({
  id: "/_pages/$userId",
  path: "/$userId",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  PagesUserIdRoute,
  PagesSigninRoute,
  PagesSignupRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router;
}
export {
  getRouter
};
