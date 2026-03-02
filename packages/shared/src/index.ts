import { z } from 'zod';

export const leadStatusSchema = z.enum(['new', 'contacted', 'quoted', 'won', 'lost']);
export const serviceTypeSchema = z.enum(['flooring', 'plumbing', 'gardening', 'other']);

export const createLeadSchema = z
  .object({
    customerName: z.string().min(2),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().min(6).optional(),
    postcode: z.string().min(3),
    serviceType: serviceTypeSchema,
    preferredDate: z.string().date().optional(),
    description: z.string().min(10),
    photoUrls: z.array(z.string().url()).default([]),
  })
  .refine((v) => v.contactEmail || v.contactPhone, {
    message: 'Either contactEmail or contactPhone is required',
    path: ['contactEmail'],
  });

export const updateLeadSchema = z.object({
  status: leadStatusSchema.optional(),
  followUpAt: z.string().datetime().nullable().optional(),
});

export const leadSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  status: leadStatusSchema,
  customerName: z.string(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  postcode: z.string(),
  serviceType: serviceTypeSchema,
  preferredDate: z.string().date().optional(),
  description: z.string(),
  photoUrls: z.array(z.string()),
  followUpAt: z.string().datetime().optional(),
});

export const messageSchema = z.object({
  id: z.string().uuid(),
  leadId: z.string().uuid(),
  createdAt: z.string().datetime(),
  channel: z.literal('email'),
  subject: z.string().min(1),
  body: z.string().min(1),
  sentTo: z.string().email(),
});

export const createMessageSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
  sentTo: z.string().email(),
});

export type Lead = z.infer<typeof leadSchema>;
export type Message = z.infer<typeof messageSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
