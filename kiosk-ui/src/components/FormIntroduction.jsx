const serviceItems = [
  { label: "Pembaruan passport", value: "renewal-passport" },
  { label: "Ekstensi Visa", value: "visa-extension" },
  { label: "Lainnya", value: "others" },
];

export default function FormIntroduction({
  handleSubmit,
  formData,
  setFormData,
  loading,
}) {
  return (
    <div className="w-10/12 flex-wrap p-6 text-center">
      <div>
        <h1 className="text-6xl font-bold mb-4">Selamat Datang</h1>
        <h1 className="text-2xl font-bold mb-4">Silahkan Pilih Layanan</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify(formData)}</pre>
        <div className="grid grid-cols-3 gap-6 mt-20">
          {serviceItems.map((item, i) => (
            <div
              key={i + "item"}
              className={`w-full ${
                item.value === formData.serviceType ? "shadow-sm" : "shadow-lg"
              }  hover:shadow-sm p-4 shadow-gray-500`}
              onClick={() => {
                setFormData({ ...formData, serviceType: item.value });
              }}
            >
              <span className="text-2xl">{item.label}</span>
            </div>
          ))}
          <div className="col-span-3">
            <div class="mt-2">
              <div class="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                <div class="shrink-0 text-base text-gray-400 select-none pr-2">
                  +62
                </div>
                <input
                  id="phone"
                  type="text"
                  onChange={(e) => {
                    e.preventDefault();
                    setFormData({
                      ...formData,
                      phone: e.currentTarget.value,
                    });
                  }}
                  value={formData.phone}
                  name="phone"
                  class="block min-w-0 grow  py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <button
              className="border-1 p-4 text-xl text-bold rounded-lg disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
