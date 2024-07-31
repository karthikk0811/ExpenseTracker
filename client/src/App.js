import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './Components/Auth/RequireAuth';
import ErrorPage from './Components/ErrorPage';
import PersistLogin from './Components/Auth/PersistLogin';
import AppLayout from './Components/AppLayout';
import Dashboard from './Components/Dashboard';
import Incomes from './Components/Incomes';
import Expenses from './Components/Expenses';
import Transactions from './Components/Transactions';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth />}>
            <Route path='/' element={<AppLayout> <Dashboard/> </AppLayout>} />
            <Route path='/transactions' element={<AppLayout> <Transactions/> </AppLayout>} />
            <Route path='/incomes' element={<AppLayout> <Incomes/> </AppLayout>} />
            <Route path='/expenses' element={<AppLayout> <Expenses/> </AppLayout>} />
          </Route>
        </Route>
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}



export default App;