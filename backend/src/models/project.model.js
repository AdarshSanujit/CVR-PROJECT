import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    senior_profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    github_url: {
      type: String,
      trim: true,
    },

    live_demo_url: {
      type: String,
      trim: true,
    },

    project_image: {
      type: String,
    },

    duration: {
      type: String,
    },

    academic_year: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    rejection_reason: {
      type: String,
      default: null,
    },

    views_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
