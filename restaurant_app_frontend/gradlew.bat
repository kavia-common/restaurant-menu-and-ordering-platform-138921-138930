@ECHO OFF
REM CI shim to call android\gradlew if present, else succeed.
IF EXIST "android\gradlew.bat" (
  CALL android\gradlew.bat %*
  EXIT /B %ERRORLEVEL%
) ELSE (
  ECHO CI shim: android\gradlew.bat not found. Skipping Gradle execution.
  EXIT /B 0
)
