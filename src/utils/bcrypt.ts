import * as bcrypt from 'bcrypt';

export const encodePassword = (rawPassword: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
};

export const validatePasswords = (rawPassword: string, hash: string) => {
  return bcrypt.compareSync(rawPassword, hash);
};
