import { registerAs } from '@nestjs/config';

export const configuration = registerAs('config', () => ({
  emailKey: process.env.EMAIL_KEY,
}));
