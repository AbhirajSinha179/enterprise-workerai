"use client";
import { ContentLayout } from "@/components/layout/content-layout";
import CSVUpload from "@/components/outbound/csvUploader";
import InputWithCommas from "@/components/outbound/input-with-commas";
import MultiSelectCard from "@/components/outbound/multiSelectChip";


const locations = [
  { name: "India" },
  { name: "USA" },
  { name: "Germany" },
];

export default function OutboundSetting() {
  return (
    <ContentLayout title="Outbound Settings">
      <div className="grid gap-6">
        <CSVUpload cardTitle="Upload CSV" cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing" />

        <MultiSelectCard
          cardTitle="Location"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
          options={locations}
        />

        <InputWithCommas
          cardTitle="Job Titles"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
        />
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
  );
}
