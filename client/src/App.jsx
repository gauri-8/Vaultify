
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import './App.css'
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route, Navigate} from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import AchievementsPage from './pages/AchievementsPage';
import CodexPage from './pages/CodexPage';
import AskVaultPage from './pages/AskVaultPage';
import RegisterPage from './pages/RegisterPage';




function App() {
  
  return (

     <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/home" element={<HomePage />} />
     
     
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/codex" element={<CodexPage />} />
      <Route path="/askvault" element={<AskVaultPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
