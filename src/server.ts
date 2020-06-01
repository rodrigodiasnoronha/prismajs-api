import 'dotenv/config';
import Api from './Api';

const { server } = new Api();

const port = process.env.PORT;

server.listen(port, () => console.log(`server running port ${port}`));
