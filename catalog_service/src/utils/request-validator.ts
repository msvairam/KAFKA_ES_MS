import z from "zod";
import { Request, Response, NextFunction } from "express";

// Extending Express's Request interface — only possible because interface merges
declare global {
  namespace Express {
    interface Request {
      user?: { id: number, email: string },
    }
  }
}

interface RequestSchema {
  body: z.ZodObject<any>;
}

export const validationRequest = (schemas: RequestSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schemas.body.safeParseAsync(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation Failed",
        errors: formatZodError(result.error),
      });
    }
    next();
  };
};

function formatZodError(zodError: z.ZodError) {
  return zodError.issues.map((issue) => ({
    field: issue.path.join("."), // e.g. 'address.city' for nested fields
    message: issue.message,
  }));
}
