import { useState, useEffect } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./SeniorDashboard.css";


function SeniorDashboard() {

  const navigate = useNavigate();
  const location = useLocation();


  // =========================================
  // CHECK ACTIVE PAGE
  // =========================================

  const isActive = (path) => {
    return location.pathname === path;
  };


  // =========================================
  // DEMO PROJECTS
  // =========================================

  const demoProjects = [
    {
      id: "demo-1",

      title: "AI Project Repository",

      description:
        "A platform for students to discover and learn from previous projects.",

      technologies: [
        "React",
        "Python",
        "Machine Learning",
      ],

      github:
        "https://github.com/",

      demo: "",

      category:
        "Artificial Intelligence",

      year:
        "2026",

      status:
        "Published",
    },

    {
      id: "demo-2",

      title: "Crop Yield Prediction",

      description:
        "Machine learning project that predicts crop yield using agricultural data.",

      technologies: [
        "Python",
        "Flask",
        "Machine Learning",
      ],

      github:
        "https://github.com/",

      demo: "",

      category:
        "Machine Learning",

      year:
        "2025",

      status:
        "Published",
    },
  ];


  // =========================================
  // PROJECT STATE
  // =========================================

  const [projects, setProjects] = useState([]);


  // =========================================
  // LOAD PROJECTS FROM LOCAL STORAGE
  // =========================================

  const loadProjects = () => {

    try {

      const savedProjects =
        JSON.parse(
          localStorage.getItem("cvrProjects")
        ) || [];


      if (
        Array.isArray(savedProjects) &&
        savedProjects.length > 0
      ) {

        setProjects(savedProjects);

      } else {

        setProjects(demoProjects);

      }

    } catch (error) {

      console.error(
        "Unable to load projects:",
        error
      );

      setProjects(demoProjects);
    }
  };


  // =========================================
  // LOAD WHEN DASHBOARD OPENS
  // =========================================

  useEffect(() => {

    loadProjects();

  }, []);


  // =========================================
  // REFRESH WHEN RETURNING TO DASHBOARD
  // =========================================

  useEffect(() => {

    const handleStorageChange = () => {
      loadProjects();
    };


    window.addEventListener(
      "storage",
      handleStorageChange
    );


    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

    };

  }, []);


  // =========================================
  // DELETE PROJECT
  // =========================================

  const handleDeleteProject = (projectId) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this project?"
      );


    if (!confirmDelete) {
      return;
    }


    const updatedProjects =
      projects.filter(
        (project) =>
          project.id !== projectId
      );


    // Don't save demo projects
    const realProjects =
      updatedProjects.filter(
        (project) =>
          !String(project.id).startsWith("demo-")
      );


    localStorage.setItem(
      "cvrProjects",
      JSON.stringify(realProjects)
    );


    if (realProjects.length > 0) {

      setProjects(realProjects);

    } else {

      setProjects(demoProjects);

    }

  };


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );


    if (confirmLogout) {

      navigate("/senior/login");

    }

  };


  // =========================================
  // OPEN PROJECT
  // =========================================

  const handleViewProject = (project) => {

    if (project.github) {

      window.open(
        project.github,
        "_blank",
        "noopener,noreferrer"
      );

      return;

    }


    alert(
      "Project details will be connected next."
    );

  };


  // =========================================
  // DASHBOARD
  // =========================================

  return (

    <div className="dashboard-page">


      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="dashboard-sidebar">


        {/* Logo */}

        <div className="dashboard-logo">

          <div className="dashboard-logo-icon">
            C
          </div>

          <div>

            <h2>
              CVR ProjectHub
            </h2>

            <span>
              Senior Portal
            </span>

          </div>

        </div>


        {/* Profile Mini Card */}

        <div
          className="sidebar-profile"
          onClick={() =>
            navigate("/senior/profile")
          }
          style={{
            cursor: "pointer",
          }}
        >

          <div className="sidebar-avatar">
            A
          </div>

          <div>

            <strong>
              Senior User
            </strong>

            <span>
              Alumni
            </span>

          </div>

        </div>


        {/* =========================================
            NAVIGATION
        ========================================= */}

        <nav className="dashboard-nav">


          {/* Dashboard */}

          <Link
            to="/senior/dashboard"
            className={
              isActive("/senior/dashboard")
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>
              📊
            </span>

            Dashboard

          </Link>


          {/* My Profile */}

          <Link
            to="/senior/profile"
            className={
              isActive("/senior/profile")
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>
              👤
            </span>

            My Profile

          </Link>


          {/* Add Project */}

          <Link
            to="/senior/add-project"
            className={
              isActive("/senior/add-project")
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>
              ➕
            </span>

            Add Project

          </Link>


          {/* My Projects */}

          <button
            type="button"
            className="nav-item"
            onClick={() => {

              const element =
                document.getElementById(
                  "my-projects"
                );


              if (element) {

                element.scrollIntoView({
                  behavior: "smooth",
                });

              }

            }}
          >

            <span>
              📁
            </span>

            My Projects

          </button>


          {/* Junior Requests */}

          <Link
            to="/senior/contact"
            className={
              isActive("/senior/contact")
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>
              💬
            </span>

            Junior Requests

          </Link>


        </nav>


        {/* =========================================
            SIDEBAR BOTTOM
        ========================================= */}

        <div className="sidebar-bottom">

          <button
            type="button"
            className="nav-item logout-button"
            onClick={handleLogout}
          >

            <span>
              🚪
            </span>

            Logout

          </button>

        </div>


      </aside>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="dashboard-main">


        {/* =========================================
            TOP BAR
        ========================================= */}

        <header className="dashboard-header">

          <div>

            <p className="welcome-small">
              SENIOR PORTAL
            </p>

            <h1>
              Welcome back, Senior 👋
            </h1>

            <p className="header-description">
              Manage your projects and help
              the next generation of students.
            </p>

          </div>


          <div className="header-actions">


            {/* Notification */}

            <button
              type="button"
              className="notification-button"
              title="Notifications"
              onClick={() =>
                alert(
                  "No new notifications."
                )
              }
            >

              🔔

              <span className="notification-dot">
              </span>

            </button>


            {/* Avatar */}

            <div
              className="header-avatar"
              onClick={() =>
                navigate("/senior/profile")
              }
              style={{
                cursor: "pointer",
              }}
            >

              A

            </div>


          </div>

        </header>


        {/* =========================================
            STATISTICS
        ========================================= */}

        <section className="stats-grid">


          {/* Total Projects */}

          <div className="stat-card">

            <div className="stat-icon blue">
              📁
            </div>

            <div>

              <span>
                Total Projects
              </span>

              <strong>
                {projects.length}
              </strong>

            </div>

          </div>


          {/* Project Views */}

          <div className="stat-card">

            <div className="stat-icon green">
              👀
            </div>

            <div>

              <span>
                Project Views
              </span>

              <strong>
                128
              </strong>

            </div>

          </div>


          {/* Junior Interests */}

          <div className="stat-card">

            <div className="stat-icon orange">
              🎓
            </div>

            <div>

              <span>
                Junior Interests
              </span>

              <strong>
                12
              </strong>

            </div>

          </div>


          {/* Help Requests */}

          <div className="stat-card">

            <div className="stat-icon purple">
              💬
            </div>

            <div>

              <span>
                Help Requests
              </span>

              <strong>
                4
              </strong>

            </div>

          </div>


        </section>


        {/* =========================================
            QUICK ACTIONS
        ========================================= */}

        <section className="dashboard-section">


          <div className="section-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Manage your contribution to
                CVR ProjectHub.
              </p>

            </div>

          </div>


          <div className="quick-actions">


            {/* Add Project */}

            <Link
              to="/senior/add-project"
              className="quick-card"
            >

              <div className="quick-icon">
                ➕
              </div>

              <div>

                <h3>
                  Add New Project
                </h3>

                <p>
                  Share your project with juniors.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            {/* Profile */}

            <Link
              to="/senior/profile"
              className="quick-card"
            >

              <div className="quick-icon profile">
                👤
              </div>

              <div>

                <h3>
                  Update Profile
                </h3>

                <p>
                  Keep your professional
                  information updated.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            {/* Junior Requests */}

            <Link
              to="/senior/contact"
              className="quick-card"
            >

              <div className="quick-icon contact">
                💬
              </div>

              <div>

                <h3>
                  Junior Requests
                </h3>

                <p>
                  Check requests from juniors.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


          </div>

        </section>


        {/* =========================================
            MY PROJECTS
        ========================================= */}

        <section
          className="dashboard-section"
          id="my-projects"
        >


          <div className="section-header">

            <div>

              <h2>
                My Projects
              </h2>

              <p>
                Projects you have shared
                with the community.
              </p>

            </div>


            <Link
              to="/senior/add-project"
              className="add-project-button"
            >

              + Add Project

            </Link>


          </div>


          {/* =====================================
              PROJECT GRID
          ===================================== */}

          <div className="projects-grid">


            {projects.length === 0 ? (

              <div className="empty-projects">

                <div className="empty-project-icon">
                  📁
                </div>

                <h3>
                  No projects yet
                </h3>

                <p>
                  Add your first project to
                  start helping juniors.
                </p>

                <Link
                  to="/senior/add-project"
                  className="add-project-button"
                >
                  + Add Your First Project
                </Link>

              </div>

            ) : (

              projects.map((project) => (

                <div
                  className="project-dashboard-card"
                  key={project.id}
                >


                  {/* Project Top */}

                  <div className="project-card-top">


                    <div className="project-type-icon">
                      💻
                    </div>


                    <span className="project-status">

                      {project.status ===
                      "Pending Review"
                        ? "⏳ Pending Review"
                        : "✓ " +
                          (
                            project.status ||
                            "Published"
                          )}

                    </span>


                  </div>


                  {/* Title */}

                  <h3>
                    {project.title}
                  </h3>


                  {/* Category */}

                  {project.category && (

                    <div className="project-category">

                      {project.category}

                    </div>

                  )}


                  {/* Description */}

                  <p>
                    {project.description}
                  </p>


                  {/* Technologies */}

                  <div className="project-technologies">


                    {Array.isArray(
                      project.technologies
                    ) ? (

                      project.technologies.map(
                        (
                          technology,
                          index
                        ) => (

                          <span
                            key={
                              `${technology}-${index}`
                            }
                          >
                            {technology}
                          </span>

                        )
                      )

                    ) : (

                      <span>
                        {project.technologies}
                      </span>

                    )}


                  </div>


                  {/* Project Year */}

                  {project.year && (

                    <div className="project-meta">

                      📅 {project.year}

                    </div>

                  )}


                  {/* Team Members */}

                  {project.teamMembers &&
                    project.teamMembers.length > 0 && (

                    <div className="project-meta">

                      👥{" "}

                      {Array.isArray(
                        project.teamMembers
                      )
                        ? project.teamMembers.join(
                            ", "
                          )
                        : project.teamMembers}

                    </div>

                  )}


                  {/* Footer */}

                  <div className="project-card-footer">


                    {/* GitHub */}

                    {project.github ? (

                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            project.github,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        🔗 GitHub
                      </button>

                    ) : (

                      <button
                        type="button"
                        disabled
                      >
                        🔗 GitHub
                      </button>

                    )}


                    {/* Live Demo */}

                    {project.demo ? (

                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            project.demo,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        🌐 Demo
                      </button>

                    ) : (

                      <button
                        type="button"
                        onClick={() =>
                          handleViewProject(
                            project
                          )
                        }
                      >
                        View →
                      </button>

                    )}


                    {/* Delete */}

                    {!String(
                      project.id
                    ).startsWith("demo-") && (

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProject(
                            project.id
                          )
                        }
                        title="Delete project"
                      >
                        🗑️
                      </button>

                    )}


                  </div>


                </div>

              ))

            )}


          </div>

        </section>


        {/* =========================================
            JUNIOR REQUESTS
        ========================================= */}

        <section className="dashboard-section">


          <div className="section-header">

            <div>

              <h2>
                Recent Junior Requests
              </h2>

              <p>
                Students interested in your
                projects or looking for guidance.
              </p>

            </div>


            <Link
              to="/senior/contact"
              className="view-all-link"
            >
              View All →
            </Link>

          </div>


          <div className="request-card">


            <div className="request-avatar">
              R
            </div>


            <div className="request-info">

              <h3>
                Rahul Kumar
              </h3>

              <p>
                Interested in your
                AI Project Repository
              </p>

              <span>
                Requested 2 hours ago
              </span>

            </div>


            <div className="request-actions">


              <button
                type="button"
                className="accept-button"
                onClick={() =>
                  alert(
                    "Request accepted."
                  )
                }
              >
                Accept
              </button>


              <button
                type="button"
                className="decline-button"
                onClick={() =>
                  alert(
                    "Request declined."
                  )
                }
              >
                Decline
              </button>


            </div>


          </div>


        </section>


        {/* =========================================
            FOOTER
        ========================================= */}

        <footer className="dashboard-footer">

          <span>
            © 2026 CVR ProjectHub
          </span>

          <span>
            Learn. Connect. Build.
          </span>

        </footer>


      </main>

    </div>

  );
}


export default SeniorDashboard;