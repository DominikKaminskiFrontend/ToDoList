{
    let tasks = [
        { content: " zadanie 1", done: false },
        { content: " zadanie 2", done: true },
    ];

    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toogleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const renderTasks = () => {
        const taskToHtml = task =>` 
        <li class="
            form__li${task.done && hideDoneTasks ? " hideTask" : "" }">
                <button class="form__task">
                    ${task.done ? "✔" : ""}
                </button>
                <span class =${task.done ? "form__task--done " : ""}> 
                    ${task.content} 
                </span>
                <button class="form__remove">
                    🗑️
                </button>
        </li>`;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHtml).join("");
    };

    const finishAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toogleHideFinishedTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
    
        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class=" container__taskOption js-hideDoneTasksButton">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} zakończone
        </button>
        <button class="container__taskOption js-markAllDoneButton"
        ${tasks.every(({ done }) => done) ? " disabled" : ""}>
            Ukończ wszystkie
        </button>`;
    };


    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".form__remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {

        const toogleDoneButtons = document.querySelectorAll(".form__task");

        toogleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toogleTaskDone(index);
            });
        });

    };




const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDoneButton");

    if (markAllDoneButton) {
        markAllDoneButton.addEventListener("click", finishAllTasks);
    }

    const hideDoneTasks = document.querySelector(".js-hideDoneTasksButton");

    if (hideDoneTasks) {
        hideDoneTasks.addEventListener("click", toogleHideFinishedTask);
    }

};

const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();

    renderButtons();
    bindButtonsEvents();
};


const onFormSumbmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-form__input");
    const newTaskContent = newTaskElement.value.trim();
    if (newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskElement.value = " ";
    }
    newTaskElement.focus();

    render();
};

const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSumbmit)
};

init();
}