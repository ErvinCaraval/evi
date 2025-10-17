
import { useState } from 'react';
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

function App() {
  const [currentScreen, setCurrentScreen] = useState('chat');
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
  };

  const handleNextOnboarding = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setIsOnboarding(false);
      showToast('¡Configuración completada!', 'success');
    }
  };

  const handleLocationPermissionResult = (status) => {
    if (status === 'granted' || status === 'granted_once') {
      showToast('Permiso de ubicación concedido.', 'success');
    } else {
      showToast('Permiso denegado. La búsqueda de usuarios no funcionará.', 'info');
    }
    handleNextOnboarding();
  };

  // New handler for notification permission result
  const handleNotificationPermissionResult = (status) => {
    if (status === 'allow') {
      showToast('¡Notificaciones activadas!', 'success');
    } else {
      showToast('No recibirás alertas de nuevos mensajes.', 'info');
    }
    handleNextOnboarding(); // Always advance to the next step
  };

  const onboardingSteps = [
    { component: WelcomeScreen, name: 'welcome', props: { onNext: handleNextOnboarding } },
    { component: LocationPermission, name: 'location', props: { onComplete: handleLocationPermissionResult } },
    // Updated to use the new handler
    { component: NotificationPermission, name: 'notification', props: { onComplete: handleNotificationPermissionResult } },
    { component: BluetoothSetup, name: 'setup', props: { onNext: handleNextOnboarding } },
    { component: BatteryOptimization, name: 'battery', props: { onNext: handleNextOnboarding } },
  ];

  const renderOnboarding = () => {
    const { component: CurrentComponent, props } = onboardingSteps[onboardingStep];
    return <CurrentComponent {...props} />;
  };

  const renderMainApp = () => {
    switch (currentScreen) {
      case 'chat':
        return <ChatScreen 
                  showToast={showToast} 
                  onOpenChannels={() => setCurrentScreen('channels')} 
                  onOpenNetwork={() => setCurrentScreen('network')} 
                />;
      case 'channels':
        return <LocationChannels 
                  showToast={showToast} 
                  onClose={() => setCurrentScreen('chat')} 
                />;
      case 'network':
        return <NetworkPeople 
                  showToast={showToast} 
                  onClose={() => setCurrentScreen('chat')} 
                />;
      default:
        return <ChatScreen showToast={showToast} />;
    }
  }

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
              {isOnboarding ? renderOnboarding() : renderMainApp()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
