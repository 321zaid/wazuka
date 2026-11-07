@echo off
cd C:\my web\wazuka
rm -f test-results\*.png
timeout 2 > NUL
"%SystemRoot%\system32\cmd.exe" /c "npm run dev" &
timeout 5
echo.
echo === Running tests ===
node test_features.cjs
echo.
echo === Tests complete ===