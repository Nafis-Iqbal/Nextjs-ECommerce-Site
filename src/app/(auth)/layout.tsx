export default function AuthLayout({children} : {children: React.ReactNode}){
    return (
        <section className="flex flex-col justify-center items-center min-h-screen border-x-4 bg-black">
            {children}
        </section>
    )
}