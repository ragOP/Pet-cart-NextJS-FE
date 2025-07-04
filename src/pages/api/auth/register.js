import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phoneNumber, otp } = req.body;
  try {
    // Call your backend register endpoint
    const backendRes = await axios.post(
      'https://pet-caart-be.onrender.com/api/auth/user/register',
      { name, phoneNumber, otp }
    );
    const { token, ...userData } = backendRes.data?.data || {};
    if (!token) {
      return res.status(401).json({ message: 'Registration failed' });
    }

    // Set cookie server-side
    res.setHeader('Set-Cookie', [
      `token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60};${process.env.NODE_ENV === 'production' ? ' Secure;' : ''}`
    ]);

    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error?.response?.data?.message || 'Registration failed',
    });
  }
} 