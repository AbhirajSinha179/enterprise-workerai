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
]

export const dummyMailbox = [
  {
    id: "caf0b099-9cc5-472a-b862-077f2c12268b",
    email: "sirish@wizr.dev",
    firstName: "Sirish",
    lastName: null,
    position: "Co Founder",
    company: "",
    userId: "user_2mn1Vmro10Mrr0hUNPJWSwZeV7o",
    warmupCapacity: 36,
    dailyCapacity: 37,
  },
  {
    id: "686549fc-8270-4769-a8d6-f36f95ba94a9",
    email: "rajesh@wizr.app",
    firstName: "Rajesh",
    lastName: null,
    position: "Co Founder",
    company: "",
    userId: "user_2mn1Vmro10Mrr0hUNPJWSwZeV7o",
    warmupCapacity: 36,
    dailyCapacity: 37,
  },
  {
    id: "66167f9a-b56e-4c66-9e42-3cbe26d56ff4",
    email: "rajeshp@wizr.dev",
    firstName: "Rajesh",
    lastName: null,
    position: "Co Founder",
    company: "",
    userId: "user_2mn1Vmro10Mrr0hUNPJWSwZeV7o",
    warmupCapacity: 36,
    dailyCapacity: 37,
  },
  {
    id: "b5f48413-83ef-4a53-8cd2-897303f00502",
    email: "rajesh@wizr.dev",
    firstName: "Rajesh",
    lastName: null,
    position: "Co Founder",
    company: "",
    userId: "user_2mn1Vmro10Mrr0hUNPJWSwZeV7o",
    warmupCapacity: 36,
    dailyCapacity: 37,
  },
  {
    id: "27ce005f-0c13-4d46-9bfd-50e93888c133",
    email: "sirish@wizr.app",
    firstName: "Sirish",
    lastName: null,
    position: "Co Founder",
    company: "",
    userId: "user_2mn1Vmro10Mrr0hUNPJWSwZeV7o",
    warmupCapacity: 36,
    dailyCapacity: 37,
  },
]
