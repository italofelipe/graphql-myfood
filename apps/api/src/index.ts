import server from "./server";
import { connect } from "./models/index";
const { PORT: port = 4000 } = process.env;
const main = async (): Promise<void> => {
  await connect();
  await server.start({ port });
  console.log(`Listening on port ${port}`);
};

main().catch(console.log);
