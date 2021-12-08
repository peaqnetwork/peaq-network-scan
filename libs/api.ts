import {ApiPromise, WsProvider} from '@polkadot/api'
// Get config
import provider from '../config/provider';

export async function getApi () {
  const wsProvider = new WsProvider(provider.url);
  try {
  const api = await ApiPromise.create({provider: wsProvider});

  const genesisHash = api.genesisHash.toHex();

  return {
    genesisHash
  }
  
    // api.rpc.system.chain()
    // .then(chainName => {
    //   return chainName
    // })
    // .catch(error => {
    //   console.log('Error getting chain', error)
    // })
  
  } catch(error) {
    console.log('Error getting api', error)
  }
  
}