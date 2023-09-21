import React from 'react'
import '../assets/css/Busca.css'
//import bob from '../assets/bob.png'
//<img className='w-[500] mx-auto my-4' src={bob} alt="/"></img>
const Info = () => {
  const handleSearch = () => {
    // Aquí puedes agregar la lógica para realizar la búsqueda
    // Por ahora, simplemente muestra un mensaje de ejemplo
    alert("Búsqueda realizada");
  };

  return (
    <div className="conta-exter">
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        

        <div className="w-full mx-auto p-4 border border-black rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="w-1/3 mr-2">
          <label htmlFor="profesion" className="block text-gray-700">
            Profesión:
          </label>
          <select
            id="profesion"
            name="profesion"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="arquitecto">Arquitecto</option>
            <option value="pintor">Pintor</option>
            <option value="albanil">Albañil</option>
          </select>
        </div>
        
        <div className="w-1/3">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
      </div>
      
    </div>
  )
}

export default Info
