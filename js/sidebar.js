// sidebar.js

// Get all sidebar links
const sidebarLinks = document.querySelectorAll("#sidebar ul li a");

// Function to update the active class based on the current page
function updateActiveLink() {
    // Get the current URL path
    const currentPage = window.location.pathname.split('/').pop();

    // Loop through all sidebar links
    sidebarLinks.forEach(link => {
        // Remove 'active' class from all links
        link.classList.remove("active");

        // Add 'active' class to the link that matches the current page
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

// Update active link when the page loads
document.addEventListener("DOMContentLoaded", updateActiveLink);

// Update active link when navigating
window.addEventListener("popstate", updateActiveLink);
