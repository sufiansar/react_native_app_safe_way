import { request } from '../client';

export const authApi = {
  // Login (Sends both password and passwordHash so bcrypt never receives undefined)
  login: (data: { email: string; password?: string; passwordHash?: string }) => {
    const pwd = data.password || data.passwordHash || '';
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: pwd,
        passwordHash: pwd,
      }),
    });
  },

  // Verify 2FA
  verify2FA: (data: { otp: string; email: string }) =>
    request('/auth/verify-2fa', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Logout
  logout: () =>
    request('/auth/logout', {
      method: 'POST',
    }),

  // Forgot Password
  forgotPassword: (data: { email: string }) =>
    request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Verify Reset OTP
  verifyResetOtp: (data: { email: string; otp: string }) =>
    request('/auth/verify-reset-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Reset Password
  resetPassword: (data: { email: string; newPassword: string }) =>
    request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Change Password
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    request('/auth/change-password', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Google Authentication
  googleAuth: (idToken: string) =>
    request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token: idToken }),
    }),

  // Send OTP
  sendOtp: (data: { email?: string; phone?: string }) =>
    request('/otp/send', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Verify OTP
  verifyOtp: (data: { otp: string; email?: string; phone?: string }) =>
    request('/otp/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
