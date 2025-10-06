// Counter for unique IDs
let profileCounter = 0;

// Grab the form from the HTML
const form = document.getElementById("register-form"); // ✅ Fix: must match form id in HTML

// Listen for submit event
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent reload

  let isValid = true;

  // Collect values from the form 
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const programme = document.getElementById("programme").value;
  const year = document.getElementById("year").value;
  const photoUrl = document.getElementById("photo").value.trim(); // ✅ fixed id
  const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
    .map(i => i.value)
    .join(", ");

  // Basic validation 
  if (firstName === "") {
    document.getElementById("first-name-error").textContent = "First name is required.";
    isValid = false;
  } else {
    document.getElementById("first-name-error").textContent = "";
  }

  if (lastName === "") {
    document.getElementById("last-name-error").textContent = "Last name is required.";
    isValid = false;
  } else {
    document.getElementById("last-name-error").textContent = "";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    document.getElementById("email-error").textContent = "";
  }

  if (programme === "") {
    document.getElementById("programme-error").textContent = "Please select a programme.";
    isValid = false;
  } else {
    document.getElementById("programme-error").textContent = "";
  }

  if (year === "") {
    document.getElementById("year-error").textContent = "Please select your year of study.";
    isValid = false;
  } else {
    document.getElementById("year-error").textContent = "";
  }

  if (interests.length === 0) {
    document.getElementById("interests-error").textContent = "Please select at least one interest.";
    isValid = false;
  } else {
    document.getElementById("interests-error").textContent = "";
  }

  if (!isValid) {
    console.log("Form has errors ❌");
    return;
  }

  console.log("All fields are valid ✅, building profile...");

  // Build profile card & table row 
  profileCounter++;
  const profileId = "profile-" + profileCounter;

  const profilesDiv = document.getElementById("profiles");
  const tableBody = document.querySelector("#summary-table tbody");

  // Create card
  const card = document.createElement("div");
  card.classList.add("profile-card");
  card.setAttribute("data-id", profileId);
  card.innerHTML = `
    <img src="${photoUrl || 'default.jpg'}" alt="${firstName}'s photo" width="100">
    <h3>${firstName} ${lastName}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Programme:</strong> ${programme}</p>
    <p><strong>Year:</strong> ${year}</p>
    <p><strong>Interests:</strong> ${interests}</p>
    <button class="remove-btn">Remove</button>
  `;
  profilesDiv.appendChild(card);

  // Create table row
  const row = document.createElement("tr");
  row.setAttribute("data-id", profileId);
  row.innerHTML = `
    <td>${firstName} ${lastName}</td>
    <td>${email}</td>
    <td>${programme}</td>
    <td>${year}</td>
    <td>${interests}</td>
    <td><button class="remove-btn">Remove</button></td>
  `;
  tableBody.appendChild(row);

  // Link both remove buttons 
  const cardRemoveBtn = card.querySelector(".remove-btn");
  const rowRemoveBtn = row.querySelector(".remove-btn");

  function removeProfile() {
    document.querySelectorAll(`[data-id="${profileId}"]`).forEach(el => el.remove());
  }

  cardRemoveBtn.addEventListener("click", removeProfile);
  rowRemoveBtn.addEventListener("click", removeProfile);
});
