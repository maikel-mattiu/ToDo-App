/* eslint-disable no-unused-vars */
import React from "react"
import { TaskContext } from "./App"
import ToDoItemsMemo from "./ToDoItems"
import InputTaskMemo from "./InputTask"
import ToggleMemo from "./Toggle"

function ToDo() {
	const { isDarkMode, setIsDarkMode } = React.useContext(TaskContext)
	console.log(isDarkMode)
	return (
		<>
			<div className="todo-app">
				<div
					className={isDarkMode ? "todo-container-darkmode" : "todo-container"}
				>
					<ToDoItemsMemo />
					<InputTaskMemo />
				</div>
				<ToggleMemo
					label="Dark Mode"
					checked={isDarkMode}
					handleToggle={setIsDarkMode}
					className="toggle"
				/>
			</div>
		</>
	)
}

const ToDoMemo = React.memo(ToDo)
export default ToDoMemo
