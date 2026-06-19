/* =====================================
MY TASKS
===================================== */

const MY_TASKS = [

{
    id: 1001,
    title: "Join Telegram Channel",
    reward: 2,
    workers: 50,
    submissions: 12,
    status: "active"
},

{
    id: 1002,
    title: "Subscribe YouTube Channel",
    reward: 5,
    workers: 100,
    submissions: 25,
    status: "active"
},

{
    id: 1003,
    title: "Follow TikTok Account",
    reward: 4,
    workers: 30,
    submissions: 30,
    status: "completed"
}

];

/* =====================================
DASHBOARD STATS
===================================== */

function updateStats() {

const active =
    MY_TASKS.filter(
        task =>
        task.status === "active"
    ).length;

const pending =
    MY_TASKS.reduce(
        (sum, task) =>
        sum + task.submissions,
        0
    );

const locked =
    MY_TASKS.reduce(
        (sum, task) =>
        sum +
        (
            task.reward *
            task.workers
        ),
        0
    );

document.getElementById(
    "activeTasks"
).innerText = active;

document.getElementById(
    "pendingReviews"
).innerText = pending;

document.getElementById(
    "lockedBalance"
).innerText =
    "৳" + money(locked);

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

                    Task #${task.id}

                </div>

            </div>

            <div class="task-reward">

                ৳${money(task.reward)}

            </div>

        </div>

        <br>

        ${statusBadge(task.status)}

        <br><br>

        <div class="task-meta">

            <span>
                Workers
            </span>

            <span>
                ${task.workers}
            </span>

        </div>

        <br>

        <div class="task-meta">

            <span>
                Submissions
            </span>

            <span>
                ${task.submissions}
            </span>

        </div>

        <br>

        <button
            class="btn btn-primary"
            onclick="viewSubmissions(${task.id})">

            View Submissions

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
        "myTasksContainer"
    );

if (!MY_TASKS.length) {

    container.innerHTML = `

        <div class="card">

            <center>

                <h3>
                    No Tasks Found
                </h3>

            </center>

        </div>

    `;

    return;
}

container.innerHTML =
    MY_TASKS
    .map(taskCard)
    .join("");

}

/* =====================================
VIEW SUBMISSIONS
===================================== */

function viewSubmissions(id) {

toast(
    "Open Submissions For Task #" +
    id
);

}

/* =====================================
INIT
===================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    updateStats();

    renderTasks();

}

);
