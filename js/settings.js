// settings.js

// Get references to the forms and input fields
const profileForm = document.getElementById("profile-form");
const privacyForm = document.getElementById("privacy-form");
const preferencesForm = document.getElementById("preferences-form");

// Load saved user settings from localStorage
function loadSettings() {
    const profileData = JSON.parse(localStorage.getItem("profileData")) || {};
    const privacyData = JSON.parse(localStorage.getItem("privacyData")) || {};
    const preferencesData = JSON.parse(localStorage.getItem("preferencesData")) || {};

    // Populate the profile form
    document.getElementById("user-name").value = profileData.name || '';
    document.getElementById("user-email").value = profileData.email || '';

    // Populate the privacy form
    document.getElementById("data-sharing").checked = privacyData.dataSharing || false;
    document.getElementById("email-notifications").checked = privacyData.emailNotifications || false;

    // Populate the preferences form
    document.getElementById("theme").value = preferencesData.theme || 'light';
}

// Save profile settings
function saveProfile(event) {
    event.preventDefault();

    const profileData = {
        name: document.getElementById("user-name").value,
        email: document.getElementById("user-email").value
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("Profile saved successfully!");
}

// Save privacy settings
function savePrivacySettings(event) {
    event.preventDefault();

    const privacyData = {
        dataSharing: document.getElementById("data-sharing").checked,
        emailNotifications: document.getElementById("email-notifications").checked
    };

    localStorage.setItem("privacyData", JSON.stringify(privacyData));
    alert("Privacy settings saved successfully!");
}

// Save preferences settings
function savePreferencesSettings(event) {
    event.preventDefault();

    const preferencesData = {
        theme: document.getElementById("theme").value
    };

    localStorage.setItem("preferencesData", JSON.stringify(preferencesData));
    alert("Preferences saved successfully!");
}

// Add event listeners for form submissions
profileForm.addEventListener("submit", saveProfile);
privacyForm.addEventListener("submit", savePrivacySettings);
preferencesForm.addEventListener("submit", savePreferencesSettings);

// Load settings when the page loads
document.a
