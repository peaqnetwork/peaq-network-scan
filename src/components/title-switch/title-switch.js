export default function TitleSwitch({
  titleName,
  titleNumber,
  prevParam,
  goToNextItem,
  goToPrevItem,
}) {
  return (
    <div className="d-flex align-items-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-dark-white"
        onClick={prevParam ? goToPrevItem : null}
        cursor={prevParam ? "pointer" : "not-allowed"}
      >
        <path
          d="M15.4102 7.42L10.8302 12L15.4102 16.59L14.0002 18L8.00016 12L14.0002 6L15.4102 7.42Z"
          fill="#979798"
        />
      </svg>
      <span className="text-white block-title">
        {titleName}#{titleNumber}
      </span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-dark-white pointer"
        onClick={goToNextItem}
      >
        <path
          d="M8.58984 16.58L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.58Z"
          fill="#979798"
        />
      </svg>
    </div>
  );
}
