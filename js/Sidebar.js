const sidebar = document.getElementById("sidebar-container");
const menuToggle = document.getElementById("menuToggle");

// Toggle Sidebar when Menu Button Clicked
menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});

// Close Sidebar when Clicking Outside
document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove("active");
    }
})