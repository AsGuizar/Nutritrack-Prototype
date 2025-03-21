// meal-plans.js

// Get references to the form and table elements
const mealPlanForm = document.getElementById("meal-plan-form");
const mealPlanTable = document.getElementById("meal-plan-table").getElementsByTagName("tbody")[0];

// Function to load meal plans from localStorage
function loadMealPlans() {
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || [];
    mealPlanTable.innerHTML = ""; // Clear the current table content

    mealPlans.forEach(mealPlan => {
        const row = mealPlanTable.insertRow();
        row.innerHTML = `
            <td>${mealPlan.name}</td>
            <td>${mealPlan.description}</td>
            <td>${mealPlan.type}</td>
            <td>${mealPlan.calories}</td>
        `;
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("meal-name").value;
    const description = document.getElementById("meal-description").value;
    const type = document.getElementById("meal-type").value;
    const calories = document.getElementById("meal-calories").value;

    // Create a new meal plan object
    const newMealPlan = {
        name,
        description,
        type,
        calories
    };

    // Get existing meal plans from localStorage or initialize an empty array
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || [];

    // Add the new meal plan to the meal plans array
    mealPlans.push(newMealPlan);

    // Save the updated meal plans list to localStorage
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));

    // Clear the form
    mealPlanForm.reset();

    // Reload the meal plan list
    loadMealPlans();
}

// Event listener for form submission
mealPlanForm.addEventListener("submit", handleFormSubmit);

// Load the meal plan data when the page loads
document.addEventListener("DOMContentLoaded", loadMealPlans);
