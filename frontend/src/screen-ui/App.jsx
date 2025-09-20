import LayoutDefault from "./components/LayoutDefaut";
import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTicketList, setAllTicketList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchCounter();
        await fetchWaitingTickets();
      } catch (err) {
        if (isMounted) alert(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // then run every 5 seconds
    const interval = setInterval(fetchData, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  async function fetchWaitingTickets() {
    try {
      const res = await fetch("http://localhost:3000/tickets/waiting");
      const data = await res.json();
      if (data.message) {
        setAllTicketList([]);

        return;
      }
      setAllTicketList(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchCounter() {
    fetch("http://localhost:3000/counter?withStatus=true")
      .then((res) => res.json())
      .then((data) => setCounter(data))
      .catch((err) => console.error(err));
  }

  return (
    <LayoutDefault
      loading={loading}
      ticketList={allTicketList
        .filter((t) => t.status === "waiting")
        .map((t) => t.queueNumber)}
      counterList={counter.map((d) => ({
        name: d.name,
        currentTicket: d.currentTicket ? d.currentTicket.queueNumber : null,
        active: d.isReady,
      }))}
    />
  );
}

export default App;
