const express = require('express');
const router = express.Router();
const {
  getDataHome,
  createDataHome,
  updateDataHome,
  deleteHomeData,
  createAboutData,
  getAboutData,
  updateAboutData,
  deleteAboutData,
  createContactData,
  getContactData,
  updateContactData,
  deleteContactData,
  createBlogData,
  getBlogData,
  updateBlogCard,
  deleteBlogCard,
  createPrivacyData,
  createPolicyItem,
  createDisclaimerItem,
  getPrivacyData,
  updatePolicy,
  deletePolicy,
  updateDisclaimer,
  deleteDisclaimer,
} = require('../controllers/admin.controller');  // Kontrollerlarni ulash

// ------------------ Home Routes -------------------
router.get('/home', getDataHome);
router.post('/home', createDataHome);
router.put('/home/:id', updateDataHome);
router.delete('/home/:id', deleteHomeData);

// ------------------ About Routes -------------------
router.post('/about', createAboutData);
router.get('/about', getAboutData);
router.put('/about/:id', updateAboutData);
router.delete('/about/:id', deleteAboutData);

// ------------------ Contact Routes -------------------
router.post('/contact', createContactData);
router.get('/contact', getContactData);
router.put('/contact/:id', updateContactData);
router.delete('/contact/:id', deleteContactData);

// ------------------ Blog Routes -------------------
router.post('/blog', createBlogData);
router.get('/blog', getBlogData);
router.put('/blog/card/:id', updateBlogCard);
router.delete('/blog/card/:id', deleteBlogCard);

// ------------------ Privacy Routes -------------------
router.post('/privacy', createPrivacyData);
router.post('/privacy/:privacyId/policy', createPolicyItem);
router.post('/privacy/:privacyId/disclaimer', createDisclaimerItem);
router.get('/privacy', getPrivacyData);
router.put('/privacy/policy/:id', updatePolicy);
router.delete('/privacy/policy/:id', deletePolicy);
router.put('/privacy/disclaimer/:id', updateDisclaimer);
router.delete('/privacy/disclaimer/:id', deleteDisclaimer);

module.exports = router;
