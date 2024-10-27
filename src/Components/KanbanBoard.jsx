import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import Column from "./Column";
import Task from "./Task";
import AddTask from "./AddTask";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function KanbanBoard() {
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const backlogArray = localStorage.getItem("backLog");
    const inProgressArray = localStorage.getItem("inProgress");
    const blockedArray = localStorage.getItem("blocked");
    const doneArray = localStorage.getItem("done");

    if (backlogArray) {
      setBacklog(JSON.parse(backlogArray));
    }
    if (inProgressArray) {
      setInProgress(JSON.parse(inProgressArray));
    }
    if (blockedArray) {
      setBlocked(JSON.parse(blockedArray));
    }
    if (doneArray) {
      setDone(JSON.parse(doneArray));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("backLog", JSON.stringify(backlog));
    localStorage.setItem("inProgress", JSON.stringify(inProgress));
    localStorage.setItem("blocked", JSON.stringify(blocked));
    localStorage.setItem("done", JSON.stringify(done));
  }, [backlog, inProgress, blocked, done]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <Column title="Backlog" taskList={backlog} setTaskList={setBacklog}>
          <div className="flex-1 m-4 bg-white rounded-lg p-3">
            <h3 className="mx-2 text-lg font-bold">Backlog</h3>
            {/* ===== Tasks ===== */}
            <div>
              {backlog.map((task, i) => (
                <Task
                  key={task.taskID}
                  index={i}
                  task={task}
                  taskList={backlog}
                  setTaskList={setBacklog}
                />
              ))}
            </div>
            <AddTask taskList={backlog} setTaskList={setBacklog} />
          </div>
        </Column>
        <Column
          title="In Progress"
          taskList={inProgress}
          setTaskList={setInProgress}
        >
          <div className="flex-1 m-4 bg-white rounded-lg p-3">
            <h3 className="mx-2 text-lg font-bold">In Progress</h3>
            {/* ===== Tasks ===== */}
            <div>
              {inProgress.map((task, i) => (
                <Task
                  key={task.taskID}
                  index={i}
                  task={task}
                  taskList={inProgress}
                  setTaskList={setInProgress}
                />
              ))}
            </div>
            <AddTask taskList={inProgress} setTaskList={setInProgress} />
          </div>
        </Column>
        <Column title="Blocked" taskList={blocked} setTaskList={setBlocked}>
          <div className="flex-1 m-4 bg-white rounded-lg p-3">
            <h3 className="mx-2 text-lg font-bold">Blocked</h3>
            {/* ===== Tasks ===== */}
            <div>
              {blocked.map((task, i) => (
                <Task
                  key={task.taskID}
                  index={i}
                  task={task}
                  taskList={blocked}
                  setTaskList={setBlocked}
                />
              ))}
            </div>
            <AddTask taskList={blocked} setTaskList={setBlocked} />
          </div>
        </Column>
        <Column title="Done" taskList={done} setTaskList={setDone}>
          <div className="flex-1 m-4 bg-white rounded-lg p-3">
            <h3 className="mx-2 text-lg font-bold">Done</h3>
            {/* ===== Tasks ===== */}
            <div>
              {done.map((task, i) => (
                <Task
                  key={task.taskID}
                  index={i}
                  task={task}
                  taskList={done}
                  setTaskList={setDone}
                />
              ))}
            </div>
            <AddTask taskList={done} setTaskList={setDone} />
          </div>
        </Column>
      </div>
    </DndProvider>
  );
}
