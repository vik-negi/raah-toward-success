import { generateKeyPair } from "crypto";

const JSEncrypt = require("node-jsencrypt");

function encrypt(text, key) {
  const crypt = new JSEncrypt();
  crypt.setKey(key);
  return crypt.encrypt(text);
}

function decrypt(encrypted, privateKey) {
  const crypt = new JSEncrypt();
  crypt.setPrivateKey(privateKey);
  return crypt.decrypt(encrypted);
}

generateKeyPair(
  "rsa",
  {
    modulusLength: 4096, // key size in bits
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8", // !!! pkcs1 doesn't work for me
      format: "pem",
    },
  },
  (err, publicKey, privateKey) => {
    // Handle errors and use the generated key pair.
  }
);
