import express from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  markAsRead,
  archiveContact,
  deleteContact
} from '../controllers/contactcontroller.js';

const router = express.Router();

// Public route - submit contact message
router.post('/contact', submitContact);

// Admin routes
router.get('/admin/contacts', getAllContacts);
router.get('/admin/contacts/:id', getContactById);
router.put('/admin/contacts/:id/read', markAsRead);
router.put('/admin/contacts/:id/archive', archiveContact);
router.delete('/admin/contacts/:id', deleteContact);

export default router;

