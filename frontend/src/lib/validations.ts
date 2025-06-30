import { z } from 'zod';

// User authentication schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
});

// Profile schemas
export const basicInfoSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  bio: z
    .string()
    .max(160, 'Bio must be less than 160 characters')
    .optional(),
  profileImage: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')), // Allow empty string
});

// Link schema
export const linkSchema = z.object({
  id: z.string(),
  label: z
    .string()
    .min(1, 'Link title is required')
    .max(50, 'Link title must be less than 50 characters'),
  url: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL (include https://)')
    .max(500, 'URL must be less than 500 characters'),
  icon: z.string().optional(),
});

// Links array schema
export const linksSchema = z.array(linkSchema).max(10, 'You can have a maximum of 10 links');

// Background color schema
export const backgroundColorSchema = z
  .string()
  .regex(/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color (e.g., #FF0000)')
  .optional()
  .default('#ffffff');

// Complete profile schema
export const profileSchema = z.object({
  username: basicInfoSchema.shape.username,
  bio: basicInfoSchema.shape.bio,
  profileImage: basicInfoSchema.shape.profileImage,
  links: linksSchema,
  backgroundColor: backgroundColorSchema,
});

// Type exports for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type LinkFormData = z.infer<typeof linkSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

// Validation helper functions
export const validateField = <T>(schema: z.ZodSchema<T>, value: T): { isValid: boolean; error?: string } => {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};

export const validateForm = <T>(schema: z.ZodSchema<T>, data: T): { isValid: boolean; errors: Record<string, string> } => {
  try {
    schema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path) {
          errors[err.path.join('.')] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};
