// api/index.ts
import serverless from "serverless-http";
import app from "../app"; // Express app Master
export const handler = serverless(app);
//# sourceMappingURL=index.js.map