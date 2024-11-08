import React from "react";
import { useDrop } from "react-dnd";

export default function Column({ children, taskList, setTaskList }) {
  // eslint-disable-next-line no-unused-vars
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      const draggedTask = item.task;

      setTaskList((prevTasks) => {
        const updatedTasks = [...prevTasks];

        const taskExists = updatedTasks.some(
          (task) => task.taskID === draggedTask.taskID
        );
        if (!taskExists) {
          updatedTasks.push(draggedTask);
        }

        // Update local storage
        localStorage.setItem("yourTaskListKey", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="flex-1" ref={drop}>
      {children}
    </div>
  );
}
