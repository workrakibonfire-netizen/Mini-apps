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

const tg = window.Telegram?.WebApp;

if (tg) {

tg.ready();

tg.expand();

document.body.classList.add("telegram-app");

}

/* =====================================
USER SESSION
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

    const data =
        localStorage.getItem(key);

    if (!data) return null;

    return JSON.parse(data);
},

remove(key) {
    localStorage.removeItem(key);
}

};

/* =====================================
API REQUEST
===================================== */

async function api(endpoint, method = "GET", body = null) {

const options = {
    method,
    headers: {
        "Content-Type": "application/json"
    }
};

if (body) {
    options.body = JSON.stringify(body);
}

const response = await fetch(
    APP.config.api + endpoint,
    options
);

return await response.json();

}

/* =====================================
USER LOAD
===================================== */

async function loadUser() {

try {

    const data =
        await api("/user");

    APP.user = data;

    return data;

} catch (err) {

    console.error(err);

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

    APP.balance = data;

    return data;

} catch (err) {

    console.error(err);

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

    APP.tasks = data;

    return data;

} catch (err) {

    console.error(err);

    return [];
}

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
MONEY FORMAT
===================================== */

function money(value) {

return Number(value)
    .toFixed(2);

}

/* =====================================
TOAST
===================================== */

function toast(message) {

const toast =
    document.createElement("div");

toast.className =
    "app-toast";

toast.innerText =
    message;

document.body.appendChild(toast);

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
    document.createElement("div");

loader.id =
    "global-loader";

loader.innerHTML =
    '<div class="loader"></div>';

document.body.appendChild(loader);

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
PAGE NAVIGATION
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
AUTO START
===================================== */

document.addEventListener(
"DOMContentLoaded",
initApp
);
