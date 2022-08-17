export const formatToken = (token: string) => {
  return token.replace('Bearer ', '').trim();
};
