import dotenv from 'dotenv';
dotenv.config();
import server from './server';

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});
