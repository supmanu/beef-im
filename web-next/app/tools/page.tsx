import { Metadata } from 'next';
import ToolsPageContent from '@/components/ToolsPageContent';

export const metadata: Metadata = {
    title: "Nerd's Laboratory | เครื่องมือคำนวณประกันชีวิต",
    description: "คลังเครื่องมือคำนวณทางคณิตศาสตร์ประกันภัย: Unit-Linked COI Calculator และ Dynasty Simulator",
};

export default function ToolsPage() {
    return <ToolsPageContent />;
}
