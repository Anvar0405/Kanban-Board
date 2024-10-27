import React from "react";
import { UserContext } from "../Context/userContext";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

export default function Task({ task = {}, index, taskList, setTaskList }) {
  // eslint-disable-next-line no-unused-vars
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index, task: { ...task } }, // Ensure you spread the task object
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function deleteTask() {
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  }

  return (
    <div ref={drag} className="block bg-orange-50 rounded-lg px-2 py-4 my-4">
      <div className="flex justify-between mb-3">
        <h4 className="text-md font-semibold">
          {task?.taskName || "No task name"}
        </h4>
        <div>
          <UserContext.Provider value={[task, index, taskList, setTaskList]}>
            <EditTask />
          </UserContext.Provider>

          <button onClick={deleteTask} className="ml-2.5 cursor-pointer">
            ❌
          </button>
        </div>
      </div>
      <p className="text-sm">{task.taskDescription || "No description"}</p>
    </div>
  );
}
