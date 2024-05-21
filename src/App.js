import './App.css';
import ToDoList from './ToDoList';
import Saikoro from './Saikoro';

function App() {
  return (
    <div >
      <header className="h1 text-white bg-primary p-2 mb-4">
        Random Number Generator
      </header>
      <body>
        <div className='container'>
          <Saikoro />
        </div>
      </body>
    </div>
  );
}

export default App;
