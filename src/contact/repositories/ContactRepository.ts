import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Contact } from '../models/Contact';

export class ContactRepository {

    public static async findAll(): Promise<Contact[]> {
        const query = 'SELECT * FROM contact';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const contacts: Contact[] = results as Contact[];
                    resolve(contacts);
                }
            });
        });
    }

    public static async findById(contact_id: number): Promise<Contact | null> {
        const query = 'SELECT * FROM contact WHERE contact_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [contact_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const contacts: Contact[] = results as Contact[];
                    if (contacts.length > 0) {
                        resolve(contacts[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createContact(contact: Contact): Promise<Contact> {
        const { contact_number, address, created_at, created_by, updated_at = null, updated_by = null, deleted = false } = contact;
        const query = `
            INSERT INTO contact (contact_number, address, created_at, created_by, updated_at, updated_by, deleted) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [contact_number, address, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdContactId = (result as ResultSetHeader).insertId;
                    const createdContact: Contact = { ...contact, contact_id: createdContactId };
                    resolve(createdContact);
                }
            });
        });
    }

    public static async updateContact(contact_id: number, contactData: Contact): Promise<Contact | null> {
        const { contact_number, address, updated_at = null, updated_by = null, deleted = false } = contactData;
        const query = `
            UPDATE contact 
            SET contact_number = ?, address = ?, updated_at = ?, updated_by = ?, deleted = ? 
            WHERE contact_id = ?
        `;
        const values = [contact_number, address, updated_at, updated_by, deleted ? 1 : 0, contact_id];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve({ ...contactData, contact_id });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteContact(contact_id: number): Promise<boolean> {
        const query = 'DELETE FROM contact WHERE contact_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [contact_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}

