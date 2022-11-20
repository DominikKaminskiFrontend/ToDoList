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

    cleanInputField = () => {
        const newTask = document.querySelector(".js-form__input");
        newTask.value = "";
        newTask.focus();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-form__remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toogleDoneButtons = document.querySelectorAll(".js-form__done");

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
             <li${task.done ? " class=\"form__li form__li--done \"" : " class=\"form__li\""}>
            <button class=\"js-form__done\"> ${task.done ? "✅" : "🟩"}</button>
            ${task.content}
            <button class="js-form__remove">🗑️</button>
        </li>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };


    const onFormSumbmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-form__input").value.trim();
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        cleanInputField();

        render();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSumbmit)
    };




    init();
}