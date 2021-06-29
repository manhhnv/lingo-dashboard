import './App.css';
import GlobalStyles from './components/GlobalStyles';
import AppRouter from './routers/routers';

function App() {
  return (
    <div className="App">
      <GlobalStyles/>
      <AppRouter/>
    </div>
  );
}

export default App;
