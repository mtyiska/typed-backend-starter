export const {
  NODE_ENV = "development",
  APP_PORT = 4000,
  ORIGIN = "http://localhost:3000",
  BASE_URL = "http://localhost:",
  ACCESS_TOKEN_SECRET = "lsodijlksdj43lk4j5r3l4",
  REFRESH_TOKEN_SECRET ="ai4oijo3i4ndfkm3o4mrwerfm4o3imf"
} = process.env

export const IN_PROD = NODE_ENV === "production";
