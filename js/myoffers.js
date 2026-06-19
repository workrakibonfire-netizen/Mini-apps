/* =====================================
   MY OFFERS
   ===================================== */

const OFFERS = [

    {
        id: 1,
        title: "Join Telegram Channel",
        reward: 2,
        status: "processing"
    },

    {
        id: 2,
        title: "Subscribe YouTube Channel",
        reward: 5,
        status: "pending"
    },

    {
        id: 3,
        title: "Follow TikTok Account",
        reward: 4,
        status: "approved"
    },

    {
        id: 4,
        title: "Like Facebook Page",
        reward: 3,
        status: "rejected"
    }

];

let currentTab = "processing";


/* =====================================
   CARD
   ===================================== */

function offerCard(task) {

    let actionButton = "";

    if (task.status === "processing") {

        actionButton = `
            <button
                class="btn btn-primary"
                onclick="submitProof(${task.id})">

                Submit Proof

            </button>
        `;
    }

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

            <span class="status ${task.status}">
                ${task.status.toUpperCase()}
            </span>

            <br><br>

            ${actionButton}

        </div>

    `;
}


/* =====================================
   RENDER
   ===================================== */

function renderOffers(status) {

    const container =
        document.getElementById(
            "offersContainer"
        );

    const filtered =
        OFFERS.filter(
            offer =>
            offer.status === status
        );

    if (!filtered.length) {

        container.innerHTML = `

            <div class="card">

                <center>

                    <h3>
                        No Tasks Found
                    </h3>

                    <br>

                    <p>
                        Nothing available here.
                    </p>

                </center>

            </div>

        `;

        return;
    }

    container.innerHTML =
        filtered.map(
            offerCard
        ).join("");

}


/* =====================================
   SUBMIT PROOF
   ===================================== */

function submitProof(id) {

    toast(
        "Open Proof Form for Task #" + id
    );

}


/* =====================================
   TABS
   ===================================== */

function initTabs() {

    const buttons =
        document.querySelectorAll(
            ".tab-btn"
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

                currentTab =
                    this.dataset.tab;

                renderOffers(
                    currentTab
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

        renderOffers(
            currentTab
        );

        initTabs();

    }
);
