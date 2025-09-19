#!/usr/bin/env sh
# Portable Gradle launcher for CI environments lacking execute permissions.
# Usage in CI: sh ./run-gradle.sh <args>
if [ -f "./gradlew" ]; then
  # Execute gradlew with the current shell to bypass executable permission requirement
  /usr/bin/env sh ./gradlew "$@"
elif [ -f "./android/gradlew" ]; then
  /usr/bin/env sh ./android/gradlew "$@"
else
  echo "run-gradle.sh: gradle wrapper not found; skipping."
  exit 0
fi
