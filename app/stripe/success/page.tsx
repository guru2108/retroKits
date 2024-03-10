import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function stripeSuccess() {
    return (
        <div className="h-screen bg-background">
            <div className="mt-32 md:max-w-[50vw] mx-auto">
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-white font-semibold text-center">
                        Successful
                    </h3>
                    <p className="text-white my-2">
                        Don't worry. This application is on tesing mode. You
                        won't be getting charged.
                    </p>
                    <Link href="/">
                        <button className="bg-primary my-2 p-[10px] items-center">
                            Go back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
