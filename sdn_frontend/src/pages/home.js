import React from 'react';
import './home.css';
import Flow from '../component/sdngraph'
function Home() {
    return (
      <div className="Home">
        {/* <header className="Home-header">
          <Header />
        </header> */}
        <body>
            <div className="Home-title">
                {/* <h1>
                Welcome to the SDN App!
                </h1> */}
            </div>
            <div className="Home-body">
               <Flow />
            </div>


        </body>
      </div>
    );
}
  
export default Home;