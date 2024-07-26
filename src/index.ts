import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';

// Importar rutas de módulos
import partnerRoutes from './partners/routes/partnersRoutes';
import productRoutes from './products/routes/productsRoutes';
import typeProductRoutes from './typeproduct/routes/typeProductRoutes';
import saleRoutes from './sale/routes/saleRoutes';
import contactRoutes from './contact/routes/ContactRoute';
import roleRoutes from './role/routes/roleRoutes';
import trainingPlanRoutes from './trainingPlan/routes/TrainingPlanRoute';
import medicalRecordRoutes from './medicalRecord/routes/MedicalRecordRoute';
import personalInfoRoutes from './personalInfo/routes/personal_infoRoute';
import employeeRoutes from './employee/routes/EmployeRoute';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);
const urlProject = process.env.URL

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'POST',
  allowedHeaders: 'Content-Type',
}));

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de los módulos
app.use('/api/role', roleRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/product', productRoutes);
app.use('/api/typeproduct', typeProductRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/trainingPlan', trainingPlanRoutes);
app.use('/api/medicalRecord', medicalRecordRoutes);
app.use('/api/personalinfo', personalInfoRoutes);
app.use('/api/employee', employeeRoutes);

// Ruta que usarán para acceder a las imágenes //////ruta de donde se sacarán las imágenes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log('Serving static files from:', path.join(__dirname, '../uploads'));
  console.log(`Servidor corriendo en ${urlProject}:${port}`);
});

