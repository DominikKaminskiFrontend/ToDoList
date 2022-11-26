{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
            });
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toogleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".form__remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toogleDoneButtons = document.querySelectorAll(".form__task");

        toogleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toogleTaskDone(index);
            });
        });

    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
        <li class="form__li">
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
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
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