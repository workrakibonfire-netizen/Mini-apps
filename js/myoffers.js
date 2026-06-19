/* =====================================
OFFERS PAGE
===================================== */

const DEMO_TASKS = [

{
    id: 1,
    type: "Telegram",
    title: "Join Telegram Channel",
    reward: 2.00,
    workers: 120,
    remaining: 48
},

{
    id: 2,
    type: "YouTube",
    title: "Subscribe YouTube Channel",
    reward: 5.00,
    workers: 80,
    remaining: 21
},

{
    id: 3,
    type: "Facebook",
    title: "Like Facebook Page",
    reward: 3.00,
    workers: 150,
    remaining: 60
},

{
    id: 4,
    type: "TikTok",
    title: "Follow TikTok Account",
    reward: 4.00,
    workers: 50,
    remaining: 19
}

];

/* =====================================
USER INFO
===================================== */

function renderUser() {

const username =
    document.getElementById("username");

const balance =
    document.getElementById("main-balance");

username.innerText =
    APP.user?.first_name || "Guest";

balance.innerText =
    "৳ " + money(1250);

}

/* =====================================
TASK CARD
===================================== */

function taskCard(task) {

return `

<div class="task-card">

    <div class="task-top">

        <div>

            <div class="task-title">
                ${task.title}
            </div>

            <div class="small">
                ${task.type}
            </div>

        </div>

        <div class="task-reward">
            ৳${money(task.reward)}
        </div>

    </div>

    <div class="task-meta">

        <span>
            👥 ${task.workers}
        </span>

        <span>
            ⏳ ${task.remaining} Left
        </span>

    </div>

    <br>

    <button
        class="btn btn-primary"
        onclick="startTask(${task.id})">

        Earn Now

    </button>

</div>

`;

}

/* =====================================
RENDER TASKS
===================================== */

function renderTasks(tasks) {

const container =
    document.getElementById(
        "taskContainer"
    );

container.innerHTML =
    tasks.map(taskCard).join("");

}

/* =====================================
START TASK
===================================== */

function startTask(id) {

toast(
    "Task #" + id + " opened"
);

}

/* =====================================
SEARCH
===================================== */

function initSearch() {

const input =
    document.getElementById(
        "searchInput"
    );

input.addEventListener(
    "keyup",
    function() {

        const value =
            this.value.toLowerCase();

        const filtered =
            DEMO_TASKS.filter(task =>
                task.title
                .toLowerCase()
                .includes(value)
            );

        renderTasks(filtered);

    }
);

}

/* =====================================
CATEGORY FILTER
===================================== */

function initCategories() {

const buttons =
    document.querySelectorAll(
        ".cat-btn"
    );

buttons.forEach(btn => {

    btn.addEventListener(
        "click",
        function() {

            buttons.forEach(
                b => b.classList.remove(
                    "active"
                )
            );

            this.classList.add(
                "active"
            );

            const category =
                this.innerText;

            if (
                category === "All"
            ) {

                renderTasks(
                    DEMO_TASKS
                );

                return;
            }

            const filtered =
                DEMO_TASKS.filter(
                    task =>
                    task.type ===
                    category
                );

            renderTasks(
                filtered
            );

        }
    );

});

}

/* =====================================
INIT
===================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    renderUser();

    renderTasks(
        DEMO_TASKS
    );

    initSearch();

    initCategories();

}

);
