import * as dotenv from "dotenv";

dotenv.config();
let path = `${__dirname}/../../../.env`;
dotenv.config({ path: path });

export const TOKEN_SECRET = process.env.TOKEN_SECRET;