import { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/WelcomeScreen'
import LocationPermission from './components/LocationPermission'
import BluetoothPermission from './components/BluetoothPermission'
import NotificationPermission from './components/NotificationPermission'
import BluetoothSetup from './components/BluetoothSetup'
import BatteryOptimization from './components/BatteryOptimization'
import ChatScreen from './components/ChatScreen'
import CommandsHelp from './components/CommandsHelp'
import LocationChannels from './components/LocationChannels'
import NetworkPeople from './components/NetworkPeople'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showCommands, setShowCommands] = useState(false)
  const [showChannels, setShowChannels] = useState(false)
  const [showNetwork, setShowNetwork] = useState(false)

  const steps = [
    { component: WelcomeScreen, name: 'welcome' },
    { component: LocationPermission, name: 'location' },
    { component: BluetoothPermission, name: 'bluetooth' },
    { component: NotificationPermission, name: 'notification' },
    { component: BluetoothSetup, name: 'setup' },
    { component: BatteryOptimization, name: 'battery' },
    { component: ChatScreen, name: 'chat' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const CurrentComponent = steps[currentStep].component

  return (
    <div className="app">
      <div className="smartphone-frame">
        <div className="smartphone-content">
          <div className="app-shell">
            <header className="app-header">
              <button 
                className="back-btn" 
                onClick={handlePrev} 
                disabled={currentStep === 0}
                aria-label="Volver al paso anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Atrás</span>
              </button>
              <div className="step-indicator">
                <span className="step-text">Paso {currentStep + 1} de {steps.length}</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </header>
            <main className="app-main">
              <CurrentComponent
                onNext={handleNext}
                onPrev={handlePrev}
                onOpenCommands={() => setShowCommands(true)}
                onOpenChannels={() => setShowChannels(true)}
                onOpenNetwork={() => setShowNetwork(true)}
              />
            </main>
          </div>
          {showCommands && <CommandsHelp onClose={() => setShowCommands(false)} />}
          {showChannels && <LocationChannels onClose={() => setShowChannels(false)} />}
          {showNetwork && <NetworkPeople onClose={() => setShowNetwork(false)} />}
        </div>
      </div>
    </div>
  )
}

export default App
