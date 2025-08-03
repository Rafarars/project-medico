import { useState } from 'react';
import { Search, Send, Paperclip, Image, Clock, Check, CheckCheck, Plus, X } from 'lucide-react';
import Card from '../../components/ui/Card';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      doctor: {
        name: 'Dra. Ana Méndez',
        specialty: 'Ginecología',
        image: null,
        isOnline: true,
      },
      lastMessage: {
        text: 'Los resultados se ven bien, continuemos con el tratamiento',
        timestamp: '2024-03-19T14:30:00',
        sender: 'doctor',
        unread: false,
      },
    },
    {
      id: 2,
      doctor: {
        name: 'Dra. Carmen López',
        specialty: 'Obstetricia',
        image: null,
        isOnline: false,
        lastSeen: '2024-03-19T10:15:00',
      },
      lastMessage: {
        text: 'Perfecto, nos vemos en la próxima cita',
        timestamp: '2024-03-18T16:45:00',
        sender: 'patient',
        unread: false,
      },
    },
  ];

  // Mock messages for each conversation
  const messagesByConversation: { [key: number]: any[] } = {
    1: [
      {
        id: 1,
        sender: 'patient',
        text: 'Doctora, tengo una pregunta sobre el tratamiento',
        timestamp: '2024-03-19T14:25:00',
        status: 'read',
      },
      {
        id: 2,
        sender: 'doctor',
        text: 'Claro, dime en qué puedo ayudarte',
        timestamp: '2024-03-19T14:26:00',
        status: 'read',
      },
      {
        id: 3,
        sender: 'patient',
        text: '¿Es normal sentir un poco de náuseas con el hierro?',
        timestamp: '2024-03-19T14:27:00',
        status: 'read',
      },
      {
        id: 4,
        sender: 'doctor',
        text: 'Sí, es completamente normal. Te recomiendo tomarlo con alimentos para reducir las náuseas. Los resultados se ven bien, continuemos con el tratamiento',
        timestamp: '2024-03-19T14:30:00',
        status: 'read',
      },
    ],
    2: [
      {
        id: 1,
        sender: 'patient',
        text: 'Doctora Carmen, ¿cuándo podríamos programar la siguiente consulta?',
        timestamp: '2024-03-20T09:15:00',
        status: 'read',
      },
      {
        id: 2,
        sender: 'doctor',
        text: 'Hola! Tengo disponibilidad la próxima semana. ¿Te parece bien el martes a las 2:00 PM?',
        timestamp: '2024-03-20T09:30:00',
        status: 'read',
      },
      {
        id: 3,
        sender: 'patient',
        text: 'Perfecto, me viene muy bien ese horario. ¿Necesito llevar algún estudio específico?',
        timestamp: '2024-03-20T09:35:00',
        status: 'read',
      },
      {
        id: 4,
        sender: 'doctor',
        text: 'Sí, por favor trae los resultados del ultrasonido que te solicité la vez pasada.',
        timestamp: '2024-03-20T10:00:00',
        status: 'delivered',
      },
    ]
  };

  // Get messages for the selected conversation
  const messages = selectedChat ? messagesByConversation[selectedChat] || [] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here you would normally send the message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-12rem)]">
      <div className="flex h-full overflow-hidden rounded-lg bg-white shadow-sm">
        {/* Conversations sidebar */}
        <div className={`w-full ${selectedChat ? 'hidden' : 'block'} lg:block lg:max-w-xs border-r border-neutral-200`}>
          <div className="flex h-full flex-col">
            <div className="border-b border-neutral-200 p-3 lg:p-4">
              <div className="mb-3 lg:mb-4 flex items-center justify-between">
                <h2 className="font-heading text-base lg:text-lg font-semibold text-neutral-900">Mensajes</h2>
                <button className="rounded-full bg-primary-500 p-2 text-white hover:bg-primary-600">
                  <Plus size={14} className="lg:w-4 lg:h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Buscar conversaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`flex w-full items-center border-b border-neutral-100 p-3 lg:p-4 hover:bg-neutral-50 ${
                    selectedChat === conversation.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="mr-3 h-10 w-10 flex-shrink-0 relative">
                    {conversation.doctor.image ? (
                      <img
                        src={conversation.doctor.image}
                        alt={conversation.doctor.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        <span className="text-sm lg:text-base font-medium">{conversation.doctor.name.charAt(0)}</span>
                      </div>
                    )}
                    {conversation.doctor.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success-500"></div>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-neutral-900 truncate text-sm lg:text-base">
                        {conversation.doctor.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <p className="text-xs text-neutral-500 mb-1">{conversation.doctor.specialty}</p>
                    <p className="truncate text-xs lg:text-sm text-neutral-600">
                      {conversation.lastMessage.sender === 'patient' ? 'Tú: ' : ''}
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex flex-1 flex-col ${selectedChat ? 'block' : 'hidden'} lg:block`}>
          {selectedChat && selectedConversation ? (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between border-b border-neutral-200 p-3 lg:p-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="mr-3 lg:hidden rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
                  >
                    <X size={20} />
                  </button>
                  <div className="mr-3 h-8 w-8 lg:h-10 lg:w-10 relative">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <span className="text-sm lg:text-base font-medium">{selectedConversation.doctor.name.charAt(0)}</span>
                    </div>
                    {selectedConversation.doctor.isOnline && (
                      <div className="absolute bottom-0 right-0 h-2 w-2 lg:h-3 lg:w-3 rounded-full border-2 border-white bg-success-500"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium text-neutral-900 text-sm lg:text-base">{selectedConversation.doctor.name}</h2>
                    <p className="text-xs lg:text-sm text-neutral-500">
                      {selectedConversation.doctor.isOnline ? (
                        'En línea'
                      ) : (
                        `Última vez: ${new Date(selectedConversation.doctor.lastSeen || '').toLocaleString()}`
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100">
                    <Clock size={16} className="lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 lg:p-4">
                <div className="space-y-3 lg:space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] lg:max-w-[70%] rounded-lg px-3 py-2 lg:px-4 lg:py-2 ${
                          msg.sender === 'patient'
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-900'
                        }`}
                      >
                        <p className="text-sm lg:text-base break-words">{msg.text}</p>
                        <div className="mt-1 flex items-center justify-end space-x-1">
                          <span className="text-xs opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {msg.sender === 'patient' && (
                            <span className="opacity-70">
                              {msg.status === 'sent' && <Check className="h-3 w-3 lg:h-4 lg:w-4" />}
                              {msg.status === 'delivered' && <CheckCheck className="h-3 w-3 lg:h-4 lg:w-4" />}
                              {msg.status === 'read' && (
                                <CheckCheck className="h-3 w-3 lg:h-4 lg:w-4 text-accent-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message input */}
              <div className="border-t border-neutral-200 p-3 lg:p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 flex-shrink-0"
                  >
                    <Paperclip className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 flex-shrink-0"
                  >
                    <Image className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 rounded-full border border-neutral-300 px-3 py-2 lg:px-4 lg:py-2 text-sm lg:text-base focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-primary-500 p-2 text-white hover:bg-primary-600 flex-shrink-0"
                  >
                    <Send className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Search className="h-6 w-6 lg:h-8 lg:w-8 text-neutral-400" />
                </div>
                <h3 className="text-base lg:text-lg font-medium text-neutral-900">Selecciona una conversación</h3>
                <p className="text-sm lg:text-base text-neutral-500">Elige un doctor para comenzar a chatear</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;