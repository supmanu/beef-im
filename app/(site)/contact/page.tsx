import { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

export const metadata: Metadata = {
    title: "Contact Command | ประกันเนื้อๆ",
    description: "Ready to plan your ascent? Reach out to schedule a consultation or verify your current equipment.",
};

export default function Contact() {
    return <ContactContent />;
}
