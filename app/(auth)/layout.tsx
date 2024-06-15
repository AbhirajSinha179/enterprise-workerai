export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <section className=" relative flex h-screen w-screen items-center justify-center ">
      <div className="absolute inset-0 -z-10 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      {children}
    </section>
  )
}