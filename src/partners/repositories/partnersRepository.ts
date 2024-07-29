// src/repositories/partnerRepository.ts
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Partner } from '../models/partners';

export class PartnerRepository {
  public static async findAll(): Promise<Partner[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM partners', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const partners: Partner[] = results as Partner[];
          resolve(partners);
        }
      });
    });
  }

  public static async findById(partner_id: number): Promise<Partner | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM partners WHERE partner_id = ?', [partner_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const partners: Partner[] = results as Partner[];
          if (partners.length > 0) {
            resolve(partners[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createPartner(partner: Partner): Promise<Partner> {
    const query = 'INSERT INTO partners (sheet_partner, personal_info_id, contact_id, medical_record_id, plan_id, role_id, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [partner.sheet_partner, partner.personal_info_id, partner.contact_id, partner.medical_record_id, partner.plan_id, partner.role_id, partner.created_at, partner.created_by, partner.updated_at, partner.updated_by, partner.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdPartnerId = result.insertId;
          const createdPartner: Partner = { ...partner, partner_id: createdPartnerId };
          resolve(createdPartner);
        }
      });
    });
  }

  public static async updatePartner(partner_id: number, partnerData: Partner): Promise<Partner | null> {
    const query = 'UPDATE partners SET sheet_partner = ?, personal_info_id = ?, contact_id = ?, medical_record_id = ?, plan_id = ?, role_id = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE partner_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [partnerData.sheet_partner, partnerData.personal_info_id, partnerData.contact_id, partnerData.medical_record_id, partnerData.plan_id,partnerData.role_id, partnerData.updated_at, partnerData.updated_by, partnerData.deleted, partner_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedPartner: Partner = { ...partnerData, partner_id: partner_id };
            resolve(updatedPartner);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deletePartner(partner_id: number): Promise<boolean> {
    const query = 'DELETE FROM partners WHERE partner_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [partner_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el registro a eliminar
          }
        }
      });
    });
  }
}
