{
    const tasks = [
        {
            content: "Zrobić HomeWork",
            done: false,
        },
        {
            content: "Rozpocząć zadanie domowe",
            done: true,
        },
    ];


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li${task.done ? " class=\"form__li--done\"" : " class=\"form__li\""}>
            ${task.content}
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
            });
    }

    const onFormSumbmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-form__input").value.trim();
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        render();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSumbmit)
    };




    init();
}