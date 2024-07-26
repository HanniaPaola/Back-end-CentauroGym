import { Router } from 'express';
import { getPersonalInfos, getPersonalInfoById, createPersonalInfo, updatePersonalInfo, deletePersonalInfo } from '../controllers/personalInfoController';

const personalInfoRoutes: Router = Router();

personalInfoRoutes.get('/', getPersonalInfos);
personalInfoRoutes.get('/:personal_info_id', getPersonalInfoById);
personalInfoRoutes.post('/', createPersonalInfo);
personalInfoRoutes.put('/:personal_info_id', updatePersonalInfo);
personalInfoRoutes.delete('/:personal_info_id', deletePersonalInfo);

export default personalInfoRoutes;


