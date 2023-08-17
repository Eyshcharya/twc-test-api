import asyncHandler from 'express-async-handler';
import { User } from '../Models/userModel.js';

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
    res.status(400).json({ message: 'No contacts' });
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
    if (contact) {
      user.contacts.unshift(contact);
      await user.save();
      res.status(201).json(contact);
    } else {
      throw new Error(`Invalid data`);
    }
  } else {
    throw new Error(`User Does not Exist`);
  }
});

// updateContact controller
// route   /contacts/:email
// request  PUT
const updateContact = asyncHandler(async (req, res) => {
  const userEmail = req.params.email;
  const { _id, name, email, phone, gender } = req.body;
  const user = await User.findOne({ email: userEmail });

  if (user && user.contacts.length > 0) {
    const contactIndex = user.contacts.findIndex(
      (contact) => contact._id.toString() === _id
    );

    const contact = user.contacts[contactIndex];

    if (contactIndex !== -1 && contact) {
      contact.name = name || contact.name;
      contact.email = email || contact.email;
      contact.phone = phone || contact.phone;
      contact.gender = gender || contact.gender;
      // await user.save();
      try {
        const updatedUser = await user.save();
        res.status(201).json(updatedUser.contacts[contactIndex]);
      } catch (error) {
        // Handle the error (log it, send an error response, etc.)
        res.status(500).json({ error: 'Error saving user data.' });
      }
    } else {
      throw new Error(`Contact Does not Exist`);
    }
  } else {
    throw new Error(`User Does not Exist`);
  }
});

export { createContact, getContacts, updateContact };
