import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CSV_DATA } from '@/constants';
import { INITIAL_RIDER_CSV_DATA } from '@/rider_data';
import { parseCSV } from '@/utils/csvUtils';
import { supabase } from '@/utils/supabaseClient';
const DataContext = createContext(undefined);
// Helper to map DB snake_case columns to app camelCase properties
const mapFromDb = (row) => ({
    age: row.age,
    gender: row.gender,
    segment: row.segment,
    segcode: row.segcode,
    interest: row.interest,
    key: row.key,
    benefit: row.benefit,
    paymentTerm: row.payment_term,
    coveragePeriod: row.coverage_period
});
// Helper to map app camelCase properties to DB snake_case columns
const mapToDb = (row) => ({
    age: row.age,
    gender: row.gender,
    segment: row.segment,
    segcode: row.segcode,
    interest: row.interest,
    key: row.key,
    benefit: row.benefit || 0,
    payment_term: row.paymentTerm || 0,
    coverage_period: row.coveragePeriod || 99
});
export const DataProvider = ({ children }) => {
    const [mainPolicies, setMainPolicies] = useState([]);
    const [riders, setRiders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUsingSupabase, setIsUsingSupabase] = useState(false);
    // --- Initialization ---
    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            // 1. Try Loading from Supabase
            if (supabase) {
                try {
                    // Pagination helper to bypass 1000-row default API limit
                    const fetchAll = async (table) => {
                        let allRows = [];
                        let page = 0;
                        const pageSize = 1000;
                        let fetchMore = true;
                        while (fetchMore) {
                            const { data, error } = await supabase
                                .from(table)
                                .select('*')
                                .range(page * pageSize, (page + 1) * pageSize - 1);
                            if (error)
                                throw error;
                            if (data && data.length > 0) {
                                allRows = [...allRows, ...data];
                                // If we got fewer rows than requested, we've reached the end
                                if (data.length < pageSize) {
                                    fetchMore = false;
                                }
                                else {
                                    page++;
                                }
                            }
                            else {
                                fetchMore = false;
                            }
                            // Safety break (e.g. 50k rows max to prevent memory issues)
                            if (allRows.length > 50000)
                                fetchMore = false;
                        }
                        return allRows;
                    };
                    const [dbMain, dbRiders] = await Promise.all([
                        fetchAll('main_policies').catch(e => { console.error("Main fetch error", e); return []; }),
                        fetchAll('riders').catch(e => { console.error("Rider fetch error", e); return []; })
                    ]);
                    if (dbMain && dbMain.length > 0) {
                        setMainPolicies(dbMain.map(mapFromDb));
                        setIsUsingSupabase(true);
                        console.log(`[Data] Loaded ${dbMain.length} policies from Supabase.`);
                    }
                    else {
                        // Fallback
                        console.warn("[Data] Supabase main_policies empty or error, using local fallback.");
                        setMainPolicies(parseCSV(INITIAL_CSV_DATA));
                    }
                    if (dbRiders && dbRiders.length > 0) {
                        setRiders(dbRiders.map(mapFromDb));
                    }
                    else {
                        setRiders(parseCSV(INITIAL_RIDER_CSV_DATA));
                    }
                }
                catch (e) {
                    console.error("[Data] Supabase connection failed, using local fallback.", e);
                    setMainPolicies(parseCSV(INITIAL_CSV_DATA));
                    setRiders(parseCSV(INITIAL_RIDER_CSV_DATA));
                }
            }
            else {
                // 2. Fallback to Hardcoded Data
                console.log(`[Data] No Supabase client, using hardcoded datasets.`);
                setMainPolicies(parseCSV(INITIAL_CSV_DATA));
                setRiders(parseCSV(INITIAL_RIDER_CSV_DATA));
            }
            setIsLoading(false);
        };
        initData();
    }, []);
    // --- Actions ---
    const loadMainPolicies = (csvText) => {
        setIsLoading(true);
        setTimeout(() => {
            try {
                const parsed = parseCSV(csvText);
                setMainPolicies(parsed);
                alert(`Loaded ${parsed.length} policies into session memory.`);
            }
            catch (e) {
                console.error(e);
                alert("Failed to parse CSV.");
            }
            finally {
                setIsLoading(false);
            }
        }, 50);
    };
    const loadRiders = (csvText) => {
        setIsLoading(true);
        setTimeout(() => {
            try {
                const parsed = parseCSV(csvText);
                setRiders(parsed);
                alert(`Loaded ${parsed.length} riders into session memory.`);
            }
            catch (e) {
                console.error(e);
                alert("Failed to parse CSV.");
            }
            finally {
                setIsLoading(false);
            }
        }, 50);
    };
    const resetMainData = async () => {
        if (window.confirm('Revert to original hardcoded main policies?')) {
            setMainPolicies(parseCSV(INITIAL_CSV_DATA));
        }
    };
    const resetRiderData = () => {
        if (window.confirm('Revert to original hardcoded riders?')) {
            setRiders(parseCSV(INITIAL_RIDER_CSV_DATA));
        }
    };
    // Update Policy (Local + Supabase)
    const updatePolicy = async (type, updatedPolicy) => {
        const tableName = type === 'main' ? 'main_policies' : 'riders';
        const setLocal = type === 'main' ? setMainPolicies : setRiders;
        // 1. Optimistic Update Local State
        setLocal(prev => prev.map(p => p.key === updatedPolicy.key ? updatedPolicy : p));
        // 2. Update Supabase
        if (isUsingSupabase && supabase) {
            try {
                const dbRow = mapToDb(updatedPolicy);
                const { error } = await supabase
                    .from(tableName)
                    .update(dbRow)
                    .eq('key', updatedPolicy.key);
                if (error)
                    throw error;
            }
            catch (e) {
                console.error(`Failed to update ${tableName} in Supabase:`, e);
                alert(`Failed to save to cloud: ${e.message}`);
                // Revert local state (optional, simplified here)
            }
        }
    };
    // Delete Policy (Local + Supabase)
    const deletePolicy = async (type, key) => {
        const tableName = type === 'main' ? 'main_policies' : 'riders';
        const setLocal = type === 'main' ? setMainPolicies : setRiders;
        // 1. Optimistic Delete Local State
        setLocal(prev => prev.filter(p => p.key !== key));
        // 2. Delete from Supabase
        if (isUsingSupabase && supabase) {
            try {
                const { error } = await supabase
                    .from(tableName)
                    .delete()
                    .eq('key', key);
                if (error)
                    throw error;
            }
            catch (e) {
                console.error(`Failed to delete from ${tableName}:`, e);
                alert(`Failed to delete from cloud: ${e.message}`);
            }
        }
    };
    return React.createElement(DataContext.Provider, {
        value: {
            mainPolicies,
            riders,
            loadMainPolicies,
            loadRiders,
            resetMainData,
            resetRiderData,
            updatePolicy,
            deletePolicy,
            isLoading,
            isUsingSupabase
        }
    }, children);
};
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
