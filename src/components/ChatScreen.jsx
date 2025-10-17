import { useState, useEffect } from 'react'
import './ChatScreen.css'
import ClearMessages from './ClearMessages'
import ContactActions from './ContactActions'
import FavoriteContact from './FavoriteContact'
import OnlineUsers from './OnlineUsers'
import BlockedContact from './BlockedContact'
import FloatingMenu from './FloatingMenu'
import HugAnimation from './HugAnimation'
import PrivateMessage from './PrivateMessage'
import QRIdentity from './QRIdentity'
import CommandSuggestions from './CommandSuggestions'
import SquareMenu from './SquareMenu'
import DotsMenu from './DotsMenu'
import { mockUsers, mockMessages, generateRandomReply } from '../utils/mockData'

const ChatScreen = ({ onOpenChannels, onOpenNetwork, showToast }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)
  const [contacts, setContacts] = useState(mockUsers)
  const [showClearMessages, setShowClearMessages] = useState(false)
  const [showContactActions, setShowContactActions] = useState(false)
  const [showFavoriteContact, setShowFavoriteContact] = useState(false)
  const [showOnlineUsers, setShowOnlineUsers] = useState(false)
  const [showBlockedContact, setShowBlockedContact] = useState(false)
  const [selectedContact, setSelectedContact] = useState('anon64')
  const [replyingTo, setReplyingTo] = useState(null)
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)
  const [showHugAnimation, setShowHugAnimation] = useState(false)
  const [showPrivateMessage, setShowPrivateMessage] = useState(false)
  const [showQRIdentity, setShowQRIdentity] = useState(false)
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [showSquareMenu, setShowSquareMenu] = useState(false)
  const [showDotsMenu, setShowDotsMenu] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const text = message.trim();

    if (text.startsWith('/')) {
      const [command, ...args] = text.split(' ');
      const fullArg = args.join(' ');

      switch (command.toLowerCase()) {
        case '/status': {
          const statusMessage = {
            id: messages.length + 1,
            text: `[System] Conectado a 5 peers. Canales activos: #mesh, #general.`,
            time: new Date().toLocaleTimeString(),
            isSystem: true,
          };
          setMessages(prev => [...prev, statusMessage]);
          break;
        }
        case '/hug': {
          const targetUser = args[0];
          if (targetUser) {
            const hugMessage = {
                id: messages.length + 1,
                text: `[Action] Le has enviado un abrazo a ${targetUser}.`,
                time: new Date().toLocaleTimeString(),
                isSystem: true,
            };
            setMessages(prev => [...prev, hugMessage]);
          } else {
            showToast('Uso: /hug <usuario>', 'error');
          }
          break;
        }
        case '/msg': {
          const recipient = args[0];
          const privateMessageText = args.slice(1).join(' ');
          if (recipient && privateMessageText) {
            const newMessage = {
              id: messages.length + 1,
              text: `[Mensaje Privado para ${recipient}] ${privateMessageText}`,
              time: new Date().toLocaleTimeString(),
              sender: 'me',
              isPrivate: true,
              isSystem: true,
            };
            setMessages(prev => [...prev, newMessage]);
            showToast(`Mensaje privado enviado a ${recipient}`, 'success');
          } else {
            showToast('Uso: /msg <usuario> <mensaje>', 'error');
          }
          break;
        }
        case '/clear': {
            setMessages([]);
            showToast('El chat ha sido limpiado.', 'success');
            break;
        }
        case '/help': {
            const helpMessage = {
              id: messages.length + 1,
              text: `[System] Comandos disponibles: /status, /hug <usuario>, /msg <usuario> <mensaje>, /clear, /help, /slap <usuario>, /w, /join <canal>`,
              time: new Date().toLocaleTimeString(),
              isSystem: true,
            };
            setMessages(prev => [...prev, helpMessage]);
            break;
        }
        case '/slap': {
          const targetUser = args[0];
          if (targetUser) {
            const slapMessage = {
                id: messages.length + 1,
                text: `[Action] Le has dado una bofetada a ${targetUser} con una trucha.`,
                time: new Date().toLocaleTimeString(),
                isSystem: true,
            };
            setMessages(prev => [...prev, slapMessage]);
          } else {
            showToast('Uso: /slap <usuario>', 'error');
          }
          break;
        }
        case '/w': {
            const onlineUsers = mockUsers.map(user => user.name).join(', ');
            const whoMessage = {
              id: messages.length + 1,
              text: `[System] Usuarios en línea: ${onlineUsers}`,
              time: new Date().toLocaleTimeString(),
              isSystem: true,
            };
            setMessages(prev => [...prev, whoMessage]);
            break;
        }
        case '/join': {
          const channel = args[0];
          if (channel) {
            const joinMessage = {
                id: messages.length + 1,
                text: `[System] Te has unido al canal: #${channel}`,
                time: new Date().toLocaleTimeString(),
                isSystem: true,
            };
            setMessages(prev => [...prev, joinMessage]);
            showToast(`Te has unido a #${channel}`, 'success');
          } else {
            showToast('Uso: /join <canal>', 'error');
          }
          break;
        }
        default:
          showToast(`Comando "${command}" no reconocido.`, 'error');
          break;
      }
      setMessage('');
      setShowCommandSuggestions(false);
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: message.trim(),
      time: new Date().toLocaleTimeString(),
      sender: 'me',
      status: 'sending',
      replyTo: replyingTo
    }
    setMessages(prev => [...prev, newMessage])
    setMessage('')
    setReplyingTo(null)
    
    setTimeout(() => {
      const reply = {
        id: messages.length + 2, 
        text: generateRandomReply(),
        time: new Date().toLocaleTimeString(),
        sender: selectedContact,
        status: 'sent'
      }
      setMessages(prev => [...prev, reply])
    }, 2000)
  }

  const handleAddAttachment = () => {
    setShowContactActions(true)
  }

  const handleClearMessages = () => {
    setShowClearMessages(false)
    setMessages([]);
    showToast('Mensajes eliminados correctamente', 'success');
  }

  const handleBlockContact = () => {
    setShowContactActions(false); setShowFavoriteContact(false); setShowOnlineUsers(false); setShowBlockedContact(true);
    showToast(`Se ha bloqueado a ${selectedContact}`, 'success');
  }

  const handleUnblockContact = () => {
    setShowBlockedContact(false)
    showToast(`Se ha desbloqueado a ${selectedContact}`, 'success');
  }

  const handleFavoriteContact = () => {
    showToast(`${selectedContact} añadido a favoritos`, 'success');
  }

  const handleCommandInput = (value) => {
    setMessage(value)
    if (value.startsWith('/')) {
      setShowCommandSuggestions(true)
    } else {
      setShowCommandSuggestions(false)
    }
  }

  const handleSelectCommand = (command) => {
    setMessage(command.split(' ')[0] + ' ');
    setShowCommandSuggestions(false);
    const input = document.querySelector('.message-input');
    if (input) input.focus();
  }

  const handleSendPrivateMessage = (msg, recipient) => {
    const newMessage = {
      id: messages.length + 1,
      text: `[Privado para ${recipient}] ${msg}`,
      time: new Date().toLocaleTimeString(),
      sender: 'me',
      status: 'sent',
      isPrivate: true
    }
    setMessages(prev => [...prev, newMessage])
    showToast('Mensaje privado enviado', 'success')
    setShowPrivateMessage(false)
  }

return (
    <>
    <div className="chat-screen">
      <div className="chat-header">
        <div className="header-left">
          <h1 className="chat-title">bitchat</h1>
          <span className="user-name">/@anon9680</span>
        </div>

        <div className="header-right">
          <button className="header-btn" onClick={onOpenChannels}>
            <span className="mesh-label">#mesh</span>
          </button>
          <button className="header-btn" onClick={onOpenNetwork}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="var(--text-secondary)"/></svg>
            <span className="peer-count">0</span>
          </button>
          <button className="header-btn" onClick={() => setShowQRIdentity(true)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2" fill="none"/><rect x="14" y="3" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2" fill="none"/><rect x="3" y="14" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2" fill="none"/><rect x="14" y="14" width="3" height="3" fill="var(--text-secondary)"/><rect x="18" y="14" width="3" height="3" fill="var(--text-secondary)"/><rect x="14" y="18" width="3" height="3" fill="var(--text-secondary)"/></svg></button>
          <button className="header-btn menu-dots-btn" onClick={() => setShowFloatingMenu(true)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="6" r="2" fill="var(--text-secondary)"/><circle cx="12" cy="12" r="2" fill="var(--text-secondary)"/><circle cx="12" cy="18" r="2" fill="var(--text-secondary)"/></svg></button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'} ${msg.isSystem ? 'system-message' : ''}`}>
            <span className="message-text">{msg.text}</span>
            <span className="message-time">[{msg.time}]</span>
          </div>
        ))}
      </div>


      <div className="chat-input-container">
        {showCommandSuggestions && (
          <CommandSuggestions
            input={message}
            onSelectCommand={handleSelectCommand}
            onClose={() => setShowCommandSuggestions(false)}
          />
        )}
        <div className={`input-wrapper ${isInputFocused || message ? 'focused' : ''}`}>
          <button className="attach-btn" onClick={handleAddAttachment}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round"/></svg></button>
          <input
            type="text"
            className="message-input"
            placeholder="Type a command or message..."
            value={message}
            onChange={(e) => handleCommandInput(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-btn" onClick={handleSendMessage}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="var(--accent-primary)"/></svg></button>
        </div>
      </div>
    </div>

    {showClearMessages && <ClearMessages onConfirm={handleClearMessages} onCancel={() => setShowClearMessages(false)} showToast={showToast} />}
    {showContactActions && <ContactActions contactName={selectedContact} onBlock={handleBlockContact} onClose={() => setShowContactActions(false)} showToast={showToast} onViewOnline={() => {setShowContactActions(false); setShowOnlineUsers(true)}} onFavorite={() => {setShowContactActions(false); setShowFavoriteContact(true)}} onClearMessages={() => {setShowContactActions(false); setShowClearMessages(true)}} />}
    {showFavoriteContact && <FavoriteContact contactName={selectedContact} onFavorite={handleFavoriteContact} onBlock={handleBlockContact} onClose={() => setShowFavoriteContact(false)} showToast={showToast} />}
    {showOnlineUsers && <OnlineUsers onUserSelect={(user) => setSelectedContact(user)} onFavorite={handleFavoriteContact} onBlock={handleBlockContact} onClose={() => setShowOnlineUsers(false)} showToast={showToast} />}
    {showBlockedContact && <BlockedContact contactName={selectedContact} onUnblock={handleUnblockContact} onClose={() => setShowBlockedContact(false)} showToast={showToast} />}
    {showFloatingMenu && <FloatingMenu contactName={selectedContact} onClose={() => setShowFloatingMenu(false)} onRemove={() => {showToast('Usuario quitado', 'success'); setShowFloatingMenu(false)}} onViewOnline={() => {setShowFloatingMenu(false); setShowOnlineUsers(true)}} onFavorite={() => {handleFavoriteContact(); setShowFloatingMenu(false)}} onBlock={() => {handleBlockContact(); setShowFloatingMenu(false)}} onSquareMenu={() => {setShowFloatingMenu(false); setShowSquareMenu(true)}} onDotsMenu={() => {setShowFloatingMenu(false); setShowDotsMenu(true)}} />}
    {showHugAnimation && <HugAnimation contactName={selectedContact} onClose={() => setShowHugAnimation(false)} />}
    {showPrivateMessage && <PrivateMessage contactName={selectedContact} onClose={() => setShowPrivateMessage(false)} onSend={(msg) => handleSendPrivateMessage(msg, selectedContact)} />}
    {showQRIdentity && <QRIdentity onClose={() => setShowQRIdentity(false)} />}
    {showSquareMenu && <SquareMenu onClose={() => setShowSquareMenu(false)} showToast={showToast} />}
    {showDotsMenu && <DotsMenu onClose={() => setShowDotsMenu(false)} showToast={showToast} />}
    </>
  )
}

export default ChatScreen
