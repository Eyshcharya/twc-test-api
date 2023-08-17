import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  gender: { type: String, required: true },
});

const Contact = mongoose.model('contact', contactSchema);
export { Contact };
