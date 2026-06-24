#!/usr/bin/env bash
# Sync .env.local → AWS Amplify environment variables
# Usage: ./scripts/sync-env.sh <APP_ID>
# Requires: aws CLI configured (aws configure)

set -e

APP_ID="${1:-$AMPLIFY_APP_ID}"

if [ -z "$APP_ID" ]; then
  echo "Error: provide App ID as argument or set AMPLIFY_APP_ID"
  echo "  Usage: ./scripts/sync-env.sh d1abc2xyz3"
  echo "  Find it: AWS Amplify Console → App settings → General"
  exit 1
fi

ENV_FILE=".env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found"
  exit 1
fi

# Parse .env.local into KEY=VALUE pairs (skip comments and empty lines)
ENV_VARS=""
while IFS= read -r line || [ -n "$line" ]; do
  # Skip comments and empty lines
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ -z "${line// }" ]] && continue

  # Strip surrounding quotes from value
  key="${line%%=*}"
  value="${line#*=}"
  value="${value%\"}"
  value="${value#\"}"
  value="${value%\'}"
  value="${value#\'}"

  if [ -n "$ENV_VARS" ]; then
    ENV_VARS="${ENV_VARS},${key}=${value}"
  else
    ENV_VARS="${key}=${value}"
  fi
done < "$ENV_FILE"

echo "Syncing $(echo "$ENV_VARS" | tr ',' '\n' | wc -l) variables to Amplify app: $APP_ID"

aws amplify update-app \
  --app-id "$APP_ID" \
  --environment-variables "$ENV_VARS" \
  --query 'app.environmentVariables' \
  --output table

echo "Done. Trigger a new deploy for changes to take effect."
