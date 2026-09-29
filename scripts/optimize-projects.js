const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/projects');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && !f.startsWith('_'));

async function optimizeImages() {
  console.log('--- Optimizing Project Images (HD Preserved, Max 2560px, WebP Q85, Effort 6) ---');
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const statBefore = fs.statSync(filePath);
    totalBefore += statBefore.size;

    const inputBuffer = fs.readFileSync(filePath);
    const image = sharp(inputBuffer);
    const meta = await image.metadata();

    // Max 2560px width or height (2K HD boundary)
    const MAX_DIM = 2560;
    let resizeOptions = null;
    if (meta.width > MAX_DIM || meta.height > MAX_DIM) {
      if (meta.width >= meta.height) {
        resizeOptions = { width: MAX_DIM, withoutEnlargement: true, fit: 'inside' };
      } else {
        resizeOptions = { height: MAX_DIM, withoutEnlargement: true, fit: 'inside' };
      }
    }

    let pipeline = sharp(inputBuffer);
    if (resizeOptions) {
      pipeline = pipeline.resize(resizeOptions);
    }

    const buffer = await pipeline
      .webp({
        quality: 85,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();

    // Only overwrite if it's smaller or equal, or if we resized
    if (buffer.length < statBefore.size || resizeOptions) {
      fs.writeFileSync(filePath, buffer);
      totalAfter += buffer.length;
      const newMeta = await sharp(filePath).metadata();
      const pct = (((statBefore.size - buffer.length) / statBefore.size) * 100).toFixed(1);
      console.log(
        `✓ ${file.padEnd(28)} : ${(statBefore.size / 1024).toFixed(0).padStart(5)} KB (${meta.width}x${meta.height}) -> ${(buffer.length / 1024).toFixed(0).padStart(4)} KB (${newMeta.width}x${newMeta.height}) [Saved ${pct}%]`
      );
    } else {
      totalAfter += statBefore.size;
      console.log(`- ${file.padEnd(28)} : Already optimal (${(statBefore.size / 1024).toFixed(0)} KB)`);
    }
  }

  console.log('---------------------------------------------------------------------------------');
  console.log(
    `TOTAL: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB -> ${(totalAfter / (1024 * 1024)).toFixed(2)} MB (Saved ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`
  );
}

optimizeImages().catch(err => {
  console.error(err);
  process.exit(1);
});
