// app.js

// Sample data for stats and activities
const dashboardStats = {
    patients: 25,
    mealPlans: 10,
    progressReports: 5,
    recentActivities: [
        { title: "Patient Added", description: "John Doe added to the system." },
        { title: "Meal Plan Created", description: "Meal plan for Jane Smith created." },
        { title: "Progress Updated", description: "Weight progress updated for Mary Johnson." }
    ]
};

// Function to update the stats on the dashboard
function updateDashboardStats() {
    document.getElementById("patient-count").textContent = dashboardStats.patients;
    document.getElementById("meal-plan-count").textContent = dashboardStats.mealPlans;
    document.getElementById("progress-report-count").textContent = dashboardStats.progressReports;
}

// Function to display recent activities
function displayRecentActivities() {
    const activityList = document.getElementById("activity-list");
    dashboardStats.recentActivities.forEach(activity => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
        `;
        activityList.appendChild(listItem);
    });
}

// Initialize the dashboard
function initDashboard() {
    updateDashboardStats();
    displayRecentActivities();
}

// Run the dashboard setup on page load
document.addEventListener("DOMContentLoaded", initDashboard);
