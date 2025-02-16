import z from "zod";

export const createAccountSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .length(11)
    .regex(/^\d{11}$/, "Invalid phone number (11 digits)"),
  password: z
    .string()
    .regex(/.{8,}/, "At least 8 characters")
    .regex(/[a-z]/i, "At least lowercase letter")
    .regex(/\d/, "At least one number")
    .regex(/\W/, "At least one special character")
    .regex(/[A-Z]/, "At least one uppercase letter"),
  role: z.enum(["CUSTOMER", "PROVIDER"]).default("CUSTOMER"),
});

export const loginSchema = createAccountSchema.omit({
  firstName: true,
  lastName: true,
  phone: true,
});

export const forgotPasswordSchema = loginSchema.omit({
  password: true,
});

export const otpSchema = z.object({
  otp: z
    .array(z.coerce.string().regex(/^\d$/, "Invalid OTP"))
    .length(6, "OTP must be 6 characters"),
});

export const newPasswordSchema = loginSchema.omit({
  email: true,
});

export interface CreateAccount extends z.infer<typeof createAccountSchema> {}
export interface Login extends z.infer<typeof loginSchema> {}
export interface ForgotPassword extends z.infer<typeof forgotPasswordSchema> {}
export interface OTP extends z.infer<typeof otpSchema> {}
export interface NewPassword extends z.infer<typeof newPasswordSchema> {}

export function checkStrength(str: string) {
  const requirements = [
    {
      regex: /.{8,}/,
      text: "At least 8 characters",
    },
    {
      regex: /[a-z]/i,
      text: "At least one lowercase letter",
    },
    {
      regex: /\d/,
      text: "At least one number",
    },
    {
      regex: /\W/,
      text: "At least one special character",
    },
    {
      regex: /[A-Z]/,
      text: "At least one uppercase letter",
    },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}
