import MySidebar from "./MySidebar";

export default function MyPageFrame({ children }) {
    return (
        <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
            <MySidebar />

            <main className="min-w-0 flex-1">
                {children}
            </main>
        </div>
    );
}