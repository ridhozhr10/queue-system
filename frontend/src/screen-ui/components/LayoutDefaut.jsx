import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ImgQueuePoeple from "../assets/queue-people.jpg";

export default function LayoutDefault({ counterList, ticketList, loading }) {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Left Section */}
      <div className="w-1/3 relative flex items-center justify-center bg-black text-white">
        <img
          src={ImgQueuePoeple}
          alt="Queue"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 p-10 w-full bg-gray-200/30">
          <h1 className="text-3xl font-bold mb-4">
            SISTEM <span className="text-gray-900">ANTRIAN</span>
          </h1>
          <p className="text-gray-200"></p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-2/3 p-10 flex flex-col relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <ArrowPathIcon className="h-16 w-16 animate-spin text-gray-500" />
          </div>
        )}
        {/* Header */}

        <div className="mb-6">
          <h2 className="text-xl font-semibold"></h2>
        </div>

        {/* Desks */}
        <div className="grid grid-cols-2 grid-rows-4 gap-4 flex-1">
          {counterList.map((item, i) => (
            <div
              key={i}
              className="border border-gray-600 rounded-xl p-4 flex flex-col items-center"
            >
              <span className="text-4xl font-semibold text-gray-700">
                {item.name.toUpperCase()}
              </span>
              <div className="mt-2 text-center font-bold text-3xl flex-1 flex items-center justify-center">
                {!item.active ? (
                  <span className="text-rose-500">TIDAK AKTIF</span>
                ) : item.currentTicket === null ? (
                  <span className="text-yellow-500">-</span>
                ) : (
                  <span className="text-cyan-500">{item.currentTicket}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Tickets */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-semibold">ANTRIAN SELANJUTNYA</h3>
            <span className="text-blue-500 font-bold text-2xl">
              ({ticketList.length})
            </span>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {ticketList
              .filter((_, i) => i < 5)
              .map((t, i) => (
                <div
                  key={i}
                  className="bg-gray-100 px-4 py-2 rounded-lg font-bold text-lg"
                >
                  {t}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
