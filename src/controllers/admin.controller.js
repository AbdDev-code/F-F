const AdminPage = require("../models/admin.model");

// ✅ Get all admin page content
exports.getAdminPage = async (req, res) => {
  try {
    const page = await AdminPage.findOne();
    res.status(200).json(page);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};

// ✅ Create new admin page (1 ta bo'lishi kerak — agar yo‘q bo‘lsa)
exports.createAdminPage = async (req, res) => {
  try {
    const exists = await AdminPage.findOne();
    if (exists) {
      return res.status(400).json({ error: "Admin page already exists" });
    }

    const created = await AdminPage.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Failed to create admin page", detail: err.message });
  }
};

// ✅ Update admin page (update whole or partial)
exports.updateAdminPage = async (req, res) => {
  try {
    const updated = await AdminPage.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // agar yo‘q bo‘lsa yaratadi
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update admin page", detail: err.message });
  }
};

// ✅ Delete the whole admin page content
exports.deleteAdminPage = async (req, res) => {
  try {
    await AdminPage.deleteMany({});
    res.status(200).json({ message: "Admin page deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete", detail: err.message });
  }
};
