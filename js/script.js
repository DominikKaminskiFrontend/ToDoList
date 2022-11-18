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
        <li${task.done ? " class=\"form__li--done\"" :" class=\"form__li\""}>
            ${task.content}
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
     render();
    };




    init();
}