import { Modal } from "@mantine/core"

export const TranslateModal = ({opened, onClose}: {opened: boolean, onClose: () => void}) => {
    return (
        <Modal opened={opened} onClose={onClose} title="Переводчик" size={"lg"}>

        </Modal>
    )
}