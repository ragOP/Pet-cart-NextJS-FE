export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Clear the token cookie
  res.setHeader('Set-Cookie', [
    'token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0;'
  ]);

  return res.status(200).json({ success: true, message: 'Logged out' });
} 