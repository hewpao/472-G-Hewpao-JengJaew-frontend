'use client';

import { useState } from "react";

export default function ChatInput({ currentChatId, currentUserId }: { currentChatId: string, currentUserId: string }) {

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                },
                body: JSON.stringify(req),
            });

            if (!res.ok) {
                console.error("Failed to send message", await res.text());
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
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

            {/* <div className="cursor-pointer">
                <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                </svg>
            </div> */}

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