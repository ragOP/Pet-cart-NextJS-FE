let encryptStorage = null;

if (typeof window !== "undefined") {
  const { EncryptStorage } = require("encrypt-storage");
  const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  encryptStorage = new EncryptStorage(encryptionKey);
}

export const setItem = (payload) => {
  if (!encryptStorage) return;

  if (Object.keys(payload).length > 0) {
    let keys = Object.keys(payload);
    for (let i = 0; i < keys.length; i++) {
      encryptStorage.setItem(keys[i], payload[keys[i]]);
    }
  }
};

export const getItem = (key) => {
  if (!encryptStorage) return null;

  try {
    return encryptStorage.getItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeItem = (key) => {
  if (!encryptStorage) return;
  return encryptStorage.removeItem(key);
};
