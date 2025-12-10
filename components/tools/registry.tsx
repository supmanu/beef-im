import React from 'react';
import DynastySimulator from './library/DynastySimulator';
import COICalculator from './library/COICalculator';

// 🛠️ TOOL REGISTRY
// Maps a Key (found in Article) to a React Component.
export const TOOL_REGISTRY: Record<string, React.ComponentType<any>> = {
    'DYNASTY_SIM': DynastySimulator,
    'COI_CALC': COICalculator,
};
