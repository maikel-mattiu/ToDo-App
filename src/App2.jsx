import { createContext, useEffect, useReducer } from "react"
import ToDoMemo from "./ToDo"
import "./App.css"

export const TaskContext = createContext()

// Define the initial state
const initialState = {
	tasks: [],
	isDarkMode: false,
	editing: false
}

// Define the reducer function
const reducer = (state, action) => {
	switch (action.type) {
		case "CREATE_TASK":
			return {
				...state,
				tasks: [...state.tasks, { id: crypto.randomUUID(), task: action.payload }]
			}
		case "DELETE_TASK":
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload)
			}
		case "EDIT_TASK":
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id
						? { ...task, task: action.payload.newTask }
						: task
				)
			}
		case "TOGGLE_COMPLETED":
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload
						? { ...task, isCompleted: !task.isCompleted }
						: task
				)
			}
		case "SET_DARK_MODE":
			return { ...state, isDarkMode: action.payload }
		case "SET_EDITING":
			return { ...state, editing: action.payload }
		default:
			return state
	}
}

function App() {
	// Use the useReducer hook to manage the state
	const [state, dispatch] = useReducer(reducer, initialState)

	// Load tasks from localStorage on component mount
	useEffect(() => {
		const storedValue = window.localStorage.getItem("tasks")
		if (storedValue) {
			dispatch({ type: "SET_TASKS", payload: JSON.parse(storedValue) })
		}
	}, [])

	// Save tasks to localStorage on state change
	useEffect(() => {
		window.localStorage.setItem("tasks", JSON.stringify(state.tasks))
	}, [state.tasks])

	// Save dark mode preference to localStorage
	useEffect(() => {
		window.localStorage.setItem("is-dark-mode", state.isDarkMode)
	}, [state.isDarkMode])

	// Function to create a new task
	const createTask = (task) => {
		dispatch({ type: "CREATE_TASK", payload: task })
	}

	// Function to delete a task
	const deleteTask = (id) => {
		dispatch({ type: "DELETE_TASK", payload: id })
	}

	// Function to edit a task
	const editTask = (id, newTask) => {
		dispatch({ type: "EDIT_TASK", payload: { id, newTask } })
	}

	// Function to toggle task completion
	const toggleCompleted = (id) => {
		dispatch({ type: "TOGGLE_COMPLETED", payload: id })
	}

	// Function to set dark mode
	const setIsDarkMode = (isDarkMode) => {
		dispatch({ type: "SET_DARK_MODE", payload: isDarkMode })
	}

	// Function to set editing state
	const setEditing = (editing) => {
		dispatch({ type: "SET_EDITING", payload: editing })
	}

	const values = {
		tasks: state.tasks,
		createTask,
		deleteTask,
		editTask,
		editing: state.editing,
		setEditing,
		setIsDarkMode,
		isDarkMode: state.isDarkMode,
		toggleCompleted
	}

	return (
		<>
			<TaskContext.Provider value={values}>
				<div
					className="wrapper"
					style={{
						"--color-bg": state.isDarkMode ? "black" : "white",
						"--color-text": state.isDarkMode ? "white" : "black"
					}}
				>
					<ToDoMemo />
				</div>
			</TaskContext.Provider>
		</>
	)
}

export default App
