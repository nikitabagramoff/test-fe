import networkClient from './networkClient';

interface LoginResponse {
  message: string;
}

class AuthAPI {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const response = await networkClient.post('/login', { email, password });

    return response.data;
  }
}

export default AuthAPI;
