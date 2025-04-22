const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/", adminController.getAdminPage);
router.post("/", adminController.createAdminPage);
router.put("/", adminController.updateAdminPage);
router.delete("/", adminController.deleteAdminPage);

module.exports = router;
