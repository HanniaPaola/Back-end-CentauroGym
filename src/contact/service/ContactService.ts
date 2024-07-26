// src/service/ContactService.ts
import { ContactRepository } from "../repositories/ContactRepository";
import { Contact } from "../models/Contact";

export class ContactService {

    public static async getAllContacts(): Promise<Contact[]> {
        try {
            return await ContactRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener contactos: ${error.message}`);
        }
    }

    public static async getContactById(contact_id: number): Promise<Contact | null> {
        try {
            return await ContactRepository.findById(contact_id);
        } catch (error: any) {
            throw new Error(`Error al encontrar contacto: ${error.message}`);
        }
    }

    public static async createContact(contact: Contact): Promise<Contact> {
        try {
            return await ContactRepository.createContact(contact);
        } catch (error: any) {
            throw new Error(`Error al crear contacto: ${error.message}`);
        }
    }

    public static async updateContact(contact_id: number, contactData: Contact): Promise<Contact | null> {
        try {
            return await ContactRepository.updateContact(contact_id, contactData);
        } catch (error: any) {
            throw new Error(`Error al modificar contacto: ${error.message}`);
        }
    }

    public static async deleteContact(contact_id: number): Promise<boolean> {
        try {
            return await ContactRepository.deleteContact(contact_id);
        } catch (error: any) {
            throw new Error(`Error al eliminar contacto: ${error.message}`);
        }
    }
}

