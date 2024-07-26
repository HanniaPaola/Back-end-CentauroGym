import { Request, Response } from 'express';
import { EmployeeService } from '../service/EmployeeService';
import { Employee } from '../models/Employee';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'tu_clave_secreta';

const verifyToken = (token: string | undefined): any => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject('Token requerido');
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject('Token inválido');
      } else {
        resolve(decoded);
      }
    });
  });
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    await verifyToken(token);

    const employees = await EmployeeService.getAllEmployees();
    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(404).json({ message: 'No se encontraron empleados' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    await verifyToken(token);

    const employee_id = parseInt(req.params.employee_id, 10);
    const employee = await EmployeeService.getEmployeeById(employee_id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'No se encontró el empleado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    await verifyToken(token);

    const newEmployee: Employee = req.body;
    const createdEmployee = await EmployeeService.createEmployee(newEmployee);
    if (createdEmployee) {
      res.status(201).json(createdEmployee);
    } else {
      res.status(404).json({ message: 'Algo salió mal al crear el empleado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    await verifyToken(token);

    const employee_id = parseInt(req.params.employee_id, 10);
    const updatedEmployee = await EmployeeService.updateEmployee(employee_id, req.body);
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Algo salió mal al actualizar el empleado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    await verifyToken(token);

    const employee_id = parseInt(req.params.employee_id, 10);
    const deleted = await EmployeeService.deleteEmployee(employee_id);
    if (deleted) {
      res.status(200).json({ message: 'Empleado eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'No se encontró el empleado a eliminar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
