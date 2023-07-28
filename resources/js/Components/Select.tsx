import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

export default forwardRef(function TextInput(
    { className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLSelectElement> & { isFocused?: boolean, options: string[] },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);
    const { options = [] } = props;

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <select
            {...props}
            defaultValue={options[0]}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
});
