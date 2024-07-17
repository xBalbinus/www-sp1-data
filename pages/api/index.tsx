import * as Server from '@common/middleware';

export default async function apiIndex(req, res) {
  await Server.cors(req, res);

  res.json({ success: true, message: 'hey there, friend.' });
}
