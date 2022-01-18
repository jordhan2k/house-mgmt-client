import { Box, styled } from '@mui/material';
import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FullscreenSpinner from './components/Common/FullscreenSpinner';
import ProtectedRoute from './pages/ProtectedRoute';
import Landing from './pages/Landing';
import { useDispatch } from 'react-redux';
import { loadUserRequest } from './redux/actions/authActions';
import { useEffect } from 'react';
import { getLastLoginRequest } from './redux/actions/notificationActions';

const Container = styled(Box)({});


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserRequest());
    dispatch(getLastLoginRequest());
  }, [dispatch]);

  return (
    <Router>
      <Container>
        <FullscreenSpinner />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route path="/login" element={<Auth authRoute="login" />} />

          <Route path="/dashboard" element={<ProtectedRoute appRoute="dashboard" />} />


        </Routes>

      </Container>
    </Router>
  );
}

export default App;
