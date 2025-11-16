import classNames from "classnames"
import { forwardRef, type FC, type InputHTMLAttributes } from "react"

export type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
    noBorder?: boolean
}

export type AppInputRef = HTMLInputElement

export const AppInput = forwardRef<AppInputRef, AppInputProps>(({ noBorder, className, ...restProps }, ref) => {
    return (
        <input ref={ref} className={
            classNames(
                className,
                { 'border-2 border-blue-500': !noBorder },
                "p-2 rounded-lg",
            )
        }  {...restProps} />
    )
})