// src/services/partnerService.ts
import { PartnerRepository } from "../repositories/partnersRepository";
import { Partner } from "../models/partners";
import { DateUtils } from "../../shared/utils/DateUtils";

export class PartnerService {

    public static async getAllPartners(): Promise<Partner[]> {
        try {
            return await PartnerRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener socios: ${error.message}`);
        }
    }

    public static async getPartnerById(partnerId: number): Promise<Partner | null> {
        try {
            return await PartnerRepository.findById(partnerId);
        } catch (error: any) {
            throw new Error(`Error al encontrar socio: ${error.message}`);
        }
    }

    public static async addPartner(partner: Partner): Promise<Partner> {
        try {
            partner.created_at = DateUtils.formatDate(new Date());
            partner.updated_at = DateUtils.formatDate(new Date());
            return await PartnerRepository.createPartner(partner);
        } catch (error: any) {
            throw new Error(`Error al crear socio: ${error.message}`);
        }
    }

    public static async modifyPartner(partnerId: number, partnerData: Partner): Promise<Partner | null> {
        try {
            const partnerFinded = await PartnerRepository.findById(partnerId);

            if (partnerFinded) {
                if (partnerData.sheet_partner) {
                    partnerFinded.sheet_partner = partnerData.sheet_partner;
                }
                if (partnerData.personal_info_id !== undefined) {
                    partnerFinded.personal_info_id = partnerData.personal_info_id;
                }
                if (partnerData.contact_id !== undefined) {
                    partnerFinded.contact_id = partnerData.contact_id;
                }
                if (partnerData.medical_record_id !== undefined) {
                    partnerFinded.medical_record_id = partnerData.medical_record_id;
                }
                if (partnerData.plan_id !== undefined) {
                    partnerFinded.plan_id = partnerData.plan_id;
                }
                if (partnerData.deleted !== undefined) {
                    partnerFinded.deleted = partnerData.deleted;
                }

                partnerFinded.updated_by = partnerData.updated_by;
                partnerFinded.updated_at = DateUtils.formatDate(new Date());

                return await PartnerRepository.updatePartner(partnerId, partnerFinded);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar socio: ${error.message}`);
        }
    }

    public static async deletePartner(partnerId: number): Promise<boolean> {
        try {
            return await PartnerRepository.deletePartner(partnerId);
        } catch (error: any) {
            throw new Error(`Error al eliminar socio: ${error.message}`);
        }
    }
}


