import React, { useEffect, useState } from 'react';
import './lugares.css'; 

export const Lugares = () => {
  const [lugares, setLugares] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalLugares, setTotalLugares] = useState(0);

  useEffect(() => {
    fetchData();
  }, [paginaActual]); //el useEffect se ejecuta cuando cambia el valor de las dependencias "paginaActual".

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location?page=${paginaActual}`
      );
      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      setLugares(jsonData.results);
      setTotalPaginas(jsonData.info.pages);
      setTotalLugares(jsonData.info.count);
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
    <div className="lugares-page">
      <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />

      <div className="total-lugares">
        <p>Esta sección se compone de {totalLugares} lugares</p>
      </div>

      <div className="lugares-container">
        {lugares.map(({ id, name, type, dimension }) => (
          <div key={id} className="lugar-card">
            <div className="lugar-details">
              <h2>{name}</h2>
              <p>Tipo: {type}</p>
              <p>Dimensión: {dimension}</p>
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
