import React, { useState } from 'react';
import './App.css';
import { Lugares } from './components/Lugares';
import { Episodios } from './components/Episodios';
import { Personajes } from './components/Personajes';

function App() {
  const [paginaActual, setPaginaActual] = useState("personajes");

  return (
    <>
      <header>
        <nav>
          <button
            className={paginaActual === "personajes" ? "active" : ""}
            onClick={() => setPaginaActual("personajes")}
          >
            Personajes
          </button>
          <button
            className={paginaActual === "lugares" ? "active" : ""}
            onClick={() => setPaginaActual("lugares")}
          >
            Lugares
          </button>
          <button
            className={paginaActual === "episodios" ? "active" : ""}
            onClick={() => setPaginaActual("episodios")}
          >
            Episodios
          </button>
        </nav>
      </header>

      {paginaActual === "personajes" && <Personajes />}
      {paginaActual === "lugares" && <Lugares />}
      {paginaActual === "episodios" && <Episodios />}
    </>
  );
}

export default App;
