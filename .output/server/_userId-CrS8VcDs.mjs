import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { a as axios } from "./_libs/axios.mjs";
import { d as useParams, u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { d as dayjs } from "./_libs/dayjs.mjs";
import { F as Form, L as Layout, M as Menu, S as Select, a as Modal, I as Input, B as Button, C as Calendar, s as staticMethods, b as Badge } from "./_libs/antd.mjs";
import { p as RefIcon } from "./_libs/ant-design__icons.mjs";
import "./_libs/form-data.mjs";
import "./_libs/combined-stream.mjs";
import "util";
import "stream";
import "./_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "./_libs/mime-types.mjs";
import "./_libs/mime-db.mjs";
import "./_libs/asynckit.mjs";
import "./_libs/es-set-tostringtag.mjs";
import "./_libs/get-intrinsic.mjs";
import "./_libs/es-object-atoms.mjs";
import "./_libs/es-errors.mjs";
import "./_libs/math-intrinsics.mjs";
import "./_libs/gopd.mjs";
import "./_libs/es-define-property.mjs";
import "./_libs/has-symbols.mjs";
import "./_libs/get-proto.mjs";
import "./_libs/dunder-proto.mjs";
import "./_libs/call-bind-apply-helpers.mjs";
import "./_libs/function-bind.mjs";
import "./_libs/hasown.mjs";
import "./_libs/has-tostringtag.mjs";
import "./_libs/proxy-from-env.mjs";
import "http2";
import "./_libs/follow-redirects.mjs";
import "assert";
import "./_libs/debug.mjs";
import "./_libs/ms.mjs";
import "tty";
import "zlib";
import "events";
import "./_libs/tiny-warning.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/tiny-invariant.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "async_hooks";
import "./_libs/scheduler.mjs";
import "./_libs/isbot.mjs";
import "./_libs/rc-component__motion.mjs";
import "./_libs/rc-component__util.mjs";
import "./_libs/react-is.mjs";
import "./_libs/clsx.mjs";
import "./_libs/ant-design__cssinjs.mjs";
import "./_libs/emotion__hash.mjs";
import "./_libs/emotion__unitless.mjs";
import "./_libs/stylis.mjs";
import "./_libs/ant-design__cssinjs-utils.mjs";
import "./_libs/babel__runtime.mjs";
import "./_libs/rc-component__menu.mjs";
import "./_libs/rc-component__overflow.mjs";
import "./_libs/rc-component__resize-observer.mjs";
import "./_libs/rc-component__trigger.mjs";
import "./_libs/rc-component__portal.mjs";
import "./_libs/ant-design__fast-color.mjs";
import "./_libs/rc-component__picker.mjs";
import "./_libs/rc-component__checkbox.mjs";
import "./_libs/rc-component__select.mjs";
import "./_libs/rc-component__virtual-list.mjs";
import "./_libs/rc-component__form.mjs";
import "./_libs/rc-component__async-validator.mjs";
import "./_libs/scroll-into-view-if-needed.mjs";
import "./_libs/compute-scroll-into-view.mjs";
import "./_libs/rc-component__tooltip.mjs";
import "./_libs/rc-component__input.mjs";
import "./_libs/rc-component__textarea.mjs";
import "./_libs/rc-component__notification.mjs";
import "./_libs/rc-component__pagination.mjs";
import "./_libs/ant-design__colors.mjs";
import "./_libs/rc-component__color-picker.mjs";
import "./_libs/rc-component__dialog.mjs";
import "./_libs/ant-design__icons-svg.mjs";
const Calender = ({ tasks, onSelectDate }) => {
  const getListData = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    return tasks.filter((task) => task.dueDate === formattedDate).map((task) => ({
      type: task.completed ? "success" : "warning",
      content: task.title
    }));
  };
  const cellRender = (current, info) => {
    if (info.type === "date") {
      const listData = getListData(current);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { padding: 0 }, children: listData.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { status: item.type, text: item.content }) }, index)) });
    }
    return info.originNode;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { cellRender, onSelect: onSelectDate, className: "calender" });
};
const {
  Content,
  Sider,
  Header
} = Layout;
const base_url = "http://localhost:3333";
function DashboardPage() {
  const params = useParams({
    from: "/_pages/$userId"
  });
  console.log(params.userId);
  if (params.userId === "hr1") {
    params.userId = "";
  }
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const [users, setUsers] = reactExports.useState([]);
  const [tasks, setTasks] = reactExports.useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = reactExports.useState(params.userId);
  const [selectedDate, setSelectedDate] = reactExports.useState(dayjs());
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [form] = Form.useForm();
  reactExports.useEffect(() => {
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
    navigate({
      to: "/signin"
    });
  };
  const handleEmployeeChange = (value) => {
    if (!value) {
      return;
    }
    const selectedUser = users.find((u) => u.id === value);
    if (!selectedUser) return;
    setSelectedEmployeeId(value);
    navigate({
      to: "/$userId",
      params: {
        userId: selectedUser.id
      }
    });
  };
  const onSelectDate = (date) => {
    setSelectedDate(date);
    if (selectedEmployeeId) {
      setIsModalOpen(true);
    }
  };
  const onFinish = (values) => {
    if (!selectedEmployeeId) return;
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const exists = tasks.find((task) => task.assignedTo === selectedEmployeeId && task.dueDate === formattedDate && task.title === values.taskTitle);
    if (exists) {
      staticMethods.error("Same Task Already Exist");
      setIsModalOpen(false);
      form.resetFields();
      return;
    }
    const newTask = {
      title: values.taskTitle,
      assignedTo: selectedEmployeeId,
      completed: false,
      dueDate: formattedDate
    };
    axios.post(base_url + "/tasks", newTask).then(() => {
      form.resetFields();
      setIsModalOpen(false);
      refreshTasks();
    });
  };
  const filteredTasks = loggedUser.role === "hr" ? tasks.filter((task) => task.assignedTo === selectedEmployeeId) : tasks.filter((task) => task.assignedTo === loggedUser.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { style: {
    minHeight: "100vh"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sider, { theme: "light", collapsible: true, collapsed, onCollapse: setCollapsed, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { items: [{
      key: "logout",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefIcon, {}),
      label: "Logout"
    }], onClick: handleLogout }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { style: {
      margin: 24
    }, children: [
      loggedUser.role === "hr" && /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, value: selectedEmployeeId || void 0, placeholder: "Select Employee", style: {
        width: 220,
        marginBottom: 20
      }, onChange: handleEmployeeChange, options: users.filter((u) => u.role === "employee").map((emp) => ({
        label: emp.name,
        value: String(emp.id)
      })) || null }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calender, { tasks: filteredTasks, onSelectDate }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: "Assign Task", open: isModalOpen, onCancel: () => setIsModalOpen(false), footer: null, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, onFinish, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "taskTitle", rules: [{
          required: true
        }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Task title" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { htmlType: "submit", type: "primary", block: true, children: "Assign Task" })
      ] }) })
    ] }) })
  ] });
}
export {
  DashboardPage as component
};
