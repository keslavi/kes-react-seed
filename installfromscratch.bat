@echo off
echo ========================================
echo Installing React Seed from Scratch
echo ========================================

echo.
echo 1. Cleaning up existing installation...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
)

echo.
echo 2. Installing main dependencies with latest versions...
npm install @emotion/react @emotion/styled @hookform/resolvers @mui/icons-material @mui/lab @mui/material @mui/styled-engine-sc @mui/x-data-grid @reduxjs/toolkit @vitejs/plugin-react-swc axios dayjs lodash moment react react-dom react-hook-form react-router-dom react-toastify sass vite vitest yup zustand msw

echo.
echo 3. Installing dev dependencies with latest versions...
npm install -D @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/react @types/react-dom @vitest/ui concurrently eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh happy-dom jsdom

echo.
echo 4. Installing server dependencies...
cd server-koa
if exist node_modules (
    echo Removing server node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing server package-lock.json...
    del package-lock.json
)
npm install koa koa-router koa-bodyparser koa-cors koa-static mongoose dotenv

echo.
echo 5. Building server...
npm run build
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start development:
echo   npm run dev
echo.
echo To start the server:
echo   cd server-koa && npm start
echo.
pause 