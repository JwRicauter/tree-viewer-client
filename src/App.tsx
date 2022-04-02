import React from 'react';
import './App.scss';
import {TreeRecursive} from './components/TreeRecursive';
import {Folder} from './components/Folder';


function App() {
  return (
    <>
      <div className='header'>
        <h1 className="">Tree Viewer by Will Ricauter </h1>
      </div>


      <div className="terminal-window">
        <header>
          <div className="button green"></div>
          <div className="button yellow"></div>
          <div className="button red"></div>
        </header>
        <section className="terminal">
        <div className='tree-wrapper'>
          <Folder 
            key='root'
            name='root'
            path='root'
          >
            <TreeRecursive path={'./'} /> 
          </Folder>
        </div>
        </section>
      </div>
    </>
  );
}

export default App;
