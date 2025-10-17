import './CommandsHelp.css'

const CommandsHelp = ({ onClose, showToast }) => {
  const commands = [
    {
      command: '/block',
      args: '[usuario]',
      description: 'bloquear o ver usuarios bloqueados',
      icon: '🚫'
    },
    {
      command: '/channels',
      args: '',
      description: 'ver todos los canales disponibles',
      icon: '📡'
    },
    {
      command: '/clear',
      args: '',
      description: 'borrar mensajes del chat',
      icon: '🗑️'
    },
    {
      command: '/hug',
      args: '<usuario>',
      description: 'enviar un abrazo virtual',
      icon: '🤗'
    },
    {
      command: '/join',
      args: '<canal>',
      description: 'unirse o crear un canal',
      icon: '➕'
    },
    {
      command: '/msg',
      args: '<usuario> [mensaje]',
      description: 'enviar mensaje privado',
      icon: '💬'
    },
    {
      command: '/slap',
      args: '<usuario>',
      description: 'dar un golpecito divertido',
      icon: '🐟'
    },
    {
      command: '/unblock',
      args: '<usuario>',
      description: 'desbloquear usuario',
      icon: '✅'
    },
    {
      command: '/who',
      args: '',
      description: 'ver quién está en línea',
      icon: '👥'
    }
  ]

  return (
    <div className="commands-help">
      <div className="commands-overlay" onClick={() => { if (showToast) showToast('Ayuda de comandos cerrada', 'info'); onClose(); }}></div>

      <div className="commands-panel">
        <div className="commands-header">
          <div className="slash-icon">/</div>
          <button className="close-btn" onClick={() => { if (showToast) showToast('Ayuda de comandos cerrada', 'info'); onClose(); }}>
            Cerrar
          </button>
        </div>

        <div className="commands-content">
          <div className="terminal-window">
            {commands.map((cmd, index) => (
              <div key={index} className="command-row">
                <div className="command-syntax">
                  <span className="command-name">{cmd.command}</span>
                  {cmd.args && <span className="command-args"> {cmd.args}</span>}
                </div>
                <div className="command-description">
                  <span className="command-icon">{cmd.icon}</span>
                  <span>{cmd.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="commands-footer">
            <div className="tip-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="var(--accent-primary)" strokeWidth="2"/>
                <path d="M12 16v-4M12 8h.01" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Consejo: Escribe / en el chat para ver comandos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandsHelp
