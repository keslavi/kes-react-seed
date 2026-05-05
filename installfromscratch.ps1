Write-Host "========================================" -ForegroundColor Green
Write-Host "Installing React Seed from Scratch" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host ""
Write-Host "1. Cleaning up existing installation..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "Removing node_modules..." -ForegroundColor Cyan
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..." -ForegroundColor Cyan
    Remove-Item package-lock.json -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "2. Installing main dependencies with latest versions..." -ForegroundColor Yellow
npm install @emotion/react @emotion/styled @hookform/resolvers @mui/icons-material @mui/lab @mui/material @mui/styled-engine-sc @mui/x-data-grid @reduxjs/toolkit @vitejs/plugin-react-swc axios dayjs lodash moment react react-dom react-hook-form react-router-dom react-toastify sass vite vitest yup zustand msw

Write-Host ""
Write-Host "3. Installing dev dependencies with latest versions..." -ForegroundColor Yellow
npm install -D @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/react @types/react-dom @vitest/ui concurrently eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh happy-dom jsdom

Write-Host ""
Write-Host "4. Installing server dependencies..." -ForegroundColor Yellow
Set-Location server-koa
if (Test-Path "node_modules") {
    Write-Host "Removing server node_modules..." -ForegroundColor Cyan
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Write-Host "Removing server package-lock.json..." -ForegroundColor Cyan
    Remove-Item package-lock.json -ErrorAction SilentlyContinue
}
npm install koa koa-router koa-bodyparser koa-cors koa-static mongoose dotenv

Write-Host ""
Write-Host "5. Building server..." -ForegroundColor Yellow
npm run build
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start development:" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "To start the server:" -ForegroundColor White
Write-Host "  cd server-koa && npm start" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to continue" 