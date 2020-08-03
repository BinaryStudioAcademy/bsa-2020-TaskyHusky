import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../../config/jwt.config';

export const generateToken = (id: string): string => sign({ id }, jwtSecret);
