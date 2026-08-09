import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ==========================================
// SENIOR PAGES
// ==========================================

import SeniorLogin from "./components/Senior/SeniorLogin";
import SeniorSignup from "./components/Senior/SeniorSignup";
import SeniorOTP from "./components/Senior/SeniorOTP";
import SeniorDashboard from "./components/Senior/SeniorDashboard";
import SeniorProfile from "./components/Senior/SeniorProfile";
import AddProject from "./components/Senior/AddProject";
import ContactInformation from "./components/Senior/ContactInformation";
import Home from "./pages/Home"


// ==========================================
// MAIN APP / ROUTING
// ==========================================

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        {/* ================================
            SENIOR AUTHENTICATION
        ================================= */}

        <Route
          path="/senior/login"
          element={<SeniorLogin />}
        />
        <Route
          path="/senior/signup"
          element={<SeniorSignup />}
        />
        <Route
          path="/senior/otp"
          element={<SeniorOTP />}
        />

        {/* ================================
            SENIOR DASHBOARD
        ================================= */}

        <Route
          path="/senior/dashboard"
          element={<SeniorDashboard />}
        />

        {/* ================================
            SENIOR PROFILE
        ================================= */}

        <Route
          path="/senior/profile"
          element={<SeniorProfile />}
        />


        {/* ================================
            ADD PROJECT
        ================================= */}

        <Route
          path="/senior/add-project"
          element={<AddProject />}
        />


        {/* ================================
            CONTACT INFORMATION
        ================================= */}

        <Route
          path="/senior/contact"
          element={<ContactInformation />}
        />


        {/* ================================
            FALLBACK
        ================================= */}

        <Route
          path="*"
          element={<>Page not found</>}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;