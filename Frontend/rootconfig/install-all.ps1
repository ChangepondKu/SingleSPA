# Get the script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Output "Installing dependencies for all sub-applications..."

# Navigate to the project root directory (parent of root-config)
Set-Location $ScriptDir\.. 

# Iterate through all directories except 'root-config' and install dependencies
Get-ChildItem -Directory | Where-Object { $_.Name -ne "root-config" } | ForEach-Object {
    Write-Output "Installing dependencies in $($_.FullName)"
    Set-Location $_.FullName
    npm install --legacy-peer-deps
}

# Return to root-config and install dependencies
Write-Output "Installing dependencies in root-config..."
Set-Location $ScriptDir
npm install --legacy-peer-deps

Write-Output "All dependencies installed successfully!"
