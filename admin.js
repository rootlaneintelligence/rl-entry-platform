let currentPage = 1;
const pageSize = 20;

let allUsers = [];
let filteredUsers = [];

/* ============================= */
/* ===== ADMIN AUTH ===== */
/* ============================= */

function authenticateAdmin() {

  if (document.getElementById("adminPass").value !== "123") {
    alert("Access Denied ❌");
    return;
  }

  document.querySelector(".admin-login").style.display = "none";
  document.querySelector(".admin-summary").style.display = "flex";
  document.querySelector(".filter-section").style.display = "flex";
  document.querySelector(".leaderboard").style.display = "block";
  document.querySelector(".table-wrapper").style.display = "block";
  document.querySelector(".pagination").style.display = "flex";

  loadAllUsers();
}


/* ============================= */
/* ===== LOAD ALL USERS ===== */
/* ============================= */

function loadAllUsers() {

  db.collection("users")
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {

      allUsers = [];

      snapshot.forEach(doc => {
        allUsers.push(doc.data());
      });

      applyFilters();
      updateSummary();
    });
}


/* ============================= */
/* ===== FILTER LOGIC ===== */
/* ============================= */

function applyFilters() {

  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const statusValue = document.getElementById("statusFilter").value;
  const cheatValue = document.getElementById("cheatFilter").value;

  filteredUsers = allUsers.filter(user => {

    const matchesSearch =
      !searchText ||
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText);

    const matchesStatus =
      !statusValue || user.status === statusValue;

    const matchesCheat =
      !cheatValue ||
      (cheatValue === "cheated" && (user.cheatCount ?? 0) > 0) ||
      (cheatValue === "clean" && (user.cheatCount ?? 0) === 0);

    return matchesSearch && matchesStatus && matchesCheat;
  });

  currentPage = 1;
  renderTable();
}


/* ============================= */
/* ===== RENDER TABLE ===== */
/* ============================= */

function renderTable() {

  const tableBody = document.getElementById("resultsBody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const pageData = filteredUsers.slice(start, end);

  pageData.forEach(data => {

    const row = document.createElement("tr");

    let statusClass = "";
    if (data.status === "Qualified") statusClass = "pass";
    if (data.status === "Not Qualified") statusClass = "fail";
    if (data.status === "Disqualified") statusClass = "disqualified";

    let cheatClass = (data.cheatCount ?? 0) > 0 ? "cheat-warning" : "";

    row.innerHTML = `
      <td>${data.name || "-"}</td>
            <td>${data.mobile || "-"}</td>
      <td>${data.email || "-"}</td>
      <td>${data.score ?? 0}</td>
      <td class="${statusClass}">${data.status || "-"}</td>
      <td class="${cheatClass}">${data.cheatCount ?? 0}</td>
      <td class="${cheatClass}">${data.cheatStatus || "Clean"}</td>
    `;

    tableBody.appendChild(row);
  });

  updatePagination();
}


/* ============================= */
/* ===== PAGINATION ===== */
/* ============================= */

function updatePagination() {

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${totalPages || 1}`;

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage >= totalPages;
}

function nextPage() {
  currentPage++;
  renderTable();
}

function previousPage() {
  currentPage--;
  renderTable();
}


/* ============================= */
/* ===== SUMMARY + LEADERBOARD FIX ===== */
/* ============================= */

function updateSummary() {

  const totalUsers = allUsers.length;

  const qualifiedCount = allUsers.filter(u =>
    u.status === "Qualified"
  ).length;

  const notQualifiedCount = allUsers.filter(u =>
    u.status === "Not Qualified"
  ).length;

  const disqualifiedCount = allUsers.filter(u =>
    u.status === "Disqualified"
  ).length;

  const cheatedUsers = allUsers.filter(u =>
    (u.cheatCount ?? 0) > 0
  ).length;

  const cleanUsers = allUsers.filter(u =>
    (u.cheatCount ?? 0) === 0
  ).length;

  const totalCheatCount = allUsers.reduce((sum, u) =>
    sum + (u.cheatCount ?? 0), 0
  );

  document.getElementById("totalUsers").innerText = totalUsers;
  document.getElementById("qualifiedUsers").innerText = qualifiedCount;
  document.getElementById("notQualifiedUsers").innerText = notQualifiedCount;
  document.getElementById("disqualifiedUsers").innerText = disqualifiedCount;
  document.getElementById("cleanUsers").innerText = cleanUsers;
  document.getElementById("cheatedUsers").innerText = cheatedUsers;
  document.getElementById("totalCheatCount").innerText = totalCheatCount;
}