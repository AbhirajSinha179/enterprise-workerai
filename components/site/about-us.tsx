export const AboutUsSection = ({ title, description }: { title: string, description: string }) => {
  return (
    <>
      <h1 className="mt-8 text-4xl font-bold md:text-center lg:text-5xl">{title}</h1>
      <p className="max-w-6xl text-lg md:text-center lg:text-xl">
        { description }{" "}
      </p>
    </>
  )
}