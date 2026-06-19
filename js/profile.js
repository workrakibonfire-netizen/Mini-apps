/* =====================================
   PROFILE PAGE
===================================== */

function loadProfile() {

    const tgUser =
        getTelegramUser();

    if (tgUser) {

        document.getElementById(
            "profileName"
        ).innerText =
            tgUser.first_name || "User";

        document.getElementById(
            "profileUsername"
        ).innerText =
            tgUser.username
            ? "@" + tgUser.username
            : "@unknown";

        document.getElementById(
            "telegramId"
        ).innerText =
            "ID: " + tgUser.id;

        document.getElementById(
            "telegramIdValue"
        ).innerText =
            tgUser.id;

        const avatar =
            document.getElementById(
                "profileAvatar"
            );

        avatar.innerHTML =
            tgUser.first_name
            ? tgUser.first_name
                  .charAt(0)
                  .toUpperCase()
            : "👤";

    }

}


/* =====================================
   LOAD BALANCE
===================================== */

function loadProfileBalance() {

    document.getElementById(
        "mainBalance"
    ).innerText =
        "৳" +
        money(
            APP.balance.main
        );

    document.getElementById(
        "pendingBalance"
    ).innerText =
        "৳" +
        money(
            APP.balance.pending
        );

    document.getElementById(
        "depositBalance"
    ).innerText =
        "৳" +
        money(
            APP.balance.deposit
        );

}


/* =====================================
   LOAD STATS
===================================== */

function loadStats() {

    document.getElementById(
        "completedTasks"
    ).innerText =
        APP.myOffers.length || 0;

    document.getElementById(
        "createdTasks"
    ).innerText =
        APP.myTasks.length || 0;

}


/* =====================================
   COPY TELEGRAM ID
===================================== */

function copyTelegramId() {

    const tgUser =
        getTelegramUser();

    if (!tgUser) {

        toast(
            "Telegram User Not Found"
        );

        return;
    }

    copy(
        String(
            tgUser.id
        )
    );

}


/* =====================================
   INIT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProfile();

        loadProfileBalance();

        loadStats();

    }
);
