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
        let urlValid = data.url !== '' && data.url.includes('http://') || data.url.includes('https://')
        if (urlValid) {
            onSubmit(e);
        }
        else {
            errors.url = 'Please enter a valid url.';
            setData('url', '');
        }

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
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => {setData('url', e.target.value); errors.url = '';}}
                    placeholder="https://google.com"
                />
                <div className="mt-2">
                    <small>Your QR code will display this link when scanned.</small>
                </div>
                <InputError message={errors.url} className="mt-2" />
            </div>
            <input type="hidden" value="url" name="type" id="type"/>
            <div className="mb-4">
                <button type="submit" className="button-primary w-full lg:w-16 p-2 text-center sm:rounded bg-indigo-300 dark:bg-indigo-700"><i className="fa-solid fa-right-to-bracket"></i></button>
            </div>
        </form>
    );
};

export default QrCodeCreateFormUrl;
