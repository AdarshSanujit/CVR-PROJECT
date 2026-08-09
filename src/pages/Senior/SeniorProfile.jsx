import "./SeniorProfile.css";

function SeniorProfile() {
  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* Logo */}
        <div className="profile-logo">
          C
        </div>

        <h1>Senior Profile</h1>

        <p className="profile-subtitle">
          Manage your CVR ProjectHub profile information.
        </p>

        {/* Profile Avatar */}
        <div className="profile-avatar">
          👨‍💻
        </div>

        {/* Profile Information */}
        <div className="profile-info">

          <div className="profile-item">
            <span>Name</span>
            <strong>Senior Student</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <strong>senior@cvr.ac.in</strong>
          </div>

          <div className="profile-item">
            <span>University</span>
            <strong>CV Raman Global University</strong>
          </div>

          <div className="profile-item">
            <span>Role</span>
            <strong>Senior / Alumni</strong>
          </div>

        </div>

        {/* Edit Button */}
        <button
          className="profile-button"
          type="button"
          onClick={() => alert("Profile editing will be added later.")}
        >
          Edit Profile
        </button>

        {/* Back */}
        <button
          className="profile-back"
          type="button"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>

      </div>

    </div>
  );
}

export default SeniorProfile;