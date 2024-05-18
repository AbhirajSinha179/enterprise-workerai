"use client"
import CardCustom from "@/components/customComponents/customCard"
import SelectDemo from "@/components/customComponents/multipleSelectChip"
import { ContentLayout } from "@/components/layout/content-layout"

export default async function outboundSetting() {
  return (
    <>
      <ContentLayout title="Outbound Settings">
        <div className="container mx-auto my-10 flex justify-between">
          <div className="m-4 h-96 w-1/2 overflow-hidden rounded-lg bg-zinc-600 shadow-md transition duration-300 hover:shadow-lg">
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold text-zinc-50">Users</h2>
            </div>
            <div className=" flex justify-center ">
              <div className="m-4 w-5/6 rounded-md bg-background  ">
                <SelectDemo />
              </div>
            </div>
          </div>
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
