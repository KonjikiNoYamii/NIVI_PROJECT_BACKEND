import app from "./app";
import config from "./utils/env";
import os from "os";

app.listen(config.PORT, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}`);

  if (config.HOST === "0.0.0.0") {
    const nets = os.networkInterfaces();
    console.log("Accessible network addresses:");
    for (const name of Object.keys(nets)) {
      const netInfo = nets[name] || [];
      for (const net of netInfo) {
        if (net.family === "IPv4" && !net.internal) {
          console.log(
            `  - http://${net.address}:${config.PORT}/ (interface: ${name})`
          );
        }
      }
    }
  }
});