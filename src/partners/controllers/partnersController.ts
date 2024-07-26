// src/controllers/partnerController.ts
import { Request, Response } from 'express';
import { PartnerService } from '../service/partnersService';

export const getPartners = async (_req: Request, res: Response) => {
  try {
    const partners = await PartnerService.getAllPartners();
    if (partners) {
      res.status(201).json(partners);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPartnerById = async (req: Request, res: Response) => {
  try {
    const partner = await PartnerService.getPartnerById(parseInt(req.params.partner_id, 10));
    if (partner) {
      res.status(201).json(partner);
    } else {
      res.status(404).json({ message: 'No se encontró el socio' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPartner = async (req: Request, res: Response) => {
  try {
    const newPartner = await PartnerService.addPartner(req.body);
    if (newPartner) {
      res.status(201).json(newPartner);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePartner = async (req: Request, res: Response) => {
  try {
    const updatedPartner = await PartnerService.modifyPartner(parseInt(req.params.partner_id, 10), req.body);
    if (updatedPartner) {
      res.status(201).json(updatedPartner);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePartner = async (req: Request, res: Response) => {
  try {
    const deleted = await PartnerService.deletePartner(parseInt(req.params.partner_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el socio.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
