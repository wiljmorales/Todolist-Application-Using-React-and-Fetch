import React from "react";

export const Todo = ({ todo, deleteTodo }) => {
	return (
		<li className="list-group-item d-flex justify-content-between ">
			<p className="m-0">{todo}</p>
			<i
				className="fa-solid fa-trash-can mt-1"
				onClick={() => deleteTodo(todo)}></i>
		</li>
	);
};
