import CardCustom from "@/components/customComponents/customCard"
import { ContentLayout } from "@/components/layout/content-layout"

export default async function outboundSetting() {
  return (
    <>
      <ContentLayout title="Outbound Settings">
        <div className="container mx-auto my-10 flex justify-between">
          <CardCustom title="Users" />
          <CardCustom title="Company data" />
        </div>
        <div className="container mx-auto my-10 flex justify-between  ">
          <div className="bg-background-600 m-4 h-96 w-full overflow-hidden rounded-lg bg-zinc-600 shadow-md transition duration-300 hover:shadow-lg">
            <h2 className="mb-2 p-4 text-xl font-semibold text-zinc-50">Target</h2>
          </div>
        </div>
      </ContentLayout>
    </>
  )
}
