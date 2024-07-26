import { PersonalInfoRepository } from "../repositories/personal_infoRepository";
import { PersonalInfo } from "../models/personal_info";

export class PersonalInfoService {

    public static async getAllPersonalInfos(): Promise<PersonalInfo[]> {
        try {
            return await PersonalInfoRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener información personal: ${error.message}`);
        }
    }

    public static async getPersonalInfoById(personal_info_id: number): Promise<PersonalInfo | null> {
        try {
            return await PersonalInfoRepository.findById(personal_info_id);
        } catch (error: any) {
            throw new Error(`Error al encontrar información personal: ${error.message}`);
        }
    }

    public static async createPersonalInfo(personalInfo: PersonalInfo): Promise<PersonalInfo> {
        try {
            return await PersonalInfoRepository.createPersonalInfo(personalInfo);
        } catch (error: any) {
            throw new Error(`Error al crear información personal: ${error.message}`);
        }
    }

    public static async updatePersonalInfo(personal_info_id: number, personalInfoData: PersonalInfo): Promise<PersonalInfo | null> {
        try {
            return await PersonalInfoRepository.updatePersonalInfo(personal_info_id, personalInfoData);
        } catch (error: any) {
            throw new Error(`Error al actualizar información personal: ${error.message}`);
        }
    }

    public static async deletePersonalInfo(personal_info_id: number): Promise<boolean> {
        try {
            return await PersonalInfoRepository.deletePersonalInfo(personal_info_id);
        } catch (error: any) {
            throw new Error(`Error al eliminar información personal: ${error.message}`);
        }
    }
}


