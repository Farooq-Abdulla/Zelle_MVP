import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const SendMoney = React.lazy(() => import('./pages/SendMoney'));
const Update = React.lazy(() => import('./pages/Update'));
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <Suspense fallback={'loading ...'}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/update"
            element={
              <Suspense fallback={'loading ...'}>
                <Update />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={'loading ...'}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={'loading ...'}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/send"
            element={
              <Suspense fallback={'loading ...'}>
                <SendMoney />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
