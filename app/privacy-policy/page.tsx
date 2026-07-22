import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy practices currently applicable to Japan X Trip.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy describes the limited information practices currently applicable to Japan X Trip."
      sections={[
        {
          title: "Information you provide",
          paragraphs: [
            "Japan X Trip does not currently require visitors to create an account, subscribe to an email list, or submit personal information to use the 30-second check or read the website.",
            "The site does not currently provide a public contact form. Visitors should not submit sensitive personal information through any third-party page linked from this website.",
          ],
        },
        {
          title: "The 30-second check",
          paragraphs: [
            "Answers selected in the 30-second check are used to display a more relevant connection recommendation.",
            "The current version may store those answers in the visitor’s own browser using local storage so that the recommendation can remain available during later visits from the same browser.",
            "This browser-stored information is not intended to identify the visitor and can be removed by clearing browser site data.",
          ],
        },
        {
          title: "Hosting and technical data",
          paragraphs: [
            "Like most websites, the hosting and delivery infrastructure may process technical request information needed to serve pages securely and reliably. This can include an IP address, browser type, requested page, date, time, and security-related request data.",
            "Japan X Trip is currently delivered using Cloudflare-related infrastructure. Technical processing performed by service providers is subject to their applicable terms and privacy practices.",
          ],
        },
        {
          title: "Analytics and advertising",
          paragraphs: [
            "Japan X Trip does not currently claim to use Google Analytics, an advertising network, personalized advertising, or a newsletter-tracking service.",
            "If analytics, advertising, consent tools, or other tracking technologies are introduced later, this policy should be updated to describe the relevant services and choices.",
          ],
        },
        {
          title: "Affiliate and external links",
          paragraphs: [
            "The site may link to third-party provider websites and may use affiliate links.",
            "When a visitor follows an external link, the destination website may collect information according to its own privacy policy, cookie policy, and terms. Japan X Trip does not control the privacy practices of independent third-party websites.",
          ],
        },
        {
          title: "Cookies and browser storage",
          paragraphs: [
            "The current site may use browser storage required for the 30-second recommendation experience. Hosting or security providers may also use necessary technologies to deliver and protect the website.",
            "The site does not currently state that it uses marketing cookies or behavioral advertising cookies.",
          ],
        },
        {
          title: "Children’s privacy",
          paragraphs: [
            "Japan X Trip is a general travel-information website and is not specifically directed to children.",
            "The current website does not intentionally request children to submit personal information.",
          ],
        },
        {
          title: "Policy changes",
          paragraphs: [
            "This policy may be updated when the website adds new features, service providers, contact methods, analytics, advertising, forms, or other data-processing activities.",
            "The latest version will be published on this page with an updated date.",
          ],
        },
        {
          title: "Contact regarding privacy",
          paragraphs: [
            "A public contact channel is not currently available. A working contact method will be added to the Contact page when it is ready.",
          ],
        },
      ]}
    />
  );
}
