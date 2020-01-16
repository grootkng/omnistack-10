import React, { useEffect, useState } from 'react';

import api from './services/api';
import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';

import './App.css';
import './global.css';
import './Main.css';
import './Sidebar.css';

// Component: isolated block of HTML, CSS and JS that can not interfere on the rest of the application
// Properties: information that a parent component throw to a child component
// State: information mantained for components (imutable)

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      console.info({
        response
      })
      setDevs(response.data.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data.data]);
  };

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={ handleAddDev } />
      </aside>
      <main>
        <ul>
          {devs.map(dev => ( <DevItem key={ dev._id } dev={ dev } /> ))}
        </ul>
      </main>
    </div>
  );
}

export default App;