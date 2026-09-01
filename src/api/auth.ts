import { api } from './client';
import type { AuthResponse, UserMe } from './types';

export const authApi = {
  register: (input: { nome: string; email: string; senha: string }) =>
    api.post<AuthResponse>('/auth/register', input),

  login: (input: { email: string; senha: string }) =>
    api.post<AuthResponse>('/auth/login', input),

  me: () => api.get<UserMe>('/auth/me'),
};
