/* =====================================
CREATE OFFER
===================================== */

const rewardInput =
document.getElementById("reward");

const workersInput =
document.getElementById("workers");

const durationInput =
document.getElementById("duration");

const createBtn =
document.getElementById("createTaskBtn");

const addProofBtn =
document.getElementById("addProofBtn");

/* =====================================
PROOF REQUIREMENTS
===================================== */

let proofCount = 1;

addProofBtn.addEventListener(
"click",
() => {

    if (proofCount >= 3) {

        toast(
            "Maximum 3 proof requirements allowed"
        );

        return;
    }

    proofCount++;

    const container =
        document.getElementById(
            "proofContainer"
        );

    const div =
        document.createElement(
            "div"
        );

    div.className =
        "proof-item";

    div.style.marginTop =
        "15px";

    div.innerHTML = `

        <select class="select proof-type">

            <option value="text">
                Text Proof
            </option>

            <option value="screenshot">
                Screenshot Proof
            </option>

        </select>

        <br><br>

        <input
            type="text"
            class="input proof-label"
            placeholder="Proof Requirement">

    `;

    container.appendChild(div);

}

);

/* =====================================
COST CALCULATOR
===================================== */

function updateCost() {

const reward =
    Number(rewardInput.value) || 0;

const workers =
    Number(workersInput.value) || 0;

const total =
    reward * workers;

document.getElementById(
    "rewardPreview"
).innerText =
    "৳" + reward.toFixed(2);

document.getElementById(
    "workerPreview"
).innerText =
    workers;

document.getElementById(
    "totalCost"
).innerText =
    "৳" + total.toFixed(2);

}

/* =====================================
VALIDATION
===================================== */

function validateForm() {

const reward =
    Number(rewardInput.value);

const workers =
    Number(workersInput.value);

const duration =
    Number(durationInput.value);

const link =
    document.getElementById(
        "taskLink"
    ).value;

const instructions =
    document.getElementById(
        "instructions"
    ).value;

if (!reward || reward <= 0) {

    toast(
        "Enter valid reward"
    );

    return false;
}

if (workers < 10) {

    toast(
        "Minimum 10 workers required"
    );

    return false;
}

if (duration > 7) {

    toast(
        "Maximum duration is 7 days"
    );

    return false;
}

if (!link) {

    toast(
        "Task link required"
    );

    return false;
}

if (!instructions) {

    toast(
        "Instructions required"
    );

    return false;
}

return true;

}

/* =====================================
CREATE TASK
===================================== */

async function createTask() {

if (!validateForm()) {
    return;
}

const proofs = [];

document
    .querySelectorAll(".proof-item")
    .forEach(item => {

        proofs.push({

            type:
                item.querySelector(
                    ".proof-type"
                ).value,

            label:
                item.querySelector(
                    ".proof-label"
                ).value

        });

    });

const payload = {

    type:
        document.getElementById(
            "taskType"
        ).value,

    reward:
        Number(
            rewardInput.value
        ),

    workers:
        Number(
            workersInput.value
        ),

    duration:
        Number(
            durationInput.value
        ),

    link:
        document.getElementById(
            "taskLink"
        ).value,

    instructions:
        document.getElementById(
            "instructions"
        ).value,

    proofs: proofs

};

console.log(
    "Task Payload:",
    payload
);

toast(
    "Task Created Successfully"
);

/*
Future API

await api(
  "/task/create",
  "POST",
  payload
);
*/

}

/* =====================================
EVENTS
===================================== */

rewardInput.addEventListener(
"input",
updateCost
);

workersInput.addEventListener(
"input",
updateCost
);

createBtn.addEventListener(
"click",
createTask
);

/* =====================================
INIT
===================================== */

updateCost();
