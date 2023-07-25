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
        let ssidValid = data.ssid !== '';
        let authType1 = data.password !== '' && (data.network_type == 'WPA' || data.network_type == 'WEP');
        let authType2 = data.password == '' && data.network_type == 'No Encryption';
        let authTypeValid = authType1 || authType2;
        let formValid = ssidValid && authTypeValid;
        if (formValid) {
            onSubmit(e);
        }
        else {
            if (!ssidValid) {
                errors.ssid = 'Please enter a SSID.';
                setData('ssid', '');
            }
            if (!authTypeValid) {
                setData('password', '');
                if (!authType2 && data.password !== '') {
                    errors.password = 'A password is not allowed for this network type.';
                }
                else if (!authType1 && data.password == '') {
                    errors.password = 'Please enter a password.';
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h6>Wi-Fi</h6>
            </div>
            <div className="lg:flex">
                <div className="mb-4 flex-1 lg:mr-2 relative">
                    <TextInput
                        id="ssid"
                        type="text"
                        name="ssid"
                        className="mt-1 block w-full peer pt-4"
                        isFocused={true}
                        onChange={(e) => {setData('ssid', e.target.value); errors.ssid = '';}}
                        placeholder="My Wi-Fi Network"
                    />
                    <FloatingInputLabel htmlFor="ssid" value="SSID" top="top-0 lg:top-1"/>
                    <InputError message={errors.ssid} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 lg:ml-1 lg:mr-1 relative">
                    <Select
                        id="network_type"
                        name="network_type"
                        className="mt-1 block w-full autofill:bg-gray-800 peer pt-4"
                        onChange={(e) => {setData('network_type', e.target.value); errors.network_type = ''; errors.password = '';}}
                        placeholder="Top Secret"
                        options = {['WPA', 'WEP', 'No Encryption']}
                    />
                    <FloatingInputLabel htmlFor="network_type" value="Type" top="top-0 lg:top-1"/>
                    <InputError message={errors.network_type} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 lg:ml-2 relative">
                    <TextInput
                        id="password"
                        type="text"
                        name="password"
                        className="mt-1 block w-full autofill:dark:bg-gray-800 peer pt-4"
                        isFocused={true}
                        onChange={(e) => {setData('password', e.target.value); errors.password = '';}}
                        placeholder="Top Secret"
                    />
                    <FloatingInputLabel htmlFor="password" value="Password" top="top-0 lg:top-1"/>
                    <InputError message={errors.password} className="mt-2" />
                </div>
            </div>
            <div className="mt-2">
                <small>Your QR code will connect to this network when scanned.</small>
            </div>
            <input type="hidden" value="wifi" name="type" id="type"/>
            <div className="mb-4">
                <button type="submit" className="button-primary w-full lg:w-16 p-2 text-center sm:rounded bg-indigo-300 dark:bg-indigo-700"><i className="fa-solid fa-right-to-bracket"></i></button>
            </div>
        </form>
    );
};

export default QrCodeCreateFormWiFi;
