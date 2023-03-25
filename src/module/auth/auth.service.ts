class AuthService {
  async login() {
    console.log("service 1111");
    return "1";
  }
}

export const authService = new AuthService();
