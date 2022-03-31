import { useEffect, useState } from "react";
import { useSubstrateState } from "../libs/substrate";
import { formatBalance } from "@polkadot/util";

export default function Snapshot() {
  const { api } = useSubstrateState();
  const [bestNumberFinalized, setBestNumberFinalized] = useState(0);

  const [blockNumberTimer, setBlockNumberTimer] = useState(0);
  const [totalIssuance, setTotalIssuance] = useState("");
  const [validatorsCount, setValidatorsCount] = useState(0);

  useEffect(() => {
    let unsubscribeAll = null;

    const getSnapshot = async () => {
      const bestNumber = api.derive.chain.bestNumberFinalized;
      bestNumber((number) => {
        setBestNumberFinalized(number.toNumber());
        setBlockNumberTimer(0);
      })
        .then((unsub) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);
    };
    getSnapshot();

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.derive.chain]);

  const timer = () => {
    setBlockNumberTimer((time) => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const getConstants = async () => {
      const issuance = await api.query.balances.totalIssuance();
      const chainInfo = await api.registry.getChainProperties();
      const chainInfoObj = chainInfo.toHuman();
      const formattedIssuance = formatBalance(issuance, {
        decimals: Number(chainInfoObj.tokenDecimals[0]),
      });
      setTotalIssuance(
        formattedIssuance.replace("Unit", chainInfoObj.tokenSymbol)
      );
    };
    getConstants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let unsubscribeAll = null;

    const getConnectedPeers = async () => {
      // const api = await getApi();
      try {
        unsubscribeAll = await api.rpc.system.peers((peers) => {
          const peersArr = peers.toHuman();
          // Validators are peers with role AUTHORITY
          const validatorPeers = peersArr.filter(
            (peer) => peer.roles === "AUTHORITY"
          );
          setValidatorsCount(validatorPeers.length);
        });
      } catch (error) {
        console.error();
      }
    };

    getConnectedPeers();
    return () => unsubscribeAll && unsubscribeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="snapshot">
      <div className="snapshot-row">
        <div className="snapshot-item">
          <p className="snapshot-label">Finalized Blocks</p>
          <p className="snapshot-value">{bestNumberFinalized}</p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Last Block</p>
          <p className="snapshot-value">{blockNumberTimer} s</p>
        </div>
      </div>
      <div className="snapshot-row">
        <div className="snapshot-item">
          <p className="snapshot-label">Total Issuance</p>
          <p className="snapshot-value">{totalIssuance}</p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Validators</p>
          <p className="snapshot-value">{validatorsCount}</p>
        </div>
      </div>
    </div>
  );
}
