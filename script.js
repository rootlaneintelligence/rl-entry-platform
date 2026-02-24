/* ========================== */
/* ===== DOM REFERENCES ===== */
/* ========================== */

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const detailsPage = document.getElementById("details-page");
const dashboardPage = document.getElementById("dashboard-page");
const examPage = document.getElementById("exam-page");

const welcomeText = document.getElementById("welcome-text");
const formError = document.getElementById("form-error");

let timeLeft = 2700;
let timerInterval;

/* ===== CHEAT SYSTEM ===== */

let cheatCount = 0;
let cheatLog = [];
let maxCheatLimit = 3;

/* ========================== */
/* ===== BUTTON LOADING ===== */
/* ========================== */

function setButtonLoading(button, text = "Processing...") {
  if (!button) return;
  button.dataset.originalText = button.innerHTML;
  button.innerHTML = text;
  button.disabled = true;
  button.style.opacity = "0.7";
  button.style.cursor = "not-allowed";
}

function resetButton(button) {
  if (!button) return;
  button.innerHTML = button.dataset.originalText;
  button.disabled = false;
  button.style.opacity = "1";
  button.style.cursor = "pointer";
}

/* ========================== */
/* ===== TAB SWITCH ===== */
/* ========================== */

function switchTab(type) {
  clearFormError();

  if (type === "login") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginTab.classList.add("active-tab");
    registerTab.classList.remove("active-tab");
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    registerTab.classList.add("active-tab");
    loginTab.classList.remove("active-tab");
  }
}

/* ========================== */
/* ===== REGISTER ===== */
/* ========================== */

function registerUser(event) {
  event.preventDefault();
  const btn = event.target;
  setButtonLoading(btn, "Creating Account...");

  const nameVal = document.getElementById("name").value.trim();
  const emailVal = document.getElementById("email").value.trim();
  const passwordVal = document.getElementById("password").value.trim();
  const mobileVal = document.getElementById("mobile").value.trim();

  if (!nameVal || !emailVal || !passwordVal) {
    resetButton(btn);
    return showFormError("All required fields must be filled");
  }

  firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      return db.collection("users").doc(uid).set({
        name: nameVal,
        email: emailVal,
        mobile: mobileVal,
        hasAttempted: false,
        cheatCount: 0,
        cheatStatus: "Clean",
        createdAt: new Date()
      });
    })
    .then(() => {
      resetButton(btn);
      startUserFlow();
    })
    .catch(error => {
      resetButton(btn);
      showFormError(error.message);
    });
}

/* ========================== */
/* ===== LOGIN ===== */
/* ========================== */

function loginUser(event) {
  event.preventDefault();
  const btn = event.target;
  setButtonLoading(btn, "Logging in...");

  firebase.auth().signInWithEmailAndPassword(
    document.getElementById("loginEmail").value,
    document.getElementById("loginPassword").value
  )
  .then(() => {
    resetButton(btn);
    startUserFlow();
  })
  .catch(() => {
    resetButton(btn);
    showFormError("Invalid Email or Password");
  });
}

/* ========================== */
/* ===== DASHBOARD FLOW ===== */
/* ========================== */

function startUserFlow() {

  const user = firebase.auth().currentUser;
  if (!user) return;

  db.collection("users").doc(user.uid).get().then(doc => {

    if (!doc.exists) return;

    const data = doc.data();

    detailsPage.style.display = "none";
    examPage.style.display = "none";
    dashboardPage.style.display = "block";
    document.body.classList.remove("exam-active");
    document.body.style.overflow = "auto";

    welcomeText.innerText = "Welcome, " + data.name;

    if (data.hasAttempted) {

      document.getElementById("exam-section").style.display = "none";
      document.getElementById("attempted-section").style.display = "block";

      if (data.score !== undefined) {
        document.getElementById("final-score").innerText =
          "Your Score: " + data.score + " / 50";
      }

    } else {

      document.getElementById("exam-section").style.display = "block";
      document.getElementById("attempted-section").style.display = "none";

    }

  });
}

/* ========================== */
/* ===== START EXAM ===== */
/* ========================== */

function startExam(event) {
  event.preventDefault();

  const btn = event.target;
  setButtonLoading(btn, "Starting...");

  const user = firebase.auth().currentUser;
  if (!user) return;

  db.collection("users").doc(user.uid).get().then(doc => {

    if (doc.exists && doc.data().hasAttempted) {
      resetButton(btn);
      alert("You have already attempted the exam.");
      return;
    }

    cheatCount = 0;
    cheatLog = [];
    timeLeft = 2700;

    dashboardPage.style.display = "none";
    examPage.style.display = "block";
    document.body.classList.add("exam-active");
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    loadQuestions();
    startTimer();

    resetButton(btn);
  });
}

/* ========================== */
/* ===== LOAD QUESTIONS ===== */
/* ========================== */

function loadQuestions() {

  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  questions.forEach((q, index) => {

    const div = document.createElement("div");
    div.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    if (q.type === "mcq") {
      q.options.forEach((opt, i) => {
        div.innerHTML += `
          <label>
            <input type="radio" name="q${index}" value="${i}">
            ${opt}
          </label><br>
        `;
      });
    }

    if (q.type === "text") {
      div.innerHTML += `
        <input type="text"
          name="q${index}"
          placeholder="Enter your answer"
          autocomplete="off"
        ><br><br>
      `;
    }

    container.appendChild(div);
  });
}

/* ========================== */
/* ===== TIMER ===== */
/* ========================== */

function startTimer() {

  const timerElement = document.getElementById("timer");

  timerInterval = setInterval(() => {

    timeLeft--;

    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;

    timerElement.innerText =
      `Time Left: ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    if (timeLeft <= 0) submitExam();

  }, 1000);
}

/* ========================== */
/* ===== CHEAT DETECTION ===== */
/* ========================== */

function handleCheat(reason) {
  if (examPage.style.display !== "block") return;

  cheatCount++;
  cheatLog.push(reason);

  if (cheatCount >= maxCheatLimit) {
    disqualifyUser();
  }
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) handleCheat("Tab Switched");
});

document.addEventListener("copy", function (e) {
  if (examPage.style.display === "block") {
    e.preventDefault();
    handleCheat("Copy Attempted");
  }
});

document.addEventListener("contextmenu", function (e) {
  if (examPage.style.display === "block") {
    e.preventDefault();
    handleCheat("Right Click Attempted");
  }
});

document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    handleCheat("DevTools Attempted");
  }
});

window.addEventListener("beforeunload", function () {
  if (examPage.style.display === "block") {
    handleCheat("Page Refresh Attempted");
  }
});

/* ========================== */
/* ===== SUBMIT EXAM ===== */
/* ========================== */

document.getElementById("exam-form").addEventListener("submit", function(e){
  e.preventDefault();
  const btn = this.querySelector("button[type='submit']");
  setButtonLoading(btn, "Submitting...");
  submitExam(btn);
});

function submitExam(btn) {

  const user = firebase.auth().currentUser;
  if (!user) return;

  clearInterval(timerInterval);

  let totalScore = 0;

  questions.forEach((q, i) => {

    if (q.type === "mcq") {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) {
        totalScore += q.marks || 1;
      }
    }

    if (q.type === "text") {
      const input = document.querySelector(`input[name="q${i}"]`);
      if (input && input.value.trim() !== "") {

        const cleanAnswer = input.value.toLowerCase().replace(/[^\w\s]/gi, '');
        const wordCount = cleanAnswer.split(/\s+/).length;

        if (wordCount >= q.minWords) {

          let matchCount = 0;

          q.keywords.forEach(keyword => {
            if (cleanAnswer.includes(keyword.toLowerCase())) {
              matchCount++;
            }
          });

          if (matchCount >= 2) {
            totalScore += q.marks || 4;
          } else if (matchCount === 1) {
            totalScore += Math.floor((q.marks || 4) / 2);
          }
        }
      }
    }

  });

  let finalStatus;

  if (cheatCount >= maxCheatLimit) {
    finalStatus = "Disqualified";
    totalScore = 0;
  } else if (totalScore >= 35) {
    finalStatus = "Qualified";
  } else {
    finalStatus = "Not Qualified";
  }

  db.collection("users").doc(user.uid).update({
    score: totalScore,
    percentage: ((totalScore / 50) * 100).toFixed(2),
    status: finalStatus,
    cheatCount: cheatCount,
    cheatStatus:
      cheatCount === 0 ? "Clean"
      : cheatCount < maxCheatLimit ? "Warning"
      : "Disqualified",
    cheatLog: cheatLog,
    hasAttempted: true,
    timestamp: new Date()
  }).then(() => {

    if (btn) resetButton(btn);

    examPage.style.display = "none";
    document.body.classList.remove("exam-active");
    document.body.style.overflow = "auto";
    startUserFlow();

  });
}

/* ========================== */
/* ===== DISQUALIFY ===== */
/* ========================== */

function disqualifyUser() {

  const user = firebase.auth().currentUser;
  if (!user) return;

  clearInterval(timerInterval);

  db.collection("users").doc(user.uid).update({
    score: 0,
    percentage: 0,
    status: "Disqualified",
    cheatCount: cheatCount,
    cheatStatus: "Disqualified",
    cheatLog: cheatLog,
    hasAttempted: true,
    timestamp: new Date()
  }).then(() => {

    alert("You are Disqualified due to policy violation.");
    examPage.style.display = "none";
    document.body.classList.remove("exam-active");
    document.body.style.overflow = "auto";
    startUserFlow();

  });
}

/* ========================== */
/* ===== LOGOUT ===== */
/* ========================== */

function logoutUser() {
  firebase.auth().signOut().then(() => location.reload());
}

/* ========================== */
/* ===== AUTO LOGIN ===== */
/* ========================== */

firebase.auth().onAuthStateChanged(user => {
  if (user) startUserFlow();
  else {
    detailsPage.style.display = "block";
    dashboardPage.style.display = "none";
    examPage.style.display = "none";
  }
});

/* ========================== */
/* ===== ERROR HANDLING ===== */
/* ========================== */

function showFormError(message) {
  formError.innerText = message;
  formError.classList.add("show");
}

function clearFormError() {
  formError.innerText = "";
  formError.classList.remove("show");
}