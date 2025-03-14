'use client';

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ChatMessage from "../../component/ChatMessage";
import ChatInput from "../../component/ChatInput";
import { useSession } from "next-auth/react";

export default function ChatPage() {
    const { data: session, status } = useSession();
    const { id: currentChatId } = useParams();
    const [messages, setMessages] = useState<any[]>([]);
    const currentUserId = session?.user?.id || null;
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const accessToken = session?.user?.access_token || session?.access_token;

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Function to fetch messages with authorization
    const fetchMessages = async () => {
        if (!currentChatId) return;
        
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/message/${currentChatId}`, {
                headers: {
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
                    'Content-Type': 'application/json',
                }
            });
            
            if (!res.ok) {
                console.error("Failed to fetch messages", await res.text());
                return;
            }
            
            const data = await res.json();
            setMessages(data);
            
            // Scroll to bottom after loading messages
            setTimeout(scrollToBottom, 100);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load messages when chat ID changes or session is loaded
    useEffect(() => {
        if (!currentChatId || status === 'loading') return;
        fetchMessages();
    }, [currentChatId, status]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handler for when a message is sent
    const handleMessageSent = () => {
        fetchMessages(); // Refresh the messages
    };

    return (
        <div className="flex flex-col items-center h-screen gap-4 max-h-screen px-16 mb-8">
            <div className="flex flex-col w-full px-4">
                <h1 className="text-3xl font-bold">Chat</h1>
                <p className="text-gray-500">Chat ID: {currentChatId}</p>
            </div>

            <div className="flex flex-col gap-2 bg-gray-50 p-4 w-full h-full rounded-xl overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    </div>
                ) : messages.length > 0 ? (
                    <>
                        {messages.map((msg) => (
                            <ChatMessage 
                                key={msg.ID} 
                                message={msg} 
                                self={msg.UserID === currentUserId} 
                            />
                        ))}
                        <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
                    </>
                ) : (
                    <p className="text-center text-gray-400">No messages yet.</p>
                )}
            </div>
            
            <ChatInput 
                currentChatId={currentChatId as string} 
                currentUserId={currentUserId ?? ''} 
                onMessageSent={handleMessageSent}
            />
        </div>
    );
}