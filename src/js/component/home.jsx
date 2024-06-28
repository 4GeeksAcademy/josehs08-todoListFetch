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
		}
	}

	function handleDelete(indexTarget) {
		const newArr = taskList.filter((item, index) => index !== indexTarget);
		setTaskList(newArr);
	}

	return (
		<div className="text-center">
			<input onKeyDown={handleKeyPress} onChange={(e) => { setTask(e.target.value) }} type="text" value={task} />
			<h1>{task}</h1>

			<ul>{
				taskList.map((tarea, index) =>
					<>
						<li
							id={index}>
							{tarea}
							<button
								onClick={() => handleDelete(index)}>
								Delete
							</button>
						</li>
					</>)
			}</ul>
		</div>
	);
};

export default Home;
