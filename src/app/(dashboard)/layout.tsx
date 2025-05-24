export default function DashboardLayout({children} : {children: React.ReactNode}){
    return (
        <section className="border-4 border-red-900">
            {children}
        </section>
    )
}