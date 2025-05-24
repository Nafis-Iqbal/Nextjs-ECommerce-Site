export default function AuthLayout({children} : {children: React.ReactNode}){
    return (
        <section className="border-4 border-gray-700">
            {children}
        </section>
    )
}