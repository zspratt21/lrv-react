import { LabelHTMLAttributes } from 'react';

export default function FloatingInputLabel({ value, top = 'top-0', className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { value?: string, top?:string }) {
    return (
        // peer-focus:dark:bg-gray-900 peer-focus:bg-gray-100
        <label {...props} className={`${top} block font-medium text-sm text-gray-700 dark:text-gray-300 absolute left-0 ml-1 px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:ml-1 peer-focus:-translate-y-5 peer-focus:px-0 peer-focus:text-sm` + className}>
            {value ? value : children}
        </label>
    );
}
