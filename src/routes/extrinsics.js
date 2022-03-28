import React, { useEffect, useState } from "react";
import { useSubstrateState } from "../libs/substrate";
import config from "../config";
import ExtrinsicsHistory from "../components/extrinsics/history";
import ExtrinsicsFilter from "../components/extrinsics/filter";
import ExtrinsicsList from "../components/extrinsics/list";
import { shortenHex } from "../utils";

export default function Extrinsics() {
  const { api } = useSubstrateState();

  const [extrinsicsList, setExtrinsicsList] = useState([]);
  const [filterParams, setFilterParams] = useState({
    module: "all", // dynamicFee, timestamp
    timeDimension: "date", // date, block
    startDate: "",
    endDate: "",
    startBlock: "",
    endBlock: "",
  });
  const [extrinsics, setExtrinsics] = useState([]);
  const [isLoadingExtrinsics, setIsLoadingExtrinsics] = useState(false);

  const changeFilterParams = (param, value) => {
    setFilterParams({ ...filterParams, [param]: value });
  };

  const filterExtrinsics = () => {
    let filteredExtrinsics = [...extrinsicsList];
    const { module, startBlock, endBlock, startDate, endDate } = filterParams;
    if (module !== "all") {
      filteredExtrinsics = filteredExtrinsics.filter(
        (e) => e.module === module
      );
    }
    if (startBlock && endBlock) {
      filteredExtrinsics = filteredExtrinsics.filter(
        (e) =>
          Number(e.blockNumber) >= Number(startBlock) &&
          Number(e.blockNumber) <= Number(endBlock)
      );
    }
    if (startDate && endDate) {
      filteredExtrinsics = filteredExtrinsics.filter(
        (e) => e.time >= startDate && e.time <= endDate
      );
    }
    setExtrinsics(filteredExtrinsics);
  };

  useEffect(() => {
    const getExtrinsics = async () => {
      setIsLoadingExtrinsics(true);
      try {
        const lastHeader = await api.rpc.chain.getHeader();

        let blockNumber = lastHeader.number.toNumber();
        const limit = config.ITEMS_PER_PAGE;
        let extrinsicsList = [];
        let count = 0;
        while (count < limit) {
          const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
          const signedBlock = await api.rpc.chain.getBlock(blockHash);
          const block = signedBlock.toHuman().block;
          let num = block.header.number.replace(/,/g, "");
          let time = Number(
            block.extrinsics[0].method.args.now.replace(/,/g, "")
          );
          block.extrinsics.forEach((extrinsic, i) => {
            const ext = {
              extrinsicId: `${num}-${i}`,
              blockNumber: num,
              hash:
                shortenHex(signedBlock.block.extrinsics[i].hash.toHex()) || "-",
              time,
              isSigned: extrinsic.isSigned,
              action: `${extrinsic.method.section} (${extrinsic.method.method})`,
              module: extrinsic.method.section,
              extrinsicJSON: JSON.stringify(extrinsic),
            };
            extrinsicsList.push(ext);
          });
          count++;
          blockNumber = blockNumber - 1;
        }
        setExtrinsicsList(extrinsicsList);
        setExtrinsics(extrinsicsList);
      } catch (err) {
        console.error(err);
      }
      setIsLoadingExtrinsics(false);
    };

    getExtrinsics();
  }, [api.rpc.chain]);

  return (
    <div className="page">
      <ExtrinsicsHistory extrinsicsList={extrinsicsList} />
      <ExtrinsicsFilter
        params={filterParams}
        changeFilterParams={changeFilterParams}
        filterExtrinsics={filterExtrinsics}
      />
      <ExtrinsicsList
        extrinsicsList={extrinsics}
        isLoadingExtrinsics={isLoadingExtrinsics}
      />
    </div>
  );
}
