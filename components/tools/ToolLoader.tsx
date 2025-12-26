import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to prevent SSR hydration mismatches for heavy calculation tools
const COICalculator = dynamic(() => import('./library/COICalculator'), { ssr: false });
const DynastySimulator = dynamic(() => import('./library/DynastySimulator'), { ssr: false });
const IRRTruthTeller = dynamic(() => import('./library/IRRTruthTeller'), { ssr: false });
const SovereignPricingEngine = dynamic(() => import('./library/SovereignPricingEngine'), { ssr: false }); // New Sovereign Engine

const TOOL_REGISTRY: Record<string, React.ComponentType<any>> = {
    'COI_CALC': COICalculator,
    'DYNASTY_SIM': DynastySimulator,
    'IRR_TRUTH': IRRTruthTeller,
    'SOVEREIGN_PRICING': SovereignPricingEngine,
};

interface ToolLoaderProps {
    toolName: string;
    [key: string]: any;
}

const ToolLoader: React.FC<ToolLoaderProps> = ({ toolName, ...props }) => {
    const ToolComponent = TOOL_REGISTRY[toolName];

    if (!ToolComponent) {
        return <div className="text-white text-center p-10">Tool not found</div>;
    }

    return <ToolComponent {...props} />;
};

export default ToolLoader;
