'use client'
import { useEffect, useState } from "react";
import useDetector from "../handlers/useDetect";

interface Message {
    id: number;
    text: string;
    detectedLanguage: string;
    translatedText: string;
    sourceLang: string;
    targetLang: string;
}

interface TranslateProps {
    msg: Message;
    setMessages: (messages: (prev: Message[]) => Message[]) => void;
}

const Translate: React.FC<TranslateProps> = ({ msg, setMessages }) => {
    const languages = [
        { code: "en", name: "English" },
        { code: "pt", name: "Portuguese" },
        { code: "es", name: "Spanish" },
        { code: "ru", name: "Russian" },
        { code: "tr", name: "Turkish" },
        { code: "fr", name: "French" },
    ];

    const { detectedLanguage } = useDetector();
    const [targetLang, setTargetLang] = useState(msg.targetLang || "fr");
    const [sourceLang, setSourceLang] = useState(detectedLanguage || "en");
    const [translatedText, setTranslatedText] = useState(msg.translatedText || "");
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        if (detectedLanguage) {
            setSourceLang(detectedLanguage);
        }
    }, [detectedLanguage]);

    // Handle Translation
    const handleTranslate = async () => {
        if (!window.ai) {
            console.error("AI API not available.");
            return;
        }

        setIsTranslating(true);

        setMessages((prev) =>
            prev.map((m) =>
                m.id === msg.id ? { ...m, isTranslating: true } : m
            )
        );

        try {
            const translator = await window.ai.translator.create({
                sourceLanguage: sourceLang,
                targetLanguage: targetLang,
            });

            const result = await translator.translate(msg.text);
            setTranslatedText(result);

            setMessages((prev) =>
                prev.map((m) =>
                    m.id === msg.id
                        ? { ...m, translatedText: result, isTranslating: false }
                        : m
                )
            );
        } catch (error) {
            console.error("Translation failed:", error);
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 pt-4 rounded-lg w-fit">
            <div className="flex gap-2 items-center">
                <select
                    className="p-2 border rounded flex-1 button"
                    value={targetLang}
                    onChange={(e) => {
                        setTargetLang(e.target.value);
                        setMessages((prev) =>
                            prev.map((m) =>
                                m.id === msg.id ? { ...m, targetLang: e.target.value } : m
                            )
                        );
                    }}
                >
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <div>
                    <button
                        onClick={handleTranslate}
                        className="py-1 px-2 button text-white rounded"
                        disabled={isTranslating}
                    >
                        {isTranslating ? "Translating..." : "Translate"}
                    </button>
                </div>
            </div>

            {translatedText && (
                <div className="p-2 rounded flex gap-2">
                    <p className="text-gray-200">Translated Text:</p>
                    <p className="font-semibold text-gray-200">{translatedText}</p>
                </div>
            )}
        </div>
    );
};

export default Translate;
