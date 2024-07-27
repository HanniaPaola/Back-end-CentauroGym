import { Router } from 'express';
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, loginEmployee } from '../controllers/employeeController';

const employeeRoutes: Router = Router();

employeeRoutes.post('/login', loginEmployee);


employeeRoutes.get('/', getEmployees);
employeeRoutes.get('/:employee_id', getEmployeeById);
employeeRoutes.post('/', createEmployee);
employeeRoutes.put('/:employee_id', updateEmployee);
employeeRoutes.delete('/:employee_id', deleteEmployee);

export default employeeRoutes;





