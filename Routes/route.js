import express from "express";
const router = express.Router();

import { userRegister, userLogin } from "../Controllers/actionController.js";
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

export default router;
