import { Request, Response } from 'express';
import { MonthlypaymentService } from '../service/monthlypaymentService';

export const getMonthlypayment = async (_req: Request, res: Response) => {
  try {
    const monthlypayments = await MonthlypaymentService.getAllMonthlypayments();
    if (monthlypayments.length > 0) {
      res.status(200).json(monthlypayments);
    } else {
      res.status(404).json({ message: 'Sin mensualidades' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMonthlypaymentById = async (req: Request, res: Response) => {
  try {
    const monthlypayment = await MonthlypaymentService.getMonthlypaymentById(parseInt(req.params.monthly_payment_id, 10));
    if (monthlypayment) {
      res.status(200).json(monthlypayment);
    } else {
      res.status(404).json({ message: 'No se encontró la mensualidad' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createMonthlypayment = async (req: Request, res: Response) => {
  try {
    const newMonthlypayment = await MonthlypaymentService.addMonthlypayment(req.body);
    if (newMonthlypayment) {
      res.status(201).json(newMonthlypayment);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMonthlypayment = async (req: Request, res: Response) => {
  try {
    const updatedMonthlypayment = await MonthlypaymentService.modifyMonthlypayment(parseInt(req.params.monthly_payment_id, 10), req.body);
    if (updatedMonthlypayment) {
      res.status(200).json(updatedMonthlypayment);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMonthlypayment = async (req: Request, res: Response) => {
  try {
    const deleted = await MonthlypaymentService.deleteMonthlypayment(parseInt(req.params.monthly_payment_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó la mensualidad.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
