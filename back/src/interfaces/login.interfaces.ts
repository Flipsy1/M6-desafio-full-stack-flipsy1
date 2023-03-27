import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schemas";

export type ILogin = z.infer<typeof createLoginSchema>;
