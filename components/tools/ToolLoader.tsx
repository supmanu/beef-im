import React from 'react';
import { TOOL_REGISTRY } from './registry';

interface ToolLoaderProps {
    toolName: string;
    [key: string]: any; // Allow passing through other props
}

const ToolLoader: React.FC<ToolLoaderProps> = ({ toolName, ...props }) => {
    const ToolComponent = TOOL_REGISTRY[toolName];

    if (!ToolComponent) {
        console.warn(`ToolLoader: Component '${toolName}' not found in registry.`);
        return null;
    }

    return <ToolComponent {...props} />;
};

export default ToolLoader;
