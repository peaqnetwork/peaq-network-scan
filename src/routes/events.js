import { useEffect, useState } from "react";
import config from "../config";
import { subSquidQuery } from "../libs/subsquid";
import EventsFilter from "../screens/events/events-filter";
import EventsList from "../screens/events/events-list";

export default function Events() {
  const limit = config.ITEMS_PER_PAGE;
  const [filterParams, setFilterParams] = useState({
    module: "all",
    eventMethod: "all",
    timeDimension: "date", // date, block
    startDate: "",
    endDate: "",
    startBlock: "",
    endBlock: "",
  });

  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);

  const changeFilterParams = (param, value) => {
    setFilterParams({ ...filterParams, [param]: value });
  };

  useEffect(() => {
    let whereArgs = `where: {`;
    const { module, eventMethod, startBlock, endBlock, startDate, endDate } =
      filterParams;
    if (module && module !== "all") {
      whereArgs += `section: {_eq: "${module}"}`;
    }
    if (eventMethod && eventMethod !== "all") {
      whereArgs += `method: {_eq: "${eventMethod}"}`;
    }
    if (startBlock && endBlock) {
      whereArgs += `blockNumber: {_gte: ${startBlock}, _lte: ${endBlock}}`;
    }
    if (startDate && endDate) {
      whereArgs += `blockTimestamp: {_gte: "${new Date(
        startDate
      ).getTime()}", _lte: "${new Date(endDate).getTime()}"}`;
    }

    whereArgs += `}, `;

    const query = `{
    substrate_event(${whereArgs}order_by: {id: desc}, limit: ${limit}, offset: ${
      (pageNumber - 1) * 10
    }) {
      id
      indexInBlock
      blockNumber
      blockTimestamp
      extrinsicIndex
      method
      section
      version
    }
  }`;
    let isListMounted = true;
    const getEvents = async () => {
      setIsLoadingEvents(true);
      const { data } = await subSquidQuery.post("", {
        query,
      });
      let events = data.data.substrate_event.map((e) => ({
        ...e,
        eventId: `${e.blockNumber}-${e.indexInBlock}`,
        extrinsicId: e.extrinsicIndex
          ? `${e.blockNumber}-${e.extrinsicIndex}`
          : "",
        action: `${e.section} (${e.method})`,
        eventJSON: JSON.stringify(e, null, 2),
      }));

      if (isListMounted) {
        setEvents(events);
        setIsLoadingEvents(false);
      }
    };

    getEvents();
    return () => (isListMounted = false);
  }, [filterParams, limit, pageNumber]);

  return (
    <div className="page mb-40">
      <h3 className="text-white">Event history</h3>
      <div className="bordered-content-box mb-40">
        <EventsFilter
          params={filterParams}
          changeFilterParams={changeFilterParams}
          setFilterParams={setFilterParams}
          setPageNumber={setPageNumber}
        />
      </div>
      <EventsList
        events={events}
        isLoadingEvents={isLoadingEvents}
        pageOffset={pageOffset}
        setPageNumber={setPageNumber}
        setPageOffset={setPageOffset}
      />
      <div className="mt-40 mb-40"></div>
    </div>
  );
}
