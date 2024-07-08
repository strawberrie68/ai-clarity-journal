import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  aiResponse: { type: String, required: true },
});

export const Entry =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);
