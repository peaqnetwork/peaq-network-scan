import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BlockTitleSwitch({ blockNumber }) {
  let latestBlocks = useSelector((state) => state.latestBlocks.value);

  latestBlocks = [...latestBlocks].reverse();

  const [blockIndex, setBlockIndex] = useState(-1); // initial

  const nextBlock = latestBlocks[blockIndex + 1];
  const previousBlock = latestBlocks[blockIndex - 1];

  const navigate = useNavigate();

  const goToNextBlock = () => {
    if (nextBlock) {
      navigate(`/block/${nextBlock.blockNumber}`);
    }
  };
  const goToPreviousBlock = () => {
    if (previousBlock) {
      navigate(`/block/${previousBlock.blockNumber}`);
    }
  };

  // Set block index
  useEffect(() => {
    const index = latestBlocks.findIndex(
      (block) => String(block.blockNumber) === blockNumber
    );
    setBlockIndex(index);
  }, [blockNumber, latestBlocks]);

  return (
    <div className="d-flex align-items-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-dark-white"
        onClick={previousBlock ? goToPreviousBlock : null}
        cursor={previousBlock ? "pointer" : "not-allowed"}
      >
        <path
          d="M15.4102 7.42L10.8302 12L15.4102 16.59L14.0002 18L8.00016 12L14.0002 6L15.4102 7.42Z"
          fill="#979798"
        />
      </svg>
      <span className="text-white block-title">Block#{blockNumber}</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-dark-white"
        onClick={nextBlock ? goToNextBlock : null}
        cursor={nextBlock ? "pointer" : "not-allowed"}
      >
        <path
          d="M8.58984 16.58L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.58Z"
          fill="#979798"
        />
      </svg>
    </div>
  );
}
