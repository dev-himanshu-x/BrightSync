import { D as redirect } from "../_libs/tanstack__router-core.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, u as useNavigate, H as HeadContent, S as Scripts } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { F as Form, I as Input, B as Button, s as staticMethods, L as Layout } from "../_libs/antd.mjs";
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
import "../_libs/rc-component__motion.mjs";
import "../_libs/rc-component__util.mjs";
import "../_libs/react-is.mjs";
import "../_libs/clsx.mjs";
import "../_libs/ant-design__cssinjs.mjs";
import "../_libs/emotion__hash.mjs";
import "../_libs/emotion__unitless.mjs";
import "../_libs/stylis.mjs";
import "../_libs/ant-design__cssinjs-utils.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/rc-component__menu.mjs";
import "../_libs/rc-component__overflow.mjs";
import "../_libs/rc-component__resize-observer.mjs";
import "../_libs/rc-component__trigger.mjs";
import "../_libs/rc-component__portal.mjs";
import "../_libs/ant-design__icons.mjs";
import "../_libs/ant-design__icons-svg.mjs";
import "../_libs/ant-design__colors.mjs";
import "../_libs/ant-design__fast-color.mjs";
import "../_libs/rc-component__picker.mjs";
import "../_libs/dayjs.mjs";
import "../_libs/rc-component__checkbox.mjs";
import "../_libs/rc-component__select.mjs";
import "../_libs/rc-component__virtual-list.mjs";
import "../_libs/rc-component__form.mjs";
import "../_libs/rc-component__async-validator.mjs";
import "../_libs/scroll-into-view-if-needed.mjs";
import "../_libs/compute-scroll-into-view.mjs";
import "../_libs/rc-component__tooltip.mjs";
import "../_libs/rc-component__input.mjs";
import "../_libs/rc-component__textarea.mjs";
import "../_libs/rc-component__notification.mjs";
import "../_libs/rc-component__pagination.mjs";
import "../_libs/rc-component__color-picker.mjs";
import "../_libs/rc-component__dialog.mjs";
const appCss = "/assets/styles-DkIljwcm.css";
const Route$2 = createRootRoute({
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
const Route$1 = createFileRoute("/_pages/signin")({
  component: Login
});
function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    axios.get("http://localhost:3333/users", {
      params: {
        username: values.username
      }
    }).then((response) => {
      if (response.data.length > 0) {
        const user = response.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        staticMethods.success("Login successful");
        navigate({
          to: "/$userId",
          params: { userId: user.id }
        });
      } else {
        staticMethods.error("User not found");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-gray-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-275 h-162.5 bg-white rounded-3xl shadow-xl flex overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:flex hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/image.png" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-auto md:w-1/2 flex flex-col justify-center px-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-10", children: "Welcome Back !" }),
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
      )
    ] })
  ] }) });
}
const $$splitComponentImporter = () => import("../_userId-CrS8VcDs.mjs");
const {
  Header
} = Layout;
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
const PagesSigninRoute = Route$1.update({
  id: "/_pages/signin",
  path: "/signin",
  getParentRoute: () => Route$2
});
const PagesUserIdRoute = Route.update({
  id: "/_pages/$userId",
  path: "/$userId",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  PagesUserIdRoute,
  PagesSigninRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
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
