import React from 'react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

interface propsInterface {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const QrCodeCreateFormEmail: React.FC<propsInterface> = ({ onSubmit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        subject: '',
        body: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h6>Email</h6>
            </div>
            <div className="mb-4">
                <TextInput
                    id="email"
                    type="text"
                    name="email"
                    className="mt-1 block w-full dark:bg-gray-800"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="hello@world.com"
                />
                <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mb-4">
                <TextInput
                    id="subject"
                    type="text"
                    name="subject"
                    className="mt-1 block w-full dark:bg-gray-800"
                    isFocused={true}
                    onChange={(e) => setData('subject', e.target.value)}
                    placeholder="Top Secret"
                />
                <InputError message={errors.subject} className="mt-2" />
            </div>
            <div className="mb-4">
                <TextArea
                    id="body"
                    name="body"
                    className="mt-1 block w-full dark:bg-gray-800"
                    isFocused={true}
                    onChange={(e) => setData('body', e.target.value)}
                    placeholder="Hello World!"
                />
                <div className="mt-2">
                    <small>Your QR code will send this email when scanned.</small>
                </div>
                <InputError message={errors.body} className="mt-2" />
            </div>
            <input type="hidden" value="email" name="type" id="type"/>
            <div className="mb-4"><input type="submit" value="submit"/></div>
        </form>
    );
};

export default QrCodeCreateFormEmail;
