# src = source directory
# trg = target directory... this file's location
# make a powershell script that will
# -ask for the source (src) directory 
#   -remember the src as default for next time
# -using robocopy, copy only newer files that also exist in src to target (trg)... this file's location.
#   -use .gitignore to exclude files from the copy
#   -only need the summary of the copy, not the detailed output
# -once complete, copy files that exist in src and trg, but are newer in trg to ./trg/../$(Split-Path $trgPath -Leaf)-unedited
#   -also list the files that were copied to ./trg../$(Split-Path $trgPath -Leaf)-unedited

param(
    [string]$srcPath = "",
    [switch]$Help
)

# Clear the terminal screen
Clear-Host

# Display help information
if ($Help) {
    Write-Host "copy-seed.ps1 - File synchronization script" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage: .\copy-seed.ps1 [SourcePath]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Parameters:" -ForegroundColor Yellow
    Write-Host "  SourcePath    Optional source directory path" -ForegroundColor White
    Write-Host "  -Help         Show this help message" -ForegroundColor White
    Write-Host ""
    Write-Host "Features:" -ForegroundColor Yellow
    Write-Host "  - Remembers last used source directory" -ForegroundColor White
    Write-Host "  - Uses robocopy for efficient file copying" -ForegroundColor White
    Write-Host "  - Respects .gitignore exclusions" -ForegroundColor White
    Write-Host "  - Creates $(Split-Path $trgPath -Leaf)-unedited folder for reverse synchronization" -ForegroundColor White
    exit 0
}

# Configuration
$configFile = Join-Path $PSScriptRoot "copy-seed-config.json"
$trgPath = $PSScriptRoot
$srcUneditedPath = Join-Path (Split-Path $trgPath -Parent) "$(Split-Path $trgPath -Leaf)-unedited"

# Function to get or set default source path
function Get-DefaultSourcePath {
    if (Test-Path $configFile) {
        try {
            $config = Get-Content $configFile -Raw | ConvertFrom-Json
            return $config.DefaultSourcePath
        }
        catch {
            Write-Warning "Could not read config file: $($_.Exception.Message)"
        }
    }
    return ""
}

function Set-DefaultSourcePath {
    param([string]$Path)
    try {
        $config = @{
            DefaultSourcePath = $Path
            LastUpdated = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }
        $config | ConvertTo-Json | Set-Content $configFile
    }
    catch {
        Write-Warning "Could not save config file: $($_.Exception.Message)"
    }
}

# Function to get .gitignore exclusions
function Get-GitignoreExclusions {
    param([string]$srcPath)
    
    $gitignorePath = Join-Path $srcPath ".gitignore"
    $exclusions = @()
    
    if (Test-Path $gitignorePath) {
        $gitignoreContent = Get-Content $gitignorePath
        foreach ($line in $gitignoreContent) {
            $line = $line.Trim()
            if ($line -and !$line.StartsWith("#")) {
                # Convert .gitignore patterns to robocopy exclusions
                if ($line.StartsWith("/")) {
                    $exclusions += "/XD:$($line.Substring(1))"
                }
                elseif ($line.EndsWith("/")) {
                    $exclusions += "/XD:$($line.TrimEnd('/'))"
                }
                else {
                    $exclusions += "/XF:$line"
                }
            }
        }
    }
    
    # Add common exclusions
    $exclusions += @("/XD:.git", "/XD:node_modules", "/XD:.vscode", "/XD:.idea", "/XD:dist", "/XD:build")
    
    return $exclusions
}

# Function to perform robocopy with exclusions
function Invoke-RobocopySync {
    param(
        [string]$src,
        [string]$trg,
        [array]$Exclusions
    )
    
    $robocopyArgs = @($src, $trg, "/E", "/XO", "/R:3", "/W:1", "/NFL", "/NDL", "/NJH", "/NJS", "/NC", "/NS", "/NP")
    $robocopyArgs += $Exclusions
    
    Write-Host "Synchronizing files from '$src' to '$trg'..." -ForegroundColor Cyan
    Write-Host "Exclusions: $($Exclusions -join ' ')" -ForegroundColor Gray
    
    $process = Start-Process -FilePath "robocopy" -ArgumentList $robocopyArgs -Wait -PassThru -NoNewWindow
    
    # Robocopy exit codes: 0-7 are success, 8+ are errors
    if ($process.ExitCode -ge 8) {
        Write-Warning "Robocopy completed with warnings/errors (Exit Code: $($process.ExitCode))"
    }
    else {
        Write-Host "Robocopy completed successfully (Exit Code: $($process.ExitCode))" -ForegroundColor Green
    }
    
    return $process.ExitCode
}

# Function to find and copy newer files from target back to $(Split-Path $trgPath -Leaf)-unedited
function Copy-NewerFilesToSrcUnedited {
    param(
        [string]$src,
        [string]$trg,
        [string]$SrcUnedited
    )
    
    if (!(Test-Path $SrcUnedited)) {
        New-Item -ItemType Directory -Path $SrcUnedited -Force | Out-Null
        Write-Host "Created $(Split-Path $trgPath -Leaf)-unedited directory: $SrcUnedited" -ForegroundColor Green
    }
    
    $copiedFiles = @()
    
    # Get all files in target that also exist in source
    $trgFiles = Get-ChildItem -Path $trg -Recurse -File | Where-Object {
        $relativePath = $_.FullName.Substring($trg.Length + 1)
        $srcFile = Join-Path $src $relativePath
        Test-Path $srcFile
    }
    
    foreach ($trgFile in $trgFiles) {
        $relativePath = $trgFile.FullName.Substring($trg.Length + 1)
        $srcFile = Join-Path $src $relativePath
        
        # Compare modification times
        $trgTime = $trgFile.LastWriteTime
        $srcTime = (Get-Item $srcFile).LastWriteTime
        
        if ($trgTime -gt $srcTime) {
            $destPath = Join-Path $SrcUnedited $relativePath
            $destDir = Split-Path $destPath -Parent
            
            if (!(Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }
            
            Copy-Item $trgFile.FullName $destPath -Force
            $copiedFiles += $relativePath
        }
    }
    
    return $copiedFiles
}

# Main execution
try {
    # Get source path
    if ([string]::IsNullOrEmpty($srcPath)) {
        $defaultSource = Get-DefaultSourcePath
        if (![string]::IsNullOrEmpty($defaultSource)) {
            $prompt = "Enter source directory path (default: '$defaultSource'): "
        }
        else {
            $prompt = "Enter source directory path: "
        }
        
        $srcPath = Read-Host $prompt
        
        if ([string]::IsNullOrEmpty($srcPath) -and ![string]::IsNullOrEmpty($defaultSource)) {
            $srcPath = $defaultSource
        }
    }
    
    # Validate source path
    if ([string]::IsNullOrEmpty($srcPath) -or !(Test-Path $srcPath)) {
        Write-Error "Invalid or empty source path: '$srcPath'"
        exit 1
    }
    
    $srcPath = Resolve-Path $srcPath
    
    # Save as default for next time
    Set-DefaultSourcePath $srcPath
    
    Write-Host "Source: $srcPath" -ForegroundColor Green
    Write-Host "Target: $trgPath" -ForegroundColor Green
    Write-Host "$(Split-Path $trgPath -Leaf)-unedited: $srcUneditedPath" -ForegroundColor Green
    Write-Host ""
    
    # Get exclusions from .gitignore
    $exclusions = Get-GitignoreExclusions $srcPath
    
    # Perform initial sync (source to target)
    $exitCode = Invoke-RobocopySync $srcPath $trgPath $exclusions
    
    Write-Host ""
    
    # Copy newer files from target back to $(Split-Path $trgPath -Leaf)-unedited
    Write-Host "Checking for files newer in target..." -ForegroundColor Cyan
    $copiedFiles = Copy-NewerFilesToSrcUnedited $srcPath $trgPath $srcUneditedPath
    
    if ($copiedFiles.Count -gt 0) {
        Write-Host "Copied $($copiedFiles.Count) newer files to $(Split-Path $trgPath -Leaf)-unedited:" -ForegroundColor Yellow
        foreach ($file in $copiedFiles) {
            Write-Host "  $file" -ForegroundColor White
        }
    }
    else {
        Write-Host "No files were newer in target directory." -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Synchronization complete!" -ForegroundColor Green
}
catch {
    Write-Error "An error occurred: $($_.Exception.Message)"
    exit 1
}
