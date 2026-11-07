import 'dotenv/config';
import app from './app.js';

const parsedPort = Number(process.env.PORT);
const PORT = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 4000;

app.listen(PORT, () => {
  console.log(`[api] Meka Water Tanker API listening on http://127.0.0.1:${PORT}`);
});
