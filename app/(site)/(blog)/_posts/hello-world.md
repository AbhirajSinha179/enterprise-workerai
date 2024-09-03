---
title: "How to Set Up SPF, DKIM, DMARC, and MX Records for Email Deliverability"
excerpt: "Email deliverability is crucial for any business relying on outbound email marketing. Ensuring your emails reach the inbox and not the spam folder requires setting up SPF, DKIM, DMARC, and MX records correctly. This guide will walk you through the process step-by-step, ensuring your emails are authenticated and your domain is protected against spoofing and phishing attacks."
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Rohit Raj
  picture: "/assets/blog/authors/tim.jpeg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

Email deliverability is crucial for any business relying on outbound email marketing. Ensuring your emails reach the inbox and not the spam folder requires setting up SPF, DKIM, DMARC, and MX records correctly. This guide will walk you through the process step-by-step, ensuring your emails are authenticated and your domain is protected against spoofing and phishing attacks.

## 1. Understanding the Basics

Before diving into the setup process, it's important to understand what these records are and why they are necessary:

- **SPF (Sender Policy Framework)**: This record allows the domain owner to specify which mail servers are permitted to send emails on behalf of their domain.
- **DKIM (DomainKeys Identified Mail)**: This record adds a digital signature to your emails, verifying that the email was indeed sent by the domain owner and was not altered during transit.
- **DMARC (Domain-based Message Authentication, Reporting, and Conformance)**: This policy helps email receivers determine what to do if an email fails SPF or DKIM checks, providing a way to monitor and protect your domain from email spoofing.
- **MX (Mail Exchange)**: This record specifies the mail servers responsible for receiving emails for your domain.

## 2. Setting Up SPF

### Step 1: Access Your Domain’s DNS Settings

Log in to your domain registrar’s control panel and navigate to the DNS settings section.

### Step 2: Add a New TXT Record

Create a new TXT record with the following details:

- **Name/Host**: @ (or your domain name)
- **Type**: TXT
- **Value**: `v=spf1 include:_spf.google.com ~all`

This example is for domains using Google's mail servers. Adjust the value to include the IP addresses or hostnames of your mail servers.

### Step 3: Save the Record

Save your changes and wait for the DNS to propagate, which can take up to 48 hours.

## 3. Setting Up DKIM

### Step 1: Generate DKIM Keys

Most email service providers (ESPs) will provide a tool to generate DKIM keys. If you’re using Google Workspace, follow these steps:

1. Go to the Google Admin Console.
2. Navigate to Apps > Google Workspace > Gmail > Authenticate Email.
3. Select your domain and click on “Generate New Record.”

### Step 2: Add the DKIM Record to Your DNS

You’ll receive a TXT record that looks something like this:

- **Name/Host**: google._domainkey (this may vary based on your ESP)
- **Type**: TXT
- **Value**: `v=DKIM1; k=rsa; p=MIIBIjANBgkqh...`

### Step 3: Activate DKIM

After adding the DKIM record to your DNS, return to your ESP and activate the DKIM configuration.

## 4. Setting Up DMARC

### Step 1: Create a DMARC Policy

Decide on your DMARC policy. Here’s a basic example:

- **None**: `p=none` (monitoring only)
- **Quarantine**: `p=quarantine` (emails failing SPF or DKIM will be marked as spam)
- **Reject**: `p=reject` (emails failing SPF or DKIM will be rejected)

### Step 2: Add a New TXT Record

Create a TXT record with the following details:

- **Name/Host**: _dmarc (or _dmarc.yourdomain.com)
- **Type**: TXT
- **Value**: `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com; ruf=mailto:dmarc-failures@yourdomain.com; fo=1`

### Step 3: Save the Record

Save your changes and wait for the DNS to propagate.

## Conclusion

Setting up SPF, DKIM and DMARC is essential for ensuring high email deliverability and protecting your domain from email spoofing. By following these steps, you can secure your email communications and enhance your outbound marketing efforts.