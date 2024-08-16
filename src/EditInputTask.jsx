/* eslint-disable react/prop-types */
import React from "react"
import { TaskContext } from "./App"
import { Check, X } from "react-feather"

function EditInputTask({ taskIn }) {
	const { id, task } = taskIn
	const { editTask, setEditing, isDarkMode } = React.useContext(TaskContext)
	const [taskEdit, setTaskEdit] = React.useState(task)

	function handleSubmit(event) {
		event.preventDefault()
		editTask(id, taskEdit)
		setEditing(false)
	}
	return (
		<form
			className="todo-edit-form todo-edit-item"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				className={isDarkMode ? "todo-edit-input-darkmode" : "todo-edit-input"}
				placeholder="Add a task"
				value={taskEdit}
				onChange={(event) => {
					setTaskEdit(event.target.value)
				}}
			/>
			<button
				type="submit"
				className={isDarkMode ? "todo-edit-icon-darkmode" : "todo-edit-icon"}
			>
				<Check size={24} />
			</button>
			<button
				onClick={() => {
					setEditing(false)
				}}
				className={isDarkMode ? "todo-edit-icon-darkmode" : "todo-edit-icon"}
			>
				<X size={24} />
			</button>
		</form>
	)
}

const EditInputTaskMemo = React.memo(EditInputTask)
export default EditInputTaskMemo
