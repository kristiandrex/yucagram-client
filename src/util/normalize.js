import { normalize, schema } from "normalizr";

export function normalizeChatAndMessages(originalData) {
  const idAttribute = "_id";
  const message = new schema.Entity("messages", {}, { idAttribute });
  const chat = new schema.Entity(
    "chats",
    { messages: [message] },
    { idAttribute }
  );

  const { entities } = normalize(originalData, [chat]);

  return {
    chats: entities.chats,
    messages: entities.messages
  };
}
