import React, { useState, useContext } from "react"
import { TaskContext } from "./App"
import { Plus } from "react-feather"

function InputTask() {
	const { createTask, isDarkMode } = useContext(TaskContext)

	const [task, setTask] = useState("")

	function handleSubmit(event) {
		event.preventDefault()
		createTask(task)
		setTask("")
	}
	return (
		<form
			className="todo-form todo-item"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				className={isDarkMode ? "todo-input-darkmode" : "todo-input"}
				placeholder="Add a task"
				value={task}
				onChange={(event) => {
					setTask(event.target.value)
				}}
			/>
			<button
				type="submit"
				className={isDarkMode ? "todo-icon-darkmode" : "todo-icon"}
			>
				<Plus size={24} />
			</button>
		</form>
	)
}

const InputTaskMemo = React.memo(InputTask)
export default InputTaskMemo
