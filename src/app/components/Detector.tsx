'use client'
import { FiSend } from "react-icons/fi";
import useDetector from "../handlers/useDetect";
import Translate from "./Translate";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { AiTwotoneDelete } from "react-icons/ai";

interface Message {
    id: number,
    text: string,
    detectedLanguage: string;
    translatedText: string;
    sourceLang: string;
    targetLang: string;
};

const Detector = () => {
    const [text, setText] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const {result, setIsTextToDetect, detectedLanguage } = useDetector();

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
        setMessages(storedMessages);
    }, []);

    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);


    const handleSubmit = () => {
        if (!text.trim()) return;

        const newMessage:Message = {
            id: Date.now(),
            text,
            detectedLanguage: detectedLanguage || "en",
            translatedText: "",
            sourceLang: detectedLanguage || "en",
            targetLang: "fr",
        };

        setMessages([...messages, newMessage]);

        setIsTextToDetect(text);
        setText("");
    }

    const handleDelete = (id: number) => {
        const updatedMessages = messages.filter((msg) => msg.id !== id);
        setMessages(updatedMessages);
    };

    return (
        <div className="flex flex-col h-screen gap-4 p-4 rounded-lg w-full">
            <div className="flex-1 overflow-auto p-4 space-y-6">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} onMouseEnter={() => setHoveredId(msg.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="chat-box p-[25px] rounded-md flex justify-between gap-2">
                            <div>
                                <div className="flex items-center gap-3 mb-[20px]">
                                    <FaCircleUser size={25} />
                                    <p className="font-semibold text-white text-[16px]">{msg.text}</p>
                                </div>
                                <small className="mt-[20px]">{result}</small>
                                <Translate msg={msg} setMessages={setMessages} />
                            </div>
                            <div>
                                {hoveredId === msg.id && <button onClick={() => handleDelete(msg.id)} className=""><AiTwotoneDelete size={20} /></button>}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center flex-col h-full font-sans">
                        <h3 className="text-[30px] font-bold text-slate-300">Nothing here yet.</h3>
                        <p className=" text-zinc-500">Say something!</p>
                    </div>
                )
                }
            </div>
            <div className="flex gap-3 items-center relative">
                <textarea
                    draggable={false}
                    rows={4}
                    className="p-2 flex-1 border rounded w-full input"
                    placeholder="Enter your text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className="button p-2 text-white rounded w-fit absolute right-[40px]"
                    onClick={handleSubmit}
                >
                    {<FiSend />}
                </button>
            </div>
        </div>
    )
}

export default Detector
