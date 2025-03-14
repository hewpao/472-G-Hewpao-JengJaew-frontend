'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatMessage from "../../component/ChatMessage";
import ChatInput from "../../component/ChatInput";

const fetchMessages = async (chatId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/message/${chatId}`);
    console.log(res);
    
    if (!res.ok) {
        console.error("Failed to fetch messages");
        return [];
    }
    return res.json();
};

export default function ChatPage() {
    const { id: currentChatId } = useParams();
    const [messages, setMessages] = useState<any[]>([]);
    const currentUserId = '1';

    useEffect(() => {
        if (!currentChatId) return;

        const loadMessages = async () => {
            const data = await fetchMessages(currentChatId.toString());
            console.log(data);
            
            setMessages(data);
        };

        loadMessages();
    }, [currentChatId]);

    return (
        <div className="flex flex-col items-center h-screen gap-4 max-h-screen">
            <div className="flex flex-col w-full px-4">
                <h1 className="text-3xl font-bold">Chat</h1>
                <p className="text-gray-500">Chat ID: {currentChatId}</p>
            </div>

            <div className="flex flex-col gap-2 bg-gray-50 p-4 w-full h-full rounded-xl overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <ChatMessage key={msg.ID} message={msg} self={msg.UserID === currentUserId} />
                    ))
                ) : (
                    <p className="text-center text-gray-400">No messages yet.</p>
                )}
            </div>
            
            <ChatInput currentChatId={currentChatId as string} currentUserId={currentUserId} />
        </div>
    );
}