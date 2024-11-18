
import { Toaster } from 'react-hot-toast';
import './App.css';
import Body from './components/Body';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App min-h-screen">
      <Toaster/>
      <Navbar/>
          <Body/>
    </div>
  );
}

export default App;
