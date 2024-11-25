import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: {
    type: String,
    required: true,
  },
  journals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Journal",
    },
  ],
  password: { type: String, required: true }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
