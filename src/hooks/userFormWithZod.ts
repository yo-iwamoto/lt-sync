import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodObject } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormWithZod = <T extends object>(schema: ZodObject<any>) =>
  useForm<T>({ resolver: zodResolver(schema) });
