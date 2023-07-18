import React from 'react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";

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
            <div className="flex">
                <div className="mb-4 flex-1 mr-2">
                    <TextInput
                        id="ssid"
                        type="text"
                        name="ssid"
                        className="mt-1 block w-full dark:bg-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('ssid', e.target.value)}
                        placeholder="hello@world.com"
                    />
                    <InputError message={errors.ssid} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 ml-1 mr-1">
                    {/* @todo create select component and switch out raw element. */}
                    <Select
                        id="network_type"
                        name="network_type"
                        className="mt-1 block w-full dark:bg-gray-800"
                        onChange={(e) => setData('network_type', e.target.value)}
                        placeholder="Top Secret"
                        options = {['WPA', 'WEP', 'No Encryption']}
                    />
                    <InputError message={errors.network_type} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 ml-2">
                    <TextInput
                        id="password"
                        type="text"
                        name="password"
                        className="mt-1 block w-full dark:bg-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Top Secret"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
            </div>

            <input type="hidden" value="wifi" name="type" id="type"/>
            <div className="mb-4"><input type="submit" value="submit"/></div>
        </form>
    );
};

export default QrCodeCreateFormWiFi;
