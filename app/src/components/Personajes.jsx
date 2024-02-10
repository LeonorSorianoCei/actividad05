import React, { useEffect, useState } from 'react';
import './personajes.css'; 
 

export const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalPersonajes, setTotalPersonajes] = useState(0);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("todos");

  useEffect(() => {
    fetchData();
  }, [paginaActual, filtroSeleccionado]); //el useEffect se ejecuta cuando cambia el valor de las dependencias "paginaActual" o "filtroSeleccionado".

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${paginaActual}&species=${filtroSeleccionado === "todos" ? "" : filtroSeleccionado}`
      );
      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      setPersonajes(jsonData.results);
      setTotalPaginas(jsonData.info.pages);
      setTotalPersonajes(jsonData.info.count);
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

  const handleFiltroClick = (filtro) => {
    setFiltroSeleccionado(filtro);
  };

  const personajesFiltrados = personajes.filter((personaje) => {
    if (filtroSeleccionado === "todos") {
      return true;
    } else if (filtroSeleccionado === "human") {
      return personaje.species === "Human";
    } else {
      return personaje.species !== "Human";
    }
  });

  return (
    <div className="personajes-page">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />

      <div className="total-personajes">
        <p>Esta sección se compone de {totalPersonajes} personajes</p>
      </div>
      <div className="filtros-personajes">
        <button className="filtros-personajes-btn" onClick={() => handleFiltroClick("todos")}>Todos</button>
        <button className="filtros-personajes-btn" onClick={() => handleFiltroClick("human")}>Humanos</button>
        <button className="filtros-personajes-btn" onClick={() => handleFiltroClick("alien")}>Alienígenas</button>
      </div>
      <div className="personajes-container">
        {personajesFiltrados.map(({ id, image, name, status, species, type, gender, origin, location, episode, url, created }) => (
          <div key={id} className="personaje-card">
            <div className="personaje-image">
              <img src={image} alt={name} />
            </div>
            <div className="personaje-details">
              <h2>{name}</h2>
              <p>{species} - {gender === "Male" ? (" ♂️ ") : gender === "Female" ? (" ♀️ ") : (" ? ")}{gender}  </p>
              {status === "Alive" ? ("🟢") : status === "unknown" ? ("❓") : ("🔴")} {status}
              <p>Origin: {origin.name}</p>
              <p>Location: {location.name}</p>
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
