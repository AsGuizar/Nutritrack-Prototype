const patientForm = document.getElementById("patient-form");
const patientTable = document.getElementById("patient-table").getElementsByTagName("tbody")[0];
const searchBar = document.getElementById("search-bar");

// Function to load patients from localStorage
function loadPatients() {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    patientTable.innerHTML = ""; // Clear the current table content

    patients.forEach((patient, index) => {
        const row = patientTable.insertRow();
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.weight}</td>
            <td>${patient.height}</td>
            <td>${patient.medicalHistory}</td>
            <td>${patient.dateOfRegistration}</td> <!-- Display registration date -->
            <td>
                <button onclick="editPatient(${index})">Edit</button>
                <button onclick="deletePatient(${index})">Delete</button>
            </td>
        `;
    });
}

// Function to handle form submission (Add or Edit)
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const medicalHistory = document.getElementById("medical-history").value;
    const dateOfRegistration = document.getElementById("date-of-registration").value; // Get the registration date

    // Create a new patient object
    const newPatient = {
        name,
        age,
        weight,
        height,
        medicalHistory,
        dateOfRegistration // Add registration date
    };

    // Get existing patients from localStorage or initialize an empty array
    const patients = JSON.parse(localStorage.getItem("patients")) || [];

    // If editing, update the existing patient record
    const editIndex = patientForm.dataset.editIndex;
    if (editIndex !== undefined) {
        patients[editIndex] = newPatient;
    } else {
        patients.push(newPatient);
    }

    // Save the updated patients list to localStorage
    localStorage.setItem("patients", JSON.stringify(patients));

    // Clear the form
    patientForm.reset();
    delete patientForm.dataset.editIndex; // Remove edit index

    // Reload the patient list
    loadPatients();
}

// Function to edit patient details
function editPatient(index) {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const patient = patients[index];

    // Populate the form with existing data
    document.getElementById("name").value = patient.name;
    document.getElementById("age").value = patient.age;
    document.getElementById("weight").value = patient.weight;
    document.getElementById("height").value = patient.height;
    document.getElementById("medical-history").value = patient.medicalHistory;
    document.getElementById("date-of-registration").value = patient.dateOfRegistration; // Set registration date

    // Set a custom data attribute to track the edit index
    patientForm.dataset.editIndex = index;
}

// Function to delete patient
function deletePatient(index) {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];

    // Remove the patient from the array
    patients.splice(index, 1);

    // Save the updated patients list to localStorage
    localStorage.setItem("patients", JSON.stringify(patients));

    // Reload the patient list
    loadPatients();
}

// Function to filter patients by search term
function filterPatients() {
    const searchTerm = searchBar.value.toLowerCase();
    const rows = patientTable.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {
        const nameCell = row.getElementsByTagName("td")[0];
        if (nameCell) {
            const name = nameCell.textContent.toLowerCase();
            row.style.display = name.includes(searchTerm) ? "" : "none";
        }
    });
}

// Event listener for form submission
patientForm.addEventListener("submit", handleFormSubmit);

// Load the patient data when the page loads
document.addEventListener("DOMContentLoaded", loadPatients);
