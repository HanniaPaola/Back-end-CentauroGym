// src/controllers/contactController.ts
import { Request, Response } from 'express';
import { ContactService } from '../service/ContactService';
import { Contact } from '../models/Contact';

export const getContacts = async (_req: Request, res: Response) => {
    try {
        const contacts = await ContactService.getAllContacts();
        if (contacts) {
            res.status(200).json(contacts);
        } else {
            res.status(404).json({ message: 'No se encontraron contactos' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactById = async (req: Request, res: Response) => {
    try {
        const contact_id = parseInt(req.params.contact_id, 10);
        const contact = await ContactService.getContactById(contact_id);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: 'No se encontró el contacto' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createContact = async (req: Request, res: Response) => {
    try {
        const newContact: Contact = req.body;
        const createdContact = await ContactService.createContact(newContact);
        res.status(201).json(createdContact);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateContact = async (req: Request, res: Response) => {
    try {
        const contact_id = parseInt(req.params.contact_id, 10);
        const updatedContact = await ContactService.updateContact(contact_id, req.body);
        if (updatedContact) {
            res.status(200).json(updatedContact);
        } else {
            res.status(404).json({ message: 'No se encontró el contacto para actualizar' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteContact = async (req: Request, res: Response) => {
    try {
        const contact_id = parseInt(req.params.contact_id, 10);
        const deleted = await ContactService.deleteContact(contact_id);
        if (deleted) {
            res.status(200).json({ message: 'Contacto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró el contacto para eliminar' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
