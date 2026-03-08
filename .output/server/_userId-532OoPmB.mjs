import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { a as axios } from "./_libs/axios.mjs";
import { d as useParams, u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { d as dayjs } from "./_libs/dayjs.mjs";
import { F as Form, A as Avatar, B as Button, S as Select, s as staticMethods, T as Tag, M as Modal, I as Input, C as Calendar } from "./_libs/antd.mjs";
import { l as RefIcon, m as RefIcon$1, n as RefIcon$2, o as RefIcon$3, p as RefIcon$4 } from "./_libs/ant-design__icons.mjs";
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
import "./_libs/rc-component__resize-observer.mjs";
import "./_libs/rc-component__util.mjs";
import "./_libs/react-is.mjs";
import "./_libs/clsx.mjs";
import "./_libs/ant-design__cssinjs.mjs";
import "./_libs/emotion__hash.mjs";
import "./_libs/emotion__unitless.mjs";
import "./_libs/stylis.mjs";
import "./_libs/ant-design__cssinjs-utils.mjs";
import "./_libs/babel__runtime.mjs";
import "./_libs/rc-component__tooltip.mjs";
import "./_libs/rc-component__trigger.mjs";
import "./_libs/rc-component__portal.mjs";
import "./_libs/rc-component__motion.mjs";
import "./_libs/rc-component__picker.mjs";
import "./_libs/rc-component__checkbox.mjs";
import "./_libs/rc-component__select.mjs";
import "./_libs/rc-component__overflow.mjs";
import "./_libs/rc-component__virtual-list.mjs";
import "./_libs/ant-design__fast-color.mjs";
import "./_libs/rc-component__form.mjs";
import "./_libs/rc-component__async-validator.mjs";
import "./_libs/scroll-into-view-if-needed.mjs";
import "./_libs/compute-scroll-into-view.mjs";
import "./_libs/rc-component__input.mjs";
import "./_libs/rc-component__textarea.mjs";
import "./_libs/rc-component__notification.mjs";
import "./_libs/rc-component__dialog.mjs";
import "./_libs/rc-component__pagination.mjs";
import "./_libs/ant-design__colors.mjs";
import "./_libs/rc-component__color-picker.mjs";
import "./_libs/ant-design__icons-svg.mjs";
const TASK_COLORS = [
  { bg: "#ede9fe", text: "#6d28d9", border: "#c4b5fd" },
  // violet
  { bg: "#dbeafe", text: "#1d4ed8", border: "#93c5fd" },
  // blue
  { bg: "#d1fae5", text: "#047857", border: "#6ee7b7" },
  // emerald
  { bg: "#fef3c7", text: "#b45309", border: "#fcd34d" },
  // amber
  { bg: "#fce7f3", text: "#be185d", border: "#f9a8d4" },
  // pink
  { bg: "#e0e7ff", text: "#4338ca", border: "#a5b4fc" },
  // indigo
  { bg: "#ccfbf1", text: "#0f766e", border: "#5eead4" },
  // teal
  { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" }
  // red
];
function getColorForTask(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TASK_COLORS[Math.abs(hash) % TASK_COLORS.length];
}
const Calender = ({ tasks, onSelectDate, headerExtra }) => {
  const getListData = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    return tasks.filter((task) => task.dueDate === formattedDate);
  };
  const cellRender = (current, info) => {
    if (info.type === "date") {
      const dayTasks = getListData(current);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5", children: dayTasks.map((task, index) => {
        const color = getColorForTask(task.title);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              backgroundColor: color.bg,
              color: color.text,
              borderLeft: `3px solid ${color.border}`,
              padding: "1px 6px",
              borderRadius: "0 4px 4px 0",
              fontSize: 11,
              lineHeight: "18px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 500
            },
            children: task.title
          },
          task.id || index
        );
      }) });
    }
    return info.originNode;
  };
  const disabledDate = (current) => {
    return current.isBefore(dayjs(), "day");
  };
  const handleSelect = (date) => {
    if (disabledDate(date)) return;
    onSelectDate?.(date);
  };
  const headerRender = (renderProps) => {
    const { value, onChange } = renderProps;
    const monthOptions = [];
    for (let i = 0; i < 12; i++) {
      monthOptions.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i, children: dayjs().month(i).format("MMMM") }, i)
      );
    }
    const year = value.year();
    const yearOptions = [];
    for (let i = year - 5; i <= year + 5; i++) {
      yearOptions.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i, children: i }, i)
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-3 mb-2 border-b border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            className: "bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 outline-none cursor-pointer",
            value: value.month(),
            onChange: (e) => onChange(value.month(Number(e.target.value))),
            children: monthOptions
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            className: "bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 outline-none cursor-pointer",
            value: value.year(),
            onChange: (e) => onChange(value.year(Number(e.target.value))),
            children: yearOptions
          }
        )
      ] }),
      headerExtra && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: headerExtra })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Calendar,
    {
      cellRender,
      onSelect: handleSelect,
      disabledDate,
      headerRender,
      className: "calender"
    }
  );
};
const base_url = "http://localhost:3333";
function DashboardPage() {
  const params = useParams({
    from: "/_pages/$userId"
  });
  const initialEmployeeId = params.userId === "hr1" ? "" : params.userId;
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [users, setUsers] = reactExports.useState([]);
  const [tasks, setTasks] = reactExports.useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = reactExports.useState(initialEmployeeId);
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
    if (selectedEmployeeId || loggedUser.role === "employee") {
      setIsModalOpen(true);
    }
  };
  const onFinish = (values) => {
    const assignTo = loggedUser.role === "employee" ? loggedUser.id : selectedEmployeeId;
    if (!assignTo) return;
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const exists = tasks.find((task) => task.assignedTo === assignTo && task.dueDate === formattedDate && task.title === values.taskTitle);
    if (exists) {
      staticMethods.error("Same Task Already Exist");
      setIsModalOpen(false);
      form.resetFields();
      return;
    }
    const newTask = {
      title: values.taskTitle,
      assignedTo: assignTo,
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
  const upcomingTasks = filteredTasks.filter((t) => !dayjs(t.dueDate).isBefore(dayjs(), "day")).sort((a, b) => dayjs(a.dueDate).diff(dayjs(b.dueDate)));
  const getEmployeeName = (id) => {
    const user = users.find((u) => u.id === id);
    return user?.name || id;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-white border-b border-gray-200 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 px-6 h-16 max-w-[1440px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefIcon, { style: {
          fontSize: 24,
          color: "#4f46e5"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-extrabold text-gray-900", children: [
          "Bright",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-500", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 shrink-0 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { style: {
            backgroundColor: "#4f46e5",
            fontSize: 14,
            fontWeight: 600
          }, size: 36, children: loggedUser.name?.charAt(0)?.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-800", children: loggedUser.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: loggedUser.role === "hr" ? "HR Manager" : "Employee" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefIcon$1, {}), onClick: handleLogout, size: "small", children: "Logout" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-6 p-6 max-w-[1440px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calender, { tasks: filteredTasks, onSelectDate, headerExtra: loggedUser.role === "hr" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, value: selectedEmployeeId || void 0, placeholder: "Select Employee", style: {
        width: 200
      }, onChange: handleEmployeeChange, options: users.filter((u) => u.role === "employee").map((emp) => ({
        label: emp.name,
        value: String(emp.id)
      })) }) : void 0 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full lg:w-80 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefIcon$2, {}), block: true, size: "large", style: {
          backgroundColor: "#4f46e5",
          borderRadius: 8
        }, onClick: () => {
          if (selectedEmployeeId || loggedUser.role === "employee") {
            setSelectedDate(dayjs());
            setIsModalOpen(true);
          } else {
            staticMethods.warning("Please select an employee first");
          }
        }, children: "Add New Task" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4", children: "Upcoming Tasks" }),
          upcomingTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 text-center py-8", children: "No upcoming tasks" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto", children: upcomingTasks.map((task, index) => {
            const taskDate = dayjs(task.dueDate);
            const isToday = taskDate.isSame(dayjs(), "day");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-800 leading-snug", children: task.title }),
                isToday && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "blue", className: "shrink-0 text-xs", children: "Today" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefIcon$3, { className: "text-gray-400 text-xs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: taskDate.format("ddd, MMM D") })
              ] }),
              loggedUser.role === "hr" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefIcon$4, { className: "text-gray-400 text-xs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: getEmployeeName(task.assignedTo) })
              ] })
            ] }, task.id || index);
          }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { title: "Assign Task", open: isModalOpen, onCancel: () => setIsModalOpen(false), footer: null, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-4", children: selectedDate.format("dddd, MMMM D, YYYY") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, onFinish, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "taskTitle", rules: [{
          required: true
        }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Task title", size: "large" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { htmlType: "submit", type: "primary", block: true, size: "large", style: {
          backgroundColor: "#4f46e5"
        }, children: "Assign Task" })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
