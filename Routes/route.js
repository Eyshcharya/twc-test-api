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
  deleteContact,
} from "../Controllers/dataController.js";

router.post("/register", userRegister);
router.post("/login", userLogin);

router.route("/").put(userLogout).post(getUser);

router.post("/contacts/new", createContact);
router
  .route("/contacts/:userID")
  .patch(updateContact)
  .get(getContacts)
  .delete(deleteContact);

export default router;
