import React from 'react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";

interface propsInterface {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const QrCodeCreateFormUrl: React.FC<propsInterface> = ({ onSubmit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        url: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h6>Url</h6>
            </div>
            <div className="mb-4">
                <TextInput
                    id="url"
                    type="text"
                    name="url"
                    className="mt-1 block w-full dark:bg-gray-800"
                    isFocused={true}
                    onChange={(e) => setData('url', e.target.value)}
                    placeholder="https://google.com"
                />
                <div className="mt-2">
                    <small>Your QR code will display this link when scanned.</small>
                </div>
                <InputError message={errors.url} className="mt-2" />
            </div>
            <input type="hidden" value="url" name="type" id="type"/>
            <div className="mb-4"><input type="submit" value="submit"/></div>
        </form>
    );
};

export default QrCodeCreateFormUrl;
