"use client"
import { ContentLayout } from "@/components/layout/content-layout"
import CSVUpload from "@/components/outbound/csvUploader"
import InputWithCommas from "@/components/outbound/input-with-commas"
import OmitLeads from "@/components/outbound/multioptionomitlead"
import MultiSelectCard from "@/components/outbound/multiSelectChip"

const locations = [{ name: "India" }, { name: "USA" }, { name: "Germany" }]

export default function OutboundSetting() {
  return (
    <ContentLayout title="Outbound Settings">
      <div className="grid gap-6">
        <CSVUpload
          key="upload-custom-leads"
          title="Upload Custom Leads (CSV)"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing"
          endpoint="http://localhost:3000/leads"
          verification
          requiredColumns={[
            { name: "email", required: true },
            { name: "imgUrl", required: false },
            { name: "firstName", required: true },
            { name: "lastName", required: true },
            { name: "seniority", required: true },
            { name: "country", required: true },
            { name: "linkedin", required: true },
            { name: "city", required: true },
            { name: "state", required: true },
            { name: "timezone", required: false },
            { name: "Company Name", required: true },
          ]}
        />

        <OmitLeads title={"Omit Leads"} description="Lorem, ipsum dolor sit amet consectetur adipisicing"></OmitLeads>

        <MultiSelectCard
          cardTitle="Location"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
          options={locations}
        />

        <InputWithCommas cardTitle="Job Titles" cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing" />
        <InputWithCommas
          cardTitle="Outbound Keywords"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
        />
        <InputWithCommas
          cardTitle="Blacklisted email domains"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
        />
      </div>
    </ContentLayout>
  )
}
