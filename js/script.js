{
    let tasks = [];

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
            form__li${task.done && hideDoneTasks ? " task__buttonStyle--hide" : "" }">
                <button class="task__buttonStyle">
                    ${task.done ? "✔" : ""}
                </button>
                <span class =${task.done ? "task__buttonStyle--done " : ""}> 
                    ${task.content} 
                </span>
                <button class="task__buttonRemoveStyle">
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
        <button class=" task__option js-hideDoneTasksButton">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} zakończone
        </button>
        <button class="task__option js-markAllDoneButton"
        ${tasks.every(({ done }) => done) ? " disabled" : ""}>
            Ukończ wszystkie
        </button>`;
    };


    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".task__buttonRemoveStyle");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {

        const toogleDoneButtons = document.querySelectorAll(".task__buttonStyle");

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