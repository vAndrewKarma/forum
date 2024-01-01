import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/base/Home'
import Protected from './components/auth/Protected'
import Me from './pages/base/me'
import SignUp from './pages/base/register'
import SignIn from './pages/base/login'

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
        </Routes>
      </Router>
    </>
  )
}

export default App
