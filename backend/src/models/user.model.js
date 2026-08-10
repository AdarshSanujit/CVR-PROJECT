import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    department: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },
    role: {
      enum: ["senior", "junior", "admin"],
      type: String,
      required: true,
      default: "junior",
    },
    graduation_year: {
      type: Number,
      required: function () {
        return this.role === "senior";
      },
    },
    batch_year: {
      type: Number,
      required: function () {
        return this.role === "junior";
      },
    },
    semester: {
      type: Number,
      required: function () {
        return this.role === "junior";
      },
    },
    interest: {
      type: String,
      required: function () {
        return this.role === "junior";
      },
    },

    current_role: {
      type: String,
      required: function () {
        return this.role === "senior";
      },
    },

    companyName: {
      type: String,
      required: function () {
        return this.role === "senior";
      },
    },

    linkedin_url: {
      type: String,
    },

    github_url: {
      type: String,
    },

    bio: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    location: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;