import React from 'react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import FloatingInputLabel from "@/Components/FloatingInputLabel";

interface propsInterface {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const QrCodeCreateFormWiFi: React.FC<propsInterface> = ({ onSubmit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        ssid: '',
        network_type: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h6>Wi-Fi</h6>
            </div>
            <div className="mb-4 flex">
                <div className="flex-1 mr-2 relative">
                    <TextInput
                        id="ssid"
                        type="text"
                        name="ssid"
                        className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                        isFocused={true}
                        onChange={(e) => setData('ssid', e.target.value)}
                        placeholder="hello@world.com"
                    />
                    <FloatingInputLabel htmlFor="ssid" value="SSID" top="top-1"/>
                    <InputError message={errors.ssid} className="mt-2" />
                </div>
                <div className="flex-1 ml-1 mr-1 relative">
                    <Select
                        id="network_type"
                        name="network_type"
                        className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                        onChange={(e) => setData('network_type', e.target.value)}
                        placeholder="Top Secret"
                        options = {['WPA', 'WEP', 'No Encryption']}
                    />
                    <FloatingInputLabel htmlFor="network_type" value="Type" top="top-1"/>
                    <InputError message={errors.network_type} className="mt-2" />
                </div>
                <div className="flex-1 ml-2 relative">
                    <TextInput
                        id="password"
                        type="text"
                        name="password"
                        className="mt-1 block w-full dark:bg-gray-800 peer leading-10 pb-0"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Top Secret"
                    />
                    <FloatingInputLabel htmlFor="password" value="Password" top="top-1"/>
                    <InputError message={errors.password} className="mt-2" />
                </div>
            </div>
            <div className="mt-2">
                <small>Your QR code will connect to this network when scanned.</small>
            </div>
            <input type="hidden" value="wifi" name="type" id="type"/>
            <div className="mb-4">
                <button type="submit" className="button-primary w-16 p-2 text-center sm:rounded bg-indigo-300 dark:bg-indigo-700"><i className="fa-solid fa-right-to-bracket"></i></button>
            </div>
        </form>
    );
};

export default QrCodeCreateFormWiFi;
