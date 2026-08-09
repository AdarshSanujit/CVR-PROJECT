
import {
  Link
} from "react-router-dom";
const Home = () => {
  return (
   
    <div className="app">

      {/* ================================
          NAVIGATION BAR
      ================================= */}

      <nav className="navbar">

        <div className="logo">

          <div className="logo-icon">
            C
          </div>

          <div>
            <h2>CVR ProjectHub</h2>

            <span>
              Project & Alumni Network
            </span>
          </div>

        </div>


        <div className="nav-links">

          <a href="#about">
            About
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

      </nav>


      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            🎓 CV Raman Global University
          </div>


          <h1>
            Learn from the past.
            <br />

            <span>
              Build the future.
            </span>
          </h1>


          <p>
            A university project knowledge platform where
            seniors share their projects and juniors
            discover, learn, connect and build something
            better.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-button"
              type="button"
            >
              Explore Projects →
            </button>

            <button
              className="secondary-button"
              type="button"
            >
              Add Your Project
            </button>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="visual-card main-card">

            <div className="card-top">

              <span className="project-icon">
                💻
              </span>

              <span className="verified">
                ✓ Verified
              </span>

            </div>


            <h3>
              AI Project Repository
            </h3>


            <p>
              Discover projects created by students
              and alumni.
            </p>


            <div className="tech-tags">

              <span>Python</span>
              <span>React</span>
              <span>ML</span>

            </div>


            <div className="card-author">

              <div className="avatar">
                A
              </div>

              <div>

                <strong>
                  Senior Project
                </strong>

                <small>
                  CVR Global University
                </small>

              </div>

            </div>

          </div>


          <div className="floating-card card-one">

            👨‍🎓

            <strong>
              Senior
            </strong>

            <small>
              Share Knowledge
            </small>

          </div>


          <div className="floating-card card-two">

            🔎

            <strong>
              Junior
            </strong>

            <small>
              Explore Projects
            </small>

          </div>

        </div>

      </section>


      {/* ================================
          ROLE SELECTION
      ================================= */}

      <section
        className="roles"
        id="features"
      >

        <div className="section-heading">

          <span>
            GET STARTED
          </span>

          <h2>
            Choose your role
          </h2>

          <p>
            Select how you want to use CVR ProjectHub.
          </p>

        </div>


        <div className="role-container">


          {/* ============================
              SENIOR
          ============================= */}

          <div className="role-card senior-card">

            <div className="role-icon">
              👨‍💻
            </div>


            <span className="role-label">
              SENIOR / ALUMNI
            </span>


            <h3>
              Share Your Project
            </h3>


            <p>
              Preserve your university project and
              help future students learn from your
              experience.
            </p>


            <ul>

              <li>✓ Add your project</li>

              <li>✓ Add GitHub repository</li>

              <li>✓ Share your professional journey</li>

              <li>✓ Help juniors</li>

            </ul>


            <Link
              to="/senior/login"
              className="role-button"
            >
              Senior Login →
            </Link>

          </div>


          {/* ============================
              JUNIOR
          ============================= */}

          <div className="role-card junior-card">

            <div className="role-icon">
              🎓
            </div>


            <span className="role-label">
              JUNIOR / STUDENT
            </span>


            <h3>
              Explore Projects
            </h3>


            <p>
              Discover projects from seniors and alumni,
              learn from them and build your own version.
            </p>


            <ul>

              <li>✓ Explore projects</li>

              <li>✓ Find GitHub references</li>

              <li>✓ Connect with seniors</li>

              <li>✓ Get project guidance</li>

            </ul>


            <button
              className="role-button"
              type="button"
            >
              Junior Login →
            </button>

          </div>


          {/* ============================
              ADMIN
          ============================= */}

          <div className="role-card admin-card">

            <div className="role-icon">
              🛡️
            </div>


            <span className="role-label">
              ADMIN
            </span>


            <h3>
              Manage Platform
            </h3>


            <p>
              Manage users, verify projects and
              maintain a safe and trusted platform.
            </p>


            <ul>

              <li>✓ Manage users</li>

              <li>✓ Approve projects</li>

              <li>✓ Monitor activity</li>

              <li>✓ Manage reports</li>

            </ul>


            <button
              className="role-button"
              type="button"
            >
              Admin Login →
            </button>

          </div>

        </div>

      </section>


      {/* ================================
          ABOUT SECTION
      ================================= */}

      <section
        className="about"
        id="about"
      >

        <div>

          <span className="section-label">
            WHY CVR PROJECTHUB?
          </span>


          <h2>
            Your university's knowledge
            shouldn't graduate.
          </h2>

        </div>


        <p>
          Every year students create innovative projects,
          but much of that knowledge disappears when they
          graduate. CVR ProjectHub preserves that knowledge
          and connects different generations of students.
        </p>

      </section>


      {/* ================================
          FOOTER
      ================================= */}

      <footer id="contact">

        <div>

          <h3>
            CVR ProjectHub
          </h3>

          <p>
            Learn. Connect. Build.
          </p>

        </div>


        <p>
          © 2026 CVR ProjectHub
        </p>

      </footer>

    </div>
  );
  
}

export default Home