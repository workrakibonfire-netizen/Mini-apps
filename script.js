// ========================================
// Task Marketplace Mini App
// Version: 1.0
// ========================================

// Current User Data

const currentUser = {
    id: 0,
    name: "",
    balance: 0,
    depositBalance: 0,
    withdrawBalance: 0
};

// ========================================
// Navigation
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

function initializeApp() {

    console.log("Mini App Loaded");

    loadProfile();
    loadBalance();
    loadTasks();
    setupNavigation();

}

// ========================================
// Profile
// ========================================

function loadProfile() {

    const profileBtn = document.querySelector(".profile-btn");

    if (!profileBtn) return;

    profileBtn.addEventListener("click", () => {

        console.log("Open Profile");

        // Future:
        // Open Profile Modal

    });

}

// ========================================
// Balance
// ========================================

function loadBalance() {

    const balanceElement = document.querySelector(".balance-box h2");

    if (!balanceElement) return;

    balanceElement.textContent =
        `৳ ${currentUser.balance.toFixed(2)}`;

}

// ========================================
// Task Loading
// ========================================

const taskData = [

    {
        id: 1,
        title: "Join Telegram Channel",
        reward: 5,
        participants: 3719,
        expiry: "2 Days"
    },

    {
        id: 2,
        title: "YouTube Subscribe",
        reward: 3,
        participants: 2911,
        expiry: "1 Day"
    }

];

function loadTasks() {

    console.log("Loading Tasks");

    // Future:
    // Fetch tasks from API

}

// ========================================
// Filters
// ========================================

function filterByType(type) {

    console.log("Selected Type:", type);

}

function filterByTask(task) {

    console.log("Selected Task:", task);

}

// ========================================
// Task Actions
// ========================================

function openTask(taskId) {

    console.log("Open Task:", taskId);

}

function startTask(taskId) {

    console.log("Start Task:", taskId);

    // Future:
    // Open Link
    // Move to My Offers

}

function submitProof(taskId) {

    console.log("Submit Proof:", taskId);

}

// ========================================
// My Offers
// ========================================

function loadMyOffers() {

    console.log("Loading My Offers");

}

// ========================================
// Create Offer
// ========================================

function createOffer() {

    console.log("Create Offer");

}

// ========================================
// My Tasks
// ========================================

function loadMyTasks() {

    console.log("Loading My Tasks");

}

// ========================================
// Bottom Navigation
// ========================================

function setupNavigation() {

    const buttons =
        document.querySelectorAll(".bottom-nav button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

        });

    });

}

// ========================================
// API Section
// ========================================

const API = {

    baseUrl: "",

    async getTasks() {

        try {

            const response =
                await fetch(`${this.baseUrl}/tasks`);

            return await response.json();

        } catch (error) {

            console.error(error);

        }

    }

};

// ========================================
// Admin Functions
// ========================================

function approveTask(taskId) {

    console.log("Approved:", taskId);

}

function rejectTask(taskId, reason) {

    console.log("Rejected:", taskId);

    console.log("Reason:", reason);

}

// ========================================
// Utility
// ========================================

function formatMoney(amount) {

    return `৳ ${Number(amount).toFixed(2)}`;

             }
