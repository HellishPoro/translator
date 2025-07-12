import { useEffect, useRef, useState } from "react"

export const useSpeechRecognition = (onResult: (text: string) => void) => {
    const [isListening, setIsListening] = useState(false)
    const recordRef = useRef<SpeechRecognition | null>(null)

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return

        const recognition = new SpeechRecognition()
        recognition.lang = 'ru-RU'
        recognition.interimResults = false
        recognition.continuous = false

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript
            onResult(transcript)
        }

        recognition.onend = () => setIsListening(false)
        recognition.onerror = () => setIsListening(false)

        recordRef.current = recognition
    }, [onResult])

    const startListening = () => {
        recordRef.current?.start()
        setIsListening(true)
    }
    
    const stopListening = () => {
        recordRef.current?.stop()
        setIsListening(false)
    }
    return {
        isListening,
        startListening,
        stopListening
    }
}