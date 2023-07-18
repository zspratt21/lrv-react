import React from 'react';
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import TextArea from "@/Components/TextArea";

interface propsInterface {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const QrCodeCreateFormText: React.FC<propsInterface> = ({ onSubmit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        text: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h6>Text</h6>
            </div>
            <div className="mb-4">
                <TextArea
                    id="text"
                    name="text"
                    className="mt-1 block w-full dark:bg-gray-800"
                    isFocused={true}
                    onChange={(e) => setData('text', e.target.value)}
                    placeholder="Hello World!"
                />
                <div className="mt-2">
                    <small>Your QR code will display this text when scanned.</small>
                </div>
                <InputError message={errors.text} className="mt-2" />
            </div>
            <input type="hidden" value="text" name="type" id="type"/>
            <div className="mb-4"><input type="submit" value="submit"/></div>
        </form>
    );
};

export default QrCodeCreateFormText;
