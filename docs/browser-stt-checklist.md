# Browser STT Validation Checklist

## Purpose

Use this checklist to validate microphone permission handling and browser speech recognition behavior on real devices after deployment or local launch.

## Target Browsers

- Chrome on macOS or Windows
- Edge on macOS or Windows
- Safari on macOS

## Before Testing

1. Launch the app over `http://127.0.0.1` or `localhost`, or over HTTPS.
2. Confirm the device has a working microphone input.
3. Close other apps that may exclusively hold the microphone.
4. Prepare a short vocabulary set such as `apple`, `banana`, `school`.

## Local Dev Launch

Use this local launch flow before manual QA:

1. Run `npm install` once if dependencies are not installed yet.
2. Run `npm run dev`.
3. Open the local URL shown by Vite. In most cases this is `http://127.0.0.1:5173` or `http://localhost:5173`.
4. Keep the terminal open during testing.

## Short QA Script

Use this exact short script for fast manual checks.

### Chrome quick script

1. Run `npm run dev`.
2. Open the Vite URL in Chrome.
3. Click `단어 세트 관리`.
4. Click `예시 단어 불러오기`.
5. Click `말하기 연습 시작`.
6. Click `마이크로 말하기`.
7. When Chrome asks for permission, click `허용`.
8. Say `apple` once.
9. Confirm the transcript updates and score changes only if the word is recognized correctly.
10. Click `다음 단어` and repeat once more.

Expected:

- The page shows `듣는 중...` while STT is active.
- The transcript changes from `아직 없음` to recognized text.
- Correct speech increments score once.
- If permission is denied, a microphone permission guidance card appears.

### Safari quick script

1. Run `npm run dev`.
2. Open the same Vite URL in Safari.
3. Click `단어 세트 관리`.
4. Click `예시 단어 불러오기`.
5. Click `말하기 연습 시작`.
6. Check whether the support notice and speaking screen allow STT.
7. Click `마이크로 말하기`.
8. If Safari asks for permission, click `허용` and say `apple` once.
9. If Safari does not support STT on that version, confirm the fallback guidance appears instead of a broken button flow.

Expected:

- Supported Safari builds should show transcript and scoring behavior similar to Chrome.
- Unsupported Safari builds should show a clean browser support fallback.
- Permission denial should show a permission guidance card.

## Shared Smoke Check

1. Open the home screen.
2. Confirm `TTS 사용 가능` and the browser support notice render.
3. Open `Teacher Mode`.
4. Load sample words or add at least 3 words manually.
5. Start `말하기 연습`.

Expected:

- The Speaking Quiz screen appears.
- The first word and its meaning are visible.
- The microphone action button is enabled in supported browsers.

## Chrome / Edge Real Device Check

1. Click `마이크로 말하기`.
2. When the browser asks for microphone permission, choose `Allow`.
3. Say the shown word clearly once.
4. Wait for recognition to stop.

Expected:

- The app shows `듣는 중...` during capture.
- The transcript area updates from `아직 없음` to recognized text.
- A correct pronunciation moves the card to a success state and increments score once.
- An incorrect pronunciation shows retry guidance without crashing.

Negative checks:

- Deny microphone permission and confirm the app shows a permission-specific help message.
- Disconnect or disable the microphone and confirm the app shows a device-related help message.

## Safari Real Device Check

1. Open Safari and load the same app URL.
2. Confirm whether `STT 사용 가능` appears.
3. Start `말하기 연습`.
4. Click `마이크로 말하기`.

If Safari prompts for permission:

1. Allow the microphone.
2. Say the shown word clearly.
3. Confirm whether transcript updates and scoring works.

If Safari does not support STT on that version or device:

- The app should show the unsupported-browser guidance instead of a broken interaction.

## Permission Recovery Check

1. Deny microphone access once.
2. Click the retry or microphone action again.
3. Re-enable the permission in browser site settings.
4. Reload the page and try again.

Expected:

- The app explains that microphone permission is needed.
- The app does not freeze or crash.
- After permission is restored, speaking mode works again.

## Device Missing Check

1. Disable or unplug the microphone.
2. Reload the page.
3. Open `말하기 연습`.
4. Click `마이크로 말하기`.

Expected:

- The app explains that no microphone input device is available.
- The UI still allows navigation back to the home screen or teacher mode.

## Pass Criteria

- Chrome or Edge completes one full speaking round with transcript and scoring.
- Permission denied shows a specific recovery message.
- Missing microphone shows a specific device message.
- Safari either completes the same round successfully or cleanly falls back to an unsupported-browser message.
