import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      const response = await fetch('/user/all');
      const body = await response.json();
      setUsers(body);
    }

    componentDidMount();
  }, [])
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
              <h2>Users</h2>
              {users.map(user =>
                  <div key={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </div>
              )}
            </div>
        </header>
      </div>
    );

}

export default App;
