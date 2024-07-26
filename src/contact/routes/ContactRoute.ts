// src/routes/contactRoutes.ts
import { Router } from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactConttoller';

const contactRoutes: Router = Router();

// Obtener todos los contactos
contactRoutes.get('/', getContacts);

// Obtener contacto por ID
contactRoutes.get('/:contact_id', getContactById);

// Crear un nuevo contacto
contactRoutes.post('/', createContact);

// Actualizar contacto por ID
contactRoutes.put('/:contact_id', updateContact);

// Eliminar contacto por ID
contactRoutes.delete('/:contact_id', deleteContact);

export default contactRoutes;

