import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoCount } from "./TodoCount";

export const List = () => {
	const [todoslist, setTodoslist] = useState(["Do my bed"]);
	const [inputValue, setImputValue] = useState("");

	const onChangeHandler = (e) => {
		setImputValue(e.target.value);
	};

	const addNewTask = (e) => {
		if (e.key === "Enter") {
			const newTodosList = [...todoslist];
			newTodosList.push(inputValue);
			setTodoslist(newTodosList);
			setImputValue("");
		}
	};

	const deleteTodo = (text) => {
		const newTodosList = [...todoslist];
		const todoIndex = newTodosList.findIndex((todo) => todo === text);
		newTodosList.splice(todoIndex, 1);
		setTodoslist(newTodosList);
	};

	return (
		<div className="container d-flex justify-content-center p-3">
			<ul className="list-group w-50">
				<li className="list-group-item">
					<input
						type="text"
						className="w-100 border-0"
						placeholder="What needs to be done?"
						value={inputValue}
						onChange={onChangeHandler}
						onKeyDown={addNewTask}
					/>
				</li>
				{todoslist.map((todo, index) => (
					<Todo todo={todo} key={index} deleteTodo={deleteTodo} />
				))}
				<TodoCount count={todoslist.length} />
			</ul>
		</div>
	);
};
