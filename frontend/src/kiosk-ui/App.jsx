import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import FormIntroduction from "./components/FormIntroduction";

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    phone: "",
  });
  const [response, setResponse] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("http://localhost:3000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        phone: formData.phone ? `62${formData.phone}` : "",
      }),
    });

    const data = await response.json();
    setResponse(data);
    setFormData({
      serviceType: "",
      phone: "",
    });
    setLoading(false);
  }

  function resetPage() {
    setResponse(null);
    setFormData({
      serviceType: "",
      phone: "",
    });
    setLoading(false);
  }

  return (
    <Layout>
      {response === null ? (
        <FormIntroduction
          loading={loading}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <div className="grid gap-6 shadow-2xl p-6 text-center">
          <span className="text-2xl">Nomor antrian anda:</span>
          <h1 className="text-4xl text-bold">{response.queueNumber}</h1>
          <div className="flex flex-col gap-2">
            <span className="text-lg">Layanan: {response.serviceType}</span>
            <span className="text-lg">Whatsapp: {response.phone}</span>
          </div>
          <button
            className="border-1 p-4 text-xl text-bold rounded-lg disabled:cursor-not-allowed"
            onClick={resetPage}
          >
            Kembali
          </button>
        </div>
      )}
    </Layout>
  );
}

export default App;
