"use client";

import { format } from "date-fns";
import { toast } from "sonner";
import EmailItem from "./email-item";
import { Button } from "../ui/button";
import { UnscheduledEmailThread } from "@/types/interface";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface EmailListProps {
  emails: UnscheduledEmailThread[];
}

export function EmailList({ emails }: EmailListProps) {
  const handleApprove = async ({ emailId }: { emailId: string }) => {
    try {
      // console.log("Approved");
      // toast("Scheduled the email", {
      //   description: format(new Date(), "PPpp") + " " + emailId,
      // });

      const url = `${process.env.API_BASE_URL}/schedule`;
      console.log("URL: ", url);
      const payload = { emailId: emailId };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to approve draft. Status code: ${response.status}`);
      }
      const data = await response.json();
      console.log("Approval response:", data);
      emails = emails.filter((email) => email.id !== emailId);
      toast("Email approved successfully!", {
        description: `Email ID: ${emailId}`,
      });
    } catch (error: any) {
      console.error("Error approving email draft:", error.message);
      toast("Failed to approve email", {
        description: `Error: ${error.message}`,
      });
    }
  };


  const handleEdit = async ({
    emailId,
    subject,
    body,
  }: {
    emailId: string;
    subject: string;
    body: string;
  }) => {
    console.log("Approved");
    toast("Edited the email", {
      description: format(new Date(), "PPpp"),
    });
    console.log(emailId, subject, body);
    // PUT request
  };

  const handleDelete = async ({ emailId }: { emailId: string }) => {
    try {
      console.log("Deleting email");
      const url = `${process.env.API_BASE_URL}/emails/${emailId}`;
      console.log("URL: ", url);  // Check if the URL is correct

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete email. Status code: ${response.status}`);
      }

      const data = await response.json();
      console.log("Delete response:", data);

      toast("Deleted the email successfully!", {
        description: format(new Date(), "PPpp"),
      });
    } catch (error: any) {
      console.error("Error deleting email:", error.message);
      toast("Failed to delete email", {
        description: `Error: ${error.message}`,
      });
    }
  };

  const handleApproveAll = async () => {
    try {
      console.log("Approve All");
      toast("Pending emails have been scheduled", {
        description: format(new Date(), "PPpp"),
      });

      const url = `${process.env.API_BASE_URL}/schedule/mass`;
      const payload = { userId: "user-123" };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to approve all drafts. Status code: ${response.status}`);
      }

      const data = await response.json();
      console.log("Approval response for all:", data);

      toast("All emails approved successfully!", {
        description: `Approved emails count: ${data}`,
      });
    } catch (error: any) {
      console.error("Error approving all email drafts:", error.message);
      toast("Failed to approve all emails", {
        description: `Error: ${error.message}`,
      });
    }
  };

  const handleAutopilot = async () => {
    console.log("Autopilot");
    toast("Autopilot");
  };

  return (
    <main className="flex w-full flex-col items-center ">
      <div className="mt-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pending Emails</h1>

        <div className="flex flex-row space-x-4">
          <div className=" flex flex-col space-y-2 ">
            <Switch id="autopilot-mode" disabled={true} />
            <Label htmlFor="autopilot-mode">Autopilot</Label>
          </div>
          {/* <Button onClick={handleAutopilot} className="mx-2">
            Autopilot
          </Button> */}
          <Button onClick={handleApproveAll}>
            Approve and Smart Schedule All
          </Button>
        </div>
      </div>
      <ul className="my-4 w-full space-y-4 ">
        {emails.map((item) => (
          <EmailItem
            handleApprove={handleApprove}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </main>
  );
}
