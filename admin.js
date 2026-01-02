// Protect admin page
if(localStorage.getItem('adminLoggedIn') !== 'true'){
  window.location.href = 'login.html';
}
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'login.html';
});


const tableBody = document.getElementById("tableBody");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const confirmedCount = document.getElementById("confirmedCount");

// Load reservations from localStorage
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    // Update stats
    totalCount.textContent = reservations.length;
    pendingCount.textContent = reservations.filter(r => r.status === "Pending").length;
    confirmedCount.textContent = reservations.filter(r => r.status === "Confirmed").length;

    // Clear table
    tableBody.innerHTML = "";

    reservations.forEach((r, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${r.name}</td>
            <td>${r.email}</td>
            <td>${r.date}</td>
            <td>${r.time}</td>
            <td>
                <select onchange="updateStatus(${i}, this.value)">
                    <option value="Pending" ${r.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Confirmed" ${r.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                </select>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Update status and save to localStorage
function updateStatus(index, value) {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations[index].status = value;
    localStorage.setItem("reservations", JSON.stringify(reservations));
    loadReservations(); // refresh table immediately
}

// Initial load
loadReservations();

// Listen for changes from restaurant page (if admin in another tab)
window.addEventListener("storage", () => {
    loadReservations();

    
});
