import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  aiResponse: { type: String },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const Entry =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);
