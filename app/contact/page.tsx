import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Current contact information and support limitations for Japan X Trip.",
};

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Contact"
      title="Contact Japan X Trip"
      intro="We are preparing a reliable public contact channel. We do not publish an email address, phone number, physical address, or contact form that is not currently available."
      sections={[
        {
          title: "Current contact availability",
          paragraphs: [
            "Japan X Trip does not currently provide a public email address, telephone number, postal address, or contact form.",
            "A working contact method will be added to this page after it has been created and tested.",
          ],
        },
        {
          title: "Help with a provider purchase",
          paragraphs: [
            "Japan X Trip does not process orders, activate eSIMs, issue SIM cards, deliver pocket Wi-Fi, cancel plans, or approve refunds.",
            "For help with an existing purchase, activation code, QR code, delivery, pickup, return, billing, cancellation, or refund, contact the provider from which the product was purchased using the support method shown in the order confirmation or on the provider’s official website.",
          ],
        },
        {
          title: "Before contacting a provider",
          bullets: [
            "Keep the order number or reservation number available.",
            "Save the purchase email and any QR code or setup instructions.",
            "Record the phone model and operating-system version.",
            "Take a screenshot of any error message.",
            "Do not publicly share a QR code, password, full payment information, passport details, or other sensitive information.",
          ],
        },
        {
          title: "Website feedback",
          paragraphs: [
            "A dedicated channel for corrections, partnership inquiries, and general website feedback is planned but is not yet publicly available.",
            "Until that channel is published here, visitors should rely on the latest official provider information when a price, plan detail, or policy appears to have changed.",
          ],
        },
      ]}
    />
  );
}
