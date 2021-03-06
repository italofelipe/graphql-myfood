import server from "./server";
import { connect } from "./models";

const { PORT: port = 4000 } = process.env;
const main = async (): Promise<void> => {
  await connect();
  await server.start({ port });
  console.log(`Listening on port ${port}`);
};

main().catch((err) => console.log("Error in the APP:", err));
