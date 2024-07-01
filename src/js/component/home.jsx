import React, { useState, useEffect } from "react";

const URLBASE = "https://playground.4geeks.com/todo"

const Home = () => {
	const initialState = {
		label: "",
		is_done: false,
	};

	const [task, setTask] = useState(initialState);
	const [todos, setTodos] = useState([]);

	const postTask = async () => {
		try {
			const response = await fetch(`${URLBASE}/todos/joseh`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(task)
			})
			if (response.ok) {
				getTask();
				setTask(initialState);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const getTask = async () => {
		try {
			const response = await fetch(`${URLBASE}/users/joseh`)
			const data = await response.json();

			if (response.status === 404) {
				createUser();
				getTask();
			} else {
				setTodos(data.todos);
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`${URLBASE}/todos/${id}`, {
				method: 'DELETE'
			})
			if (response.ok) {
				getTask();
			}
		} catch (error) {
			console.log(error);
		}
	}

	const createUser = async () => {
		try {
			const response = await fetch(`${URLBASE}/users/joseh`, {
				method: 'POST'
			});
		}
		catch (error) {
			console.log(error);
		}
	}

	const deleteAll = async () => {
		try {
			const response = await fetch(`${URLBASE}/users/joseh`, {
				method: 'DELETE'
			})
			if (response.ok) {
				getTask();
			}
		} catch (error) {
			console.log(error);
		}
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter' && task.label.trim() != '' && !todos.includes(task.label)) {
			postTask();
			setTask(initialState);
		}
	}

	function handleChange(e) {
		setTask({
			[e.target.name]: e.target.value
		});
	}

	useEffect(() => {
		getTask();
	}, []);

	return (
		<div className="container-fluid d-flex justify-content-center">

			<div className="contenedor text-center m-5">

				<h1 className="p-3">ToDo</h1>
				<input
					className="p-3"
					onKeyDown={handleKeyPress}
					onChange={(e) => handleChange(e)}
					type="text"
					value={task.label}
					name="label"
					placeholder="Introduzca su tarea"
				/>

				{
					todos.map((item) => {
						return (
							<div className="taskList" key={item.id}>
								<p className="taskLabel text-start p-3 m-0">{item.label}</p>
								<button
									className="deleteTask"
									onClick={() => deleteTask(item.id)}
								>
									X
								</button>
							</div>
						);
					})
				}
				<p className="text-start p-3 m-0">{todos.length > 0 ? (todos.length > 1 ? todos.length + " tareas restantes" : todos.length + " tarea restante") : "No hay tareas"}</p>
				<button className={todos != "" ? "btn btn-danger mb-3" : "d-none"} onClick={deleteAll}>Borrar todas las tareas</button>
			</div>
		</div>
	);
};

export default Home;
