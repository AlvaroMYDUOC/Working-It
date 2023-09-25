import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa'; // Importamos el ícono
import Modal from '../components/Modal';
import token from '../services/apirest.js';


const DataTableComponent = () => {
     // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Estado para almacenar los datos obtenidos de la API
  const [data, setData] = useState([]);
  
  // useEffect para realizar la llamada a la API cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizamos la llamada a la API y actualizamos el estado con los datos obtenidos
        const response = await axios.get('http://149.50.130.111:8002/api/projects/');
        setData(response.data);
      } catch (error) {
        // En caso de error, lo mostramos en la consola
        console.error("Ha ocurrido un error al obtener los datos", error);
      }
    };
    
    // Llamamos a la función fetchData
    fetchData();
  }, []); // El array vacío indica que useEffect se ejecutará solo al montar el componente
  
  // Definimos las columnas de la tabla
  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'mt2',
      selector: 'mt2',
      sortable: true,
      right: true,
    },
    {
      name: 'Ver Proyecto',
      // Creamos un botón o ícono en la celda que redirige a la URL del proyecto
      cell: row => <a href={`http://149.50.130.111:8002/api/projects/${row.id}/`} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  
  // Renderizamos el componente DataTable con los datos y columnas definidas
  return (
    <>
        <div>
    <button onClick={openModal}>Crear Nuevo Proyecto</button>

    
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
    />
    </div>
    <DataTable
      title="Proyectos"
      columns={columns}
      data={data}
      pagination
      highlightOnHover
    />

    </>
   
  );
};

// Exportamos el componente para poder utilizarlo en otras partes de nuestra aplicación
export default DataTableComponent;