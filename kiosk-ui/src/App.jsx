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
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setResponse(data);
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
        <div className="w-10/12 flex-wrap p-6 text-center"></div>
      )}
    </Layout>
  );
}

export default App;
