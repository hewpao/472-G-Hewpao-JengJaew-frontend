interface Message {
    ID: number;
    Content: string;
    CreatedAt: string;
}

export default function ChatMessage({ message, self }: { message: Message; self: boolean }) {
    return (
        <div className={`flex flex-col gap-1 ${self ? "items-end" : "items-start"}`}>
            <div className={`p-4 rounded-xl ${self ? "bg-black text-white rounded-tr-none" : "bg-gray-300 text-black rounded-tl-none"}`}>
                <p>{message.Content}</p>
            </div>

            <div>
                {/* Chat timestamp */}
                <p className="text-xs text-gray-500">{message.CreatedAt}</p>
            </div>
        </div>
    );
}