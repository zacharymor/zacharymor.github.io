const projects = [
    
];

function populateProjects() {
    const projectsContainer = document.getElementById("projects-container");
    projects
        .sort(() => Math.random() - 0.5)
        .forEach((project) => {
            const projectCard = document.createElement("div");
            projectCard.className = "col-md-4 d-flex p-2";
            projectCard.innerHTML = `
            <div class="card project-card" data-aos="fade-up">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary" target="_blank">Learn More</a>
                </div>
            </div>
        `;
            projectsContainer.appendChild(projectCard);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    populateProjects();

    const sidebar = document.getElementById("sidebar");
    const openSidebarBtn = document.getElementById("openSidebar");
    const closeSidebarBtn = document.getElementById("closeSidebar");
    const links = document.querySelectorAll(".sidebar .nav-link");
    const themeToggle = document.getElementById("themeToggle");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const currentTheme = localStorage.getItem("theme") || "dark";

    document.body.classList.add(currentTheme + "-mode");
    themeToggle.checked = currentTheme === "dark";

    openSidebarBtn.addEventListener("click", () => {
        sidebar.style.width = "250px";
    });

    closeSidebarBtn.addEventListener("click", () => {
        sidebar.style.width = "0";
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            sidebar.style.width = "0";
        });
    });

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
        }
        updateButtonColors();
    });

    window.onscroll = function () {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    scrollTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    AOS.init();
    updateButtonColors();
});

function updateButtonColors() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    const primaryButtons = document.querySelectorAll(".btn-primary");
    const secondaryButtons = document.querySelectorAll(".btn-secondary");

    primaryButtons.forEach((btn) => {
        btn.style.backgroundColor = isDarkMode ? "#ffffff" : "#000000";
        btn.style.borderColor = isDarkMode ? "#ffffff" : "#000000";
        btn.style.color = isDarkMode ? "#000000" : "#ffffff";
    });

    secondaryButtons.forEach((btn) => {
        btn.style.backgroundColor = isDarkMode ? "#ffffff" : "#000000";
        btn.style.borderColor = isDarkMode ? "#ffffff" : "#000000";
        btn.style.color = isDarkMode ? "#000000" : "#ffffff";
    });
}
