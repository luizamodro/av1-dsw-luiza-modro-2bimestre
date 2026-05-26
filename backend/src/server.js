import app from "./app.js";
import { prisma, verifyConnection } from "./config/prisma.js";

const PORT = process.env.PORT || 3000;

async function main() {
  const isConnected = await verifyConnection();
  if (!isConnected) {
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

main();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});