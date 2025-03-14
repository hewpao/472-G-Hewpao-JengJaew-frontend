'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatInput({ 
    currentChatId, 
    currentUserId,
    onMessageSent 
}: { 
    currentChatId: string, 
    currentUserId: string,
    onMessageSent?: () => void  // Callback for when message is sent
}) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    
    const accessToken = session?.user?.access_token || session?.access_token;

    const sendMessage = async () => {
        if (!message.trim()) return; // Prevent empty messages
        setIsLoading(true);

        const req = {
            user_id: currentUserId,
            chat_id: Number(currentChatId), // Ensure it's a number
            content: message,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/message/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { "Authorization": `Bearer ${accessToken}` })
                },
                body: JSON.stringify(req),
            });

            if (!res.ok) {
                console.error("Failed to send message", await res.text());
                throw new Error("Failed to send message");
            }
            
            // Call the callback to notify parent component
            if (onMessageSent) {
                onMessageSent();
            }
            
            // Clear the input field
            setMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading && message.trim()) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="w-full flex justify-center items-center gap-4 px-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-xl shadow-lg px-6 py-4"
                placeholder="พิมพ์ข้อความตรงนี้..."
                disabled={isLoading}
            />

            <button 
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className={`px-4 py-2 rounded-lg shadow-lg ${
                    isLoading ? "bg-gray-400" : "bg-green-500 text-white"
                }`}>
                {isLoading ? "Sending..." : "Send"}
            </button>
        </div>
    );
}