import { z } from "zod/v4";

export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().default("contact_form"),
});

export type LeadFormData = z.infer<typeof leadSchema>;
