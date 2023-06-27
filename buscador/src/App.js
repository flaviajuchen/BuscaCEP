import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Digite um CEP válido");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar CEP!");
      setInput("");
    }
  }

  function getMapUrl() {
    if (cep && cep.cep) {
      const encodedAddress = encodeURIComponent(
        `${cep.logradouro}, ${cep.localidade}, ${cep.uf}, ${cep.cep}`
      );
      return `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&key=AIzaSyD1QCQlrkBF-KS7DWhxLvbXVcj-HfnGBqg`;
    }
    return "";
  }

  return (
    <div className="container">
      <h1 className="title">Busca Cep</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite um CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSrc" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
          <div className="map">
            {cep && cep.cep && (
              <iframe
                title="map"
                src={getMapUrl()}
                // width="500"
                height="350"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
