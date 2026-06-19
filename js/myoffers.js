/* =====================================
   OFFERS PAGE
===================================== */

const TASKS = [

    {
        id: 1,
        type: "Telegram",
        title: "Join Telegram Channel",
        reward: 2,
        workers: 120,
        thumbnail:
            "https://via.placeholder.com/400x200",
        duration: 3
    },

    {
        id: 2,
        type: "YouTube",
        title: "Subscribe YouTube Channel",
        reward: 5,
        workers: 85,
        thumbnail:
            "https://via.placeholder.com/400x200",
        duration: 7
    },

    {
        id: 3,
        type: "Facebook",
        title: "Like Facebook Page",
        reward: 3,
        workers: 60,
        thumbnail:
            "https://via.placeholder.com/400x200",
        duration: 2
    },

    {
        id: 4,
        type: "TikTok",
        title: "Follow TikTok Account",
        reward: 4,
        workers: 45,
        thumbnail:
            "https://via.placeholder.com/400x200",
        duration: 5
    },

    {
        id: 5,
        type: "Website",
        title: "Visit Website",
        reward: 1,
        workers: 300,
        thumbnail:
            "https://via.placeholder.com/400x200",
        duration: 1
    }

];

let currentCategory = "all";


/* =====================================
   TASK CARD
===================================== */

function taskCard(task) {

    return `

        <div class="task-card">

            <img
                src="${task.thumbnail}"
                style="
                    width:100%;
                    border-radius:12px;
                    margin-bottom:12px;
                ">

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

            <br>

            <div class="task-meta">

                <span>
                    Workers Left
                </span>

                <span>
                    ${task.workers}
                </span>

            </div>

            <br>

            <div class="task-meta">

                <span>
                    Duration
                </span>

                <span>
                    ${task.duration} Days
                </span>

            </div>

            <br>

            <button
                class="btn btn-primary"
                onclick="startTask(${task.id})">

                Start Task

            </button>

        </div>

    `;

}


/* =====================================
   RENDER TASKS
===================================== */

function renderTasks() {

    const container =
        document.getElementById(
            "taskContainer"
        );

    const keyword =
        document
        .getElementById(
            "searchInput"
        )
        .value
        .toLowerCase();

    let filtered =
        TASKS.filter(task => {

            const categoryMatch =

                currentCategory ===
                "all"

                ||

                task.type ===
                currentCategory;

            const searchMatch =

                task.title
                .toLowerCase()
                .includes(keyword);

            return (
                categoryMatch &&
                searchMatch
            );

        });

    document.getElementById(
        "availableTasks"
    ).innerText =
        filtered.length;

    if (!filtered.length) {

        container.innerHTML = `

            <div class="card">

                <center>

                    <h3>
                        No Tasks Found
                    </h3>

                    <br>

                    <p>
                        Try another category.
                    </p>

                </center>

            </div>

        `;

        return;
    }

    container.innerHTML =

        filtered
        .map(taskCard)
        .join("");

}


/* =====================================
   CATEGORY FILTER
===================================== */

function initCategories() {

    const buttons =

        document
        .querySelectorAll(
            ".cat-btn"
        );

    buttons.forEach(btn => {

        btn.addEventListener(
            "click",
            function() {

                buttons.forEach(
                    b =>
                    b.classList.remove(
                        "active"
                    )
                );

                this.classList.add(
                    "active"
                );

                currentCategory =
                    this.dataset.category;

                renderTasks();

            }
        );

    });

}


/* =====================================
   SEARCH
===================================== */

function initSearch() {

    const search =

        document.getElementById(
            "searchInput"
        );

    search.addEventListener(
        "input",
        renderTasks
    );

}


/* =====================================
   START TASK
===================================== */

function startTask(id) {

    const task =

        TASKS.find(
            t => t.id === id
        );

    if (!task) return;

    toast(
        "Opening: " +
        task.title
    );

    /*
    Future:

    Open Modal

    Show Instructions

    Accept Task

    Go To Link

    */

}


/* =====================================
   LOAD USER
===================================== */

function loadHomeUser() {

    const user =
        getTelegramUser();

    if (!user) return;

    document.getElementById(
        "username"
    ).innerText =

        user.first_name ||
        "User";

}


/* =====================================
   LOAD BALANCE
===================================== */

function loadHomeBalance() {

    document.getElementById(
        "main-balance"
    ).innerText =

        "৳" +
        money(
            APP.balance.main
        );

}


/* =====================================
   LOAD STATS
===================================== */

function loadStats() {

    document.getElementById(
        "totalEarned"
    ).innerText =

        "৳" +
        money(
            APP.balance.main
        );

    document.getElementById(
        "pendingReviews"
    ).innerText =

        APP.myOffers.length || 0;

}


/* =====================================
   INIT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadHomeUser();

        loadHomeBalance();

        loadStats();

        initCategories();

        initSearch();

        renderTasks();

    }
);
