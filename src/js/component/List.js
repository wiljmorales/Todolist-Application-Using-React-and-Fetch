import React, { useCallback, useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoCount } from "./TodoCount";

export const List = () => {
	const [todoslist, setTodoslist] = useState([]);
	const [inputValue, setImputValue] = useState("");

	const createUser = useCallback(async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/wiljmorales",
				{
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([]),
				}
			);
			// if (response.status === 200) {
			// 	getToDos();
			// }
		} catch (error) {
			alert("no se pudo crear usuario", error);
		}
	}, [getToDos]);

	const getToDos = async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/wiljmorales"
			);
			if (response.status === 404) {
				await createUser();
				return;
			}
			const body = await response.json();
			setTodoslist(body);
		} catch (error) {
			alert("la lista no esta");
			return;
		}
	};

	const updateTodos = async (requestBody) => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/wiljmorales",
				{
					method: "PUT",
					body: JSON.stringify(requestBody),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} catch (error) {
			alert("No se pudo actualizar la lista", error);
			return;
		}
	};

	const deleteTodoList = async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/wiljmorales",
				{
					method: "DELETE",
				}
			);
		} catch (error) {
			alert("no se pudo borrar la lista", error);
		}
	};

	useEffect(() => {
		getToDos();
	}, []);

	const onChangeHandler = (e) => {
		setImputValue(e.target.value);
	};

	const addNewTask = async (e) => {
		if (e.key === "Enter") {
			const newTodosList = [...todoslist];
			newTodosList.push({ label: inputValue, done: false });
			if (todoslist.length === 0) {
				await createUser();
			}
			console.log(newTodosList);
			setTodoslist(newTodosList);
			updateTodos(newTodosList);
			setImputValue("");
		}
	};

	const deleteTodo = (text) => {
		const newTodosList = [...todoslist];
		const todoIndex = newTodosList.findIndex((todo) => todo.label === text);
		newTodosList.splice(todoIndex, 1);
		setTodoslist(newTodosList);
		if (todoslist.length > 1) {
			updateTodos(newTodosList);
		} else {
			deleteTodoList();
		}
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
