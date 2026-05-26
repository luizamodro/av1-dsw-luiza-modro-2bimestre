import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyConnection() {
  try {
    await prisma.$connect();
    console.log("Conexão bem-sucedida com o banco de dados!");
    return true;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    return false;
  }
}

export { prisma, verifyConnection };