/**
 * ChatPage
 *
 * Displays the message thread between the customer and restaurant staff.
 * The chat input lives in Layout.tsx (bottom nav area) and calls sendChat()
 * from context. This page only renders the message list and scroll target.
 */

import { useTableOrder } from './TableOrderContext';

export default function ChatPage() {
  const { messages, chatBottomRef } = useTableOrder();

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 space-y-2 min-h-64">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nhắn tin cho nhân viên…
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderType === 'CUSTOMER' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                msg.senderType === 'CUSTOMER'
                  ? 'bg-primary text-white rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm'
              }`}
            >
              {msg.senderType !== 'CUSTOMER' && (
                <p className="text-xs opacity-70 mb-0.5">Nhân viên</p>
              )}
              <p>{msg.message}</p>
              <p
                className={`text-[10px] mt-1 ${
                  msg.senderType === 'CUSTOMER'
                    ? 'text-white/60'
                    : 'text-muted-foreground'
                }`}
              >
                {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>
    </div>
  );
}
