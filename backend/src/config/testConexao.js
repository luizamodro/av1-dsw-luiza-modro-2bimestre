import { prisma } from "./prisma.js";

/**
 * Testa a conexão com o banco de dados
 */
export async function testarConexao() {
  try {
    await prisma.$connect();
    console.log("✅ Conexão com banco de dados bem-sucedida!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar teste se for chamado diretamente
testarConexao();
