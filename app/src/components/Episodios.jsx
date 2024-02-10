import React, { useEffect, useState } from 'react';
import './episodios.css'; 

export const Episodios = () => {
  const [episodios, setEpisodios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalEpisodios, setTotalEpisodios] = useState(0);

  useEffect(() => {
    fetchData();
  }, [paginaActual]); //el useEffect se ejecuta cuando cambia el valor de las dependencias "paginaActual".

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${paginaActual}`
      );
      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      setEpisodios(jsonData.results);
      setTotalPaginas(jsonData.info.pages);
      setTotalEpisodios(jsonData.info.count);
    } catch (error) {
      console.log(error);
    }
  };

  const irAPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irAPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  return (
    <div className="episodios-page">
      <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />

      <div className="total-episodios">
        <p>Esta sección se compone de {totalEpisodios} episodios</p>
      </div>

      <div className="episodios-container">
        {episodios.map(({ id, name, episode, air_date }) => (
          <div key={id} className="episodio-card">
            <div className="episodio-details">
              <h2>{name}</h2>
              <p>Episodio: {episode}</p>
              <p>Fecha de emisión: {air_date}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="pagination-footer">
        <div className="pagination-info">
          Página {paginaActual} de {totalPaginas}
        </div>

        <div className="pagination-buttons">
          <button onClick={irAPaginaAnterior} disabled={paginaActual === 1}>
            Anterior
          </button>
          <button onClick={irAPaginaSiguiente} disabled={paginaActual === totalPaginas}>
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
};
