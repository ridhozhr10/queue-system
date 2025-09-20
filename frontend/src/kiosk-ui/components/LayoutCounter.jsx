import { DocumentTextIcon, CalendarIcon } from "@heroicons/react/24/outline";

export default function LayoutCounter() {
  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40x40" // replace with logo
            alt="Logo"
            className="h-10"
          />
          <span className="font-bold text-lg text-blue-600">KAWAQ</span>
        </div>

        {/* Profile / Language */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://via.placeholder.com/30" // replace with user avatar
            alt="User"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-medium">EN</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-bold">WELCOME</h1>
        <p className="text-gray-500 mb-10">Please select your service</p>

        {/* Cards */}
        <div className="flex gap-6">
          {/* Receipt */}
          <button className="flex flex-col items-center justify-center w-48 h-40 border-2 border-blue-500 rounded-2xl shadow-md bg-blue-500 text-white hover:scale-105 transition">
            <CalendarIcon className="w-10 h-10 mb-3" />
            <span className="text-lg font-semibold">RECEIPT</span>
            <p className="text-xs mt-1 opacity-80">
              Lorem ipsum dolor sit amet
            </p>
          </button>

          {/* Booking */}
          <button className="flex flex-col items-center justify-center w-48 h-40 border-2 border-blue-500 rounded-2xl shadow-md bg-white text-blue-600 hover:scale-105 transition">
            <DocumentTextIcon className="w-10 h-10 mb-3" />
            <span className="text-lg font-semibold">BOOKING</span>
            <p className="text-xs mt-1 text-gray-500">
              Lorem ipsum dolor sit amet
            </p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center p-4 text-xs text-gray-400 border-t">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
  );
}
