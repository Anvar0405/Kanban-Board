import React, { useState } from "react";

export default function AddTask({ taskList, setTaskList }) {
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const newObject = {
    taskID: Date.now(),
    taskName,
    taskDescription,
  };

  function handleAdd(e) {
    e.preventDefault();

    const updatedTaskList = [...taskList, newObject];
    setTaskList(updatedTaskList);

    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));

    setShowForm(false);
    setTaskName("");
    setTaskDescription("");
  }

  return (
    <div>
      {showForm ? (
        <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
          <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
            <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add New Task</h3>
              <button
                className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block hover:text-red-500"
                onClick={() => setShowForm(false)}
              >
                X
              </button>
            </div>
            <form className="p-6 pb-6 pt-4">
              <div>
                <label
                  className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                  htmlFor="task-name"
                >
                  Task Name
                </label>
                <input
                  className="w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  id="task-name"
                  type="text"
                  placeholder="Task name"
                  name="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
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
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              <select name="type" id="type">
                <option value="Backlog">Backlog</option>
                <option value="InProgress">In progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Done">Done</option>
              </select>
            </form>
            <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
              <button
                className="p-4 border-2 bg-black text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                onClick={handleAdd}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setShowForm(true)}
        className="ml-3 text-md font-semibold"
      >
        <span className="text-xl">+</span> Add a new task
      </button>
    </div>
  );
}
