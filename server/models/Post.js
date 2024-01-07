const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  comments: [
    {
      message: {
        type: String,
        required: true,
        trim: true,
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

PostSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATE_SHORT
  );
});
PostSchema.path("comments")
  .schema.virtual("date")
  .get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(
      DateTime.DATE_SHORT
    );
  });
PostSchema.path("comments").schema.set("toObject", { virtuals: true });
PostSchema.path("comments").schema.set("toJSON", { virtuals: true });
PostSchema.set("toObject", { virtuals: true });
PostSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);
