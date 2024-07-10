import mongoose from "mongoose";

const Schema = mongoose.Schema;

const journalSchema = new Schema({
  title: {
    type: String,
  },
  entries: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entry",
      },
    ],
    default: [],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  conversationSummary: {
    type: String,
  },
  aiSummary: {
    type: String,
  },
  sentiment: {
    type: String,
  },
  mood: {
    type: String,
  },
  highlight: {
    type: String,
  },
  keyInsight: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Journal =
  mongoose.models.Journal || mongoose.model("Journal", journalSchema);
