import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: {
    type: String,
    required: true,
  },
  todo: [
    {
      taskName: { type: String },
      dueDate: { type: String },
      isCompleted: { type: Boolean, default: false },
      emoji: { type: String },
      repeat: { type: String, enum: ["none", "daily", "weekly", "monthly"], default: "none" },
      nextDueDate: { type: String, default: new Date() },
      priority: { type: String, enum: ["low", "medium", "high"] },
      status: { type: String, enum: ["In progress", "Done", "Not Started"], default: "Not Started" }
    },
  ],
  journals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Journal",
    },
  ],
  password: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
