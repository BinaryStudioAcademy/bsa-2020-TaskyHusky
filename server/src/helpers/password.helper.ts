import { hashSync, compareSync } from 'bcryptjs';
import { HASH_ITERATIONS } from '../constants/hash.constants';

export const hashPassword = (password: string): string => hashSync(password, HASH_ITERATIONS);

export const passwordValid = (
    suspectedPassword: string,
    hashedEtalonPassword: string
): boolean => compareSync(
    suspectedPassword,
    hashedEtalonPassword
);