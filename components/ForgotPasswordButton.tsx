'use client';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordButton() {
    const router = useRouter();
    return (
        <button
            className="bg-red-500 rounded-md px-4 py-2 text-foreground mb-2"
            type="button"
            onClick={() => {
                router.push('/forgotpassword');
            }}
        >
            Forgot Password
        </button>
    );
}
