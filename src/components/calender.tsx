import React from "react";
import { Badge, Calendar } from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import type { Dayjs } from "dayjs";

type Task = {
  id?: string;
  title: string;
  assignedTo: string;
  completed: boolean;
  dueDate: string;
};

type Props = {
  tasks: Task[];
  onSelectDate?: (date: Dayjs) => void;
};

const Calender: React.FC<Props> = ({ tasks, onSelectDate }) => {
  const getListData = (
    value: Dayjs
  ): { type: BadgeProps["status"]; content: string }[] => {
    const formattedDate = value.format("YYYY-MM-DD");

    return tasks
      .filter((task) => task.dueDate === formattedDate)
      .map((task) => ({
        type: task.completed ? "success" : "warning",
        content: task.title,
      }));
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      const listData = getListData(current);

      return (
        <ul style={{ padding: 0 }}>
          {listData.map((item, index) => (
            <li key={index}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    }
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} onSelect={onSelectDate} className="calender"/>;
};

export default Calender;
