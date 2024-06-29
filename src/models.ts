import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function saveConversation(conversation: Prisma.ConversationCreateInput) {
  await prisma.conversation.create({
    data: conversation,
  });
}

async function fetchConversations() {
  return await prisma.conversation.findMany();
}
