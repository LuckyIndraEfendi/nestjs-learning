import { z } from 'zod';

const envVariables = z.object({
  JWT_SECRET_KEY: z.string(),
  JWT_SECRET_EXPIRATION: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
