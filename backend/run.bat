@echo off
setlocal
cd /d "%~dp0"

REM Prefer Java 21 if Eclipse Temurin JRE exists
set "ECLIPSE_JRE=C:\Users\mylov\Downloads\eclipse-jee-2025-09-R-win32-x86_64\eclipse\plugins\org.eclipse.justj.openjdk.hotspot.jre.full.win32.x86_64_21.0.8.v20250724-1412\jre"
if exist "%ECLIPSE_JRE%\bin\java.exe" (
  set "JAVA_HOME=%ECLIPSE_JRE%"
  set "PATH=%JAVA_HOME%\bin;%PATH%"
)

echo Using Java:
java -version

echo.
echo Building JAR...
call mvnw.cmd -DskipTests package
if errorlevel 1 (
  echo BUILD FAILED
  pause
  exit /b 1
)

echo.
echo Starting backend on http://localhost:8080 ...
java -jar "target\menu-0.0.1-SNAPSHOT.jar"
pause
