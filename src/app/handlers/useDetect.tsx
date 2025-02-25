'use client';

import { useEffect, useState } from "react";

const useDetector = () => {
    const [result, setResult] = useState('')
    const [isTextToDetect, setIsTextToDetect] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('')
    const[message, setMessage] = useState('');

    const language = (lang: string) =>{
        switch (lang) {
            case "en":
                return "English";
                break;
            case "pt":
                return "Portuguese"
                break;
            case "es":
                return "Spanish"
                break;
            case "ru":
                return "Russian"
                break;
            case "tr":
                return "Turkish"
                break;
            case "fr":
                return "French"
                break;        
            default:
                break;
        }
    }

    useEffect(() => {
        const handleDetect = async () => {
            try {
                if (!window.ai) {
                    console.log("AI API is not available.");
                    return;
                }

                if (!window.ai.languageDetector) {
                    console.error("Language Detector API is not available.");
                    return;
                }

                if (!isTextToDetect.trim()) {
                    setMessage("No text provided for detection.");
                    return;
                }

                const detector = await window.ai.languageDetector.create();
                const confidence = 0.7;

                const results = await detector.detect(isTextToDetect);

                const filteredResults = results.filter(
                    (result) => result.confidence >= confidence
                );

                if (filteredResults.length > 0) {
                    const topResult = filteredResults[0];
                    const detectedResult = `I am ${(topResult.confidence * 100).toFixed(2)}% sure this is ${language(topResult.detectedLanguage)}`;
                    setResult(detectedResult);
                    localStorage.setItem("detectedResult", detectedResult);
                } else {
                    setMessage("No language detected with high confidence.");
                }
            } catch (error) {
                console.error("Error detecting language:", error);
            }
        };

        handleDetect();
    }, [isTextToDetect]);

    useEffect(() => {
        const storedResult = localStorage.getItem("detectedResult");
        if (storedResult) {
            setResult(storedResult);
        }
    }, []);

    return { result, setIsTextToDetect,message, isTextToDetect, detectedLanguage, setDetectedLanguage }
}

export default useDetector;
