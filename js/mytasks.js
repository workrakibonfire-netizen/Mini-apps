/* =====================================
   TASK DETAILS PAGE
===================================== */

const DEMO_TASKS = [

    {
        id: 1,
        type: "Telegram",
        title: "Join Telegram Channel",
        reward: 2,
        workers: 120,
        duration: 3,

        link: "https://t.me/example",

        thumbnail:
            "https://via.placeholder.com/800x400",

        instructions:
            "Join the Telegram channel and stay for at least 24 hours.",

        proofs: [
            {
                type: "screenshot",
                label: "Channel Joined Screenshot"
            },
            {
                type: "text",
                label: "Telegram Username"
            }
        ]
    },

    {
        id: 2,
        type: "YouTube",
        title: "Subscribe YouTube Channel",
        reward: 5,
        workers: 80,
        duration: 7,

        link: "https://youtube.com",

        thumbnail:
            "https://via.placeholder.com/800x400",

        instructions:
            "Subscribe to the channel and keep subscription active.",

        proofs: [
            {
                type: "screenshot",
                label: "Subscription Screenshot"
            }
        ]
    }

];


/* =====================================
   GET TASK ID
===================================== */

function getTaskId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return Number(
        params.get("id")
    );

}


/* =====================================
   CURRENT TASK
===================================== */

let currentTask = null;


/* =====================================
   LOAD TASK
===================================== */

function loadTask() {

    const id =
        getTaskId();

    currentTask =
        DEMO_TASKS.find(
            task => task.id === id
        );

    if (!currentTask) {

        document.body.innerHTML = `

            <div class="container">

                <div class="card">

                    <h2>
                        Task Not Found
                    </h2>

                </div>

            </div>

        `;

        return;

    }

    renderTask();

}


/* =====================================
   RENDER TASK
===================================== */

function renderTask() {

    document.getElementById(
        "taskThumbnail"
    ).src =
        currentTask.thumbnail;

    document.getElementById(
        "taskTitle"
    ).innerText =
        currentTask.title;

    document.getElementById(
        "taskReward"
    ).innerText =
        "৳" +
        money(
            currentTask.reward
        );

    document.getElementById(
        "taskWorkers"
    ).innerText =
        currentTask.workers;

    document.getElementById(
        "taskDuration"
    ).innerText =
        currentTask.duration +
        " Days";

    document.getElementById(
        "taskInstructions"
    ).innerText =
        currentTask.instructions;

    renderProofRequirements();

}


/* =====================================
   PROOF REQUIREMENTS
===================================== */

function renderProofRequirements() {

    const container =
        document.getElementById(
            "proofRequirements"
        );

    container.innerHTML =
        currentTask.proofs
        .map((proof, index) => {

            return `

                <div class="card">

                    ${index + 1}.
                    ${proof.label}

                    <br>

                    <small>

                        ${proof.type}

                    </small>

                </div>

            `;

        })
        .join("");

}


/* =====================================
   OPEN TASK
===================================== */

document.addEventListener(
    "click",
    function(e) {

        if (
            e.target.id ===
            "openTaskBtn"
        ) {

            window.open(
                currentTask.link,
                "_blank"
            );

        }

    }
);


/* =====================================
   SHOW PROOF FORM
===================================== */

document.addEventListener(
    "click",
    function(e) {

        if (
            e.target.id ===
            "submitProofBtn"
        ) {

            buildProofForm();

        }

    }
);


function buildProofForm() {

    document.getElementById(
        "proofForm"
    ).style.display =
        "block";

    const container =
        document.getElementById(
            "proofFields"
        );

    container.innerHTML =
        "";

    currentTask.proofs.forEach(
        (proof, index) => {

            let field = "";

            if (
                proof.type ===
                "text"
            ) {

                field = `

                    <label>

                        ${proof.label}

                    </label>

                    <br><br>

                    <input
                        class="input"
                        type="text"
                        data-proof="${index}">

                    <br><br>

                `;

            }

            if (
                proof.type ===
                "screenshot"
            ) {

                field = `

                    <label>

                        ${proof.label}

                    </label>

                    <br><br>

                    <input
                        type="file"
                        data-proof="${index}">

                    <br><br>

                `;

            }

            container.innerHTML +=
                field;

        }
    );

}


/* =====================================
   SUBMIT PROOF
===================================== */

function submitProof() {

    const myOffers =
        Storage.get(
            "myOffers"
        ) || [];

    myOffers.push({

        taskId:
            currentTask.id,

        title:
            currentTask.title,

        reward:
            currentTask.reward,

        status:
            "pending",

        createdAt:
            Date.now()

    });

    Storage.set(
        "myOffers",
        myOffers
    );

    APP.myOffers =
        myOffers;

    toast(
        "Proof Submitted"
    );

    setTimeout(() => {

        window.location.href =
            "myoffers.html";

    }, 1000);

}


/* =====================================
   INIT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadTask
);
