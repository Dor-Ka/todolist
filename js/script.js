{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, {content: newTaskContent }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex +1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex +1),
        ]
        render();
    };

   
    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindtoggleDoneEvents = () => {
        const toggleDoneEvents = document.querySelectorAll(".js-done");
        
        toggleDoneEvents.forEach((toggleDoneEvents, taskIndex) => {
            toggleDoneEvents.addEventListener("click", () => {
                 toggleTaskDone(taskIndex);
        });
    });
    };

    const renderTasks = () => {
        const taskHTML = task => `
            <li class="tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-tasks">
                <button class="tasks__button tasks__button--taskDone js-done">${task.done ? "✓" : ""}
                </button>

                <span class=" tasks__content${task.done ? " tasks__content--done" : "" }">
                ${task.content}
                </span>
            
               <button class="tasks__button tasks__button--remove js-remove">
               🗑
               </button>
            </li>
        `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
        
        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }
        
        buttonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks"> ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__button js-markAllDone" ${ tasks.every(({ done }) => done) ? " disabled" : ""}>
        Ukończ wsztstkie
        </button>
        `; 
    };

    const bindButtonsEvent = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");
        
        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindtoggleDoneEvents();

        renderButtons();
        bindButtonsEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}