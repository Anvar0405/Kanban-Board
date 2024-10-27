import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/userContext";
import React from "react";

export default function EditTask() {
  const [task, index, taskList, setTaskList] = useContext(UserContext);

  const [editModal, setEditModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setTaskName(task.taskName);
    setTaskDescription(task.taskDescription);
  }, [task]);

  const handleUpdate = function (e) {
    e.preventDefault();

    const updatedTask = {
      ...task,
      taskName,
      taskDescription,
    };

    const updatedTaskList = taskList.map((t, i) =>
      i === index ? updatedTask : t
    );

    setTaskList(updatedTaskList);
    localStorage.setItem("tasklist", JSON.stringify(updatedTaskList));

    setEditModal(false);
    setTaskName("");
    setTaskDescription("");
  };

  const handleInput = function (e) {
    const { name, value } = e.target;

    if (name === "taskName") setTaskName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  return (
    <>
      <button
        onClick={() => setEditModal(true)}
        className="text-lg font-semibold cursor-pointer"
      >
        🖊
      </button>

      {/* Editing Stage */}

      {editModal ? (
        <>
          <>
            <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
              <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
                <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Task</h3>
                  <button
                    className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block hover:text-red-500"
                    onClick={() => setEditModal(false)}
                  >
                    X
                  </button>
                </div>

                {/* Edit Form */}

                <form className="p-6 pb-6 pt-4">
                  <div>
                    <label
                      htmlFor="task-name"
                      className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    >
                      Task Name
                    </label>
                    <input
                      id="task-name"
                      type="text"
                      className="w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                      placeholder="Task Name"
                      name="taskName"
                      value={taskName}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                      htmlFor="task-description"
                    >
                      Task Description
                    </label>
                    <textarea
                      className="w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                      id="task-description"
                      name="taskDescription"
                      rows={4}
                      placeholder="Task description"
                      value={taskDescription}
                      onChange={handleInput}
                    />
                  </div>
                </form>
                <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                    onClick={handleUpdate}
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            </div>
          </>
        </>
      ) : null}
    </>
  );
}
