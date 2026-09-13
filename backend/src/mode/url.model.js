import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: [true, "Short id is required"],
      unique: [true, "ShortId should be unique"],
    },
    redirectUrl: {
      type: String,
      required: [true, "RedirectURL is Required"],
    },

    visitHistory: [{ timestamp: { type: Number } }],
  } ,{
    timestamps:true
  }
);

const urlModel = mongoose.model("URL", urlSchema);

export default urlModel;
