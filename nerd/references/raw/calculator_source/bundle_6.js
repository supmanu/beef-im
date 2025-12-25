import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
import { useData } from '@/services/dataService';
import { useLanguage } from '@/services/languageService';
import { Upload, FileSpreadsheet, Database, Search, RefreshCw, Layers, Info, CloudUpload, AlertCircle, CheckCircle, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '@/utils/supabaseClient';
const Dashboard = () => {
    const { mainPolicies, riders, loadMainPolicies, loadRiders, resetMainData, resetRiderData, updatePolicy, deletePolicy, isUsingSupabase } = useData();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('main');
    const fileInputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const [lastError, setLastError] = useState(null);
    // Edit State
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [editForm, setEditForm] = useState({});
    const itemsPerPage = 10;
    // Helper vars based on active tab
    const currentData = activeTab === 'main' ? mainPolicies : riders;
    const loadFn = activeTab === 'main' ? loadMainPolicies : loadRiders;
    const resetFn = activeTab === 'main' ? resetMainData : resetRiderData;
    const tableName = activeTab === 'main' ? 'main_policies' : 'riders';
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (text) {
                loadFn(text);
                setPage(1);
                setUploadStatus(`Loaded ${file.name} into preview. Ready to ingest.`);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };
    const mapToDbRow = (row) => {
        // Convert camelCase PolicyData to snake_case for Supabase
        // Ensure all values are defined to avoid null constraint errors
        return {
            age: row.age,
            gender: row.gender,
            segment: row.segment,
            segcode: row.segcode,
            interest: row.interest,
            key: row.key,
            benefit: row.benefit || 0,
            payment_term: row.paymentTerm || 0,
            coverage_period: row.coveragePeriod || 99
        };
    };
    const handleSupabaseIngest = async () => {
        if (!supabase) {
            alert("Supabase client failed to initialize. Please check your network connection.");
            return;
        }
        if (currentData.length === 0) {
            alert("No data loaded to ingest. Please upload a CSV first.");
            return;
        }
        if (!window.confirm(`Ready to ingest ${currentData.length} records into '${tableName}'?`)) {
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        setLastError(null);
        setUploadStatus('Verifying connection...');
        try {
            // 1. Pre-flight Check: Verify table exists and is accessible
            const { error: checkError } = await supabase.from(tableName).select('key').limit(1);
            if (checkError) {
                // If table doesn't exist or permission denied
                throw new Error(`Connection Check Failed: ${checkError.message} (Code: ${checkError.code}). \n\nDid you run the SQL script to create the '${tableName}' table?`);
            }
            // 2. Start Batch Ingestion
            const batchSize = 100;
            const total = currentData.length;
            setUploadStatus('Starting upload...');
            for (let i = 0; i < total; i += batchSize) {
                const batch = currentData.slice(i, i + batchSize);
                const dbBatch = batch.map(mapToDbRow);
                const { error } = await supabase.from(tableName).upsert(dbBatch, { onConflict: 'key' });
                if (error) {
                    console.error(`Batch insert error at index ${i}:`, error);
                    throw new Error(`Write Error: ${error.message}`);
                }
                const percent = Math.min(100, Math.round(((i + batch.length) / total) * 100));
                setUploadProgress(percent);
                setUploadStatus(`Ingesting... ${percent}%`);
                // Small delay to yield UI thread
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            setUploadStatus('Ingestion Complete!');
            setLastError(null);
            alert("Success! Data has been uploaded to Supabase.");
        }
        catch (e) {
            console.error("Ingestion failed:", e);
            setUploadStatus('Failed');
            setLastError(e.message);
        }
        finally {
            setIsUploading(false);
            // Clear success message after a while
            if (!lastError) {
                setTimeout(() => {
                    if (uploadStatus === 'Ingestion Complete!')
                        setUploadStatus('');
                }, 5000);
            }
        }
    };
    // --- Actions ---
    const handleEditClick = (policy) => {
        setEditingPolicy(policy);
        setEditForm({ ...policy });
    };
    const handleDeleteClick = async (key) => {
        if (window.confirm(t('confirmDelete'))) {
            await deletePolicy(activeTab, key);
        }
    };
    const handleSaveEdit = async () => {
        if (!editingPolicy || !editForm)
            return;
        // Merge updates
        const updatedPolicy = {
            ...editingPolicy,
            ...editForm
        };
        await updatePolicy(activeTab, updatedPolicy);
        setEditingPolicy(null);
        setEditForm({});
    };
    // Filter Data
    const filteredData = currentData.filter(item => item.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.segcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.key.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { className: "flex space-x-1 rounded-xl bg-slate-200 p-1 print:hidden w-fit", children: [_jsxs("button", { onClick: () => { setActiveTab('main'); setPage(1); setSearchTerm(''); setLastError(null); }, className: `flex items-center rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${activeTab === 'main'
                                    ? 'bg-white text-red-700 shadow'
                                    : 'text-slate-600 hover:bg-white/[0.12] hover:text-slate-800'}`, children: [_jsx(Database, { className: "w-4 h-4 mr-2" }), t('tabMainPolicies')] }), _jsxs("button", { onClick: () => { setActiveTab('rider'); setPage(1); setSearchTerm(''); setLastError(null); }, className: `flex items-center rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${activeTab === 'rider'
                                    ? 'bg-white text-red-700 shadow'
                                    : 'text-slate-600 hover:bg-white/[0.12] hover:text-slate-800'}`, children: [_jsx(Layers, { className: "w-4 h-4 mr-2" }), t('tabRiders')] })] }), isUsingSupabase ? (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: [_jsx(CheckCircle, { className: "w-3 h-3 mr-1" }), " Connected to Supabase"] })) : (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800", children: [_jsx(Info, { className: "w-3 h-3 mr-1" }), " Local Mode"] }))] }), lastError && (_jsx("div", { className: "bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-md shadow-sm", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AlertCircle, { className: "h-5 w-5 text-red-500" }) }), _jsxs("div", { className: "ml-3 w-full", children: [_jsx("h3", { className: "text-sm font-bold text-red-800 mb-2", children: "Ingestion Error" }), _jsx("div", { className: "text-sm text-red-700 mb-4 font-mono bg-red-100 p-2 rounded", children: lastError }), lastError.includes('Code: 42P01') || lastError.includes('not found') ? (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "text-sm font-medium text-red-800 mb-2", children: "Action Required: Create Missing Table" }), _jsx("p", { className: "text-xs text-red-700 mb-2", children: "Run this SQL in your Supabase SQL Editor to fix the schema:" }), _jsx("pre", { className: "bg-slate-800 text-slate-200 text-xs p-3 rounded overflow-x-auto select-all", children: `-- Create ${tableName} table
create table if not exists public.${tableName} (
  key text primary key,
  age int4,
  gender text,
  segment text,
  segcode text,
  interest float8,
  benefit float8 default 0,
  payment_term float8 default 0,
  coverage_period float8 default 99
);

-- Enable Security
alter table public.${tableName} enable row level security;

-- Allow access (Change policy as needed for production)
create policy "Enable access for all users" on public.${tableName} for all using (true) with check (true);` })] })) : null] })] }) })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:hidden", children: [_jsx("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-100", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: _jsx(Database, { className: "h-6 w-6 text-blue-600" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-slate-500", children: t('statTotalEntries') }), _jsx("p", { className: "text-2xl font-bold text-slate-900", children: currentData.length.toLocaleString() })] })] }) }), _jsx("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-100", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-2 bg-green-50 rounded-lg", children: _jsx(FileSpreadsheet, { className: "h-6 w-6 text-green-600" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-slate-500", children: t('statUniquePlans') }), _jsx("p", { className: "text-2xl font-bold text-slate-900", children: new Set(currentData.map(d => d.segment)).size })] })] }) }), _jsx("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-100", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-2 bg-purple-50 rounded-lg", children: _jsx(Upload, { className: "h-6 w-6 text-purple-600" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("button", { onClick: () => fileInputRef.current?.click(), className: "text-sm font-medium text-purple-700 hover:text-purple-900 focus:outline-none", children: t('uploadCSV') }), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileUpload, accept: ".csv", className: "hidden" })] })] }), _jsx("button", { onClick: resetFn, className: "p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full", title: t('reset'), children: _jsx(RefreshCw, { className: "h-5 w-5" }) })] }) })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 mb-8 print:hidden", children: _jsxs("div", { className: "bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [_jsxs("div", { className: "w-full", children: [_jsxs("h4", { className: "text-sm font-bold text-white flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(CloudUpload, { className: "w-4 h-4 mr-2 text-green-400" }), "Ingest to Supabase (", tableName, ")"] }), isUploading && _jsxs("span", { className: "text-green-400 text-xs", children: [uploadProgress, "%"] })] }), _jsx("div", { className: "text-xs text-slate-400 mt-1 min-h-[1.5em] flex items-center", children: uploadStatus || `Ready to upload ${currentData.length} records.` }), isUploading && (_jsx("div", { className: "w-full bg-slate-700 rounded-full h-1.5 mt-2", children: _jsx("div", { className: "bg-green-500 h-1.5 rounded-full transition-all duration-300", style: { width: `${uploadProgress}%` } }) }))] }), _jsx("button", { onClick: handleSupabaseIngest, disabled: isUploading, className: `mt-2 sm:mt-0 flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white shadow-sm transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${isUploading ? 'bg-slate-600' : 'bg-green-600 hover:bg-green-700'}`, children: isUploading ? (_jsx(RefreshCw, { className: "w-4 h-4 animate-spin" })) : ('Start Ingestion') })] }) }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden", children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 capitalize", children: activeTab === 'main' ? t('dbMainTitle') : t('dbRiderTitle') }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-4 w-4 text-slate-400" }) }), _jsx("input", { type: "text", placeholder: t('searchPlaceholder'), value: searchTerm, onChange: (e) => { setSearchTerm(e.target.value); setPage(1); }, className: "pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-slate-200", children: [_jsx("thead", { className: "bg-slate-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider", children: t('colAge') }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider", children: t('colGender') }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider", children: t('colName') }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider", children: t('colCode') }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider", children: t('colInterestPrem') }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider", children: "Pay/Cover" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider", children: t('colActions') })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-slate-200", children: paginatedData.length > 0 ? (paginatedData.map((row) => (_jsxs("tr", { className: "hover:bg-slate-50 group", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-slate-900", children: row.age }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize", children: row.gender }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-slate-900", children: row.segment }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-slate-500", children: row.segcode }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-900", children: row.interest.toLocaleString() }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500", children: [row.paymentTerm ? `${row.paymentTerm}y` : '-', " / ", row.coveragePeriod ? `${row.coveragePeriod}y` : '-'] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { onClick: () => handleEditClick(row), className: "text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded", title: t('editPolicy'), children: _jsx(Pencil, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => handleDeleteClick(row.key), className: "text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded", title: t('deletePolicy'), children: _jsx(Trash2, { className: "w-4 h-4" }) })] }) })] }, row.key)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "px-6 py-12 text-center text-sm text-slate-500", children: t('noRecords') }) })) })] }) }), totalPages > 1 && (_jsx("div", { className: "bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6 print:hidden", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx("button", { onClick: () => setPage(Math.max(1, page - 1)), disabled: page === 1, className: "relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50", children: t('btnPrevious') }), _jsxs("p", { className: "text-sm text-slate-700", children: [t('txtPage'), " ", _jsx("span", { className: "font-medium", children: page }), " ", t('txtOf'), " ", _jsx("span", { className: "font-medium", children: totalPages })] }), _jsx("button", { onClick: () => setPage(Math.min(totalPages, page + 1)), disabled: page === totalPages, className: "relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50", children: t('btnNext') })] }) }))] }), editingPolicy && (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", children: _jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", "aria-hidden": "true", onClick: () => setEditingPolicy(null) }), _jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "\u200B" }), _jsxs("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full", children: [_jsx("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: _jsx("div", { className: "sm:flex sm:items-start", children: _jsxs("div", { className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-slate-900", id: "modal-title", children: t('editPolicy') }), _jsxs("div", { className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { className: "col-span-2", children: [_jsx("label", { className: "block text-xs font-medium text-slate-500", children: t('keyReadOnly') }), _jsx("input", { type: "text", disabled: true, value: editForm.key, className: "mt-1 block w-full rounded bg-slate-100 border-slate-200 text-slate-500 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('colName') }), _jsx("input", { type: "text", value: editForm.segment, onChange: e => setEditForm({ ...editForm, segment: e.target.value }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('colCode') }), _jsx("input", { type: "text", value: editForm.segcode, onChange: e => setEditForm({ ...editForm, segcode: e.target.value }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('colAge') }), _jsx("input", { type: "number", value: editForm.age, onChange: e => setEditForm({ ...editForm, age: parseInt(e.target.value) }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('colGender') }), _jsxs("select", { value: editForm.gender, onChange: e => setEditForm({ ...editForm, gender: e.target.value }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm", children: [_jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('colInterestPrem') }), _jsx("input", { type: "number", step: "0.01", value: editForm.interest, onChange: e => setEditForm({ ...editForm, interest: parseFloat(e.target.value) }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('colBenefitBase') }), _jsx("input", { type: "number", value: editForm.benefit, onChange: e => setEditForm({ ...editForm, benefit: parseFloat(e.target.value) }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('paymentTerm') }), _jsx("input", { type: "number", value: editForm.paymentTerm || 0, onChange: e => setEditForm({ ...editForm, paymentTerm: parseFloat(e.target.value) }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: t('coveragePeriod') }), _jsx("input", { type: "number", value: editForm.coveragePeriod || 0, onChange: e => setEditForm({ ...editForm, coveragePeriod: parseFloat(e.target.value) }), className: "mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" })] })] })] }) }) }), _jsxs("div", { className: "bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [_jsx("button", { type: "button", onClick: handleSaveEdit, className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm", children: t('saveChanges') }), _jsx("button", { type: "button", onClick: () => setEditingPolicy(null), className: "mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm", children: t('cancel') })] })] })] }) }))] }));
};
export default Dashboard;
