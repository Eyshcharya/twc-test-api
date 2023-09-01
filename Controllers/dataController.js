import asyncHandler from "express-async-handler";
import { User } from "../Models/userModel.js";

// getUser controller
// route   /
// request  POST
const getUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "No user data" });
  }
});

// getContacts controller
// route   /contacts/:userID
// request  GET
const getContacts = asyncHandler(async (req, res) => {
  const _id = req.params.userID;

  const user = await User.findById(_id);
  const contacts = user.contacts;

  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(400).json({ message: "no contacts" });
  }
});

// deleteContact controller
// route   /contacts/:userID
// request  DELETE
const deleteContact = asyncHandler(async (req, res) => {
  const { _id, userID } = req.body;

  try {
    const result = await User.updateOne(
      { _id: userID },
      { $pull: { contacts: { _id: parseFloat(_id) } } }
    );
    if (result) {
      res.status(200).json({ message: "Contact Deleted!" });
    } else {
      res.status(400).json({ message: "Failed to delete the contact" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete your contact" });
  }
});

// createContact controller
// route   /contacts/new
// request  POST
const createContact = asyncHandler(async (req, res) => {
  const { _id, email, name, phone, gender } = req.body;
  const user = await User.findById(_id);
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
        res.status(400).json({ message: "Contact already exist" });
        throw new Error(`contact already exist`);
      }
    }

    if (contact) {
      user.contacts.unshift(contact);
      await user.save();
      res.status(201).json({ message: "Contact created successfully!" });
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
// route   /contacts/:userID
// request  PATCH
const updateContact = asyncHandler(async (req, res) => {
  const { contactID, name, email, phone, gender, userID } = req.body;
  const user = await User.findOne({ _id: userID });

  // if (user?.contacts.length > 0) {
  //   const contactExist = user.contacts.find(
  //     (contact) => contact.phone === phone
  //   );
  //   if (contactExist) {
  //     return res.status(400).json({ message: "Contact already exist" });
  //   }
  // }

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
      res.status(400).json({ message: "contact not found" });
      throw new Error(`contact not found`);
    }

    res.status(201).json({ message: "Contact updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "error updating contact" });
    throw new Error(`error updating contact`);
  }
});

export { createContact, getContacts, updateContact, getUser, deleteContact };
