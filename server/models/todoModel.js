const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todoModel = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Todo", todoModel);
