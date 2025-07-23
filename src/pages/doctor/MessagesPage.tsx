import { useState } from 'react';
import { Search, Send, Paperclip, Image, Clock, Check, CheckCheck } from 'lucide-react';
import Card from '../../components/ui/Card';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      patient: {
        name: 'María García',
        image: null,
        lastSeen: '2024-03-19T10:30:00',
      },
      lastMessage: {
        text: 'Doctora, tengo una pregunta sobre el tratamiento',
        timestamp: '2024-03-19T10:30:00',
        unread: true,
      },
    },
    {
      id: 2,
      patient: {
        name: 'Ana López',
        image: null,
        lastSeen: '2024-03-19T09:15:00',
      },
      lastMessage: {
        text: 'Gracias por la consulta de hoy',
        timestamp: '2024-03-19T09:15:00',
        unread: false,
      },
    },
  ];

  // Mock messages for the selected conversation
  const messages = [
    {
      id: 1,
      sender: 'patient',
      text: 'Doctora, tengo una pregunta sobre el tratamiento',
      timestamp: '2024-03-19T10:30:00',
      status: 'read',
    },
    {
      id: 2,
      sender: 'doctor',
      text: 'Claro, dime en qué puedo ayudarte',
      timestamp: '2024-03-19T10:31:00',
      status: 'read',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here you would normally send the message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex h-full overflow-hidden rounded-lg bg-white shadow-sm">
        {/* Conversations sidebar */}
        <div className="w-full max-w-xs border-r border-neutral-200">
          <div className="flex h-full flex-col">
            <div className="border-b border-neutral-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Buscar conversaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`flex w-full items-center border-b border-neutral-100 p-4 hover:bg-neutral-50 ${
                    selectedChat === conversation.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="mr-3 h-10 w-10 flex-shrink-0">
                    {conversation.patient.image ? (
                      <img
                        src={conversation.patient.image}
                        alt={conversation.patient.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        {conversation.patient.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-neutral-900">
                        {conversation.patient.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <p className="truncate text-sm text-neutral-600">
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          {selectedChat ? (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between border-b border-neutral-200 p-4">
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      M
                    </div>
                  </div>
                  <div>
                    <h2 className="font-medium text-neutral-900">María García</h2>
                    <p className="text-sm text-neutral-500">En línea</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender === 'doctor'
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-900'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div className="mt-1 flex items-center justify-end space-x-1">
                          <span className="text-xs opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {msg.sender === 'doctor' && (
                            <span className="opacity-70">
                              {msg.status === 'sent' && <Check className="h-4 w-4" />}
                              {msg.status === 'delivered' && <CheckCheck className="h-4 w-4" />}
                              {msg.status === 'read' && (
                                <CheckCheck className="h-4 w-4 text-accent-500" />
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
              <div className="border-t border-neutral-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
                  >
                    <Image className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 rounded-full border border-neutral-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-primary-500 p-2 text-white hover:bg-primary-600"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-neutral-500">Selecciona una conversación para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;