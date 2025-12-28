# PowerShell Script to Clean the Workbench safely
# Usage: ./scripts/reset-workbench.ps1

$baseDir = "content"
$workbench = "$baseDir/test-articles"
$archive = "$baseDir/_draft_archive"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$archiveFolder = "$archive/$timestamp"

# Check if workbench exists
if (Test-Path $workbench) {
    $files = Get-ChildItem -Path $workbench -File
    
    if ($files.Count -gt 0) {
        Write-Host "[INFO] Found $($files.Count) files in workbench. Archiving..." -ForegroundColor Yellow
        
        # Create timestamped archive folder
        New-Item -ItemType Directory -Force -Path $archiveFolder | Out-Null
        
        # Move files
        Move-Item -Path "$workbench/*" -Destination $archiveFolder
        
        Write-Host "[SUCCESS] Workbench cleared." -ForegroundColor Green
        Write-Host "[INFO] Files moved to: $archiveFolder" -ForegroundColor Gray
    } else {
        Write-Host "[INFO] Workbench is already clean." -ForegroundColor Green
    }
} else {
    New-Item -ItemType Directory -Force -Path $workbench | Out-Null
    Write-Host "[SUCCESS] Created new workbench directory." -ForegroundColor Green
}