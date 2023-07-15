import {useState, useEffect, FormEventHandler} from 'react';
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";

const QrCodeCreateFormUrl = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        url: '',
    });

    useEffect(() => {

    }, []);

    return (
        <form id="qr-code-form" action="" method="post">
            <div className="mb-4 text-lg">
                <InputLabel htmlFor="url" value="URL" className="text-lg"/>
            </div>
            <div className="mb-4">
                <TextInput
                    id="url"
                    type="text"
                    name="url"
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('url', e.target.value)}
                    placeholder="https://google.com"
                />
                <div className="mt-2">
                    <small>Your QR code will display this link when scanned.</small>
                </div>
                <InputError message={errors.url} className="mt-2" />
            </div>
            <div className="mb-4"><input type="submit" value="submit"/></div>
        </form>
    );
};

export default QrCodeCreateFormUrl;
