import { Router } from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactConttoller';

const contactRoutes: Router = Router();

contactRoutes.get('/', getContacts);
contactRoutes.get('/:contact_id', getContactById);
contactRoutes.post('/', createContact);
contactRoutes.put('/:contact_id', updateContact);
contactRoutes.delete('/:contact_id', deleteContact);

export default contactRoutes;

