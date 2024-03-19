import React from 'react';
import './home.css';
import Flow from '../component/sdngraph'
function Home() {
    return (
      <div className="Home">
        <body>
            <div className="Home-title">
            </div>
            <div className="Home-body">
               <Flow />
            </div>


        </body>
      </div>
    );
}
  
export default Home;