import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import QrCodeCreate from "@/Pages/QrCode/Create";

export default function Dashboard({ auth }: PageProps) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="lg:py-12">
                <QrCodeCreate />
            </div>

        </AuthenticatedLayout>
    );
}
