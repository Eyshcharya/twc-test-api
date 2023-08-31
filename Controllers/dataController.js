import asyncHandler from "express-async-handler";
import { User } from "../Models/userModel.js";

// getContacts controller
// route   /contacts/:email
// request  GET
const getContacts = asyncHandler(async (req, res) => {
  const email = req.params.email;

  const user = await User.findOne({ email });
  const contacts = user.contacts;

  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(400).json({ message: "no contacts" });
  }
});

// createContact controller
// route   /contacts/:email
// request  POST
const createContact = asyncHandler(async (req, res) => {
  const { userEmail, email, name, phone, gender } = req.body;
  const user = await User.findOne({ email: userEmail });
  const date = new Date();

  const contact = {
    name,
    phone,
    email,
    gender,
    _id: date.getTime(),
  };

  if (user) {
    if (user.contacts.length > 0) {
      const contactExist = user.contacts.find(
        (contact) => contact.phone === phone
      );
      if (contactExist) {
        res.status(400).json({ message: "contact already exist" });
        throw new Error(`contact already exist`);
      }
    }

    if (contact) {
      user.contacts.unshift(contact);
      await user.save();
      res.status(201).json(contact);
    } else {
      res.status(400).json({ message: "invalid data" });
      throw new Error(`Invalid data`);
    }
  } else {
    res.status(400).json({ message: "user does not exist" });
    throw new Error(`User Does not Exist`);
  }
});

// updateContact controller
// route   /contacts/:email
// request  PUT
const updateContact = asyncHandler(async (req, res) => {
  // const userEmail = req.params.email;
  const { contactID, name, email, phone, gender } = req.body;

  try {
    const updatedContact = await User.findOneAndUpdate(
      {
        "contacts._id": parseFloat(contactID),
      },
      {
        $set: {
          "contacts.$.name": name,
          "contacts.$.email": email,
          "contacts.$.phone": phone,
          "contacts.$.gender": gender,
        },
      },
      { new: true }
    );

    if (!updatedContact) {
      res.status(404).json({ message: "contact not found" });
      throw new Error(`contact not found`);
    }

    res.status(201).json({ message: "Contact updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "error updating contact" });
    throw new Error(`error updating contact`);
  }
});

export { createContact, getContacts, updateContact };
