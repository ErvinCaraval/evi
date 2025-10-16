export const mockUsers = [
  { id: 1, name: 'CryptoExplorer', status: 'online', distance: '5m', isFavorite: true, lastSeen: 'Active now' },
  { id: 2, name: 'LocalFoodie', status: 'online', distance: '10m', isFavorite: false, lastSeen: 'Active now' },
  { id: 3, name: 'TechNomad', status: 'offline', distance: '15m', isFavorite: false, lastSeen: '5 min ago' },
  { id: 4, name: 'ArtLover', status: 'online', distance: '20m', isFavorite: true, lastSeen: 'Active now' },
  { id: 5, name: 'SportsFan', status: 'online', distance: '25m', isFavorite: false, lastSeen: 'Active now' },
  { id: 6, name: 'MusicJunkie', status: 'offline', distance: '30m', isFavorite: false, lastSeen: '15 min ago' },
  { id: 7, name: 'NightOwl', status: 'online', distance: '35m', isFavorite: false, lastSeen: 'Active now' },
  { id: 8, name: 'BookWorm', status: 'offline', distance: '40m', isFavorite: false, lastSeen: '1 hour ago' }
];

export const mockMessages = [
  {
    id: 1,
    text: '👋 Welcome to BitChat! Connect with people around you securely.',
    time: '11:50:39',
    isSystem: true
  },
  {
    id: 2,
    senderId: 1,
    text: 'Hey everyone! Anyone interested in cryptocurrency meetup today?',
    time: '11:51:00',
    status: 'sent'
  },
  {
    id: 3,
    senderId: 2,
    text: 'I know a great café nearby that accepts crypto! 🚀',
    time: '11:51:30',
    status: 'received'
  },
  {
    id: 4,
    senderId: 4,
    text: 'Just visited an amazing art gallery in the area. They have an NFT exhibition!',
    time: '11:52:00',
    status: 'received'
  },
  {
    id: 5,
    senderId: 1,
    text: 'That sounds perfect! Let\'s meet there in an hour?',
    time: '11:52:30',
    status: 'sent'
  },
  {
    id: 6,
    text: '🎉 CryptoExplorer and LocalFoodie are now connected!',
    time: '11:53:00',
    isSystem: true
  }
];

export const generateRandomReply = () => {
  const replies = [
    '¡Hola! ¿Qué tal todo por aquí? 👋',
    '¡Eso suena interesante! ¿Me cuentas más? 🤔',
    'Estoy cerca, ¿quedamos para un café? ☕',
    '¿Has probado las nuevas funciones de la app? 🚀',
    '¡Gracias por el mensaje! Me encanta conocer gente nueva 😊',
    '¡Genial! Hablemos más sobre eso 💬',
    '¡Acabo de llegar a la zona! ¿Alguna recomendación? 🌟',
    '¿Alguien para una quedada crypto? 💰',
    '¡Me encanta este barrio! Siempre hay algo nuevo que descubrir 🌆',
    '¿Habéis visto el nuevo café que han abierto? ¡Acepta Bitcoin! 🎉'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
};

export const mockChannels = [
  { id: 1, name: '🎨 Art District', members: 45 },
  { id: 2, name: '☕ Local Cafés', members: 78 },
  { id: 3, name: '💰 Crypto Talk', members: 120 },
  { id: 4, name: '🎵 Music Scene', members: 65 },
  { id: 5, name: '📚 Book Club', members: 32 }
];

export const mockNotifications = [
  { id: 1, type: 'newUser', text: 'NightOwl just joined the network!' },
  { id: 2, type: 'channelActivity', text: 'New message in Crypto Talk' },
  { id: 3, type: 'nearby', text: '3 new users nearby' }
];

export const mockCommands = [
  { command: '/help', description: 'Show available commands' },
  { command: '/clear', description: 'Clear chat history' },
  { command: '/location', description: 'Share your location' },
  { command: '/favorite', description: 'Add user to favorites' },
  { command: '/block', description: 'Block user' },
  { command: '/channel', description: 'Join a channel' }
];