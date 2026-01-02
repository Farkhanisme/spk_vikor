import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Welcome from "./pages/components/Welcome";
import KriteriaPage from "./pages/components/KriteriaPage";
import AlternatifPage from "./pages/components/AlternatifPage";
import HasilPage from "./pages/components/HasilPage";
import "./App.css";

function AppContent() {
  const location = useLocation();
  return (
    // location.key berubah setiap kali navigasi terjadi,
    // memaksa React membuang komponen lama dan merender komponen tujuan.
    <Routes key={location.key}>
      <Route path="/" element={<Welcome />} />
      <Route path="/kriteria" element={<KriteriaPage />} />
      <Route path="/alternatif" element={<AlternatifPage />} />
      <Route path="/hasil" element={<HasilPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
