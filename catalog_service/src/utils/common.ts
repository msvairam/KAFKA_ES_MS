import { ZodError } from 'zod';
function formatZodError(zodError: ZodError) {
  return zodError.issues.map(issue => ({
    field: issue.path.join('.'), // e.g. 'address.city' for nested fields
    message: issue.message,
  }));
}