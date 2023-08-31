import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String, required: true, enum: ["male", "female"] },
});

const Contact = mongoose.model("contact", contactSchema);
export { Contact };
