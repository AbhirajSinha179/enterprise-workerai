"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import EmailItem from "./email-item";
import { Button } from "../ui/button";
import { UnscheduledEmailThread } from "@/types/interface";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import EmptyState from "@/components/global/empty-state";
import { ClockIcon } from "lucide-react";
import { unscheduledEmailResponseSchema } from "@/types/interface";
import Loading from "@/app/(site)/loading";

interface EmailListProps {
  targetId: string;
}

function getUserId() {
  return "user_2jQ7lufOqU1WFrEsi2wG3B7zF70";
}

function transformData(data: any): UnscheduledEmailThread[] {
  return data.map((item: any) => ({
    id: item.email.id,
    threadId: item.email.threadId,
    subject: item.email.subject,
    body: item.email.body,
    sender: item.email.recipient,
    createdAt: item.email.createdAt,
    updatedAt: item.email.updatedAt ?? null,
    status: item.lead.EmailAddStatus,
    opened: item.email.opened,
    clicked: item.email.clicked,
    replied: item.email.replied,
    bounced: item.email.bounced,
    leadInfo: {
      id: item.lead.id,
      email: item.lead.email,
      firstName: item.lead.firstName,
      lastName: item.lead.lastName,
      seniority: item.lead.seniority,
    },
    senderId: item.senderId,
  }));
}

export function EmailList({ targetId }: EmailListProps) {
  const [fetchedEmails, setFetchedEmails] = useState<UnscheduledEmailThread[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchUnscheduledEmails = async (targetId: string, limit: number, skip: number): Promise<UnscheduledEmailThread[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/unscheduled/${targetId}?limit=${limit}&skip=${skip}`;
    console.log(url)

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status code: ${res.status}`);
      }

      const data = await res.json();
      const emails = transformData(data);
      const result = unscheduledEmailResponseSchema.safeParse(emails);

      if (!result.success) {
        throw new Error("Invalid data format");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const handleFetchEmails = async (page: number) => {
    const skip = (page - 1) * pageSize;
    setLoading(true);
    setError(null);
    try {
      const emails = await fetchUnscheduledEmails(targetId, pageSize, skip);
      setFetchedEmails(emails);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchEmails(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApprove = async ({ emailId }: { emailId: string }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule`;
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
      setFetchedEmails((emails) => emails.filter((email) => email.id !== emailId));
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

  const handleEdit = async ({ emailId, subject, body }: { emailId: string; subject: string; body: string }) => {
    console.log("Approved");
    toast("Edited the email", {
      description: format(new Date(), "PPpp"),
    });
    console.log(emailId, subject, body);
    // PUT request logic goes here
  };

  const handleDelete = async ({ emailId }: { emailId: string }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/${emailId}`;
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
      setFetchedEmails((emails) => emails.filter((email) => email.id !== emailId));
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

  const handleApproveAll = async (userId: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/mass`;
      const payload = { userId: userId };
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
      setFetchedEmails([]);
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

  if (loading) {
    return <div>
      <Loading></Loading>
    </div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!fetchedEmails.length) {
    return (
      <EmptyState
        headerMessage="No pending Emails"
        containerMessage="Go to Scheduled to check currently scheduled emails"
        icon={<ClockIcon size={80} />}
      />
    );
  }

  return (
    <main className="flex w-full flex-col items-center">
      <div className="mt-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pending Emails</h1>

        <div className="flex flex-row space-x-4">
          <div className="flex flex-row m-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <Switch
                      disabled
                      id="autopilot-mode"
                      className="mx-2"
                      checked={true}
                    />
                    <Label htmlFor="autopilot-mode" className="my-auto">
                      Autopilot
                    </Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>To enable this, please contact us on Slack or Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button onClick={() => handleApproveAll(getUserId())}>
            Approve and Smart Schedule All
          </Button>
        </div>
      </div>
      <ul className="my-4 w-full space-y-4">
        {fetchedEmails.map((item) => (
          <EmailItem
            key={item.id}
            item={item}
            handleApprove={handleApprove}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      <PaginationWithLinks
        page={currentPage}
        pageSize={pageSize}
        totalCount={fetchedEmails.length}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
