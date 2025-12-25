import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useData } from '@/services/dataService';
import { useLanguage } from '@/services/languageService';
import { filterPolicies, getUniqueSegments } from '@/utils/csvUtils';
import { logEvent } from '@/services/analyticsService';
import { User, Save, Trash2, History, Plus, X, Pencil, Undo2, TrendingUp, Eye, EyeOff, Info } from 'lucide-react';
const Calculator = () => {
    const { mainPolicies, riders: rawRiderData } = useData();
    const { t, language } = useLanguage();
    const [applicantName, setApplicantName] = useState('');
    const [age, setAge] = useState(30);
    const [gender, setGender] = useState('male');
    const [sumAssured, setSumAssured] = useState(100000);
    const [selectedSegment, setSelectedSegment] = useState('');
    const [savedCalculations, setSavedCalculations] = useState([]);
    const [editingId, setEditingId] = useState(null);
    // Rider States
    const [selectedRiders, setSelectedRiders] = useState([]);
    const [riderToAdd, setRiderToAdd] = useState('');
    // Chart Interaction State
    const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
    const [chartTab, setChartTab] = useState('premium');
    const [showRiderDetails, setShowRiderDetails] = useState(false);
    const chartContainerRef = useRef(null);
    // Load saved calculations
    useEffect(() => {
        const saved = localStorage.getItem('aia_saved_calcs');
        if (saved) {
            try {
                setSavedCalculations(JSON.parse(saved));
            }
            catch (e) {
                console.error('Failed to parse saved calculations');
            }
        }
    }, []);
    // --- Patch Rider Data to Force Adjustable Plans ---
    const riderData = useMemo(() => {
        // Determine adjustable plans based on specific keywords
        // These plans will have numbers stripped from their names in the UI, 
        // and we force a benefit base (denominator) for them.
        const adjustableKeywords = [
            'care for cancer', 'cfc',
            'cip',
            'citopup', 'cit',
            'ahc', 'cr 100,000', 'cr 100000',
            'mpci',
            'tpd',
            'อุบัติเหตุ', 'accident', 'ai/rcc', 'adb/rcc'
        ];
        return rawRiderData.map(r => {
            // If benefit is already set > 0, trust the source data
            if (r.benefit && r.benefit > 0)
                return r;
            const nameLower = r.segment.toLowerCase();
            const codeLower = r.segcode.toLowerCase();
            // 1. HB / HBX -> Base 1,000
            if (nameLower === 'hb' || nameLower === 'hbx' || codeLower === 'hb' || codeLower === 'hbx') {
                return { ...r, benefit: 1000 };
            }
            // 2. HH -> Base based on name (e.g. HH 1,000,000 -> 1,000,000)
            // This makes HH adjustable with 10k steps
            if (nameLower.startsWith('hh')) {
                // Extract the first number sequence found in name
                const match = r.segment.replace(/,/g, '').match(/(\d+)/);
                if (match) {
                    const val = parseInt(match[1]);
                    if (val > 0)
                        return { ...r, benefit: val };
                }
            }
            // 3. Adjustable Group -> Base 100,000
            if (adjustableKeywords.some(k => nameLower.includes(k) || codeLower.includes(k))) {
                return { ...r, benefit: 100000 };
            }
            return r;
        });
    }, [rawRiderData]);
    // --- Optimization: Pre-index Rider Data ---
    const riderLookup = useMemo(() => {
        const map = new Map();
        riderData.forEach(r => {
            const key = `${r.segment}|${r.segcode}|${r.age}|${r.gender}`;
            map.set(key, r);
        });
        return map;
    }, [riderData]);
    // --- Constraints Logic (CI ProCare & Pay Life Plus & Pay Life Non Par) ---
    const isCIProCare = useMemo(() => {
        return selectedSegment && (selectedSegment.toLowerCase().includes('ci procare') ||
            selectedSegment.toLowerCase().includes('ciprocare'));
    }, [selectedSegment]);
    const isCISuperCare = useMemo(() => {
        return selectedSegment && (selectedSegment.toLowerCase().includes('ci supercare') ||
            selectedSegment.toLowerCase().includes('cisupercare'));
    }, [selectedSegment]);
    const isPayLifePlus = useMemo(() => {
        return selectedSegment && (selectedSegment.toLowerCase().includes('pay life plus'));
    }, [selectedSegment]);
    const isPayLifeNonPar = useMemo(() => {
        if (!selectedSegment)
            return false;
        const s = selectedSegment.toLowerCase();
        // 10, 15, 20 Pay Life (Non Par) - usually distinct from "Plus"
        return s.includes('pay life') && s.includes('non par') && !s.includes('plus');
    }, [selectedSegment]);
    const isEndowment15_25 = useMemo(() => {
        return selectedSegment && (selectedSegment.toLowerCase().includes('endowment 15/25') ||
            selectedSegment.toLowerCase().includes('15/25'));
    }, [selectedSegment]);
    const isExcellent = useMemo(() => {
        return selectedSegment && selectedSegment.toLowerCase().includes('excellent');
    }, [selectedSegment]);
    const isAnnuitySure = useMemo(() => {
        return selectedSegment && selectedSegment.toLowerCase().includes('annuity sure');
    }, [selectedSegment]);
    const isAnnuityFix = useMemo(() => {
        return selectedSegment && selectedSegment.toLowerCase().includes('annuity fix');
    }, [selectedSegment]);
    // General check for any annuity to apply the "pay up to 59" rule
    const isAnnuity = useMemo(() => {
        return selectedSegment && selectedSegment.toLowerCase().includes('annuity');
    }, [selectedSegment]);
    const hasBenefit = isAnnuitySure || isAnnuityFix || isEndowment15_25;
    const showBenefitGraph = isAnnuitySure || isAnnuityFix;
    // Determine Min Sum Assured based on Plan Type
    const minSumAssured = useMemo(() => {
        if (isCIProCare)
            return 200000;
        if (isCISuperCare)
            return 200000;
        if (isPayLifePlus)
            return 150000;
        if (isPayLifeNonPar)
            return 100000;
        if (isEndowment15_25 || isExcellent)
            return 100000;
        return 1000;
    }, [isCIProCare, isCISuperCare, isPayLifePlus, isPayLifeNonPar, isEndowment15_25, isExcellent]);
    const stepSumAssured = isCIProCare ? 10000 : 1000;
    // Enforce constraints when switching policies
    useEffect(() => {
        if (isCIProCare) {
            setSumAssured(prev => {
                let newVal = Math.max(prev, 200000);
                if (newVal % 10000 !== 0) {
                    newVal = Math.ceil(newVal / 10000) * 10000;
                }
                return newVal;
            });
        }
        else if (isCISuperCare) {
            // Default to 200,000 when selected
            setSumAssured(200000);
        }
        else if (isPayLifePlus) {
            // Enforce 150k Min for Pay Life Plus
            setSumAssured(prev => Math.max(prev, 150000));
        }
        else if (isPayLifeNonPar) {
            // Enforce 100k Default for Pay Life Non Par when selected
            setSumAssured(100000);
        }
        else if (isEndowment15_25) {
            // Default to 100,000 when selected
            setSumAssured(100000);
        }
        else if (isExcellent) {
            // Default to 100,000 when selected
            setSumAssured(100000);
        }
    }, [isCIProCare, isCISuperCare, isPayLifePlus, isPayLifeNonPar, isEndowment15_25, isExcellent, selectedSegment]);
    // Enforce Chart Tab consistency
    useEffect(() => {
        if (isAnnuity && chartTab === 'coverage') {
            setChartTab('premium');
        }
        if (chartTab === 'benefit' && !showBenefitGraph) {
            setChartTab('premium');
        }
    }, [isAnnuity, chartTab, showBenefitGraph]);
    const handleSumAssuredBlur = () => {
        if (isCIProCare) {
            setSumAssured(prev => {
                let newVal = Math.max(prev, 200000);
                if (newVal % 10000 !== 0) {
                    // Round to nearest 10k
                    newVal = Math.round(newVal / 10000) * 10000;
                }
                return newVal;
            });
        }
        else if (isCISuperCare) {
            setSumAssured(prev => Math.max(prev, 200000));
        }
        else if (isPayLifePlus) {
            setSumAssured(prev => Math.max(prev, 150000));
        }
        else if (isPayLifeNonPar) {
            setSumAssured(prev => Math.max(prev, 100000));
        }
        else if (isEndowment15_25 || isExcellent) {
            setSumAssured(prev => Math.max(prev, 100000));
        }
        else {
            // Standard constraint
            setSumAssured(prev => Math.max(prev, 1000));
        }
    };
    // --- Input Handlers ---
    const handleGenderChange = (newGender) => {
        if (newGender !== gender) {
            setGender(newGender);
            setSelectedRiders([]);
        }
    };
    const handleAgeChange = (newAge) => {
        if (newAge !== age) {
            setAge(newAge);
            setSelectedRiders([]);
        }
    };
    // --- Main Policy Logic ---
    const availableMainPolicies = useMemo(() => {
        let policies = filterPolicies(mainPolicies, age, gender);
        // Constraint: AIA Annuity FIX and Annuity Sure specific Age Rules
        policies = policies.filter(p => {
            const name = p.segment.toLowerCase();
            // AIA Annuity Sure: Age 20-55 only
            if (name.includes('annuity sure')) {
                return age >= 20 && age <= 55;
            }
            // AIA Annuity Fix: Age < 60
            if (name.includes('annuity fix')) {
                return age < 60;
            }
            return true;
        });
        return policies;
    }, [mainPolicies, age, gender]);
    const availableMainSegments = useMemo(() => {
        return getUniqueSegments(availableMainPolicies);
    }, [availableMainPolicies]);
    // Auto-select first available policy
    useEffect(() => {
        if (availableMainSegments.length > 0 && !availableMainSegments.includes(selectedSegment)) {
            setSelectedSegment(availableMainSegments[0]);
        }
        else if (availableMainSegments.length === 0) {
            setSelectedSegment('');
        }
    }, [availableMainSegments, selectedSegment]);
    // Handle Main Policy Selection with Analytics
    const handleSegmentChange = (e) => {
        const newVal = e.target.value;
        setSelectedSegment(newVal);
        logEvent('select_main_policy', { policy_name: newVal, gender, age });
    };
    // Main Calculation
    const mainResult = useMemo(() => {
        if (!selectedSegment)
            return null;
        const policy = availableMainPolicies.find(p => p.segment === selectedSegment);
        if (!policy)
            return null;
        // Use Benefit Base if > 0, else default to 1000
        const denominator = policy.benefit && policy.benefit > 0 ? policy.benefit : 1000;
        // Apply Premium Discount
        let finalRate = policy.interest;
        // Endowment 15/25 Rules
        if (isEndowment15_25) {
            if (sumAssured >= 600000) {
                finalRate = Math.max(0, finalRate - 1.50);
            }
            else if (sumAssured >= 300000) {
                finalRate = Math.max(0, finalRate - 1.00);
            }
        }
        // Pay Life Plus Rules
        else if (isPayLifePlus) {
            if (sumAssured >= 700000) {
                finalRate = Math.max(0, finalRate - 1.50);
            }
            else if (sumAssured >= 500000) {
                finalRate = Math.max(0, finalRate - 1.00);
            }
        }
        // AIA 20 Pay Life (Non Par) Rules
        else if (isPayLifeNonPar && selectedSegment.includes('20')) {
            if (sumAssured >= 600000) {
                finalRate = Math.max(0, finalRate - 2.00);
            }
            else if (sumAssured >= 250000) {
                finalRate = Math.max(0, finalRate - 1.00);
            }
        }
        // AIA CI ProCare Rules
        else if (isCIProCare) {
            if (sumAssured >= 5000000) {
                finalRate = Math.max(0, finalRate - 3.00);
            }
            else if (sumAssured >= 1000000) {
                finalRate = Math.max(0, finalRate - 2.25);
            }
            else if (sumAssured >= 800000) {
                finalRate = Math.max(0, finalRate - 1.50);
            }
            else if (sumAssured >= 500000) {
                finalRate = Math.max(0, finalRate - 0.75);
            }
        }
        // AIA CI SuperCare Rules
        else if (isCISuperCare) {
            if (selectedSegment.includes('10/99')) {
                if (sumAssured >= 5000000) {
                    finalRate = Math.max(0, finalRate - 3.50);
                }
                else if (sumAssured >= 1000000) {
                    finalRate = Math.max(0, finalRate - 2.50);
                }
            }
            else if (selectedSegment.includes('20/99')) {
                if (sumAssured >= 5000000) {
                    finalRate = Math.max(0, finalRate - 2.00);
                }
                else if (sumAssured >= 1000000) {
                    finalRate = Math.max(0, finalRate - 1.50);
                }
                else if (sumAssured >= 800000) {
                    finalRate = Math.max(0, finalRate - 1.00);
                }
                else if (sumAssured >= 500000) {
                    finalRate = Math.max(0, finalRate - 0.50);
                }
            }
        }
        // AIA Excellent (Non Par) Rules
        else if (isExcellent) {
            if (sumAssured >= 250000) {
                finalRate = Math.max(0, finalRate - 1.00);
            }
        }
        // Formula: Premium = (Interest * SumAssured) / Denominator
        const premium = (finalRate * sumAssured) / denominator;
        return {
            premium,
            rate: finalRate,
            code: policy.segcode,
            denominator,
            paymentTerm: policy.paymentTerm || 99, // Default to 99 if not specified
            coveragePeriod: policy.coveragePeriod || 99
        };
    }, [availableMainPolicies, selectedSegment, sumAssured, isEndowment15_25, isPayLifePlus, isPayLifeNonPar, isCIProCare, isCISuperCare, isExcellent]);
    // --- Rider Logic ---
    const availableRiderPolicies = useMemo(() => {
        const policies = filterPolicies(riderData, age, gender);
        // Constraint: Health Happy Kids (10KDD, 30KDD) only for age 0-10
        return policies.filter(p => {
            if (age > 10) {
                const s = p.segment.toLowerCase();
                const c = p.segcode.toLowerCase();
                if (s.includes('health happy kids') || c.includes('10kdd') || c.includes('30kdd')) {
                    return false;
                }
            }
            return true;
        });
    }, [riderData, age, gender]);
    const availableRiderSegments = useMemo(() => {
        const allSegments = getUniqueSegments(availableRiderPolicies);
        const selectedNames = selectedRiders.map(r => r.segment);
        return allSegments.filter(s => !selectedNames.includes(s));
    }, [availableRiderPolicies, selectedRiders]);
    const handleAddRider = () => {
        if (!riderToAdd)
            return;
        logEvent('add_rider', { rider_name: riderToAdd, main_policy: selectedSegment });
        const riderPolicy = availableRiderPolicies.find(p => p.segment === riderToAdd);
        if (!riderPolicy)
            return;
        const initialCoverage = riderPolicy.benefit && riderPolicy.benefit > 0 ? riderPolicy.benefit : 0;
        const premium = riderPolicy.benefit && riderPolicy.benefit > 0
            ? (initialCoverage / riderPolicy.benefit) * riderPolicy.interest
            : riderPolicy.interest;
        const newRider = {
            segment: riderPolicy.segment,
            segcode: riderPolicy.segcode,
            rate: riderPolicy.interest,
            benefitBase: riderPolicy.benefit || 0,
            sumAssured: initialCoverage,
            premium: premium
        };
        let updatedList = [...selectedRiders, newRider];
        // Enforce Cross-Rider Constraints: CI Top Up <= 40% of CI Plus
        const ciPlusRider = updatedList.find(r => {
            const s = r.segment.toLowerCase();
            const c = r.segcode.toLowerCase();
            return c === 'cip' || s.includes('cip') || s.includes('ci plus');
        });
        if (ciPlusRider) {
            const limit = ciPlusRider.sumAssured * 0.4;
            updatedList = updatedList.map(r => {
                const s = r.segment.toLowerCase();
                const c = r.segcode.toLowerCase();
                const isTopUp = c === 'cit' || s.includes('cit') || s.includes('ci top up') || s.includes('citopup');
                if (isTopUp && r.sumAssured > limit) {
                    const newVal = limit;
                    const newPremium = r.benefitBase > 0 ? (newVal / r.benefitBase) * r.rate : r.premium;
                    return { ...r, sumAssured: newVal, premium: newPremium };
                }
                return r;
            });
        }
        setSelectedRiders(updatedList);
        setRiderToAdd('');
    };
    const handleRemoveRider = (segment) => {
        setSelectedRiders(selectedRiders.filter(r => r.segment !== segment));
    };
    const handleRiderCoverageChange = (segment, newCoverage) => {
        setSelectedRiders(selectedRiders.map(r => {
            if (r.segment !== segment)
                return r;
            if (r.benefitBase === 0)
                return r;
            // Calculate interim premium while typing
            const newPremium = (newCoverage / r.benefitBase) * r.rate;
            return { ...r, sumAssured: newCoverage, premium: newPremium };
        }));
    };
    // Logic for Rider Step and Min constraints
    const getRiderStep = (segment, baseBenefit) => {
        const s = segment.toLowerCase();
        // 1. AHC and Care for Cancer have 100,000 step
        if (s.includes('ahc') || s.includes('care for cancer') || s.includes('cfc')) {
            return 100000;
        }
        // 2. HB / HBX (Integer step 1)
        if (s === 'hb' || s === 'hbx') {
            return 1;
        }
        // 3. HH policies (step 10,000)
        if (s.startsWith('hh')) {
            return 10000;
        }
        // 4. Default Logic
        // If starting with 100,000 -> Step 10,000
        if (baseBenefit >= 100000)
            return 10000;
        // If starting with 10,000 (or 1,000) -> Step 1,000
        return 1000;
    };
    const handleRiderBlur = (segment) => {
        setSelectedRiders(prevRiders => {
            // 1. Update the target rider (apply steps/min)
            let updatedRiders = prevRiders.map(r => {
                if (r.segment !== segment)
                    return r;
                if (r.benefitBase === 0)
                    return r;
                const base = r.benefitBase;
                const step = getRiderStep(r.segment, base);
                const min = base;
                let val = Math.max(r.sumAssured, min);
                // Snap to nearest step
                if (val % step !== 0) {
                    val = Math.round(val / step) * step;
                }
                // Always update premium to ensure consistency
                const newPremium = (val / r.benefitBase) * r.rate;
                return { ...r, sumAssured: val, premium: newPremium };
            });
            // 2. Enforce Cross-Rider Constraints (CI Top Up <= 40% of CI Plus)
            const ciPlusRider = updatedRiders.find(r => {
                const s = r.segment.toLowerCase();
                const c = r.segcode.toLowerCase();
                return c === 'cip' || s.includes('cip') || s.includes('ci plus');
            });
            if (ciPlusRider) {
                const limit = ciPlusRider.sumAssured * 0.4;
                updatedRiders = updatedRiders.map(r => {
                    const s = r.segment.toLowerCase();
                    const c = r.segcode.toLowerCase();
                    const isTopUp = c === 'cit' || s.includes('cit') || s.includes('ci top up') || s.includes('citopup');
                    if (isTopUp && r.sumAssured > limit) {
                        const newVal = limit;
                        const newPremium = (newVal / r.benefitBase) * r.rate;
                        return { ...r, sumAssured: newVal, premium: newPremium };
                    }
                    return r;
                });
            }
            return updatedRiders;
        });
    };
    const getRiderMax = (rider) => {
        const s = rider.segment.toLowerCase();
        const c = rider.segcode.toLowerCase();
        const isTopUp = c === 'cit' || s.includes('cit') || s.includes('ci top up') || s.includes('citopup');
        if (isTopUp) {
            const ciPlus = selectedRiders.find(r => {
                const rs = r.segment.toLowerCase();
                const rc = r.segcode.toLowerCase();
                return rc === 'cip' || rs.includes('cip') || rs.includes('ci plus');
            });
            return ciPlus ? ciPlus.sumAssured * 0.4 : undefined;
        }
        return undefined;
    };
    // Helper to remove hardcoded amounts from Rider names for cleaner UI
    const cleanRiderName = (name) => {
        const lower = name.toLowerCase();
        // Only strip numbers for plans known to be variable/adjustable where the name implies a fixed amount.
        // Fixed plans like "HH 1,000,000" should keep their numbers to differentiate them.
        const adjustablePatterns = [
            'care for cancer', 'cfc',
            'cip',
            'citopup', 'cit',
            'ahc', 'cr 100,000', 'cr 100000',
            'mpci',
            'tpd',
            'อุบัติเหตุ', 'accident', 'ai/rcc', 'adb/rcc'
        ];
        if (adjustablePatterns.some(p => lower.includes(p))) {
            // Remove pattern: Space followed by number sequence (e.g. 100,000)
            return name.replace(/\s[\d,]{4,}/g, '').trim();
        }
        // For other plans (e.g. HH), return name as is
        return name;
    };
    const isHBFamily = (rider) => {
        const code = rider.segcode.toUpperCase();
        return code === 'HB' || code === 'HBX';
    };
    const totalPremium = (mainResult?.premium || 0) + selectedRiders.reduce((sum, r) => sum + r.premium, 0);
    // --- Projection Logic ---
    const projectionData = useMemo(() => {
        if (!mainResult)
            return [];
        if (isNaN(age) || age < 0)
            return [];
        const data = [];
        let accBase = 0;
        let accTotal = 0;
        const maxAge = 99;
        // Use explicit payment term from data, or regex fallback, or default 99
        let paymentTerm = mainResult.paymentTerm;
        if (isAnnuitySure) {
            // Annuity Sure: Pay premium only 9 years, AND not over 59 age
            paymentTerm = Math.min(9, 60 - age);
        }
        else if (isAnnuity) {
            // Annuity Rule: Pay up to age 59 (stops at 60)
            paymentTerm = Math.max(0, 60 - age);
        }
        else if (!paymentTerm || paymentTerm === 0) {
            if (selectedSegment) {
                const match = selectedSegment.match(/(?:^|[^0-9])(10|15|20)(?:$|[^0-9])/);
                paymentTerm = match ? parseInt(match[1]) : 99;
            }
            else {
                paymentTerm = 99;
            }
        }
        for (let i = 1; i <= 100; i++) {
            const currentAge = age + i - 1;
            if (currentAge > maxAge)
                break;
            const annualBase = (i <= paymentTerm) ? mainResult.premium : 0;
            // Calculate Coverage
            let annualMainCoverage = 0;
            if (isEndowment15_25) {
                // Special Coverage Logic for Endowment 15/25
                if (i <= 25) {
                    if (i <= 11)
                        annualMainCoverage = sumAssured * 1.0; // Year 1-11 (100%)
                    else if (i === 12)
                        annualMainCoverage = sumAssured * 1.10; // Year 12 (110%)
                    else if (i === 13)
                        annualMainCoverage = sumAssured * 1.15; // Year 13 (115%)
                    else if (i === 14)
                        annualMainCoverage = sumAssured * 1.25; // Year 14 (125%)
                    else
                        annualMainCoverage = sumAssured * 1.35; // Years 15-25 (135%)
                }
            }
            else if (i <= mainResult.coveragePeriod) {
                annualMainCoverage = sumAssured;
            }
            let annualRiderCoverage = 0;
            let annualRiderPremium = 0;
            // Track individual rider premiums for this year
            const currentYearRiderDetails = {};
            selectedRiders.forEach(rider => {
                const lookupKey = `${rider.segment}|${rider.segcode}|${currentAge}|${gender}`;
                const ageSpecificRider = riderLookup.get(lookupKey);
                let riderPremForYear = 0;
                if (ageSpecificRider) {
                    if (rider.benefitBase > 0) {
                        riderPremForYear = (rider.sumAssured / rider.benefitBase) * ageSpecificRider.interest;
                    }
                    else {
                        riderPremForYear = ageSpecificRider.interest;
                    }
                }
                else {
                    // If data missing for this age, fallback to entry age (or 0?)
                    // Usually keeping constant is safer than 0
                    riderPremForYear = rider.premium;
                }
                annualRiderPremium += riderPremForYear;
                currentYearRiderDetails[rider.segment] = riderPremForYear;
                // Assume rider coverage persists
                annualRiderCoverage += rider.sumAssured;
            });
            const annualTotal = annualBase + annualRiderPremium;
            // Exclude rider coverage from displayed coverage per request
            const totalCoverage = annualMainCoverage;
            // Benefit Logic
            let annualBenefit = 0;
            if (isAnnuitySure) {
                // Annuity Sure: 15% from 60-90
                if (currentAge >= 60 && currentAge <= 90) {
                    annualBenefit = sumAssured * 0.15;
                }
            }
            else if (isAnnuityFix) {
                // Annuity Fix: 6.25% from 60-85
                if (currentAge >= 60 && currentAge <= 85) {
                    annualBenefit = sumAssured * 0.0625;
                }
            }
            else if (isEndowment15_25) {
                // Endowment 15/25 Benefit
                // 1% from Year 2 to 24 (total 23 times)
                if (i >= 2 && i <= 24)
                    annualBenefit = sumAssured * 0.01;
                // 121% in Year 25
                else if (i === 25)
                    annualBenefit = sumAssured * 1.21;
            }
            accBase += annualBase;
            accTotal += annualTotal;
            data.push({
                year: i,
                age: currentAge,
                basePremium: annualBase,
                riderPremium: annualRiderPremium,
                totalAnnual: annualTotal,
                accBase: accBase,
                accTotal: accTotal,
                totalCoverage: totalCoverage,
                annualBenefit: annualBenefit,
                // Separate fields for chart/table
                mainCoverage: annualMainCoverage,
                riderCoverage: annualRiderCoverage,
                ridersDetail: currentYearRiderDetails
            });
        }
        return data;
    }, [mainResult, selectedRiders, age, riderLookup, gender, selectedSegment, sumAssured, isAnnuitySure, isAnnuityFix, isEndowment15_25, isAnnuity]);
    // Valid Data Memo to ensure consistency between Chart and MouseInteraction
    const validProjectionData = useMemo(() => {
        return projectionData.filter(d => !isNaN(d.totalAnnual) && !isNaN(d.totalCoverage));
    }, [projectionData]);
    // Handlers for Save/Edit
    const handleSave = () => {
        if (!mainResult || !selectedSegment)
            return;
        // Log event for saving calculation
        logEvent('save_calculation', {
            policy_name: selectedSegment,
            rider_count: selectedRiders.length,
            total_premium: totalPremium
        });
        const newItem = {
            id: editingId || Date.now().toString(),
            createdAt: Date.now(),
            applicantName,
            age,
            gender,
            policyName: selectedSegment,
            policyCode: mainResult.code,
            sumAssured,
            premium: mainResult.premium,
            riders: selectedRiders,
            totalPremium: totalPremium
        };
        let updated;
        if (editingId) {
            updated = savedCalculations.map(c => c.id === editingId ? newItem : c);
            setEditingId(null);
        }
        else {
            updated = [newItem, ...savedCalculations];
        }
        setSavedCalculations(updated);
        localStorage.setItem('aia_saved_calcs', JSON.stringify(updated));
        setApplicantName('');
    };
    const handleDelete = (id) => {
        const updated = savedCalculations.filter(item => item.id !== id);
        setSavedCalculations(updated);
        localStorage.setItem('aia_saved_calcs', JSON.stringify(updated));
    };
    const handleEdit = (item) => {
        setApplicantName(item.applicantName || '');
        setAge(item.age);
        setGender(item.gender);
        setSumAssured(item.sumAssured);
        setSelectedSegment(item.policyName);
        setSelectedRiders(item.riders || []);
        setEditingId(item.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleCancelEdit = () => { setEditingId(null); setApplicantName(''); };
    // Chart Helpers
    const formatCurrencyAxis = (val) => {
        if (val >= 1000000)
            return `฿${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000)
            return `฿${(val / 1000).toFixed(0)}k`;
        return `฿${val}`;
    };
    const handleChartMouseMove = (e) => {
        if (!validProjectionData.length || !chartContainerRef.current)
            return;
        const svgRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - svgRect.left;
        const viewBoxWidth = 800;
        const paddingLeft = 60;
        const paddingRight = 60;
        const chartWidth = viewBoxWidth - paddingLeft - paddingRight;
        const viewBoxX = (x / svgRect.width) * viewBoxWidth;
        if (viewBoxX < paddingLeft || viewBoxX > viewBoxWidth - paddingRight) {
            setHoveredDataPoint(null);
            return;
        }
        const count = validProjectionData.length;
        const xDenom = count > 1 ? count - 1 : 1;
        const ratio = (viewBoxX - paddingLeft) / chartWidth;
        const index = Math.round(ratio * xDenom);
        if (index >= 0 && index < validProjectionData.length)
            setHoveredDataPoint(validProjectionData[index]);
    };
    const handleChartMouseLeave = () => setHoveredDataPoint(null);
    // Memoize Chart Rendering for robustness
    const chartContent = useMemo(() => {
        // Use the component-level valid data
        if (validProjectionData.length === 0)
            return null;
        const maxPremRaw = Math.max(...validProjectionData.map(d => d.totalAnnual));
        const maxCovRaw = Math.max(...validProjectionData.map(d => d.totalCoverage));
        const maxBenRaw = Math.max(...validProjectionData.map(d => d.annualBenefit || 0));
        // Ensure we don't divide by zero if max is 0 (unlikely but safe)
        const maxPrem = (isFinite(maxPremRaw) && maxPremRaw > 0) ? maxPremRaw * 1.1 : 100;
        const maxCov = (isFinite(maxCovRaw) && maxCovRaw > 0) ? maxCovRaw * 1.1 : 100;
        const maxBen = (isFinite(maxBenRaw) && maxBenRaw > 0) ? maxBenRaw * 1.1 : 100;
        const viewBoxW = 800;
        const viewBoxH = 300;
        const padL = 60;
        const padR = 60;
        const padT = 20;
        const padB = 30;
        const graphW = viewBoxW - padL - padR;
        const graphH = viewBoxH - padT - padB;
        const count = validProjectionData.length;
        const xDenom = count > 1 ? count - 1 : 1;
        const getX = (index) => padL + (index / xDenom) * graphW;
        const getYPrem = (val) => (padT + graphH) - ((val || 0) / maxPrem) * graphH;
        const getYCov = (val) => (padT + graphH) - ((val || 0) / maxCov) * graphH;
        const getYBen = (val) => (padT + graphH) - ((val || 0) / maxBen) * graphH;
        // Generate valid point strings for polyline/polygon (x,y x,y ...)
        const linePathPrem = validProjectionData.map((d, i) => `${getX(i)},${getYPrem(d.totalAnnual)}`).join(' ');
        const areaPathPrem = `${padL},${padT + graphH} ${linePathPrem} ${padL + graphW},${padT + graphH}`;
        const linePathCov = validProjectionData.map((d, i) => `${getX(i)},${getYCov(d.totalCoverage)}`).join(' ');
        const areaPathCov = `${padL},${padT + graphH} ${linePathCov} ${padL + graphW},${padT + graphH}`;
        const linePathBen = validProjectionData.map((d, i) => `${getX(i)},${getYBen(d.annualBenefit || 0)}`).join(' ');
        const areaPathBen = `${padL},${padT + graphH} ${linePathBen} ${padL + graphW},${padT + graphH}`;
        const yTicksPrem = [0, 0.25, 0.5, 0.75, 1].map(r => { const val = maxPrem * r; return { val, y: getYPrem(val) }; });
        const yTicksCov = [0, 0.25, 0.5, 0.75, 1].map(r => { const val = maxCov * r; return { val, y: getYCov(val) }; });
        const yTicksBen = [0, 0.25, 0.5, 0.75, 1].map(r => { const val = maxBen * r; return { val, y: getYBen(val) }; });
        const xInterval = Math.max(1, Math.ceil(validProjectionData.length / 8));
        // Select active axis based on tab
        let activeTicks = yTicksPrem;
        if (chartTab === 'coverage') {
            activeTicks = yTicksCov;
        }
        if (chartTab === 'benefit') {
            activeTicks = yTicksBen;
        }
        return (_jsxs("svg", { className: "w-full h-full", viewBox: `0 0 ${viewBoxW} ${viewBoxH}`, preserveAspectRatio: "none", onMouseMove: handleChartMouseMove, onMouseLeave: handleChartMouseLeave, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "gradPrem", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#ef4444", stopOpacity: "0.2" }), _jsx("stop", { offset: "100%", stopColor: "#ef4444", stopOpacity: "0" })] }), _jsxs("linearGradient", { id: "gradCov", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#10b981", stopOpacity: "0.2" }), _jsx("stop", { offset: "100%", stopColor: "#10b981", stopOpacity: "0" })] }), _jsxs("linearGradient", { id: "gradBen", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#3b82f6", stopOpacity: "0.2" }), _jsx("stop", { offset: "100%", stopColor: "#3b82f6", stopOpacity: "0" })] })] }), activeTicks.map((tick, i) => (_jsx("line", { x1: padL, y1: tick.y, x2: viewBoxW - padR, y2: tick.y, stroke: "#f1f5f9", strokeWidth: "1" }, i))), chartTab === 'premium' && (_jsxs(_Fragment, { children: [_jsx("polygon", { points: areaPathPrem, fill: "url(#gradPrem)" }), _jsx("polyline", { points: linePathPrem, fill: "none", stroke: "#ef4444", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] })), chartTab === 'coverage' && (_jsxs(_Fragment, { children: [_jsx("polygon", { points: areaPathCov, fill: "url(#gradCov)" }), _jsx("polyline", { points: linePathCov, fill: "none", stroke: "#10b981", strokeWidth: "2", strokeDasharray: "4 2" })] })), chartTab === 'benefit' && (_jsxs(_Fragment, { children: [_jsx("polygon", { points: areaPathBen, fill: "url(#gradBen)" }), _jsx("polyline", { points: linePathBen, fill: "none", stroke: "#3b82f6", strokeWidth: "2" })] })), _jsx("line", { x1: padL, y1: padT, x2: padL, y2: padT + graphH, stroke: "#cbd5e1", strokeWidth: "1" }), _jsx("line", { x1: padL, y1: padT + graphH, x2: viewBoxW - padR, y2: padT + graphH, stroke: "#cbd5e1", strokeWidth: "1" }), activeTicks.map((tick, i) => (_jsx("text", { x: padL - 10, y: tick.y + 4, textAnchor: "end", fontSize: "10", fill: "#64748b", children: formatCurrencyAxis(tick.val) }, i))), validProjectionData.map((d, i) => {
                    if (i % xInterval === 0 || i === validProjectionData.length - 1) {
                        return (_jsx("text", { x: getX(i), y: padT + graphH + 15, textAnchor: "middle", fontSize: "10", fill: "#64748b", children: d.age }, i));
                    }
                    return null;
                }), hoveredDataPoint && (_jsx(_Fragment, { children: (() => {
                        // Find index of the hovered point in the currently rendered data set to ensure correct X alignment
                        const hoveredIndex = validProjectionData.findIndex(d => d.year === hoveredDataPoint.year);
                        if (hoveredIndex === -1)
                            return null;
                        const xPos = getX(hoveredIndex);
                        return (_jsxs(_Fragment, { children: [_jsx("line", { x1: xPos, y1: padT, x2: xPos, y2: padT + graphH, stroke: "#94a3b8", strokeWidth: "1", strokeDasharray: "4 4" }), chartTab === 'premium' && (_jsx("circle", { cx: xPos, cy: getYPrem(hoveredDataPoint.totalAnnual), r: "4", fill: "#ef4444", stroke: "white", strokeWidth: "2" })), chartTab === 'coverage' && (_jsx("circle", { cx: xPos, cy: getYCov(hoveredDataPoint.totalCoverage), r: "4", fill: "#10b981", stroke: "white", strokeWidth: "2" })), chartTab === 'benefit' && (_jsx("circle", { cx: xPos, cy: getYBen(hoveredDataPoint.annualBenefit || 0), r: "4", fill: "#3b82f6", stroke: "white", strokeWidth: "2" }))] }));
                    })() }))] }));
    }, [validProjectionData, chartTab, hoveredDataPoint, hasBenefit]);
    // --- Render ---
    return (_jsx("div", { className: "w-full", children: _jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100", children: [_jsx("div", { className: `px-4 sm:px-6 py-6 sm:py-8 text-white transition-colors duration-300 ${editingId ? 'bg-amber-600' : 'bg-gradient-to-r from-red-600 to-red-700'}`, children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl sm:text-2xl font-bold", children: editingId ? t('editCalculation') : t('premiumEstimator') }), _jsx("p", { className: `mt-2 text-sm sm:text-base ${editingId ? 'text-amber-100' : 'text-red-100'}`, children: editingId ? t('editDescription') : t('calcDescription') })] }), editingId && (_jsxs("button", { onClick: handleCancelEdit, className: "flex items-center bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded text-sm font-medium transition-colors", children: [_jsx(Undo2, { className: "w-4 h-4 mr-2" }), t('cancelEdit')] }))] }) }), _jsxs("div", { className: "p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8", children: [_jsxs("div", { className: "lg:col-span-5 space-y-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 border-b pb-2", children: t('applicantDetails') }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t('applicantName') }), _jsx("input", { type: "text", value: applicantName, onChange: (e) => setApplicantName(e.target.value), placeholder: t('enterNamePlaceholder'), className: "block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t('gender') }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("button", { onClick: () => handleGenderChange('male'), className: `flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium transition-all ${gender === 'male' ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`, children: t('male') }), _jsx("button", { onClick: () => handleGenderChange('female'), className: `flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium transition-all ${gender === 'female' ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`, children: t('female') })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: [t('age'), ": ", age] }), _jsx("input", { type: "range", min: "0", max: "75", value: age, onChange: (e) => handleAgeChange(parseInt(e.target.value)), className: "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 border-b pb-2", children: t('mainPolicy') }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t('selectBasePlan') }), availableMainSegments.length > 0 ? (_jsx("select", { value: selectedSegment, onChange: handleSegmentChange, className: "block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6", children: availableMainSegments.map(seg => (_jsx("option", { value: seg, children: seg }, seg))) })) : (_jsx("div", { className: "p-3 bg-slate-100 text-slate-500 text-sm rounded-md", children: t('noPoliciesAvailable') }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t('sumAssured') }), _jsxs("div", { className: "relative rounded-md shadow-sm", children: [_jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: _jsx("span", { className: "text-slate-500 sm:text-sm font-semibold", children: "\u0E3F" }) }), _jsx("input", { type: "number", min: minSumAssured, step: stepSumAssured, value: sumAssured, onChange: (e) => setSumAssured(Math.max(0, parseInt(e.target.value) || 0)), onBlur: handleSumAssuredBlur, className: "block w-full rounded-md border-0 py-2.5 pl-8 pr-12 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" })] }), isCIProCare && (_jsx("p", { className: "mt-1 text-xs text-slate-500", children: "Min \u0E3F200k, Multiples of \u0E3F10k" })), isCISuperCare && (_jsx("p", { className: "mt-1 text-xs text-slate-500", children: "Min \u0E3F200k" })), isPayLifePlus && (_jsx("p", { className: "mt-1 text-xs text-slate-500", children: "Min \u0E3F150k" })), (isPayLifeNonPar || isEndowment15_25 || isExcellent) && (_jsx("p", { className: "mt-1 text-xs text-slate-500", children: "Min \u0E3F100k" }))] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 border-b pb-2", children: t('additionalRiders') }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("select", { value: riderToAdd, onChange: (e) => setRiderToAdd(e.target.value), className: "block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6", children: [_jsx("option", { value: "", children: t('selectRiderPlaceholder') }), availableRiderSegments.map(seg => (_jsx("option", { value: seg, children: cleanRiderName(seg) }, seg)))] }), _jsx("button", { onClick: handleAddRider, disabled: !riderToAdd, className: "bg-red-600 text-white p-2.5 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors", children: _jsx(Plus, { className: "w-5 h-5" }) })] }), selectedRiders.length > 0 ? (_jsx("div", { className: "space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200", children: selectedRiders.map((rider) => (_jsxs("div", { className: "bg-white p-3 rounded shadow-sm border border-slate-100", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("span", { className: "font-medium text-sm text-slate-900 w-3/4", children: cleanRiderName(rider.segment) }), _jsx("button", { onClick: () => handleRemoveRider(rider.segment), className: "text-slate-400 hover:text-red-500", children: _jsx(X, { className: "w-4 h-4" }) })] }), rider.benefitBase > 0 ? (_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsxs("span", { className: "text-slate-500", children: [t('coverage'), ":"] }), _jsx("input", { type: "number", min: rider.benefitBase, max: getRiderMax(rider), step: getRiderStep(rider.segment, rider.benefitBase), value: rider.sumAssured, onChange: (e) => handleRiderCoverageChange(rider.segment, parseFloat(e.target.value) || 0), onBlur: () => handleRiderBlur(rider.segment), className: "w-24 p-1 border rounded text-right focus:ring-2 focus:ring-red-500 outline-none" }), _jsx("span", { className: "text-slate-500", children: "\u0E3F" })] })) : (_jsx("div", { className: "text-xs text-slate-500", children: t('fixedPlan') })), isHBFamily(rider) && (_jsxs("div", { className: "mt-2 text-xs text-amber-600 bg-amber-50 p-1.5 rounded border border-amber-100 flex items-start", children: [_jsx(Info, { className: "w-3 h-3 min-w-3 mr-1 mt-0.5" }), _jsx("span", { children: t('riderRemarkHB') })] })), _jsxs("div", { className: "mt-2 text-right text-sm font-semibold text-red-600", children: ["+ \u0E3F", rider.premium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] }, rider.segment))) })) : (_jsx("p", { className: "text-sm text-slate-400 italic", children: t('noRidersSelected') }))] })] }), _jsx("div", { className: "lg:col-span-7 bg-slate-50 rounded-xl p-4 sm:p-6 flex flex-col h-full", children: mainResult ? (_jsxs("div", { className: "h-full flex flex-col", children: [_jsx("div", { className: "mb-4", children: _jsx("h2", { className: "text-xl font-bold text-slate-800", children: t('quotationSummary') }) }), _jsx("div", { className: "flex-grow overflow-x-auto -mx-4 sm:mx-0", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-white shadow-sm border-y sm:border border-slate-200 sm:rounded-lg", children: [_jsx("thead", { className: "text-xs text-slate-500 uppercase bg-slate-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-3 sm:px-4 py-3 whitespace-nowrap", children: t('tablePolicyRider') }), _jsx("th", { className: "px-3 sm:px-4 py-3 text-right whitespace-nowrap", children: t('tableSumAssured') }), _jsx("th", { className: "px-3 sm:px-4 py-3 text-right whitespace-nowrap", children: t('tablePremium') })] }) }), _jsxs("tbody", { className: "divide-y divide-slate-100", children: [_jsxs("tr", { children: [_jsx("td", { className: "px-3 sm:px-4 py-4 font-medium text-slate-900", children: _jsxs("div", { className: "min-w-[140px] whitespace-normal", children: [selectedSegment, " ", _jsxs("span", { className: "text-slate-400 font-normal ml-1", children: ["(", mainResult.code, ")"] }), _jsxs("div", { className: "text-xs text-slate-500 font-normal mt-1", children: [t('baseRate'), ": ", mainResult.rate.toFixed(2), " / ", mainResult.denominator] })] }) }), _jsxs("td", { className: "px-3 sm:px-4 py-4 text-right text-slate-600 whitespace-nowrap align-top", children: ["\u0E3F", sumAssured.toLocaleString()] }), _jsxs("td", { className: "px-3 sm:px-4 py-4 text-right font-semibold text-slate-900 whitespace-nowrap align-top", children: ["\u0E3F", mainResult.premium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] }), selectedRiders.map((rider, idx) => (_jsxs("tr", { children: [_jsx("td", { className: "px-3 sm:px-4 py-3 text-slate-700", children: _jsxs("div", { className: "min-w-[140px] whitespace-normal", children: [cleanRiderName(rider.segment), " ", _jsxs("span", { className: "text-slate-400 text-xs ml-1", children: ["(", rider.segcode, ")"] })] }) }), _jsx("td", { className: "px-3 sm:px-4 py-3 text-right text-slate-600 whitespace-nowrap align-top", children: rider.benefitBase > 0 ? `฿${rider.sumAssured.toLocaleString()}` : '-' }), _jsxs("td", { className: "px-3 sm:px-4 py-3 text-right font-medium text-slate-900 whitespace-nowrap align-top", children: ["\u0E3F", rider.premium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] }, idx)))] }), _jsx("tfoot", { className: "bg-red-50 border-t border-slate-200", children: _jsxs("tr", { children: [_jsx("td", { className: "px-3 sm:px-4 py-4 font-bold text-slate-900", children: t('grandTotal') }), _jsx("td", { className: "px-3 sm:px-4 py-4" }), _jsxs("td", { className: "px-3 sm:px-4 py-4 text-right font-bold text-red-600 text-lg whitespace-nowrap", children: ["\u0E3F", totalPremium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] }) })] }) }), _jsx("div", { className: "mt-8", children: _jsxs("button", { onClick: handleSave, className: `w-full flex items-center justify-center px-4 py-3 border shadow-sm text-sm font-medium rounded-xl transition-colors ${editingId ? 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), editingId ? t('update') : t('save')] }) })] })) : (_jsxs("div", { className: "flex-grow flex flex-col items-center justify-center text-slate-400", children: [_jsx(User, { className: "w-16 h-16 mb-4 opacity-20" }), _jsx("p", { className: "text-lg", children: t('enterDetailsToView') })] })) })] })] }), mainResult && projectionData.length > 0 && (_jsxs("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100", children: [_jsxs("div", { className: "px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-red-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold text-slate-900", children: t('costProjection') })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setChartTab('premium'), className: `px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartTab === 'premium' ? 'bg-white text-red-600 shadow ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white'}`, children: t('chartTabPremium') }), !isAnnuity && (_jsx("button", { onClick: () => setChartTab('coverage'), className: `px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartTab === 'coverage' ? 'bg-white text-red-600 shadow ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white'}`, children: t('chartTabCoverage') })), showBenefitGraph && (_jsx("button", { onClick: () => setChartTab('benefit'), className: `px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartTab === 'benefit' ? 'bg-white text-blue-600 shadow ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white'}`, children: t('chartTabBenefit') }))] })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-8 relative", ref: chartContainerRef, children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h4", { className: "text-sm font-medium text-slate-500", children: t('graphTitle') }), _jsxs("div", { className: "flex gap-4 text-xs", children: [chartTab === 'premium' && (_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "w-3 h-3 bg-red-100 border border-red-500 mr-1" }), " ", t('chartLegend')] })), chartTab === 'coverage' && (_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "w-3 h-3 bg-emerald-100 border border-emerald-500 mr-1" }), " ", t('chartCoverage')] })), chartTab === 'benefit' && (_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "w-3 h-3 bg-blue-100 border border-blue-500 mr-1" }), " ", t('chartBenefit')] }))] })] }), _jsx("div", { className: "h-80 w-full bg-white rounded-lg p-2 border border-slate-100 relative overflow-hidden", children: chartContent }), hoveredDataPoint && (_jsxs("div", { style: { left: ((60 + (projectionData.findIndex(d => d.year === hoveredDataPoint.year) / (projectionData.length > 1 ? projectionData.length - 1 : 1)) * 680) / 800) * 100 + '%', top: '20px' }, className: "absolute transform -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl pointer-events-none z-10 w-48", children: [_jsxs("div", { className: "font-bold border-b border-slate-700 pb-1 mb-1", children: [t('tableYear'), " ", hoveredDataPoint.year, " (", t('age'), " ", hoveredDataPoint.age, ")"] }), _jsxs("div", { className: "flex justify-between mb-1", children: [_jsxs("span", { className: "text-slate-400", children: [t('tableTotalAnnual'), ":"] }), _jsxs("span", { children: ["\u0E3F", hoveredDataPoint.totalAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })] })] }), _jsxs("div", { className: "flex justify-between mb-1", children: [_jsxs("span", { className: "text-emerald-400", children: [t('tableCoverage'), ":"] }), _jsxs("span", { children: ["\u0E3F", hoveredDataPoint.totalCoverage.toLocaleString(undefined, { maximumFractionDigits: 0 })] })] }), hasBenefit && (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-blue-400", children: [t('tableBenefit'), ":"] }), _jsxs("span", { children: ["\u0E3F", (hoveredDataPoint.annualBenefit || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })] })] }))] }))] }), _jsxs("div", { className: "mt-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h4", { className: "text-sm font-medium text-slate-500", children: [t('costProjection'), " (", t('tableYear'), " 1-100)"] }), _jsxs("button", { onClick: () => setShowRiderDetails(!showRiderDetails), className: "flex items-center text-xs text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors", children: [showRiderDetails ? _jsx(EyeOff, { className: "w-3.5 h-3.5 mr-1.5" }) : _jsx(Eye, { className: "w-3.5 h-3.5 mr-1.5" }), t('showRiderDetails')] })] }), _jsx("div", { className: "overflow-x-auto rounded-lg border border-slate-200", children: _jsxs("table", { className: "min-w-full text-xs text-right", children: [_jsx("thead", { className: "bg-slate-100 text-slate-600 font-semibold uppercase", children: _jsxs("tr", { children: [_jsx("th", { className: "px-3 py-3 text-center sticky left-0 bg-slate-100 z-10 border-r border-slate-200", children: t('tableYear') }), _jsx("th", { className: "px-3 py-3 text-center bg-slate-100 border-r border-slate-200", children: t('tableAge') }), _jsx("th", { className: "px-3 py-3 border-r border-slate-200", children: t('tableBasePrem') }), showRiderDetails && selectedRiders.map((r, i) => (_jsx("th", { className: "px-3 py-3 border-r border-slate-200 min-w-[100px] text-slate-500 font-normal normal-case", children: cleanRiderName(r.segment) }, i))), _jsx("th", { className: "px-3 py-3 bg-red-50 text-red-700 border-r border-red-100", children: t('tableTotalAnnual') }), _jsx("th", { className: "px-3 py-3 text-slate-400 border-r border-slate-200", children: t('tableAccTotal') }), _jsx("th", { className: "px-3 py-3 text-emerald-600 bg-emerald-50 border-r border-emerald-100", children: t('tableCoverage') }), hasBenefit && (_jsx("th", { className: "px-3 py-3 text-blue-600 bg-blue-50", children: t('tableBenefit') }))] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 bg-white", children: projectionData.map((row, idx) => (_jsxs("tr", { className: "hover:bg-slate-50", children: [_jsx("td", { className: "px-3 py-2 text-center font-medium sticky left-0 bg-white border-r border-slate-100 group-hover:bg-slate-50", children: row.year }), _jsx("td", { className: "px-3 py-2 text-center text-slate-500 border-r border-slate-100", children: row.age }), _jsx("td", { className: "px-3 py-2 border-r border-slate-100", children: row.basePremium > 0 ? row.basePremium.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-' }), showRiderDetails && selectedRiders.map((r, i) => (_jsx("td", { className: "px-3 py-2 text-slate-500 border-r border-slate-100", children: (row.ridersDetail[r.segment] || 0) > 0 ? (row.ridersDetail[r.segment] || 0).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-' }, i))), _jsx("td", { className: "px-3 py-2 font-bold text-red-600 bg-red-50/30 border-r border-red-50", children: row.totalAnnual > 0 ? row.totalAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-' }), _jsx("td", { className: "px-3 py-2 text-slate-400 border-r border-slate-100", children: row.accTotal.toLocaleString(undefined, { maximumFractionDigits: 0 }) }), _jsx("td", { className: "px-3 py-2 text-emerald-600 bg-emerald-50/30 border-r border-emerald-50", children: row.totalCoverage.toLocaleString(undefined, { maximumFractionDigits: 0 }) }), hasBenefit && (_jsx("td", { className: "px-3 py-2 text-blue-600 bg-blue-50/30 font-medium", children: (row.annualBenefit || 0) > 0 ? (row.annualBenefit || 0).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-' }))] }, idx))) })] }) })] })] })] })), savedCalculations.length > 0 && (_jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden", children: [_jsxs("div", { className: "px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center", children: [_jsx(History, { className: "w-5 h-5 text-slate-500 mr-2" }), _jsx("h3", { className: "text-lg font-semibold text-slate-900", children: t('savedCalculations') })] }), _jsx("div", { className: "divide-y divide-slate-100", children: savedCalculations.map((calc) => (_jsxs("div", { className: "p-4 sm:px-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("span", { className: "font-bold text-slate-900", children: calc.applicantName || 'Unnamed' }), _jsxs("span", { className: "text-xs text-slate-500", children: ["(", calc.gender, ", ", calc.age, ")"] })] }), _jsxs("div", { className: "text-sm text-slate-600 mt-1", children: [calc.policyName, " ", _jsx("span", { className: "text-slate-400", children: "|" }), " SA: \u0E3F", calc.sumAssured.toLocaleString()] }), calc.riders && calc.riders.length > 0 && (_jsxs("div", { className: "text-xs text-slate-400 mt-1", children: [calc.riders.length, " ", t('riders')] })), _jsx("div", { className: "text-xs text-slate-400 mt-1", children: new Date(calc.createdAt).toLocaleDateString() })] }), _jsxs("div", { className: "flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end", children: [_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-slate-500", children: t('totalPremium') }), _jsxs("div", { className: "text-lg font-bold text-red-600", children: ["\u0E3F", calc.totalPremium.toLocaleString()] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleEdit(calc), className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", title: "Edit", children: _jsx(Pencil, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => handleDelete(calc.id), className: "p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "Delete", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] })] }, calc.id))) })] }))] }) }));
};
export default Calculator;
