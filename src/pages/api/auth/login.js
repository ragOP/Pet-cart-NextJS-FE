import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phoneNumber, otp } = req.body;
  try {
    // Call your backend login endpoint
    const backendRes = await axios.post(
      'https://pet-caart-be.onrender.com/api/auth/user/login',
      { phoneNumber, otp }
    );
    const { token, ...userData } = backendRes.data?.data || {};
    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set cookie server-side
    // Secure attribute is only set in production (HTTPS)
    const cookie = `token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60};${process.env.NODE_ENV === 'production' ? ' Secure;' : ''}`;
    res.setHeader('Set-Cookie', cookie);

    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error?.response?.data?.message || 'Login failed',
    });
  }
} 