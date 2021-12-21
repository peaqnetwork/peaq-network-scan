import { useEffect, useState } from "react";
// import { useSubstrate } from "../libs/substrate";
import getApi from "../libs/api";

export default function Snapshot() {
  // const { api } = useSubstrate();
  const [blockNumber, setBlockNumber] = useState(0);
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);
  const [inflation, setInflation] = useState(0);
  const [staked, setStaked] = useState({ value: 0, percentage: 0 });
  const [signedExtrinsics, setSignedExtrinsics] = useState(0);
  const [transfers, setTransfers] = useState(0);
  const [holders, setHolders] = useState(0);
  const [totalIssuance, setTotalIssuance] = useState(0);
  const [validatorsCount, setValidatorsCount] = useState(0);

  // const bestNumber = finalized
  //   ? api.derive.chain.bestNumberFinalized
  //   : api.derive.chain.bestNumber;

  useEffect(() => {
    let unsubscribeAll = null;

    const getSnapshot = async () => {
      const api = await getApi();

      const bestNumber = api.derive.chain.bestNumberFinalized;
      bestNumber((number) => {
        setBlockNumber(number.toNumber());
        // setBlockNumberTimer(0);
        // validators((val) => {
        //   console.log(val);
        // });
      })
        .then((unsub) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);
    };

    getSnapshot();

    return () => unsubscribeAll && unsubscribeAll();
  }, []);

  // const timer = () => {
  //   setBlockNumberTimer((time) => time + 1);
  // };

  // useEffect(() => {
  //   const id = setInterval(timer, 1000);
  //   return () => clearInterval(id);
  // }, []);

  useEffect(() => {
    const getConstants = async () => {
      const api = await getApi();
      const issuance = await api.query.balances.totalIssuance();
      // const validators = await api.query.session.validators();

      setTotalIssuance(issuance.toString());
      // if (validators && validators.length > 0) {
      //   setValidatorsCount(validators.length);
      // }
    };
    getConstants();
  }, []);

  return (
    <div className="snapshot">
      <div className="snapshot-row">
        <div className="snapshot-item">
          <p className="snapshot-label">Finalized Blocks</p>
          <p className="snapshot-value">{blockNumber}</p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Signed Extrinsics</p>
          <p className="snapshot-value">{signedExtrinsics}</p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Transfers</p>
          <p className="snapshot-value">{transfers}</p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Holders</p>
          <p className="snapshot-value">{holders}</p>
        </div>
      </div>
      <div className="snapshot-row">
        <div className="snapshot-item">
          <p className="snapshot-label">Total Issuance</p>
          <p className="snapshot-value">{Number(totalIssuance)}</p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Staked Vaue</p>
          <p className="snapshot-value">
            {staked.value}({staked.percentage}%)
          </p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Validators</p>
          <p className="snapshot-value">{validatorsCount}</p>
        </div>
        <div className="snapshot-item">
          <p className="snapshot-label">Inflation Rate</p>
          <p className="snapshot-value">{inflation}%</p>
        </div>
      </div>
    </div>
  );
}
