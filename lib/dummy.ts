import { Reply, ScheduledEmail, Thread } from "@/types/interface"

export const dummyDashboardData = {
  total_clicks: 25,
  total_opens: 153,
  total_replies: 0,
  total_emails: 215,
  total_unique_emails: 212,
  data: [
    {
      date: "2024-10-03 00:00:00",
      opens: 15,
      total_emails: 23,
      total_unique_emails: 23,
    },
    {
      date: "2024-10-04 00:00:00",
      opens: 59,
      total_emails: 97,
      total_unique_emails: 97,
    },
    {
      date: "2024-10-06 00:00:00",
      opens: 49,
      total_emails: 95,
      total_unique_emails: 92,
    },
  ],
}
export const dummyReplies: Reply[] = [
  {
    id: "1",
    date: "2023-09-15T10:45:00Z",
    subject: "Re: Project Proposal",
    body: "Thanks for sharing the proposal. I'll review it and get back to you by the end of the week.",
    from: "John Doe",
  },
  {
    id: "2",
    date: "2023-09-16T08:30:00Z",
    subject: "Re: Meeting Schedule",
    body: "Could we reschedule the meeting to next Tuesday? I have a conflict on the original date.",
    from: "Jane Smith",
  },
  {
    id: "3",
    date: "2023-09-17T14:20:00Z",
    subject: "Re: Invoice #34567",
    body: "The invoice looks good. Payment has been processed.",
    from: "Billing Department",
  },
  {
    id: "4",
    date: "2023-09-18T11:00:00Z",
    subject: "Re: Job Application",
    body: "Your application has been received. We'll contact you if you're shortlisted for an interview.",
    from: "HR Team",
  },
  {
    id: "5",
    date: "2023-09-19T09:15:00Z",
    subject: "Re: Product Feedback",
    body: "Thank you for your feedback on our product. We'll incorporate it in our next update.",
    from: "Support Team",
  },
  {
    id: "6",
    date: "2023-09-20T13:45:00Z",
    subject: "Re: Service Issue",
    body: "We apologize for the inconvenience caused. Our team is looking into the issue.",
    from: "Customer Care",
  },
  {
    id: "7",
    date: "2023-09-21T07:50:00Z",
    subject: "Re: Subscription Renewal",
    body: "Your subscription is about to expire. Please renew it to continue enjoying our services.",
    from: "Subscription Team",
  },
  {
    id: "8",
    date: "2023-09-22T10:10:00Z",
    subject: "Re: Website Update",
    body: "The latest updates have been deployed to the website. Please check and let us know if everything looks good.",
    from: "Web Team",
  },
  {
    id: "9",
    date: "2023-09-23T12:30:00Z",
    subject: "Re: Feature Request",
    body: "Thank you for suggesting a new feature. Our product team will review it for future releases.",
    from: "Development Team",
  },
  {
    id: "10",
    date: "2023-09-24T15:40:00Z",
    subject: "Re: Event Registration",
    body: "Your registration for the event has been confirmed. We look forward to seeing you there.",
    from: "Events Team",
  },
]

export const dummyScheduledEmails: ScheduledEmail[] = [
  {
    email: {
      id: "0f307337-e130-4c11-8dfe-d562cc159aee",
      subject: "Subject: Elevate CSAT by 20%, worth a chat?",
      recipient: "shubam.gupta@pocketfm.com",
      createdAt: "2024-10-08 08:02:11.397",
      sendAt: "2024-10-15 06:07:01+00",
      body: `
Hi Shubam,

Congratulations on PocketFM’s success in transforming storytelling in India! Your team is truly innovative.

I came across your post on LinkedIn and noticed you’re hiring for several roles.

At TopHire, we connect top engineering talent with growing companies like yours. Our candidates are pre-screened and ready to make an impact quickly.

Revolut found their perfect candidates with us in just two weeks, compared to a previous four-month search.

Can I introduce you to some qualified candidates who are ready to work and interview this week, so you can check if they meet your requirements?

Thanks,
Siddharth
Co-founder, TopHire
      `,
      isFollowUp: true,
      approved: true,
      draftId: null,
      messageId: null,
      emailSent: false,
      threadId: "2c0c55cf-02c1-49ae-86d7-713634d8ec07",
      opened: false,
      clicked: false,
      replied: false,
      bounced: null,
    },
    lead: {
      id: "b9e5ad74-27b4-42aa-a5da-867eb738d990",
      email: "shubam.gupta@pocketfm.com",
      imgUrl:
        "https://media.licdn.com/dms/image/v2/D5603AQFE5RX-SjROfg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1705325526381?e=2147483647&v=beta&t=kTYl6tJVP748H3BsnX2i3MRv2yt98uY2LHqdG9I8XG8",
      firstName: "Shubam",
      lastName: "Gupta",
      seniority: null,
      country: "India",
      linkedin: "http://www.linkedin.com/in/shubamgupta24",
      city: "Bengaluru",
      state: "Karnataka",
      EmailAddStatus: "UNVERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "dc28f7c2-ae15-4ecc-9a59-b28ad5b3375e",
      blackListed: null,
      enriched: "COMPLETE",
      enrichedAt: "2024-09-30 13:19:31.904",
    },
    senderId: "27ce005f-0c13-4d46-9bfd-50e93888c133",
    senderEmail: "siddharth@tophire.com",
  },
  {
    email: {
      id: "a74fe0c9-2ff8-4c0f-b477-7c8bd17dbbca",
      subject: "Subject: Elevate CSAT by 20% - Let’s Chat?",
      recipient: "kavyashree@urbancompany.com",
      createdAt: "2024-10-08 08:02:12.556",
      sendAt: "2024-10-15 06:29:40+00",
      body: `
Hi Kavya,

Congratulations on Urban Company’s continued growth! Your role in managing customer satisfaction is impressive.

I noticed your company’s hiring plans and wanted to reach out.

At TopHire, we connect growing companies with top engineering talent quickly. Our pre-screened candidates are ready to hit the ground running and minimize your hiring risks.

We’ve helped companies like Swiggy find their ideal candidates within weeks.

Could I connect you with some qualified candidates who can interview this week and potentially fit your needs?

Thanks,
Siddharth
Co-founder, TopHire
      `,
      isFollowUp: true,
      approved: true,
      draftId: null,
      messageId: null,
      emailSent: false,
      threadId: "7cd00b9d-ad96-4ea7-acec-74da3daef69c",
      opened: false,
      clicked: false,
      replied: false,
      bounced: null,
    },
    lead: {
      id: "46e7cd0c-3d18-48a8-a7de-4284e3853d83",
      email: "kavyashree@urbancompany.com",
      imgUrl: null,
      firstName: "Kavya",
      lastName: "Shree",
      seniority: "Manager",
      country: "India",
      linkedin: "http://www.linkedin.com/in/kavyashree1903",
      city: "",
      state: "Rajasthan",
      EmailAddStatus: "UNVERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "370ab5dd-d080-4081-9e36-a2c463606d85",
      blackListed: null,
      enriched: "PENDINGENR",
      enrichedAt: null,
    },
    senderId: "686549fc-8270-4769-a8d6-f36f95ba94a9",
    senderEmail: "siddharth@tophire.com",
  },
  {
    email: {
      id: "a60ca0c4-aa3d-4d14-9799-0c974648520e",
      subject: "Subject: Let’s Chat About Boosting Your Team’s Productivity",
      recipient: "mitesh.mundra@phonepe.com",
      createdAt: "2024-10-08 08:02:11.38",
      sendAt: "2024-10-15 06:34:14+00",
      body: `
Hi Mitesh,

I came across your work at PhonePe, and it’s inspiring how your team is driving digital payments forward.

I noticed that you’re building out your engineering team, and I wanted to introduce myself.

At TopHire, we help companies like PhonePe hire top-notch engineering talent quickly and efficiently.

We streamline the hiring process with pre-screened candidates, so you can focus on growing your team with minimal risk. We’ve helped companies like Paytm find key candidates in a matter of weeks.

Could I connect you with a few pre-qualified candidates?

Best regards,
Siddharth
Co-founder, TopHire
      `,
      isFollowUp: true,
      approved: true,
      draftId: null,
      messageId: null,
      emailSent: false,
      threadId: "402ee3e5-7413-4f90-af16-c2d86c5846c1",
      opened: false,
      clicked: false,
      replied: false,
      bounced: null,
    },
    lead: {
      id: "9aa0a7d1-02e5-4fea-aed2-08df69510590",
      email: "mitesh.mundra@phonepe.com",
      imgUrl:
        "https://media.licdn.com/dms/image/C5603AQH0oK8w6VQ4qg/profile-displayphoto-shrink_200_200/0/1657642893412?e=2147483647&v=beta&t=JtyR99CUTU-I1dxCgfZQCwsORuSAuI_zR5tLcVuhoD8",
      firstName: "Mitesh",
      lastName: "Mundra",
      seniority: "manager",
      country: "India",
      linkedin: "http://www.linkedin.com/in/miteshmundra7",
      city: "Bengaluru",
      state: "Karnataka",
      EmailAddStatus: "UNVERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "82a31094-b6b8-40f0-a7fd-5133fab4fe1b",
      blackListed: null,
      enriched: "COMPLETE",
      enrichedAt: "2024-09-30 13:19:35.605",
    },
    senderId: "686549fc-8270-4769-a8d6-f36f95ba94a9",
    senderEmail: "siddharth@tophire.com",
  },
  {
    email: {
      id: "9773bc5a-2832-4b52-8a7f-0ba830b0b130",
      subject: "Subject: Elevate CSAT by 20%, worth a chat?",
      recipient: "anubhav.nag@zeptonow.com",
      createdAt: "2024-10-08 08:02:11.887",
      sendAt: "2024-10-15 06:39:38+00",
      body: `
Hi Anubhav,

Congratulations on ZeptoNow’s incredible growth! Your team’s ability to deliver groceries in minutes is remarkable.

I came across your hiring plans on LinkedIn and thought I should introduce myself.

At TopHire, we help high-growth companies like ZeptoNow find top engineering talent quickly. Our pre-screened candidates are ready to make an impact immediately.

We’ve helped companies like Swiggy and Flipkart build their engineering teams in record time.

Could I connect you with a few candidates who are ready to interview this week?

Best regards,
Siddharth
Co-founder, TopHire
      `,
      isFollowUp: true,
      approved: true,
      draftId: null,
      messageId: null,
      emailSent: false,
      threadId: "6912328e-0591-4cc1-a79c-0d5268941cf7",
      opened: false,
      clicked: false,
      replied: false,
      bounced: null,
    },
    lead: {
      id: "f91435d0-bba7-4f6e-ac9b-9965b991f04f",
      email: "anubhav.nag@zeptonow.com",
      imgUrl: null,
      firstName: "Anubhav",
      lastName: "Nag",
      seniority: "Director",
      country: "India",
      linkedin: "http://www.linkedin.com/in/anubhav-nag-5222b110b",
      city: "Mumbai",
      state: "Maharashtra",
      EmailAddStatus: "UNVERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "bbc5e36c-c1a5-4f6e-ac9b-9965b991f04f",
      blackListed: null,
      enriched: "PENDINGENR",
      enrichedAt: null,
    },
    senderId: "686549fc-8270-4769-a8d6-f36f95ba94a9",
    senderEmail: "siddharth@tophire.com",
  },
  {
    email: {
      id: "df4f662f-12d8-4697-a743-d56a1b28c169",
      subject: "Subject: Improve your first response time by 35% – Let’s Chat!",
      recipient: "navneet.rao@phonepe.com",
      createdAt: "2024-10-08 08:02:11.911",
      sendAt: "2024-10-15 06:41:59+00",
      body: `
Hi Navneet,

I’ve been following your team’s work at PhonePe, and I wanted to congratulate you on your impressive leadership.

I noticed you’re expanding your engineering team, and I thought I’d reach out.

At TopHire, we help companies like PhonePe find engineering talent that can hit the ground running, minimizing hiring risks.

We provide pre-screened candidates, ready to make an impact from day one. Companies like Paytm have successfully hired with us in just a matter of weeks.

Can I connect you with a few candidates who might be a great fit?

Thanks,
Siddharth
Co-founder, TopHire
      `,
      isFollowUp: true,
      approved: true,
      draftId: null,
      messageId: null,
      emailSent: false,
      threadId: "663fe142-1829-4718-a7cc-d0abca179eda",
      opened: false,
      clicked: false,
      replied: false,
      bounced: null,
    },
    lead: {
      id: "91021ba9-7ca5-4880-ab20-c5f2d806d112",
      email: "navneet.rao@phonepe.com",
      imgUrl:
        "https://media.licdn.com/dms/image/D4D03AQFAvAW8Cyp6NA/profile-displayphoto-shrink_200_200/0/1668748124083?e=2147483647&v=beta&t=0kTJswDhc7qi8tper4BzpPOJvxBi0fM3ziQEia5y6oQ",
      firstName: "Navneet",
      lastName: "Rao",
      seniority: "head",
      country: "India",
      linkedin: "http://www.linkedin.com/in/raonavneet",
      city: "Pune",
      state: "Maharashtra",
      EmailAddStatus: "UNVERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "82a31094-b6b8-40f0-a7fd-5133fab4fe1b",
      blackListed: null,
      enriched: "COMPLETE",
      enrichedAt: "2024-09-30 13:19:03.973",
    },
    senderId: "686549fc-8270-4769-a8d6-f36f95ba94a9",
    senderEmail: "siddharth@tophire.com",
  },
]

export const dummyThreads: Thread[] = [
  {
    threadId: "thread-1",
    emails: [
      {
        id: "email-1",
        threadId: "thread-1",
        body: `Hi Anubhav,

Congratulations on ZeptoNow’s rapid growth! Your mission to deliver groceries in 10 minutes is incredibly impressive.

I noticed you’re expanding your team and thought I’d reach out.

At TechHire, we specialize in helping fast-growing companies like ZeptoNow connect with top-tier engineering talent quickly.

We streamline the hiring process by providing pre-screened candidates, allowing you to focus on scaling your business. Companies like Ola have hired candidates through us in just a few weeks.

Can I introduce you to some highly qualified candidates who can hit the ground running?

Best regards,  
Raj  
Co-founder, TechHire`,
        subject: "Exciting opportunities for ZeptoNow",
        recipient: "anubhav.nag@zeptonow.com",
        sendAt: "2024-10-10T08:00:00Z",
        createdAt: "2024-10-01T08:30:00Z",
        isFollowUp: false,
        approved: true,
        draftId: null,
        messageId: "msg-1",
        opened: true,
        clicked: false,
        replied: false,
        bounced: null,
        emailSent: true,
      },
    ],
    replies: [
      {
        id: "reply-1",
        date: "2024-10-10T09:00:00Z",
        subject: "Re: Exciting opportunities for ZeptoNow",
        body: `Hi Raj,

Thank you for reaching out! We’re definitely interested in exploring top talent for our growing team.

Let’s discuss further.

Best regards,  
Anubhav`,
        from: "anubhav.nag@zeptonow.com",
      },
    ],
    lead: {
      id: "lead-1",
      email: "anubhav.nag@zeptonow.com",
      imgUrl: "https://example.com/image.jpg",
      firstName: "Anubhav",
      lastName: "Nag",
      seniority: "Director",
      country: "India",
      linkedin: "https://linkedin.com/in/anubhav-nag",
      city: "Mumbai",
      state: "Maharashtra",
      EmailAddStatus: "VERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "zepto-123",
      blackListed: null,
    },
    senderEmail: "raj@techhire.com",
  },
  {
    threadId: "thread-2",
    emails: [
      {
        id: "email-2",
        threadId: "thread-2",
        body: `Hi Scott,

Congratulations on LomaTech’s private beta launch! Your approach to enabling online communities to manage commerce effortlessly is fantastic.

I saw on Wellfound that you’re hiring a Founding Engineer and thought I should reach out.

At TalentBridge, we connect innovative companies like LomaTech with top engineering talent quickly.

We help streamline your hiring by providing pre-screened candidates, reducing the time and effort required to find the perfect match. Companies like Revolut have found the ideal candidates with us in just two weeks, compared to an unsuccessful four-month internal search.

Can I introduce you to some qualified engineers who are ready to start immediately?

Best,  
Alex  
Co-founder, TalentBridge`,
        subject: "Helping you build your team at LomaTech",
        recipient: "scott@loma.tech",
        sendAt: "2024-10-05T08:00:00Z",
        createdAt: "2024-10-02T11:00:00Z",
        isFollowUp: true,
        approved: true,
        draftId: null,
        messageId: "msg-2",
        opened: false,
        clicked: false,
        replied: false,
        bounced: null,
        emailSent: true,
      },
    ],
    replies: [],
    lead: {
      id: "lead-2",
      email: "scott@loma.tech",
      imgUrl: null,
      firstName: "Scott",
      lastName: "Davis",
      seniority: "CEO",
      country: "USA",
      linkedin: "https://linkedin.com/in/scottdavis",
      city: "San Francisco",
      state: "CA",
      EmailAddStatus: "VERIFIED",
      timezone: "America/Los_Angeles",
      companyId: "loma-tech-456",
      blackListed: null,
    },
    senderEmail: "alex@talentbridge.com",
  },
  {
    threadId: "thread-3",
    emails: [
      {
        id: "email-3",
        threadId: "thread-3",
        body: `Hi Priya,

Congratulations on InnoTech’s recent product launch! Your innovative approach to simplifying cloud management is truly impressive.

I saw that you’re hiring a Senior Backend Engineer and thought I should introduce you to some talent we have at FastHire.

At FastHire, we connect companies like InnoTech with highly qualified engineering talent quickly.

We provide pre-screened candidates, so you can focus on finding the right fit for your team. Companies like PayPal have successfully filled critical roles with us within just a few weeks.

Would it be helpful if I shared some profiles of engineers who are ready to interview immediately?

Best regards,  
Emily  
Founder, FastHire`,
        subject: "Top candidates for InnoTech's team",
        recipient: "priya@innotech.com",
        sendAt: "2024-10-05T08:00:00Z",
        createdAt: "2024-10-02T11:00:00Z",
        isFollowUp: true,
        approved: true,
        draftId: null,
        messageId: "msg-3",
        opened: false,
        clicked: false,
        replied: false,
        bounced: null,
        emailSent: true,
      },
    ],
    replies: [],
    lead: {
      id: "lead-3",
      email: "priya@innotech.com",
      imgUrl: null,
      firstName: "Priya",
      lastName: "Kumar",
      seniority: "CTO",
      country: "India",
      linkedin: "https://linkedin.com/in/priyakumar",
      city: "Bangalore",
      state: "Karnataka",
      EmailAddStatus: "VERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "innotech-789",
      blackListed: null,
    },
    senderEmail: "emily@fasthire.com",
  },
  {
    threadId: "thread-4",
    emails: [
      {
        id: "email-4",
        threadId: "thread-4",
        body: `Hi Rahul,

Congrats on ZipNet’s Series A funding! Your vision for revolutionizing logistics with AI is truly inspiring.

I noticed on Wellfound that you’re looking for a Lead Data Scientist, and I thought I’d reach out.

At TalentHub, we specialize in helping fast-growing companies like ZipNet connect with top-tier data scientists quickly.

We streamline the process by offering pre-screened candidates who can start immediately, minimizing your hiring time. Companies like Razorpay have found their ideal talent through us in a matter of weeks.

Can I introduce you to a few qualified candidates who could be a great fit?

Best regards,  
Daniel  
CEO, TalentHub`,
        subject: "Finding the best talent for ZipNet",
        recipient: "rahul@zipnet.com",
        sendAt: "2024-10-05T08:00:00Z",
        createdAt: "2024-10-02T11:00:00Z",
        isFollowUp: true,
        approved: true,
        draftId: null,
        messageId: "msg-4",
        opened: false,
        clicked: false,
        replied: false,
        bounced: null,
        emailSent: true,
      },
    ],
    replies: [],
    lead: {
      id: "lead-4",
      email: "rahul@zipnet.com",
      imgUrl: null,
      firstName: "Rahul",
      lastName: "Sharma",
      seniority: "Head of Engineering",
      country: "India",
      linkedin: "https://linkedin.com/in/rahulsharma",
      city: "Delhi",
      state: "Delhi",
      EmailAddStatus: "VERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "zipnet-123",
      blackListed: null,
    },
    senderEmail: "daniel@talenthub.com",
  },
  {
    threadId: "thread-5",
    emails: [
      {
        id: "email-5",
        threadId: "thread-5",
        body: `Hi Neha,

Congrats on AeroLabs’ recent partnership! Your team’s work in the AI space is truly groundbreaking.

I saw that you’re hiring a Machine Learning Engineer and thought I should reach out.

At QuickHire, we specialize in connecting companies with top-tier engineering talent quickly and efficiently.

We provide pre-screened candidates, so you can focus on making the right hire without unnecessary delays. Companies like Freshworks have filled critical roles with us in a fraction of the usual time.

Can I introduce you to some highly qualified candidates who are ready to interview this week?

Best regards,  
Samantha  
Co-founder, QuickHire`,
        subject: "Let’s help you hire the best for AeroLabs",
        recipient: "neha@aerolabs.com",
        sendAt: "2024-10-05T08:00:00Z",
        createdAt: "2024-10-02T11:00:00Z",
        isFollowUp: true,
        approved: true,
        draftId: null,
        messageId: "msg-5",
        opened: false,
        clicked: false,
        replied: false,
        bounced: null,
        emailSent: true,
      },
    ],
    replies: [],
    lead: {
      id: "lead-5",
      email: "neha@aerolabs.com",
      imgUrl: null,
      firstName: "Neha",
      lastName: "Singh",
      seniority: "Director",
      country: "India",
      linkedin: "https://linkedin.com/in/nehasingh",
      city: "Hyderabad",
      state: "Telangana",
      EmailAddStatus: "VERIFIED",
      timezone: "Asia/Kolkata",
      companyId: "aerolabs-321",
      blackListed: null,
    },
    senderEmail: "samantha@quickhire.com",
  },
]

export const dummyLeads = [
  {
    id: "a1ff5235-030c-4eaa-a8d0-b869dbd84ed5",
    name: "Aman",
    email: "aman.patel@cuemath.com",
    company: "Cuemath",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "8a6a58fe-0892-41f8-a5e6-7ca1b7cc82a3",
    name: "Aditi",
    email: "aditi.bansal@housing.com",
    company: "Housing.com",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "1be4d683-c819-4666-a54c-e4a4171d577f",
    name: "Vidhi",
    email: "vidhi.gandhi@fi.money",
    company: "Fi",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "91fa4039-037f-476b-b605-4496579c9105",
    name: "Shashank",
    email: "shashank.priyadarshi@fabhotels.com",
    company: "FabHotels",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "2a4e4978-c7c9-4b4f-8c0f-9850f4a1c632",
    name: "Swanand",
    email: "swanand.pisat@bookmyshow.com",
    company: "BookMyShow",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "6c2bcbce-056a-4b60-81bb-0d92e16cb9f1",
    name: "Chandra",
    email: "chandrashekhar@xoxoday.com",
    company: "Giftxoxo Dot Com",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "230c23dc-f0b1-41db-bacb-c010a8c130f1",
    name: "Lakshita",
    email: "lakshita.s@caratlane.com",
    company: "CaratLane",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "78a18eda-bd31-4abc-83ae-d8ae46c4ca6d",
    name: "Nikhil",
    email: "nikhil.agrawal@shiprocket.com",
    company: "Shiprocket",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "c9a81c03-9ac6-4c97-9cf6-88265fa60828",
    name: "Sumit",
    email: "sumit.sharma1@classplusapp.com",
    company: "Classplus",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "085bdd7f-6c70-4b03-9ad8-06a35da481c5",
    name: "Garvit",
    email: "garvit.joshi@byjus.com",
    company: "BYJU'S",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "51d53b3a-179b-41fe-9034-4e7760c2641d",
    name: "Abhash",
    email: "abhash.pathak@godigit.com",
    company: "Digit Insurance",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "c14231ba-0d2d-4eea-8466-6ef8de90eb89",
    name: "Pranay",
    email: "pranay.kohli@cars24.com",
    company: "CARS24",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "0a435f30-f5ef-4b01-b60e-02cccc00b2fc",
    name: "Percial",
    email: "percial@pocketfm.com",
    company: "Pocket FM",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "2812253f-07e3-4674-a9df-d8c0067b9887",
    name: "Rishab",
    email: "rishab.bhura@phonepe.com",
    company: "PhonePe",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "ee86e643-7faf-4348-84c3-e8caa51e8eaa",
    name: "Archana",
    email: "archana@sharechat.co",
    company: "ShareChat",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "791d62f6-6a42-494b-adf5-78b61aa1dd7b",
    name: "Sudip",
    email: "sudip.pandit@porter.in",
    company: "Porter",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "b0e8f894-676d-4290-8f18-e84b1ae0d834",
    name: "Parth",
    email: "parth.verma@unacademy.com",
    company: "Unacademy",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "ae631fde-095e-4e5e-9ae2-2cb5fb9f4b72",
    name: "Pooja",
    email: "pooja.kumari@olacabs.com",
    company: "Ola Cabs",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "c6f7fb75-6721-44ff-b34e-3c46c7d3c02c",
    name: "Vishal",
    email: "vishal.jain@swiggy.com",
    company: "Swiggy",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "ab823a72-9e27-4ba0-b60d-58c26493f9db",
    name: "Mansi",
    email: "mansi.sharma@zomato.com",
    company: "Zomato",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "4d8a4b22-c0f4-46a7-8bb1-9a1726a1b13f",
    name: "Rahul",
    email: "rahul.jain@paytm.com",
    company: "Paytm",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "57f0e167-b3fd-4376-a990-69db507f48e1",
    name: "Siddharth",
    email: "siddharth.malik@flipkart.com",
    company: "Flipkart",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "9fe7b2de-343b-44af-9ed4-d5a1c5d5fe2a",
    name: "Kriti",
    email: "kriti.sharma@nykaa.com",
    company: "Nykaa",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "b1cb9de6-23ab-4b73-a260-456b2907b84c",
    name: "Abhinav",
    email: "abhinav.kumar@razorpay.com",
    company: "Razorpay",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "a3cbabf2-eebf-49ad-899a-d0a2ff7d8a8d",
    name: "Sonia",
    email: "sonia.malhotra@delhivery.com",
    company: "Delhivery",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "c4fe0f5b-7c23-45f9-808d-2fbef3246069",
    name: "Rajat",
    email: "rajat.gupta@tata.com",
    company: "Tata Group",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "643e4825-6a3d-497e-bbae-e7d2769c9054",
    name: "Prachi",
    email: "prachi.shah@bajajfinserv.com",
    company: "Bajaj Finserv",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "5218b21a-9a72-4fd6-84f1-962b7c9c5464",
    name: "Karan",
    email: "karan.khanna@dunzo.com",
    company: "Dunzo",
    status: "doneFirst",
    engaged: "no",
  },
  {
    id: "8fb416d0-1c18-49ad-b3b7-92b9b7c26459",
    name: "Shruti",
    email: "shruti.mittal@reliance.com",
    company: "Reliance",
    status: "doneFirst",
    engaged: "no",
  },
]

export const dummyMailbox = [
  {
    id: "caf0b099-9cc5-472a-b862-077f2c12268b",
    email: "sirish@wizr.dev",
    firstName: "Sirish",
    lastName: null,
    position: "Co Founder",
    company: "Wizr",
    userId: "user_2mn1Vmro10Mrr0hUNPJWSwZeV7o",
    warmupCapacity: 36,
    dailyCapacity: 37,
  },
  {
    id: "f9b6474b-8f29-465b-b718-d227bb698efe",
    email: "ravi@tophire.io",
    firstName: "Ravi",
    lastName: null,
    position: "CEO",
    company: "TopHire",
    userId: "user_3mn2Omko20Nss2hTYPJFSzXeV8p",
    warmupCapacity: 50,
    dailyCapacity: 100,
  },
  {
    id: "ac3f2d94-7b77-4ae8-b12f-1a23c92cabb3",
    email: "anjali@techbridge.com",
    firstName: "Anjali",
    lastName: "Kumar",
    position: "Marketing Manager",
    company: "TechBridge",
    userId: "user_9qo7Klps12Qs7tZYRDJFSfXeZ4x",
    warmupCapacity: 45,
    dailyCapacity: 80,
  },
  {
    id: "882b29c4-1cb8-4d97-8e1e-9cf389c032b1",
    email: "vikas@swiggy.com",
    firstName: "Vikas",
    lastName: null,
    position: "Operations Head",
    company: "Swiggy",
    userId: "user_2bn1Nmrp40Zss0fRPWJRSzTfV9y",
    warmupCapacity: 50,
    dailyCapacity: 75,
  },
  {
    id: "29fa2b1c-79c7-4bb5-85d8-8b135b9e9785",
    email: "mahesh@bookmyshow.com",
    firstName: "Mahesh",
    lastName: null,
    position: "Sales Head",
    company: "BookMyShow",
    userId: "user_5tu2Pmro20Nqq2rVYPJSSwYeX3z",
    warmupCapacity: 30,
    dailyCapacity: 65,
  },
  {
    id: "d6e7c74c-6844-4230-8f74-7d7fb328cf16",
    email: "divya@freshdesk.com",
    firstName: "Divya",
    lastName: "Sharma",
    position: "Customer Success Manager",
    company: "Freshdesk",
    userId: "user_4lm1Plkr40Nqq1eUYPVJSxYeX7p",
    warmupCapacity: 25,
    dailyCapacity: 50,
  },
  {
    id: "acf8b81b-32bc-42ef-a88d-930ea3b0d087",
    email: "neha@olacabs.com",
    firstName: "Neha",
    lastName: null,
    position: "HR Manager",
    company: "Ola",
    userId: "user_7op1Wmrr20Zvv0uTYPRSSfXeP4w",
    warmupCapacity: 40,
    dailyCapacity: 70,
  },
  {
    id: "39c6f24f-9736-4ecb-b54a-39b3aabfdfed",
    email: "rohit@razorpay.com",
    firstName: "Rohit",
    lastName: "Singh",
    position: "Lead Engineer",
    company: "Razorpay",
    userId: "user_6pq9Blno11Rs9uWVYPKSqTtXe9q",
    warmupCapacity: 55,
    dailyCapacity: 100,
  },
  {
    id: "b347345d-6a3d-4f7f-9e91-44ab3f7bfe02",
    email: "megha@byjus.com",
    firstName: "Megha",
    lastName: null,
    position: "Business Development",
    company: "BYJU'S",
    userId: "user_2lm1Xmpl30Svv5fUYPKSxYeV2k",
    warmupCapacity: 60,
    dailyCapacity: 90,
  },
  {
    id: "9ac53234-89ab-4d32-a756-fbdfde8dfc3c",
    email: "mukesh@phonepe.com",
    firstName: "Mukesh",
    lastName: "Agarwal",
    position: "Product Manager",
    company: "PhonePe",
    userId: "user_3op9Bnnr21Rsz2xVYPSSsXeZ5p",
    warmupCapacity: 45,
    dailyCapacity: 85,
  },
  {
    id: "cae913b7-5b74-45a8-9b89-bf3e7c4d0d76",
    email: "sumit@nykaa.com",
    firstName: "Sumit",
    lastName: "Mehta",
    position: "Marketing Head",
    company: "Nykaa",
    userId: "user_9ro1Emnl12Vrr1yTZPWSfXeX7x",
    warmupCapacity: 50,
    dailyCapacity: 95,
  },
  {
    id: "4e68c3b6-927f-4e45-9d18-f65497c5e7c4",
    email: "isha@swiggy.com",
    firstName: "Isha",
    lastName: null,
    position: "Operations Head",
    company: "Swiggy",
    userId: "user_5qu1Bmlp20Rvv5hUYPRSSzZeV1k",
    warmupCapacity: 55,
    dailyCapacity: 90,
  },
  {
    id: "fd8b0375-7128-4e7e-906a-7817d3d3b6f2",
    email: "gopal@zomato.com",
    firstName: "Gopal",
    lastName: null,
    position: "Sales Head",
    company: "Zomato",
    userId: "user_8on1Xmnl30Vvv9fUYPLSxXeT3o",
    warmupCapacity: 60,
    dailyCapacity: 110,
  },
  {
    id: "83b5ab4d-6b98-44ef-9075-2c7dd3b024ac",
    email: "manoj@paytm.com",
    firstName: "Manoj",
    lastName: null,
    position: "Chief Marketing Officer",
    company: "Paytm",
    userId: "user_7rp1Wnpl22Ssz3hVYPLSxZeZ1n",
    warmupCapacity: 65,
    dailyCapacity: 120,
  },
  {
    id: "38d85d9d-8db3-442e-bc9e-71f4a0e4f599",
    email: "tanya@flipkart.com",
    firstName: "Tanya",
    lastName: null,
    position: "Lead Developer",
    company: "Flipkart",
    userId: "user_3on9Bklp22Vzz8yVYPPSrXeZ6x",
    warmupCapacity: 30,
    dailyCapacity: 65,
  },
  {
    id: "5e543cc6-8d6f-4c54-baa6-48e7651de72c",
    email: "shivani@tata.com",
    firstName: "Shivani",
    lastName: "Patel",
    position: "Operations Manager",
    company: "Tata Group",
    userId: "user_6op9Cmlp33Vvv5iUYPLSxXeV5y",
    warmupCapacity: 40,
    dailyCapacity: 70,
  },
  {
    id: "aa4c1c9e-7d4d-4c58-80e9-c2c7d7a8e2f3",
    email: "varun@wipro.com",
    firstName: "Varun",
    lastName: null,
    position: "Project Lead",
    company: "Wipro",
    userId: "user_1lo2Wkrn32Rss3hVYPJSsZeX8z",
    warmupCapacity: 50,
    dailyCapacity: 80,
  },
  {
    id: "a229c5b7-8f3a-439d-96de-ff948f331c6e",
    email: "anurag@zoomcar.com",
    firstName: "Anurag",
    lastName: null,
    position: "CTO",
    company: "Zoomcar",
    userId: "user_4ro2Zmln23Svv4xUYPRSsYeV7z",
    warmupCapacity: 70,
    dailyCapacity: 120,
  },
  {
    id: "cd4a31ae-9142-4aeb-92b5-ffdfbb6b0f11",
    email: "priya@paytm.com",
    firstName: "Priya",
    lastName: "Shah",
    position: "HR Head",
    company: "Paytm",
    userId: "user_7op2Ckls24Szz6hTYPRSxZeT8v",
    warmupCapacity: 55,
    dailyCapacity: 85,
  },
  {
    id: "b54a2fbd-6bcb-4d55-a793-594ae512fdb1",
    email: "ritesh@flipkart.com",
    firstName: "Ritesh",
    lastName: "Verma",
    position: "Product Manager",
    company: "Flipkart",
    userId: "user_8np1Gmps25Vvv9hTYPLSxXeV9y",
    warmupCapacity: 60,
    dailyCapacity: 100,
  },
  {
    id: "e5c54679-713f-44b6-8332-44c3cb4534bb",
    email: "deepak@infosys.com",
    firstName: "Deepak",
    lastName: "Mishra",
    position: "Lead Developer",
    company: "Infosys",
    userId: "user_3lm2Fmnk23Sss5xUYPVSsXeT3p",
    warmupCapacity: 50,
    dailyCapacity: 90,
  },
  {
    id: "b3f342d7-527d-42f2-89fb-6834853d3426",
    email: "akash@urbancompany.com",
    firstName: "Akash",
    lastName: null,
    position: "Operations Manager",
    company: "Urban Company",
    userId: "user_6qn1Dmlr34Svv7fVYPSSrXeX1v",
    warmupCapacity: 40,
    dailyCapacity: 75,
  },
]

export const dummyRepliesInbox: any[] = [
  {
    threadId: "abcd1234-ef56-7890-ab12-cdef34567890",
    emails: [
      {
        id: "1234abcd-5678-ef90-ab12-cdef45678901",
        subject: "Subject: Let’s Discuss Seamless User Authentication, Alex!",
        recipient: "alex.williams@nextwave.com",
        createdAt: "2024-11-24 10:45:00",
        sendAt: "2024-11-24 10:46:00+00",
        body: "Hi Alex,\n\nI hope you’re doing well! I’ve been following the incredible work at NextWave, especially your innovations in the digital media space. Your leadership in product design is truly inspiring.\n\nAt SwiftLogin, we help companies reduce user drop-offs and improve security with a seamless network-based authentication solution. It’s easy to integrate—just 1-2 days—and has helped companies like Streamify improve user retention by 35%.\n\nWould you be open to a quick 15-minute call to discuss how we can support NextWave?\n\nLooking forward to your reply!\n\nBest regards,\nEmily Martin\nCo-Founder, SwiftLogin",
        isFollowUp: false,
        approved: true,
        draftId: "r-123456789abcdef",
        messageId: "1234abcd5678ef90",
        emailSent: true,
        threadId: "abcd1234-ef56-7890-ab12-cdef34567890",
        opened: true,
        clicked: false,
        replied: true,
        bounced: null,
      },
      {
        id: "5678abcd-90ef-1234-ab56-cdef78901234",
        subject: "Subject: Re: Let’s Discuss Seamless User Authentication, Alex!",
        recipient: "emily.martin@swiftlogin.com",
        createdAt: "2024-11-24 15:00:00",
        sendAt: "2024-11-24 15:00:00+00",
        body: "Hi Emily,\n\nThank you for reaching out and for the kind words! Your solution sounds really interesting, and I’d love to explore how SwiftLogin can benefit NextWave.\n\nHow about scheduling a quick call on Thursday at 3 PM? Let me know if that works for you.\n\nBest regards,\nAlex Williams\nHead of Product, NextWave",
        isFollowUp: false,
        approved: true,
        draftId: null,
        messageId: "5678abcd1234ef90",
        emailSent: false,
        threadId: "abcd1234-ef56-7890-ab12-cdef34567890",
        opened: true,
        clicked: false,
        replied: true,
        bounced: null,
      },
      {
        id: "7890abcd-ef12-3456-ab78-cdef90123456",
        subject: "Subject: Re: Let’s Discuss Seamless User Authentication, Alex!",
        recipient: "alex.williams@nextwave.com",
        createdAt: "2024-11-24 16:30:00",
        sendAt: "2024-11-24 16:31:00+00",
        body: "Hi Alex,\n\nThanks for getting back to me! Thursday at 3 PM works perfectly. I’ve sent you a calendar invite with the details. Looking forward to our chat!\n\nBest regards,\nEmily Martin\nCo-Founder, SwiftLogin",
        isFollowUp: true,
        approved: true,
        draftId: "r-abcdef1234567890",
        messageId: "7890abcd1234ef90",
        emailSent: true,
        threadId: "abcd1234-ef56-7890-ab12-cdef34567890",
        opened: false,
        clicked: false,
        replied: false,
        bounced: null,
      },
    ],
    replies: [
      {
        date: "2024-11-24 15:00:00",
        id: "5678abcd-90ef-1234-ab56-cdef78901234",
        body: "Hi Emily,\n\nThank you for reaching out and for the kind words! Your solution sounds really interesting, and I’d love to explore how SwiftLogin can benefit NextWave.\n\nHow about scheduling a quick call on Thursday at 3 PM? Let me know if that works for you.\n\nBest regards,\nAlex Williams\nHead of Product, NextWave",
        from: "alex.williams@nextwave.com",
      },
    ],
    lead: {
      id: "abcdef12-3456-7890-ab12-cdef34567890",
      email: "alex.williams@nextwave.com",
      imgUrl:
        "https://media.licdn.com/dms/image/C5603AQEUp4RHQThdMA/profile-displayphoto-shrink_200_200/0/1601234567890?e=2147483647&v=beta&t=ty1ewXt9ZkXq5lZkqWFqHT1hTnlqqvZkX3",
      firstName: "Alex",
      lastName: "Williams",
      seniority: "Head of Product",
      country: "United States",
      linkedin: "http://www.linkedin.com/in/alex-williams-123456789",
      city: "New York",
      state: "New York",
      EmailAddStatus: "VERIFIED",
      timezone: "America/New_York",
      companyId: "1234abcd-5678-ef90-ab12-cdef34567890",
      blackListed: null,
      enriched: "COMPLETE",
      enrichedAt: "2024-11-23 14:20:00",
    },
  },
]
