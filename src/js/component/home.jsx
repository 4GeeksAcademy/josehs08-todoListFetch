import React, { useState, useEffect } from "react";

const Home = () => {

	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	function addTask() {
		if (task) {
			setTaskList([...taskList, task]);
		}
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter' && !taskList.includes(task)) {
			addTask();
			setTask("");
		}
	}

	function handleDelete(indexTarget) {
		const newArr = taskList.filter((item, index) => index !== indexTarget);
		setTaskList(newArr);
	}

	return (
		<div className="container-fluid d-flex justify-content-center">

			<div className="contenedor text-center m-5">

				<h1 className="p-3">ToDo</h1>

				<input
					className="p-3"
					onKeyDown={handleKeyPress}
					onChange={(e) => { setTask(e.target.value) }}
					type="text"
					value={task}
					placeholder="Introduzca su tarea"
				/>

				<ul className="mt-3 mb-0">{
					taskList.map((tarea, index) =>
						<>
							<li
								className="col-12 px-5 py-3 d-flex justify-content-between"
								id={index}>
								{tarea}
								<button
									onClick={() => handleDelete(index)}>
									X
								</button>
							</li>
						</>)
				}</ul>
				<p className="text-start p-3 m-0">{taskList.length > 0 ? (taskList.length > 1 ? taskList.length + " tareas restantes" : taskList.length + " tarea restante") : "No hay tareas"}</p>
			</div>
		</div>
	);
};

export default Home;
