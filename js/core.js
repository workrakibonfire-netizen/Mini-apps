/* =====================================
TELEGRAM TASK MARKETPLACE
CORE ENGINE
===================================== */

const APP = {

user: null,

balance: {
    main: 0,
    pending: 0,
    deposit: 0,
    withdrawn: 0
},

tasks: [],

myOffers: [],

myTasks: [],

config: {
    api: "/api"
}

};

/* =====================================
TELEGRAM SDK
===================================== */

const tg =
window.Telegram?.WebApp;

if (tg) {

tg.ready();

tg.expand();

document.body.classList.add(
    "telegram-app"
);

}

/* =====================================
TELEGRAM USER
===================================== */

function getTelegramUser() {

if (!tg) return null;

return tg.initDataUnsafe?.user || null;

}

/* =====================================
LOCAL STORAGE
===================================== */

const Storage = {

set(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

},

get(key) {

    try {

        const data =
            localStorage.getItem(
                key
            );

        if (!data) {
            return null;
        }

        return JSON.parse(data);

    } catch {

        return null;

    }

},

remove(key) {

    localStorage.removeItem(
        key
    );

}

};

/* =====================================
API
===================================== */

async function api(
endpoint,
method = "GET",
body = null
) {

try {

    const options = {

        method,

        headers: {
            "Content-Type":
                "application/json"
        }

    };

    if (body) {

        options.body =
            JSON.stringify(
                body
            );

    }

    const response =
        await fetch(
            APP.config.api +
            endpoint,
            options
        );

    return await response.json();

} catch (error) {

    console.error(error);

    toast(
        "Network Error"
    );

    return null;

}

}

/* =====================================
USER LOAD
===================================== */

async function loadUser() {

try {

    const data =
        await api("/user");

    if (data) {

        APP.user = data;

    }

    return data;

} catch (error) {

    console.error(error);

    return null;

}

}

/* =====================================
BALANCE LOAD
===================================== */

async function loadBalance() {

try {

    const data =
        await api("/balance");

    if (data) {

        APP.balance = data;

    }

    return data;

} catch (error) {

    console.error(error);

    return null;

}

}

/* =====================================
TASKS LOAD
===================================== */

async function loadTasks() {

try {

    const data =
        await api("/tasks");

    APP.tasks =
        data || [];

    return APP.tasks;

} catch (error) {

    console.error(error);

    return [];

}

}

/* =====================================
MONEY FORMAT
===================================== */

function money(value) {

return Number(
    value || 0
).toFixed(2);

}

/* =====================================
DATE FORMAT
===================================== */

function formatDate(
timestamp
) {

const date =
    new Date(timestamp);

return date.toLocaleDateString();

}

/* =====================================
STATUS BADGE
===================================== */

function statusBadge(
status
) {

return `

    <span
        class="status ${status}">

        ${status.toUpperCase()}

    </span>

`;

}

/* =====================================
COPY
===================================== */

function copy(text) {

navigator.clipboard
    .writeText(text);

toast(
    "Copied Successfully"
);

}

/* =====================================
TOAST
===================================== */

function toast(message) {

const toast =
    document.createElement(
        "div"
    );

toast.className =
    "app-toast";

toast.innerText =
    message;

document.body.appendChild(
    toast
);

setTimeout(() => {

    toast.remove();

}, 3000);

}

/* =====================================
LOADER
===================================== */

function showLoader() {

let loader =
    document.getElementById(
        "global-loader"
    );

if (loader) return;

loader =
    document.createElement(
        "div"
    );

loader.id =
    "global-loader";

loader.innerHTML =
    '<div class="loader"></div>';

document.body.appendChild(
    loader
);

}

function hideLoader() {

const loader =
    document.getElementById(
        "global-loader"
    );

if (loader) {

    loader.remove();

}

}

/* =====================================
NAVIGATION
===================================== */

function go(page) {

window.location.href =
    page;

}

/* =====================================
LOGOUT
===================================== */

function logout() {

Storage.remove("user");

location.reload();

}

/* =====================================
APP INIT
===================================== */

async function initApp() {

showLoader();

await loadUser();

await loadBalance();

hideLoader();

}

/* =====================================
AUTO START
===================================== */

document.addEventListener(
"DOMContentLoaded",
initApp
);
