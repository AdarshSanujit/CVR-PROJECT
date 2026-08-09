import { useState } from "react";
import "./AddProject.css";

function AddProject() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    technologies: "",
    github: "",
    demo: "",
    year: "",
    teamMembers: "",
  });

  const [projectImage, setProjectImage] = useState(null);
  const [message, setMessage] = useState("");

  // =========================================
  // HANDLE TEXT INPUTS
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove previous success message when editing
    if (message) {
      setMessage("");
    }
  };


  // =========================================
  // HANDLE IMAGE
  // =========================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setProjectImage(null);
      return;
    }

    // Allow only common image formats
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please select a JPG, PNG, or WEBP image."
      );

      e.target.value = "";
      setProjectImage(null);

      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Project image must be smaller than 5 MB."
      );

      e.target.value = "";
      setProjectImage(null);

      return;
    }

    setProjectImage(file);
  };


  // =========================================
  // HANDLE SUBMIT
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create project object
    const projectData = {
      ...formData,
      image: projectImage
        ? projectImage.name
        : null,
      status: "Pending Review",
      createdAt: new Date().toISOString(),
    };

    console.log(
      "Project Submitted:",
      projectData
    );

    setMessage(
      "Project submitted successfully! It will be reviewed by the admin."
    );

    // Reset form
    setFormData({
      title: "",
      category: "",
      description: "",
      technologies: "",
      github: "",
      demo: "",
      year: "",
      teamMembers: "",
    });

    setProjectImage(null);

    // Reset file input
    const fileInput =
      document.getElementById("projectImage");

    if (fileInput) {
      fileInput.value = "";
    }
  };


  return (
    <div className="add-project-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="add-project-header">

        <div className="add-project-logo">
          C
        </div>

        <div>

          <h1>
            Add Your Project
          </h1>

          <p>
            Share your project and help future
            students learn from your work.
          </p>

        </div>

      </div>


      {/* =====================================
          PROJECT FORM CARD
      ===================================== */}

      <div className="add-project-card">

        <h2>
          Project Information
        </h2>

        <p className="form-description">
          Enter the details of your project carefully.
        </p>


        <form onSubmit={handleSubmit}>

          {/* =================================
              PROJECT TITLE
          ================================= */}

          <div className="form-group">

            <label htmlFor="title">
              Project Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter your project title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================
              CATEGORY
          ================================= */}

          <div className="form-group">

            <label htmlFor="category">
              Project Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select project category
              </option>

              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>

              <option value="Machine Learning">
                Machine Learning
              </option>

              <option value="Data Science">
                Data Science
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="App Development">
                App Development
              </option>

              <option value="Cyber Security">
                Cyber Security
              </option>

              <option value="Internet of Things">
                Internet of Things
              </option>

              <option value="Cloud Computing">
                Cloud Computing
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* =================================
              DESCRIPTION
          ================================= */}

          <div className="form-group">

            <label htmlFor="description">
              Project Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Explain what your project does, the problem it solves, and how it works."
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
            />

          </div>


          {/* =================================
              TECHNOLOGIES
          ================================= */}

          <div className="form-group">

            <label htmlFor="technologies">
              Technologies Used
            </label>

            <input
              id="technologies"
              name="technologies"
              type="text"
              placeholder="Example: Python, React, MongoDB, Machine Learning"
              value={formData.technologies}
              onChange={handleChange}
              required
            />

            <small className="field-help">
              Separate multiple technologies with commas.
            </small>

          </div>


          {/* =================================
              GITHUB
          ================================= */}

          <div className="form-group">

            <label htmlFor="github">
              GitHub Repository
            </label>

            <input
              id="github"
              name="github"
              type="url"
              placeholder="https://github.com/username/project"
              value={formData.github}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================
              LIVE DEMO
          ================================= */}

          <div className="form-group">

            <label htmlFor="demo">
              Live Demo URL
              <span className="optional">
                Optional
              </span>
            </label>

            <input
              id="demo"
              name="demo"
              type="url"
              placeholder="https://your-project.com"
              value={formData.demo}
              onChange={handleChange}
            />

          </div>


          {/* =================================
              YEAR
          ================================= */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="year">
                Project Year
              </label>

              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select year
                </option>

                <option value="2026">
                  2026
                </option>

                <option value="2025">
                  2025
                </option>

                <option value="2024">
                  2024
                </option>

                <option value="2023">
                  2023
                </option>

                <option value="2022">
                  2022
                </option>

                <option value="2021">
                  2021
                </option>

              </select>

            </div>


            {/* =================================
                TEAM MEMBERS
            ================================= */}

            <div className="form-group">

              <label htmlFor="teamMembers">
                Team Members
                <span className="optional">
                  Optional
                </span>
              </label>

              <input
                id="teamMembers"
                name="teamMembers"
                type="text"
                placeholder="e.g. Rahul, Priya"
                value={formData.teamMembers}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* =================================
              PROJECT IMAGE
          ================================= */}

          <div className="form-group">

            <label htmlFor="projectImage">
              Project Image
              <span className="optional">
                Optional
              </span>
            </label>

            <input
              id="projectImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />

            <small className="field-help">
              JPG, PNG or WEBP. Maximum size: 5 MB.
            </small>

            {projectImage && (
              <div className="selected-file">

                ✓ {projectImage.name}

              </div>
            )}

          </div>


          {/* =================================
              SUBMIT
          ================================= */}

          <button
            type="submit"
            className="submit-project-button"
          >
            Submit Project →
          </button>

        </form>


        {/* =====================================
            SUCCESS MESSAGE
        ===================================== */}

        {message && (
          <div className="success-message">

            <span>✓</span>

            <div>
              <strong>
                Project Submitted
              </strong>

              <p>
                {message}
              </p>
            </div>

          </div>
        )}

      </div>


      {/* =====================================
          INFORMATION NOTE
      ===================================== */}

      <div className="project-note">

        <strong>
          💡 Important
        </strong>

        <p>
          Your project will be reviewed by the
          CVR ProjectHub admin before it becomes
          visible to juniors.
        </p>

      </div>

    </div>
  );
}

export default AddProject;