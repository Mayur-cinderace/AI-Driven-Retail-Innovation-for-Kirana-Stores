'use server';

/**
 * @fileOverview An AI agent that provides context-aware hints based on user role and time of day.
 *
 * - generateSmartHints - A function that generates smart hints for the user.
 * - SmartHintsInput - The input type for the generateSmartHints function.
 * - SmartHintsOutput - The return type for the generateSmartHints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartHintsInputSchema = z.object({
  role: z.enum(['Admin', 'User']).describe('The role of the user.'),
  timeOfDay: z
    .enum(['Morning', 'Afternoon', 'Evening', 'Night'])
    .describe('The time of day.'),
});
export type SmartHintsInput = z.infer<typeof SmartHintsInputSchema>;

const SmartHintsOutputSchema = z.object({
  hint: z.string().describe('A helpful hint for the user based on their role and the time of day.'),
});
export type SmartHintsOutput = z.infer<typeof SmartHintsOutputSchema>;

export async function generateSmartHints(input: SmartHintsInput): Promise<SmartHintsOutput> {
  return generateSmartHintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartHintsPrompt',
  input: {schema: SmartHintsInputSchema},
  output: {schema: SmartHintsOutputSchema},
  prompt: `You are a helpful assistant providing smart hints to users of the Kirana Stores Inventory Management System.

  Based on the user's role and the time of day, provide a concise and helpful hint to improve their experience.

  Role: {{{role}}}
  Time of Day: {{{timeOfDay}}}

  Hint:`,
});

const generateSmartHintsFlow = ai.defineFlow(
  {
    name: 'generateSmartHintsFlow',
    inputSchema: SmartHintsInputSchema,
    outputSchema: SmartHintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
