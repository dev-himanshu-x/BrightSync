import { Calendar } from "antd";
import type { CalendarProps } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

type Task = {
  id?: string;
  task: string;
  assignedTo: string;
  assignedBy?: string;
  status: "pending" | "completed";
  assignedDate: string;
  deadline?: string;
};

type Props = {
  tasks: Task[];
  onSelectDate?: (date: Dayjs) => void;
};

const SELF_ASSIGNED_COLOR = { bg: "#d1fae5", text: "#047857", border: "#6ee7b7" };
const HR_ASSIGNED_COLOR = { bg: "#dbeafe", text: "#1d4ed8", border: "#93c5fd" };
const COMPLETED_COLOR = { bg: "#f3f4f6", text: "#9ca3af", border: "#d1d5db" };
const OVERDUE_COLOR = { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" };

function getColorForTask(task: Task) {
  if (task.status === "completed") return COMPLETED_COLOR;
  if (task.deadline && dayjs(task.deadline).isBefore(dayjs())) return OVERDUE_COLOR;
  if (task.assignedBy && task.assignedBy === task.assignedTo) return SELF_ASSIGNED_COLOR;
  return HR_ASSIGNED_COLOR;
}

const Calender: React.FC<Props> = ({ tasks, onSelectDate }) => {
  const getListData = (value: Dayjs) => {
    const formattedDate = value.format("YYYY-MM-DD");
    return tasks.filter((task) => task.assignedDate === formattedDate);
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      const dayTasks = getListData(current);
      return (
        <div className="flex flex-col gap-0.5">
          {dayTasks.map((task, index) => {
            const color = getColorForTask(task);
            return (
              <div
                key={task.id || index}
                style={{
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
                  fontWeight: 500,
                  textDecoration: task.status === "completed" ? "line-through" : "none",
                }}
              >
                {task.task}
              </div>
            );
          })}
        </div>
      );
    }
    return info.originNode;
  };

  const disabledDate = (current: Dayjs) => {
    return current.isBefore(dayjs(), "day");
  };

  const handleSelect = (date: Dayjs) => {
    if (disabledDate(date)) return;
    onSelectDate?.(date);
  };

  return (
    <Calendar
      cellRender={cellRender}
      onSelect={handleSelect}
      disabledDate={disabledDate}
      className="calender"
    />
  );
};

export default Calender;
