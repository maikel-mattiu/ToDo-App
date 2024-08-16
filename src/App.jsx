import {
	// useState,
	createContext,
	useEffect
	// useMemo,
	// useReducer
} from "react"
import { useImmerReducer } from "use-immer"
import ToDoMemo from "./ToDo"
import "./App.css"

export const TaskContext = createContext()

const getTasks = () => {
	const storedValue = window.localStorage.getItem("tasks")
	return JSON.parse(storedValue) || []
}

const getDarkMode = () => {
	const storedValue = window.localStorage.getItem("is-dark-mode")
	return JSON.parse(storedValue) || false
}

const initialState = {
	tasks: getTasks(),
	isDarkMode: getDarkMode(),
	editing: false
}

function reducer(draftState, action) {
	switch (action.type) {
		case "create-task": {
			// return {
			// 	...state,
			// 	tasks: [
			// 		...state.tasks,
			// 		{ id: crypto.randomUUID(), task: action.payload }
			// 	]
			// }
			draftState.tasks.push({ id: crypto.randomUUID(), task: action.payload })
			break
		}
		case "delete-task": {
			// return {
			// 	...state,
			// 	tasks: state.tasks.filter((task) => task.id !== action.payload)
			// }
			draftState.tasks = draftState.tasks.filter(
				(task) => task.id !== action.payload
			)
			break
		}
		case "edit-task": {
			// return {
			// 	...state,
			// 	tasks: state.tasks.map((task) =>
			// 		task.id === action.payload.id
			// 			? { ...task, task: action.payload.newTask }
			// 			: task
			// 	)
			// }
			draftState.tasks = draftState.tasks.map((task) =>
				task.id === action.payload.id
					? { ...task, task: action.payload.newTask }
					: task
			)
			break
		}
		case "toggle-completed": {
			// return {
			// 	...state,
			// 	tasks: state.tasks.map((task) =>
			// 		task.id === action.payload
			// 			? { ...task, isCompleted: !task.isCompleted }
			// 			: task
			// 	)
			// }
			draftState.tasks = draftState.tasks.map((task) =>
				task.id === action.payload
					? { ...task, isCompleted: !task.isCompleted }
					: task
			)
			break
		}
		case "set-dark-mode": {
			// return { ...state, isDarkMode: action.payload }
			draftState.isDarkMode = action.payload
			break
		}
		case "set-editing": {
			// return { ...state, editing: action.payload }
			draftState.editing = action.payload
			break
		}
		default:
			// return state
			return draftState
	}
}
function App() {
	// const memoizedTasks = useMemo(() => {
	// 	return [
	// 		// { id: crypto.randomUUID(), task: "Groceries" },
	// 		// { id: crypto.randomUUID(), task: "Pay Bills" },
	// 		// { id: crypto.randomUUID(), task: "Clean the house" },
	// 		// { id: crypto.randomUUID(), task: "Walk the dog" }
	// 	]
	// }, [])

	// const [tasks, setTasks] = useState(() => {
	// 	const storedValue = window.localStorage.getItem("tasks")
	// 	return JSON.parse(storedValue) || memoizedTasks
	// })

	// const [isDarkMode, setIsDarkMode] = useState(() => {
	// 	const storedValue = window.localStorage.getItem("is-dark-mode")
	// 	return JSON.parse(storedValue) || false
	// })

	// const [editing, setEditing] = useState(false)

	const [state, dispatch] = useImmerReducer(reducer, initialState)

	const { tasks, isDarkMode, editing } = state

	useEffect(() => {
		window.localStorage.setItem("is-dark-mode", isDarkMode)
	}, [isDarkMode]) // Only runs when isDarkMode changes

	useEffect(() => {
		window.localStorage.setItem("tasks", JSON.stringify(tasks))
	}, [tasks]) // Only runs when tasks changes

	function createTask(task) {
		// const newTask = { id: crypto.randomUUID(), task }
		// setTasks([...tasks, newTask])
		dispatch({ type: "create-task", payload: task })
	}

	function deleteTask(id) {
		// const newTasks = tasks.filter((task) => task.id !== id)
		// setTasks(newTasks)
		dispatch({ type: "delete-task", payload: id })
	}

	function editTask(id, newTask) {
		// const newTasks = tasks.map((task) => {
		// 	if (task.id === id) {
		// 		return { ...task, task: newTask }
		// 	}
		// 	return task
		// })
		// setTasks(newTasks)
		dispatch({ type: "edit-task", payload: { id, newTask } })
	}

	function toggleCompleted(id) {
		// setTasks(
		// 	tasks.map((task) => {
		// 		if (task.id !== id) {
		// 			return task
		// 		}

		// 		return {
		// 			...task,
		// 			isCompleted: !task.isCompleted
		// 		}
		// 	})
		// )
		dispatch({ type: "toggle-completed", payload: id })
	}

	function setIsDarkMode(isDarkMode) {
		// setIsDarkMode(isDarkMode)
		dispatch({ type: "set-dark-mode", payload: isDarkMode })
	}

	function setEditing(editing) {
		// setEditing(editing)
		dispatch({ type: "set-editing", payload: editing })
	}

	const values = {
		tasks,
		createTask,
		deleteTask,
		editTask,
		editing,
		setIsDarkMode,
		setEditing,
		isDarkMode,
		toggleCompleted
	}

	return (
		<>
			<TaskContext.Provider value={values}>
				<div
					className="wrapper"
					style={{
						"--color-bg": isDarkMode ? "black" : "white",
						"--color-text": isDarkMode ? "white" : "black"
					}}
				>
					<ToDoMemo />
				</div>
			</TaskContext.Provider>
		</>
	)
}

export default App
