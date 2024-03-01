import { z } from 'zod';

const envVariables = z.object({
  JWT_SECRET_KEY: z.string(),
  JWT_SECRET_EXPIRATION: z.string(),
  CLOUDINARY_CLOUDNAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
