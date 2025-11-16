import { useRef, useState, type FC } from "react"
import { AppInput, type AppInputProps } from "../Input"
import { formatCurrency } from "@/utils"

export type CurrencyFormatterProps = AppInputProps

export const CurrencyFormatter: FC<CurrencyFormatterProps> = ({ value: valueProps, onChange, onPaste, ...restProps }) => {
    const [value, setValue] = useState<string>("")

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Save cursor position BEFORE formatting
        const { value: newValue, selectionStart } = e.target

        const formattedValue = formatCurrency(newValue)
        setValue(formattedValue)

        // Restore cursor position AFTER formatting
        requestAnimationFrame(() => {
            const pos = (selectionStart ?? 0) + (formattedValue.length - newValue.length);
            inputRef.current?.setSelectionRange(pos, pos);
        });

         e.target.value = formattedValue
        onChange?.(e)
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        console.log({ e })
        onPaste?.(e)
    }

    return <AppInput ref={inputRef} noBorder value={value} onChange={handleChange} onPaste={handlePaste} {...restProps} />
}