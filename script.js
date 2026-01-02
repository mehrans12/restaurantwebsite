// DARK MODE
document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");
};

// MOBILE NAV
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navMenu");

hamburger.onclick = () => {
  nav.style.display = nav.style.display === "block" ? "none" : "block";
};

// RESERVATION STORAGE
document.getElementById("reserveForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const msg = document.getElementById("formMsg");

  if (!name || !email || !date || !time) {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  const data = { name, email, date, time, status: "Pending" };
  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.push(data);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  msg.innerText = "Reservation Successful!";
  msg.style.color = "green";
  e.target.reset();
});
