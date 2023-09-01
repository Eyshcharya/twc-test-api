import express from "express";
const router = express.Router();

import {
  userRegister,
  userLogin,
  userLogout,
} from "../Controllers/actionController.js";
import {
  getContacts,
  createContact,
  updateContact,
  getUser,
} from "../Controllers/dataController.js";

router.post("/register", userRegister);
router.post("/login", userLogin);

router.route("/").put(userLogout).post(getUser);

router.post("/contacts/new", createContact);
router.route("/contacts/:userID").patch(updateContact).get(getContacts);

export default router;
