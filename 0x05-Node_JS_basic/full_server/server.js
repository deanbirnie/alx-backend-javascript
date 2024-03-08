import express from 'express';
import mapRoutes from './routes';

const app = express();
const PORT = 1245;

mapRoutes(app);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

export default app;
