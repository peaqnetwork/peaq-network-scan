import { useEffect, useState } from "react";
import getApi from "../libs/api";
import { formatBalance } from "@polkadot/util";
import { useSelector, useDispatch } from "react-redux";
import { setBestNumberFinalized } from "../store/slices/best-number-finalized";

export default function Snapshot() {
  const dispatch = useDispatch();
  const bestNumberFinalized = useSelector(
    (state) => state.bestNumberFinalized.value
  );
  console.log(bestNumberFinalized);
  // const [blockNumber, setBlockNumber] = useState(0);
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);
  const [totalIssuance, setTotalIssuance] = useState(0);
  const [validatorsCount, setValidatorsCount] = useState(0);

  useEffect(() => {
    let unsubscribeAll = null;

    const getSnapshot = async () => {
      const api = await getApi();

      const bestNumber = api.derive.chain.bestNumberFinalized;
      bestNumber((number) => {
        // setBlockNumber(number.toNumber());
        dispatch(setBestNumberFinalized(number.toNumber()));
        setBlockNumberTimer(0);
      })
        .then((unsub) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);
    };

    getSnapshot();

    return () => unsubscribeAll && unsubscribeAll();
  }, []);

  const timer = () => {
    setBlockNumberTimer((time) => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const getConstants = async () => {
      const api = await getApi();
      const issuance = await api.query.balances.totalIssuance();
      // const validators = await api.query.session.validators();

      const data = await api.rpc.state.getMetadata();

      console.log("inum", issuance.toHuman());

      console.log("formatted bal", formatBalance(issuance));

      console.log(data.toHuman());

      setTotalIssuance(issuance.toString());
      // if (validators && validators.length > 0) {
      //   setValidatorsCount(validators.length);
      // }
    };
    getConstants();
  }, []);

  useEffect(() => {
    let unsubscribeAll = null;

    const getConnectedPeers = async () => {
      const api = await getApi();
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
          <p className="snapshot-value">
            {Number(totalIssuance) / 1000000000000000000000000} YPEAQ
          </p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Validators</p>
          <p className="snapshot-value">{validatorsCount}</p>
        </div>
      </div>
    </div>
  );
}
