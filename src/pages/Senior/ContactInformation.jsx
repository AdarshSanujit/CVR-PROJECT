import "./ContactInformation.css";

function ContactInformation() {
  return (
    <div className="contact-page">

      <div className="contact-card">

        {/* Logo */}
        <div className="contact-logo">
          C
        </div>

        <h1>Contact Information</h1>

        <p className="contact-subtitle">
          Connect with juniors and help them with their projects.
        </p>

        {/* Contact Information */}
        <div className="contact-section">

          <div className="contact-item">
            <span className="contact-icon">📧</span>

            <div>
              <strong>Email</strong>
              <p>senior@cvr.ac.in</p>
            </div>
          </div>


          <div className="contact-item">
            <span className="contact-icon">📱</span>

            <div>
              <strong>Phone</strong>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>


          <div className="contact-item">
            <span className="contact-icon">🎓</span>

            <div>
              <strong>University</strong>
              <p>CV Raman Global University</p>
            </div>
          </div>


          <div className="contact-item">
            <span className="contact-icon">💼</span>

            <div>
              <strong>LinkedIn</strong>
              <p>Senior Professional Profile</p>
            </div>
          </div>

        </div>


        {/* Back Button */}
        <button
          className="contact-back"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>

      </div>

    </div>
  );
}

export default ContactInformation;