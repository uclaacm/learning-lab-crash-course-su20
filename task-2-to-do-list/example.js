'use strict'

const todoInput = document.getElementById('todo-input');
const todoContainer = document.getElementById('todo-container');
const doneAll = document.getElementById('done-all');
const nahAll = document.getElementById('nah-all');
let globalTodos = []; // rip, global state :(

// pure functions (FP-wise)

// creates a JSON object representing a todo
const createTodoObject = (text, complete, id) => {
  return {text, complete, id};
}

// helper to make a new todo
const newTodoObject = (text) => {
  return createTodoObject(text, false, Date.now() + text);
}

// creates a 'DOM string' from a todo object
const createTodoString = (todo) => {
  // if only we had JSX :'(
  const {text, complete, id} = todo;
  const statusStr = complete ? 'text-strikethrough' : '';
  return `
  <li>
    <span class="todo-text ${statusStr}">${text}</span>
    <span>
      <button class="action-button done-button" id="done-${id}">👌 done</button>
      <button class="action-button nah-button" id="nah-${id}">🤷 nah</button>
    </span>
  </li>
  `
}

// flips the complete status of one todo
const flipTodoStatus = (todo) => {
  return {...todo, complete: !todo.complete };
}

// toggles the complete status for just one todo
const toggleTodoStatus = (todos, id) => {
  return todos.map((todo) => {
    return todo.id === id ? flipTodoStatus(todo) : todo;
  });
}

// removes one todo from our list (by id)
const removeTodo = (todos, id) => {
  return todos.filter((todo) => todo.id !== id);
}

// "regenerates" all of the todos from our todos array
const generateTodos = todos => {
  return todos.map(createTodoString).join('');
}

// completes all todos

const completeAllTodos = todos => {
  return todos.map(todo => {
    return {...todo, complete: true}
  });
}

// impure functions
// all of these functions have side effects

// what we do when we click the done button
const onDoneClick = (id) => {
  globalTodos = toggleTodoStatus(globalTodos, id);
  regenerateTodos();
}

// what we do when we click the nah button
const onNahClick = (id) => {
  globalTodos = removeTodo(globalTodos, id);
  regenerateTodos();
}

// completes all the todos!
const onDoneAll = () => {
  globalTodos = completeAllTodos(globalTodos);
  regenerateTodos();
}

// resets (deletes) all todos!
const onNahAll = () => {
  globalTodos = [];
  regenerateTodos();
}

// generates the listeners for every done and nah button
// is this inefficient? maybe ;)
const generateListeners = todos => {
  todos.forEach(todo => {
    document.getElementById(`done-${todo.id}`).onclick = () => onDoneClick(todo.id);
    document.getElementById(`nah-${todo.id}`).onclick = () => onNahClick(todo.id);
  });
}

// regenerates our todos from scratch (rather than updating by id)
const regenerateTodos = () => {
  todoContainer.innerHTML = generateTodos(globalTodos);
  generateListeners(globalTodos);
}

// our event listener for the text box, which adds a todo
// when the user hits enter with a non-empty input value
const handleTodoInput = (event) => {
  // why this? see https://stackoverflow.com/questions/11365632/how-to-detect-when-the-user-presses-enter-in-an-input-field
  if (!event) event = window.event;
  const keyCode = event.code || event.key;
  const text = todoInput.value;
  if (keyCode == 'Enter' && text !== "") {
    const newTodo = newTodoObject(text);
    globalTodos.push(newTodo);
    regenerateTodos();
    todoInput.value = "";
  }
}

todoInput.onkeypress = handleTodoInput;
doneAll.onclick = onDoneAll;
nahAll.onclick = onNahAll;
