@echo off
title Training Institute Course Registration Database (crs_db)
color 0B
cls
echo ===============================================================================
echo            TRAINING INSTITUTE COURSE REGISTRATION SYSTEM (CRS) DATABASE
echo ===============================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "Write-Host '--- TABLE: COURSES ---' -ForegroundColor Yellow; ^
   $courses = Invoke-RestMethod -Uri 'http://localhost:8082/api/courses'; ^
   $courses | Format-Table -Property id, name, duration, description -AutoSize; ^
   Write-Host '--- TABLE: REGISTRATIONS ---' -ForegroundColor Green; ^
   $regs = Invoke-RestMethod -Uri 'http://localhost:8082/api/registrations'; ^
   $flat = $regs | ForEach-Object { [PSCustomObject]@{ ID=$_.id; StudentName=$_.studentName; Email=$_.email; CourseName=$_.course.name; Duration=$_.course.duration; RegisteredAt=$_.registrationDate; Status=$_.status } }; ^
   $flat | Format-Table -AutoSize"
echo.
echo ===============================================================================
echo Press any key to refresh database, or close this window to exit.
echo ===============================================================================
pause > nul
"%~f0"
