
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import LocationPermission from './components/LocationPermission';
import NotificationPermission from './components/NotificationPermission';
import BluetoothSetup from './components/BluetoothSetup';
import BatteryOptimization from './components/BatteryOptimization';
import ChatScreen from './components/ChatScreen';
import LocationChannels from './components/LocationChannels';
import NetworkPeople from './components/NetworkPeople';
import Toast from './components/Toast';

const OnboardingManager = ({ showToast }) => {
  const navigate = useNavigate();

  const handlePermissionResult = (status, type, nextPath) => {
    if (status === 'granted') {
      showToast(`Permiso de ${type} concedido.`, 'success');
    } else {
      showToast(`Permiso de ${type} denegado.`, 'error');
    }
    navigate(nextPath);
  };

  const onboardingSteps = [
    { path: '/', Component: WelcomeScreen, props: { onNext: () => navigate('/location') } },
    { path: '/location', Component: LocationPermission, props: { onComplete: (status) => handlePermissionResult(status, 'ubicación', '/notification') } },
    { path: '/notification', Component: NotificationPermission, props: { onComplete: (status) => handlePermissionResult(status, 'notificaciones', '/bluetooth') } },
    { path: '/bluetooth', Component: BluetoothSetup, props: { onNext: () => navigate('/battery') } },
    { path: '/battery', Component: BatteryOptimization, props: { onNext: () => navigate('/chat') } },
  ];

  return (
    <Routes>
      {onboardingSteps.map(({ path, Component, props }) => (
        <Route key={path} path={path} element={<Component {...props} />} />
      ))}
    </Routes>
  );
};

function App() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
  };

  return (
    <div className="app">
      {toast.show && (
        <div className="toast-container">
          <Toast 
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'info' })}
          />
        </div>
      )}
      <div className="smartphone-frame">
        <div className="smartphone-content">
          <div className="app-shell">
            <main className="app-main">
              <Routes>
                <Route path="/*" element={<OnboardingManager showToast={showToast} />} />
                <Route path="/chat" element={<ChatScreen showToast={showToast} />} />
                <Route path="/channels" element={<LocationChannels showToast={showToast} />} />
                <Route path="/network" element={<NetworkPeople showToast={showToast} />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
