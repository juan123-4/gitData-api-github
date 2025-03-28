import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from './redux/todosSlice';
import './App.css';

function App() {
  const users = useSelector((state) => state.todos.users); // sirve Para acceder al array de usuarios
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSearch =async() => {
  if (newUser.trim() !== '') {
    const fetchUser = async () => {
      try {
        setError(null); 
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${newUser.replace(/\s+/g, '')}`);  // Elimina espacios 
        if (!response.ok) throw new Error('Usuario no encontrado');

        const data = await response.json();

        // Verifica si el usuario ya existe antes de agregarlo
        const exists = users.some((user) => user.id === data.id);
        if (!exists) {
          dispatch(addUser(data));
        } else {
          console.log('Usuario ya existe en la lista.');
        }
        setNewUser('');
      } catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUser();
  }
}



  return (
    <div className='todo'>
      <h1>Api de GitHub</h1>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Busca el nombre de un usuario de GitHub"
      />
      <button onClick={handleSearch}>Buscar</button>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className='lista'>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className='lista'>
              <p><b>Nombre:</b> {user.name}</p>
              <p><b>Usuario:</b>  {user.username}</p>
              <p><b>Seguidores:</b>  {user.followers}</p>
              <p><b>Repositorios públicos:</b>  {user.public_repos}</p>
              <img src={user.avatar_url} alt={user.name} />
            </li>
          ))
        ) : (
          <p>Lista de usuarios vacia</p>
        )}
      </ul>
    </div>
  );
}

export default App;
