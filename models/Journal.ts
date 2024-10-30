import mongoose from "mongoose";

const Schema = mongoose.Schema;

const journalSchema = new Schema({
  aiSummary: {
    type: String,
  },
  color: {
    type: String,
  },
  conversationSummary: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  emoji: {
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
  haiku: {
    type: String,
  },
  highlight: {
    type: String,
  },
  keyInsight: {
    type: String,
  },
  mood: {
    type: String,
  },
  quote: {
    type: String,
  },
  sentiment: {
    type: String,
  },
  title: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  todo: [
    {
      taskName: { type: String },
      dueDate: { type: String },
      isCompleted: { type: Boolean },
      emoji: { type: String },
      repeat: { type: String, enum: ["none", "daily", "weekly", "monthly"] },
      nextDueDate: { type: String },
      priority: { type: String, enum: ["low", "medium", "high"] },
      status: {
        type: String, enum: ['Not Started', 'In Progress', 'Done']
      },
    },
  ],
});

export const Journal =
  mongoose.models.Journal || mongoose.model("Journal", journalSchema);
