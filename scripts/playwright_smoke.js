import http from "node:http";
import { readFileSync, existsSync, createReadStream } from "node:fs";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const rootDir = resolve("dist");
const port = 4175;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

function startStaticServer() {
  const server = http.createServer((request, response) => {
    const urlPath = request.url === "/" ? "/index.html" : request.url;
    const filePath = join(rootDir, urlPath);

    if (!existsSync(filePath)) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type":
        contentTypes[extname(filePath)] ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  });

  return new Promise((resolveServer) => {
    server.listen(port, "127.0.0.1", () => resolveServer(server));
  });
}

async function assertVisible(page, text) {
  await page.getByText(text, { exact: false }).waitFor({ state: "visible" });
}

async function run() {
  const browser = await chromium.launch();
  const server = await startStaticServer();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`http://127.0.0.1:${port}`);

    await assertVisible(page, "AI 원어민 단어 퀴즈 쇼");
    await page.getByRole("button", { name: "단어 세트 관리" }).click();
    await page.getByRole("button", { name: "예시 단어 불러오기" }).click();
    await assertVisible(page, "apple");
    await page.getByRole("button", { name: "말하기 연습 시작" }).click();
    await assertVisible(page, "보고 말하기");

    await page.getByRole("button", { name: "마이크로 말하기" }).click();
    await assertVisible(page, "인식 상태:");

    await page.getByRole("button", { name: "홈으로" }).click();
    await page.getByRole("button", { name: "말하기 연습 열기" }).click();
    await assertVisible(page, "보고 말하기");

    await page.getByRole("button", { name: "홈으로" }).click();
    await page.getByRole("button", { name: "듣기 퀴즈 열기" }).click();
    await assertVisible(page, "듣고 뜻 고르기");

    await page.getByRole("button", { name: "다음 문제" }).isDisabled();
    console.log("playwright smoke: ok");
  } finally {
    await browser.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

run().catch((error) => {
  console.error("playwright smoke: failed");
  console.error(error);
  process.exitCode = 1;
});
