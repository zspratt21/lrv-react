import React from 'react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput";

interface propsInterface {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const QrCodeCreateFormEmail: React.FC<propsInterface> = ({ onSubmit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        mobile: '',
        email: '',
        website: '',
        company: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h6>Contact Information</h6>
            </div>
            <div className="flex">
                <div className="mb-4 flex-1">
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        className="mt-1 block w-full dark:bg-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="john"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
            </div>
            <div className="flex">
                <div className="mb-4 flex-1 mr-2">
                    <TextInput
                        id="mobile"
                        type="text"
                        name="mobile"
                        className="mt-1 block w-full dark:bg-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('mobile', e.target.value)}
                        placeholder="9157777777"
                    />
                    <InputError message={errors.mobile} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 ml-2">
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
            </div>
            <div className="flex">
                <div className="mb-4 flex-1 mr-2">
                    <TextInput
                        id="website"
                        type="text"
                        name="website"
                        className="mt-1 block w-full dark:bg-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('website', e.target.value)}
                        placeholder="https://www.johnwick.com"
                    />
                    <InputError message={errors.website} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 ml-2">
                    <TextInput
                        id="company"
                        type="text"
                        name="company"
                        className="mt-1 block w-full dark:bg-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('company', e.target.value)}
                        placeholder="The Table"
                    />
                    <InputError message={errors.company} className="mt-2" />
                </div>
            </div>
            <input type="hidden" value="contact" name="type" id="type"/>
            <div className="mb-4"><input type="submit" value="submit"/></div>
        </form>
    );
};

export default QrCodeCreateFormEmail;
