// Get references to the form, table, and chart elements
const progressForm = document.getElementById("progress-form");
const progressTable = document.getElementById("progress-table").getElementsByTagName("tbody")[0];
const progressChartCtx = document.getElementById("progress-chart").getContext("2d");
const loadingSpinner = document.getElementById("loading-spinner");
let editingIndex = null; // To track the index of the entry being edited

// Global variable to store the chart instance
let progressChartInstance = null;

// Filter input
const patientFilterInput = document.getElementById("patient-filter");

// Display the current date in the designated display element
document.getElementById("current-date-display").innerText = new Date().toLocaleDateString();

// Function to load progress data from localStorage
function loadProgressData() {
  loadingSpinner.style.display = "block";

  const progressData = JSON.parse(localStorage.getItem("progressData")) || [];
  const filterValue = patientFilterInput.value.toLowerCase();
  
  progressTable.innerHTML = ""; // Clear the current table content

  // Filter data based on patient name
  const filteredData = filterValue ? progressData.filter(entry => entry.patientName.toLowerCase().includes(filterValue)) : progressData;

  filteredData.forEach((entry, index) => {
    const row = progressTable.insertRow();
    row.innerHTML = `
      <td>${entry.patientName}</td>
      <td>${entry.weight}</td>
      <td>${entry.bmi}</td>
      <td>${entry.activityLevel}</td>
      <td>${entry.date}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;
  });

  // Add event listeners for the edit and delete buttons
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", handleEdit);
  });
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", handleDelete);
  });

  // Generate chart after loading data with filteredData
  generateProgressChart(filteredData);

  loadingSpinner.style.display = "none";
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const patientName = document.getElementById("patient-name").value;
  const weight = document.getElementById("weight").value;
  const bmi = document.getElementById("bmi").value;
  const activityLevel = document.getElementById("activity-level").value;
  const date = document.getElementById("date").value; // Get the date from the form

  if (!patientName || !weight || !bmi || !activityLevel || !date) {
    alert("Please fill in all fields!");
    return;
  }

  const newProgress = { patientName, weight, bmi, activityLevel, date };

  // Get existing progress data from localStorage or initialize an empty array
  const progressData = JSON.parse(localStorage.getItem("progressData")) || [];

  if (editingIndex === null) {
    // Add new progress entry
    progressData.push(newProgress);
  } else {
    // Edit existing progress entry
    progressData[editingIndex] = newProgress;
    editingIndex = null; // Reset editing mode
  }

  // Save updated progress data to localStorage
  localStorage.setItem("progressData", JSON.stringify(progressData));

  // Clear the form
  progressForm.reset();

  // Reload the progress data (and chart will update using filtered data)
  loadProgressData();

  // Show success message
  alert(editingIndex === null ? "Progress added successfully!" : "Progress updated successfully!");
}

// Function to generate the progress chart using Chart.js
function generateProgressChart(progressData) {
  // Destroy previous chart instance if it exists
  if (progressChartInstance !== null) {
    progressChartInstance.destroy();
  }

  if (progressData.length === 0) return;

  const weights = progressData.map(entry => entry.weight);
  const bmis = progressData.map(entry => entry.bmi);
  const dates = progressData.map(entry => entry.date);

  // Create a new chart instance using filtered data
  progressChartInstance = new Chart(progressChartCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Weight Over Time',
          data: weights,
          borderColor: '#4CAF50',
          fill: false,
        },
        {
          label: 'BMI Over Time',
          data: bmis,
          borderColor: '#FF6347',
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'category', // Ensures the x-axis uses categories (dates)
          title: {
            display: true,
            text: 'Date'
          },
        },
        y: {
          title: {
            display: true,
            text: 'Value'
          },
        },
      },
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
            },
          },
        },
      },
    },
  });
}

// Function to handle edit button click
function handleEdit(event) {
  const index = event.target.getAttribute("data-index");
  const progressData = JSON.parse(localStorage.getItem("progressData")) || [];
  const entry = progressData[index];

  // Fill the form with the selected entry's data
  document.getElementById("patient-name").value = entry.patientName;
  document.getElementById("weight").value = entry.weight;
  document.getElementById("bmi").value = entry.bmi;
  document.getElementById("activity-level").value = entry.activityLevel;
  document.getElementById("date").value = entry.date; // Pre-fill the date

  // Set the editing index to the selected entry
  editingIndex = index;
}

// Function to handle delete button click
function handleDelete(event) {
  const index = event.target.getAttribute("data-index");
  const progressData = JSON.parse(localStorage.getItem("progressData")) || [];

  // Remove the selected entry
  progressData.splice(index, 1);

  // Save the updated progress data to localStorage
  localStorage.setItem("progressData", JSON.stringify(progressData));

  // Reload the progress data (chart updates using filtered data)
  loadProgressData();

  // Show success message
  alert("Progress entry deleted successfully!");
}

// Event listener for form submission
progressForm.addEventListener("submit", handleFormSubmit);

// Event listener for filtering by patient name
patientFilterInput.addEventListener("input", loadProgressData);

// Load the progress data when the page loads
document.addEventListener("DOMContentLoaded", loadProgressData);

// Clear form functionality
document.getElementById("clear-form").addEventListener("click", () => {
  progressForm.reset();
});
