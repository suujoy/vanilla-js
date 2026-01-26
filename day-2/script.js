const input = document.querySelector("input");
const addBtn = document.querySelector(".addBtn");
const right = document.querySelector(".right");
// const deleteBtn = document.querySelector(".deleteBtn");

let storeElement = [];

const rendarFunction = () => {
    right.innerHTML = "";
    storeElement.forEach((todo) => {
        let div = document.createElement("div");
        div.dataset.id = todo.id;
        div.classList.add(todo.class);
        div.textContent = todo.textContent;

        let button = document.createElement("button");
        button.classList.add("deleteBtn");
        button.textContent = "Delete";
        // button.dataset.id = `del${Date.now()}`;

        div.appendChild(button);

        right.appendChild(div);
    });
};

const setLocalStorage = () => {
    todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) storeElement = todos;
    else storeElement = [];
    rendarFunction();
};
setLocalStorage();

const setTodoData = () => {
    let todo = {};
    todo.id = `el${Date.now()}`;
    todo.class = "todo";
    todo.textContent = input.value;

    storeElement.push(todo);
    localStorage.setItem("todos", JSON.stringify(storeElement));
};

// localStorage.clear()
addBtn.addEventListener("click", () => {
    setTodoData();
    rendarFunction();
});

right.addEventListener("click", (event) => {
    // console.log(event.target);

    if (event.target.classList.contains("deleteBtn")) {
        const todoId = event.target.closest(".todo").dataset.id;

        storeElement = storeElement.filter((item) => {
            return item.id != todoId;
        });

        localStorage.setItem("todos", JSON.stringify(storeElement));
        rendarFunction();
    }
});
