import "./App.css";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const counterId = 1;

function App() {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchNextData();
  }, []);

  async function fetchSkipQueue() {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/tickets/status/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "skipped", counterId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData(null);
      fetchNextData();
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  async function fetchCompleteQueue() {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/tickets/status/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "completed", counterId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData(null);
      fetchNextData();
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  async function fetchStartServedQueue() {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/tickets/status/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "called", counterId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  async function fetchNextData() {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/tickets/next");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.message) {
        setData(null);
        setLoading(false);
        return;
      }
      setData(data);

      const allResponse = await fetch("http://localhost:3000/tickets/waiting");
      if (!allResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const allData = await allResponse.json();
      if (allData.message) {
        setAllData([]);
        setLoading(false);
        return;
      }
      setAllData(allData.filter((item) => item.id !== data.id));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 fixed inset-y-0 left-0">
        <h2 className="text-2xl font-bold mb-6">SISTEM ANTRIAN</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
            Antrian
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8 ml-64 overflow-auto h-screen">
        <div className="flex justify-center gap-8 items-center h-full">
          {loading ? (
            <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin" />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              {data ? (
                <>
                  <div className="text-2xl font-bold mb-8">
                    Antrian Selanjutnya
                  </div>
                  <div className="text-4xl font-bold mb-8">
                    {data.queueNumber}
                  </div>
                  <div className="text-lg mb-2">+62{data.phone}</div>
                  <div className="text-lg mb-8">
                    keperluan: {data.serviceType}
                  </div>

                  <div className="flex gap-4">
                    {data.status === "called" && (
                      <button
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        onClick={() => fetchCompleteQueue()}
                      >
                        Selesaikan
                      </button>
                    )}
                    {data.status === "waiting" && (
                      <>
                        <button
                          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                          onClick={() => fetchStartServedQueue()}
                        >
                          Layani
                        </button>
                        <button
                          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                          onClick={() => fetchSkipQueue()}
                        >
                          Lewati
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-4xl font-bold mb-8">
                    Tidak Ada Antrian
                  </div>
                  <button
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    onClick={fetchNextData}
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                    Muat Ulang
                  </button>
                </>
              )}
            </div>
          )}
          {allData.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <div className="text-2xl font-bold mb-8">Daftar Antrian</div>
              <ul className="space-y-2">
                {allData.map((item) => (
                  <li key={item.id} className="text-lg font-medium">
                    {item.queueNumber} - {item.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
