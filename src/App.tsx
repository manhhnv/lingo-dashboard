import './App.css';
import GlobalStyles from './components/GlobalStyles';
import AppRouter from './routers/routers';
import { AdminContext } from './AdminContext';
import { connect } from 'react-redux';
import { RootState } from './redux/slices';

function App(props: any) {

  return (
    <AdminContext.Provider value={{admin: props.admin}}>
      <div className="App">
        <GlobalStyles />
        <AppRouter />
      </div>
    </AdminContext.Provider>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    admin: state.admin
  }
}

export default connect(mapStateToProps, null)(App);
