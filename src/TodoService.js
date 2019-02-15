const fetchTodos = async () => {
  const res = await fetch("/api/todos", { accept: "application/json" });
  const json = await res.json();
  return { status: res.status, todos: json.todos };
};

const createTodo = async description => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      description: description,
      critical: false,
      done: false
    })
  });
  const json = await res.json();
  return { status: res.status, todos: json.todos };
};

const deleteTodo = async todoId => {
  const res = await fetch(`/api/todos/${todoId}`, {
    method: "DELETE",
    headers: { accept: "application/json", "content-type": "application/json" }
  });
  const json = await res.json();
  return { status: res.status, todos: json.todos };
};

export { fetchTodos, createTodo, deleteTodo };
