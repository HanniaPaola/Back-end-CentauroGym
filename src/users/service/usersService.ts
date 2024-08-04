import { UserRepository } from "../repositories/usersRepository";
import { User } from "../models/users";
//import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class UserService {

    public static async login(email: string, password: string) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) {
                return null;
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return null;
            }
            
            const payload = {
                user_id: user.user_id,
                email: user.email
            };
            
            return await jwt.sign(payload, secretKey, { expiresIn: '1h' });

    
        } catch (error: any) {
            throw new Error(`Error al logearse: ${error.message}`);
        }
    }
    

    public static async getAllUsers(): Promise<User[]> {
        try{
            return await UserRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try{
            return await UserRepository.findById(userId);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        try{
            return await UserRepository.findByEmail(email);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addUser(user: User) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = new Date(); 
            user.updated_at = new Date();
            user.password = await bcrypt.hash(user.password, salt);
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User){
        try{
            const userFinded =  await UserRepository.findById(userId);
            const salt = await bcrypt.genSalt(saltRounds);

            if(userFinded){
                if(userData.role_id){
                    userFinded.role_id = userData.role_id;
                }
                
                if(userData.name){
                    userFinded.name = userData.name;
                }

                if(userData.last_name){
                    userFinded.last_name = userData.last_name;
                }
                
                if(userData.email){
                    userFinded.email = userData.email;
                }

                if(userData.password){
                    userFinded.password = await bcrypt.hash(userData.password, salt);
                }
                
                if(userData.created_by){
                    userFinded.created_by = userData.created_by;
                }

                if(userData.created_at){
                    userFinded.created_at = userData.created_at;
                }
                
                if(userData.created_by){
                    userFinded.created_by = userData.created_by;
                }

                if(userData.updated_by){
                    userFinded.updated_by = userData.updated_by;
                }
                
                if(userData.updated_at){
                    userFinded.updated_at = userData.updated_at;
                }

                if(userData.deleted){
                    userFinded.deleted = userData.deleted;
                }
            }else{
                return null;
            }
            userFinded.updated_by = userData.updated_by
            userFinded.updated_at = new Date();
            return await UserRepository.updateUser(userId, userFinded);
        }catch (error: any){
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteEmployee(userId: number): Promise<boolean> {
        try{
            return await UserRepository.deleteUser(userId);
        }catch (error: any){
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }

}

