import Navbar from "@/components/auth/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-900 text-white">

            <AuthProvider>
                {/* Navbar Component */}
                <Navbar />
                {/* Page Content */}
                <main className="p-6">{children}</main>
            </AuthProvider>
        </div>
    );
}
