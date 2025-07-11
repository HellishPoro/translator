import { ActionIcon, Group, Modal, Textarea, Title } from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { IconVolume } from "@tabler/icons-react";

export const TranslateModal = ({opened, onClose}: {opened: boolean, onClose: () => void}) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [translation, setTranslation] = useState('');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if(!text){
            setTranslation('');
            return;
        }

        setLoading(true);

        timeoutRef.current = setTimeout(()=>{
            setTranslation(`Translated: ${text}`);
            setLoading(false);
        }, 1000)

        return () => {
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
                setLoading(false);
                setTranslation('');
            }
        }
        
    },[text])

    return (
        <Modal 
        opened={opened} 
        onClose={onClose} 
        size="55rem" 
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
        >
            <Title variant="light" c="indigo.4" size="lg">
            Translation
            </Title>
            <Group grow mt="md" mb="md">
                <LanguageSelector />
            </Group>
            <Group>
                <Textarea
                placeholder="Enter text"
                value={text}
                onChange={(e)=>{setText(e.currentTarget.value)}}
                minRows={5}
                mt="md"
                mb="md"
                size="lg"
                style={{ width: "100%"}}
                />
                <ActionIcon variant="subtle" color="indigo.4" size="lg" bottom={105} left={810}>
                    <IconVolume size={24} />
                </ActionIcon>
            </Group>
            {
                    <Group>
                    <Textarea
                    readOnly 
                    value={loading ? 'Loading...' : translation}
                    placeholder="Translation" 
                    size="lg"
                    style={{ width: "100%"}}
                    />
                    
                    <ActionIcon variant="subtle" color="indigo.4" size="lg" bottom={90} left={810}>
                        <IconVolume size={24} />
                    </ActionIcon>
                </Group>
                }
        </Modal>
    )
}