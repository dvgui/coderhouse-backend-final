import cluster from "cluster";
import "dotenv/config";

import { httpServer } from "./server";

import { AddressInfo } from "net";

import argv from "./api/config/argv";
import os from "os";

const cpus = os.cpus().length;

const PORT = process.env.PORT || Number(argv.port) || 8080;
if (argv.mode === "CLUSTER") {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      console.log(`worker ${worker.process.pid} ended`);
      cluster.fork();
    });
  } else {
    const server = httpServer.listen(PORT, () => {
      const { address, port } = server.address() as AddressInfo;
      console.log(`Server listening on ${port}   `);
    });
  }
} else {
  const server = httpServer.listen(PORT, () => {
    const { address, port } = server.address() as AddressInfo;
    console.log(`Server listening on ${port}   `);
  });
}
