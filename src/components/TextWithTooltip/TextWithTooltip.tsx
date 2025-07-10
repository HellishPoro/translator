import { Paper } from "@mantine/core"

const sampleText = `
  Выделите часть этого текста, чтобы увидеть перевод в тултипе.
`;

export const TextWithTooltip = () => {
    return (
        <div>
            {sampleText}
            <Paper>

            </Paper>
        </div>
    )
}