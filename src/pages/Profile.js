import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('Nome do Usuário');
  const [email, setEmail] = useState('email@exemplo.com');

  const handleUpdate = (e) => {
    e.preventDefault();
    // Adicione aqui a lógica para atualizar o perfil
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Perfil</h1>
      <form onSubmit={handleUpdate} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atualizar Perfil
        </button>
      </form>
    </div>
  );
};

export default Profile;
