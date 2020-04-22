import React, { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`,
      url: 'http://github.com/thiagolago1',
      techs: ['NodeJS', 'ReactJS', 'React Native', 'TypeScript'],
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter( r => r.id !== id));
  }

  return (
    <div>
      <Header title="Repositórios do Github"/>
      <ul data-testid="repository-list">

        {repositories.map(r =>
          <li key={r.id}>{r.title}

          <button onClick={() => handleRemoveRepository(r.id)}>
            Remover
          </button>

          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
