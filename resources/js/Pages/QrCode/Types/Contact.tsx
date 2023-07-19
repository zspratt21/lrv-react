import React from 'react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import FloatingInputLabel from "@/Components/FloatingInputLabel";

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
            <div className="mb-4 relative">
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="john"
                />
                <FloatingInputLabel htmlFor="name" value="Name"/>
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mb-4 flex">
                <div className="flex-1 mr-2 relative">
                    <TextInput
                        id="mobile"
                        type="text"
                        name="mobile"
                        className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                        isFocused={true}
                        onChange={(e) => setData('mobile', e.target.value)}
                        placeholder="9157777777"
                    />
                    <FloatingInputLabel htmlFor="mobile" value="Mobile" top="top-1"/>
                    <InputError message={errors.mobile} className="mt-2" />
                </div>
                <div className="flex-1 ml-2 relative">
                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="hello@world.com"
                    />
                    <FloatingInputLabel htmlFor="email" value="Email" top="top-1"/>
                    <InputError message={errors.email} className="mt-2" />
                </div>
            </div>
            <div className="mb-4 flex">
                <div className="flex-1 mr-2 relative">
                    <TextInput
                        id="website"
                        type="text"
                        name="website"
                        className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                        isFocused={true}
                        onChange={(e) => setData('website', e.target.value)}
                        placeholder="https://www.johnwick.com"
                    />
                    <FloatingInputLabel htmlFor="website" value="Website" top="top-1"/>
                    <InputError message={errors.website} className="mt-2" />
                </div>
                <div className="flex-1 ml-2 relative">
                    <TextInput
                        id="company"
                        type="text"
                        name="company"
                        className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                            isFocused={true}
                        onChange={(e) => setData('company', e.target.value)}
                        placeholder="The Table"
                    />
                    <FloatingInputLabel htmlFor="company" value="Company" top="top-1"/>
                    <InputError message={errors.company} className="mt-2" />
                </div>
            </div>
            <input type="hidden" value="contact" name="type" id="type"/>
            <div className="mb-4"><input type="submit" value="submit"/></div>
        </form>
    );
};

export default QrCodeCreateFormEmail;
