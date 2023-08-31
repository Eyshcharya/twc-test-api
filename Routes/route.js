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
} from "../Controllers/dataController.js";

router.post("/register", userRegister);
router.post("/login", userLogin);
router
  .route("/contacts/:email")
  .get(getContacts)
  .post(createContact)
  .patch(updateContact);
router.route("/").post(userLogout);

export default router;
