import { format } from 'date-fns';
import React from 'react';
import { Separator } from '../ui/separator';
interface MailItemProps {
    mail: {
        name: string;
        subject?: string | null;
        email: string;
        date?: string;
        text: string;
    };
}

const MailItem: React.FC<MailItemProps> = ({ mail }) => {
    return (
        <div className="h-[25vh] overflow-auto">
            <div className="flex p-4">
                <div className="flex items-start gap-4 text-sm">
                    <div className="grid gap-1">
                        <div className="font-semibold">{mail.name}</div>
                        {mail.subject && <div className="line-clamp-1 text-xs">{mail.subject}</div>}
                        <div className="line-clamp-1 text-xs">
                            <span className="font-medium">Reply-To:</span> {mail.email}
                        </div>
                    </div>
                </div>
                {mail.date && (
                    <div className="ml-auto text-xs text-muted-foreground">
                        {format(new Date(mail.date), "PPpp")}
                    </div>
                )}
            </div>
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                {mail.text}
            </div>
            <Separator className="mt-auto" />
        </div>
    );
};

export default MailItem;
