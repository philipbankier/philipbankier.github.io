import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const directory = "client/public/assets/img";
await mkdir(directory, { recursive: true });
for (const width of [320, 640, 960, 1122]) {
  await sharp("design-options/plumber-refined/portrait.png")
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${directory}/portrait-${width}.webp`);
}
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
<rect width="80" height="80" rx="12" fill="#d3dbd4"/>
<g fill="none" stroke="#a83225" stroke-width="5">
<circle cx="40" cy="40" r="27"/><path d="M40 13v54M13 40h54"/>
<circle cx="40" cy="40" r="7" fill="#d3dbd4"/></g></svg>`;
await writeFile("client/public/favicon.svg", icon);
await sharp(Buffer.from(icon))
  .resize(32, 32)
  .png()
  .toFile("client/public/favicon-32.png");
const socialBase = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#d3dbd4"/>
<g fill="#25332d" font-family="Arial, Helvetica, sans-serif">
<text x="72" y="200" font-size="72" font-weight="700">Philip Bankier</text>
<text x="72" y="292" font-size="28">Co-founder of Kairox AI.</text>
<text x="72" y="340" font-size="28">Building ActRun and writing The Living Edge.</text>
<text x="72" y="548" font-size="22">philipbankier.com</text>
</g><path d="M72 580H1128" stroke="#25332d"/></svg>`;
const portrait = await sharp("design-options/plumber-refined/portrait.png")
  .resize({ width: 425 })
  .png()
  .toBuffer();
await sharp(Buffer.from(socialBase))
  .composite([{ input: portrait, left: 700, top: 40, blend: "multiply" }])
  .jpeg({ quality: 88 })
  .toFile(`${directory}/social-card.jpg`);
