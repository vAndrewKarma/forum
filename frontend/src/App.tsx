import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/base/Home'
import Protected from './components/auth/Protected'
import Me from './pages/base/user/me'
import SignUp from './pages/base/user/register'
import SignIn from './pages/base/user/login'
import ForgotPass from './pages/base/user/forgotpass'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/me"
            element={
              <Protected needsAuth={true}>
                <Me />
              </Protected>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Protected AuthRoute={true}>
                <SignUp />
              </Protected>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Protected AuthRoute={true}>
                <SignIn />
              </Protected>
            }
          />
          <Route
            path="/forgot-pass"
            element={
              <Protected AuthRoute={true}>
                <ForgotPass />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
