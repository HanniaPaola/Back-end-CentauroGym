import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { PersonalInfo } from '../models/personal_info';

export class PersonalInfoRepository {

    public static async findAll(): Promise<PersonalInfo[]> {
        const query = 'SELECT * FROM personal_info';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const personalInfos: PersonalInfo[] = results as PersonalInfo[];
                    resolve(personalInfos);
                }
            });
        });
    }

    public static async findById(personal_info_id: number): Promise<PersonalInfo | null> {
        const query = 'SELECT * FROM personal_info WHERE personal_info_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [personal_info_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const personalInfos: PersonalInfo[] = results as PersonalInfo[];
                    if (personalInfos.length > 0) {
                        resolve(personalInfos[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createPersonalInfo(personalInfo: PersonalInfo): Promise<PersonalInfo> {
        const { name, second_name, last_name_paternal, last_name_maternal, birthday, sex, blood_type, created_at, created_by, updated_at, updated_by, deleted } = personalInfo;
        const query = `
            INSERT INTO personal_info (name, second_name, last_name_paternal, last_name_maternal, birthday, sex, blood_type, created_at, created_by, updated_at, updated_by, deleted) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, second_name, last_name_paternal, last_name_maternal, birthday, sex, blood_type, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdPersonalInfoId = (result as ResultSetHeader).insertId;
                    const createdPersonalInfo: PersonalInfo = { ...personalInfo, personal_info_id: createdPersonalInfoId };
                    resolve(createdPersonalInfo);
                }
            });
        });
    }

    public static async updatePersonalInfo(personal_info_id: number, personalInfoData: PersonalInfo): Promise<PersonalInfo | null> {
        const { name, second_name, last_name_paternal, last_name_maternal, birthday, sex, blood_type, updated_at, updated_by, deleted } = personalInfoData;
        const query = `
            UPDATE personal_info 
            SET name = ?, second_name = ?, last_name_paternal = ?, last_name_maternal = ?, birthday = ?, sex = ?, blood_type = ?, updated_at = ?, updated_by = ?, deleted = ?
            WHERE personal_info_id = ?
        `;
        const values = [name, second_name, last_name_paternal, last_name_maternal, birthday, sex, blood_type, updated_at, updated_by, deleted ? 1 : 0, personal_info_id];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve({ ...personalInfoData, personal_info_id });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deletePersonalInfo(personal_info_id: number): Promise<boolean> {
        const query = 'DELETE FROM personal_info WHERE personal_info_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [personal_info_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve((result as ResultSetHeader).affectedRows > 0);
                }
            });
        });
    }
}

