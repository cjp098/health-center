import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthOnChange'
import { lazy, Suspense } from 'react';
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PrivateRoute = lazy(() => import("./components/Layout/PriveRoute"))

function App() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
