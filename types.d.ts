export { };

declare global {
    interface Window {
        ai?: {
            languageDetector: {
                create: () => Promise<{ detect: (text: string) => Promise<{ detectedLanguage: string; confidence: number }[]> }>;
            };
            translator: {
                create: (options: { sourceLanguage: string; targetLanguage: string }) => Promise<{
                    translate: (text: string) => Promise<string>
                }>;
            };
            summarizer: {
                summarize: (text: string) => Promise<string>;
            };
        };
    }
}