import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: {
    type: String,
    required: true,
  },
  habits: {
    type: [String],
    default: [],
  },
  journals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Journal",
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
