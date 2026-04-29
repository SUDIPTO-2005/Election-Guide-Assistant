import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import ComparePage from './pages/ComparePage';
import SettingsPage from './pages/SettingsPage';
import TimelinePage from './pages/TimelinePage';
import VisualChartsPage from './pages/VisualChartsPage';
import SavedPage from './pages/SavedPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="charts" element={<VisualChartsPage />} />
          <Route path="assistant" element={<VoiceAssistantPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
