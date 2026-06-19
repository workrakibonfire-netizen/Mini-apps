// ১. টেলিগ্রাম ওয়েব অ্যাপ ইনিশিয়ালাইজেশন
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand(); // অ্যাপটি পুরো স্ক্রিনে খোলার জন্য

// ২. স্টেট ম্যানেজমেন্ট (ইউজারের ডেটা লোকাল স্টোরেজে সেভ থাকবে)
let balance = parseInt(localStorage.getItem('tap_balance')) || 0;
let energy = parseInt(localStorage.getItem('tap_energy')) || 100;
const maxEnergy = 100;

// ৩. টেলিগ্রাম ইউজার প্রোফাইল সেটআপ
const usernameDoc = document.getElementById("username");
const userAvatarDoc = document.getElementById("user-avatar");

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    if (usernameDoc) usernameDoc.textContent = user.first_name || user.username;
    if (userAvatarDoc && user.photo_url) {
        userAvatarDoc.src = user.photo_url;
    }
} else {
    if (usernameDoc) usernameDoc.textContent = "Crypto Miner";
}

// ৪. ড্যাশবোর্ড আপডেট ফাংশন
function updateUI() {
    const balanceDoc = document.getElementById("balance");
    const energyDoc = document.getElementById("energy");
    
    if (balanceDoc) balanceDoc.textContent = balance;
    if (energyDoc) energyDoc.textContent = `${energy}/${maxEnergy}`;
    
    // ডেটা ব্রাউজারে সেভ করে রাখা
    localStorage.setItem('tap_balance', balance);
    localStorage.setItem('tap_energy', energy);
}

// ৫. ট্যাপ-টু-আর্ন (Tap to Earn) সিস্টেম
const coinButton = document.getElementById("coin-btn");
if (coinButton) {
    coinButton.addEventListener("click", (e) => {
        if (energy > 0) {
            balance += 1;
            energy -= 1;
            updateUI();
            
            // ট্যাপ করার জায়গায় ভাসমান +1 অ্যানিমেশন
            createFloatingText(e);
        } else {
            tg.showAlert("আপনার এনার্জি শেষ! একটু অপেক্ষা করুন।");
        }
    });
}

function createFloatingText(e) {
    const coinRect = e.target.getBoundingClientRect();
    const x = e.clientX - coinRect.left;
    const y = e.clientY - coinRect.top;
    
    const clickText = document.createElement("span");
    clickText.innerText = "+1";
    clickText.style.position = "absolute";
    clickText.style.left = `${x}px`;
    clickText.style.top = `${y}px`;
    clickText.style.color = "#fff";
    clickText.style.fontWeight = "bold";
    clickText.style.animation = "floatUp 0.6s ease-out forwards";
    
    e.target.appendChild(clickText);
    setTimeout(() => clickText.remove(), 600);
}

// ৬. এনার্জি অটো-রিকভারি (প্রতি ৩ সেকেন্ডে ১ করে এনার্জি বাড়বে)
setInterval(() => {
    if (energy < maxEnergy) {
        energy += 1;
        updateUI();
    }
}, 3000);

// ৭. ডেইলি টাস্ক (Task) সিস্টেম
const taskButtons = document.querySelectorAll(".task-btn");
taskButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const reward = parseInt(e.target.getAttribute("data-reward")) || 500;
        const taskId = e.target.getAttribute("data-task-id");
        
        if (!localStorage.getItem(`task_${taskId}`)) {
            balance += reward;
            localStorage.setItem(`task_${taskId}`, "completed");
            e.target.innerText = "Completed";
            e.target.disabled = true;
            updateUI();
            tg.showAlert(`অভিনন্দন! আপনি ${reward} কয়েন পেয়েছেন।`);
        }
    });
});

// ৮. রেফারেল (Invite Friends) সিস্টেম
const inviteButton = document.getElementById("invite-btn");
if (inviteButton) {
    inviteButton.addEventListener("click", () => {
        const botUsername = "YourBotNameBot"; // আপনার বটের ইউজারনেম এখানে দিন
        const userId = tg.initDataUnsafe?.user?.id || "user";
        const inviteLink = `https://t.me/${botUsername}/app?startapp=ref_${userId}`;
        
        // টেলিগ্রামের মাধ্যমে বন্ধুদের কাছে শেয়ার করার উইন্ডো খোলা
        const shareText = encodeURIComponent("আমার সাথে এই মিনি অ্যাপে জয়েন করুন এবং ফ্রি কয়েন আর্ন করুন! 🚀");
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${shareText}`;
        
        window.open(telegramShareUrl, "_blank");
    });
}

// অ্যাপ রান হওয়ার সাথে সাথে স্ক্রিন আপডেট করা
updateUI();
  
