import React, { useState } from 'react';
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const fetchData = async () => {
    const url = `http://ec2-3-21-206-55.us-east-2.compute.amazonaws.com:8000/mininet/depth_${input1}/fanout_${input2}/`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiResponse({ error: "Failed to fetch data" });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">1779 SDN-Mininet Demo</h1>
        <input
          className="input-margin"
          type="number"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Input 1 (depth)"
        />
        <input
          className="input-margin"
          type="number"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Input 2 (fanout)"
        />
        
        <button onClick={fetchData}>Fetch Data</button>
      </header>
        {apiResponse && (
            <div className="json-response-container">
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
          )}
      
    </div>
  );
}

export default App;
