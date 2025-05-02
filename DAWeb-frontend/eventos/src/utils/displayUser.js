import { generateAvatarURL, generateRandomName } from "./utils";

const userMap = new Map();

export function getUserDisplayData(id) {
  if (!userMap.has(id)) {
    userMap.set(id, {
      name: generateRandomName(),
      avatar: generateAvatarURL(),
    });
  }
  return userMap.get(id);
}