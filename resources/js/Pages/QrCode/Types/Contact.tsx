import React from 'react';
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
        let nameValid = data.name !== '';
        let mobileRegex = new RegExp('^[0-9\s]+$');
        let mobileValid = data.mobile !== '' && mobileRegex.test(data.mobile);
        let emailValid = data.email == '' || (data.email.includes('@') && data.email.includes('.'));
        let websiteValid = data.website == '' || (data.website.includes('http://') || data.website.includes('https://'));
        let formValid = nameValid && mobileValid && emailValid && websiteValid;
        if (formValid) {
            onSubmit(e);
        }
        else {
            if (!nameValid) {
                errors.name = 'Please enter a name.';
                setData('name', '');
            }
            if (!mobileValid) {
                if (data.mobile == '') {
                    errors.mobile = 'Mobile number cannot be empty.';
                }
                else {
                    errors.mobile = 'Please enter a valid mobile number.';
                }
                setData('mobile', '');
            }
            if (!emailValid) {
                errors.email = 'Please enter a valid email.';
                setData('email', '');
            }
            if (!websiteValid) {
                errors.website = 'Please enter a valid website url.';
                setData('website', '');
            }
        }
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
                    className="mt-1 block w-full peer pt-4"
                    isFocused={true}
                    onChange={(e) => {setData('name', e.target.value); errors.name = '';}}
                    placeholder="john"
                />
                <FloatingInputLabel htmlFor="name" value="Name"/>
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="lg:flex">
                <div className="mb-4 flex-1 lg:mr-2 relative">
                    <TextInput
                        id="mobile"
                        type="text"
                        name="mobile"
                        className="mt-1 block w-full peer pt-4"
                        isFocused={true}
                        onChange={(e) => {setData('mobile', e.target.value); errors.mobile = '';}}
                        placeholder="9157777777"
                    />
                    <FloatingInputLabel htmlFor="mobile" value="Mobile" top="top-0 lg:top-1"/>
                    <InputError message={errors.mobile} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 lg:ml-2 relative">
                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        className="mt-1 block w-full peer pt-4"
                        isFocused={true}
                        onChange={(e) => {setData('email', e.target.value); errors.email = '';}}
                        placeholder="hello@world.com"
                    />
                    <FloatingInputLabel htmlFor="email" value="Email" top="top-0 lg:top-1"/>
                    <InputError message={errors.email} className="mt-2" />
                </div>
            </div>
            <div className="lg:flex">
                <div className="mb-4 flex-1 lg:mr-2 relative">
                    <TextInput
                        id="website"
                        type="text"
                        name="website"
                        className="mt-1 block w-full peer pt-4"
                        isFocused={true}
                        onChange={(e) => {setData('website', e.target.value); errors.website = '';}}
                        placeholder="https://www.johnwick.com"
                    />
                    <FloatingInputLabel htmlFor="website" value="Website" top="top-0 lg:top-1"/>
                    <InputError message={errors.website} className="mt-2" />
                </div>
                <div className="mb-4 flex-1 lg:ml-2 relative">
                    <TextInput
                        id="company"
                        type="text"
                        name="company"
                        className="mt-1 block w-full peer pt-4"
                            isFocused={true}
                        onChange={(e) => {setData('company', e.target.value); errors.company = '';}}
                        placeholder="The Table"
                    />
                    <FloatingInputLabel htmlFor="company" value="Company" top="top-0 lg:top-1"/>
                    <InputError message={errors.company} className="mt-2" />
                </div>
            </div>
            <div className="mb-4">
                <small>Your QR code will add this contact to your device when scanned.</small>
            </div>
            <input type="hidden" value="contact" name="type" id="type"/>
            <div className="mb-4">
                <button type="submit" className="button-primary w-full lg:w-16 p-2 text-center sm:rounded bg-indigo-300 dark:bg-indigo-700"><i className="fa-solid fa-right-to-bracket"></i></button>
            </div>
        </form>
    );
};

export default QrCodeCreateFormEmail;
