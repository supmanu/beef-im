import React from 'react';
import DynastySimulator from './library/DynastySimulator';

export const TOOL_REGISTRY: Record<string, React.ComponentType<any>> = {
    'DYNASTY_SIM': DynastySimulator,
};
