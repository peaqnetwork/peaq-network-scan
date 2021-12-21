import { ApiPromise, WsProvider } from "@polkadot/api";
// Get config
// import provider from "../config/provider";

export default async function getApi() {
  const wsProvider = new WsProvider("wss://fn1.test.peaq.network/");
  try {
    const api = await ApiPromise.create({ provider: wsProvider });

    return api;
  } catch (error) {
    console.log("Error getting api", error);
  }
}
