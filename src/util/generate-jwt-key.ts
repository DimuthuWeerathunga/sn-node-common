export const getJwtKey = Buffer.from(process.env.JWT_KEY!, 'base64').toString(
  'utf-8'
);
