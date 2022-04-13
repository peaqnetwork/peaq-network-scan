import { useEffect, useState } from "react";
import config from "../config";
import { subSquidQuery } from "../libs/subsquid";
import EventsList from "../screens/events/events-list";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  const limit = config.ITEMS_PER_PAGE;
  const [pageNumber, setPageNumber] = useState(1);

  const offset = (pageNumber - 1) * 10;

  useEffect(() => {
    let isListMounted = true;
    const getEvents = async () => {
      setIsLoadingEvents(true);

      const QUERY = `{
        substrate_event(order_by: {created_at: desc}, limit: ${limit}, offset: ${offset}) {
          id
          indexInBlock
          created_at
          blockNumber
          extrinsicIndex
          method
          section
          version
        }
      }`;
      const { data } = await subSquidQuery.post("", {
        query: QUERY,
      });

      let events = data.data.substrate_event;
      events = events.map((e) => ({
        ...e,
        eventId: `${e.blockNumber}-${e.indexInBlock}`,
        extrinsicId: e.extrinsicIndex
          ? `${e.blockNumber}-${e.extrinsicIndex}`
          : "",
        action: `${e.section} (${e.method})`,
        eventJSON: JSON.stringify(e),
      }));

      if (isListMounted) {
        setEvents(events);
        setIsLoadingEvents(false);
      }
    };

    getEvents();
    return () => (isListMounted = false);
  }, [limit, offset]);

  return (
    <div className="page mb-40">
      <EventsList
        events={events}
        isLoadingEvents={isLoadingEvents}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      <div className="mt-40 mb-40"></div>
    </div>
  );
}
