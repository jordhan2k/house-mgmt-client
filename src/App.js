import { Box, styled } from '@mui/material';
import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FullscreenSpinner from './components/Common/FullscreenSpinner';
import ProtectedRoute from './pages/ProtectedRoute';
import Landing from './pages/Landing';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserRequest } from './redux/actions/authActions';
import { useEffect } from 'react';
import CustomSnackbar from './components/Common/CustomSnackbar';
import ReduxForm from './pages/ReduxForm';

const Container = styled(Box)({});


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserRequest());
  }, [dispatch]);

  return (
    <Router>
      <Container>
        <CustomSnackbar />
        <FullscreenSpinner />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/dashboard" element={<ProtectedRoute appRoute="dashboard" />} />
          <Route path="/search/users" element={<ProtectedRoute appRoute="users" />} />
          <Route path="/users/:id/house/:houseId" element={<ProtectedRoute appRoute="dashboard" />} />
          <Route path="/redux-form" element={<ReduxForm />} />
        </Routes>

      </Container>
    </Router>
  );
}

export default App;
