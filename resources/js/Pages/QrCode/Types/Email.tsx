import React from 'react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import FloatingInputLabel from "@/Components/FloatingInputLabel";

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
        let emailValid = data.email !== '' && data.email.includes('@') && data.email.includes('.');
        let subjectValid = data.subject !== '';
        let bodyValid = data.body !== '';
        let formValid = emailValid && subjectValid && bodyValid;
        if (formValid) {
            onSubmit(e);
        }
        else {
            if (!emailValid) {
                errors.email = 'Please enter a valid email.';
                setData('email', '');
            }
            if (!subjectValid) {
                errors.subject = 'Please enter a subject.';
                setData('subject', '');
            }
            if (!bodyValid) {
                errors.body = 'Please enter a body.';
                setData('body', '');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h6>Email</h6>
            </div>
            <div className="mb-5 flex">
                <div className="flex-1 mr-2 relative">
                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        className="mt-1 block w-full dark:bg-gray-800 peer pt-4"
                        isFocused={true}
                        onChange={(e) => {setData('email', e.target.value); errors.email = '';}}
                        placeholder="hello@world.com"
                    />
                    <FloatingInputLabel htmlFor="email" value="Address" top="top-1"/>
                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="flex-1 ml-2 relative">
                    <TextInput
                        id="subject"
                        type="text"
                        name="subject"
                        className="mt-1 block w-full dark:bg-gray-800 peer pt-4"
                        isFocused={true}
                        onChange={(e) => {setData('subject', e.target.value); errors.subject = '';}}
                        placeholder="Top Secret"
                    />
                    <FloatingInputLabel htmlFor="subject" value="Subject" top="top-1"/>
                    <InputError message={errors.subject} className="mt-2" />
                </div>
            </div>
            <div className="mb-4 relative">
                <TextArea
                    id="body"
                    name="body"
                    className="mt-1 block w-full dark:bg-gray-800 peer pb-0 pt-4"
                    isFocused={true}
                    onChange={(e) => {setData('body', e.target.value); errors.body = '';}}
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <FloatingInputLabel htmlFor="body" value="Body"/>
                <div className="mt-2">
                    <small>Your QR code will send this email when scanned.</small>
                </div>
                <InputError message={errors.body} className="mt-2" />
            </div>
            <input type="hidden" value="email" name="type" id="type"/>
            <div className="mb-4">
                <button type="submit" className="button-primary w-16 p-2 text-center sm:rounded bg-indigo-300 dark:bg-indigo-700"><i className="fa-solid fa-right-to-bracket"></i></button>
            </div>
        </form>
    );
};

export default QrCodeCreateFormEmail;
