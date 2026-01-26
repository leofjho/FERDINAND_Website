import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/images/project-section';
const maxSizeBytes = 2 * 1024 * 1024; // 2MB

async function compressImage(filePath) {
  const fileName = path.basename(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  const stats = fs.statSync(filePath);
  const outputPath = path.join(inputDir, `${baseName}.webp`);

  console.log(`Processing: ${fileName} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

  // Convert to WebP and compress
  let quality = 85;
  let outputBuffer;

  while (quality >= 30) {
    outputBuffer = await sharp(filePath)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    if (outputBuffer.length <= maxSizeBytes) {
      break;
    }
    quality -= 5;
  }

  // If still too large, resize further
  if (outputBuffer.length > maxSizeBytes) {
    outputBuffer = await sharp(filePath)
      .resize(1600, null, { withoutEnlargement: true })
      .webp({ quality: 70 })
      .toBuffer();
  }

  fs.writeFileSync(outputPath, outputBuffer);
  const newStats = fs.statSync(outputPath);
  console.log(`  ✓ Saved as WebP: ${(newStats.size / 1024 / 1024).toFixed(2)} MB (quality: ${quality})`);
}

async function main() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));

  for (const file of files) {
    try {
      await compressImage(path.join(inputDir, file));
    } catch (err) {
      console.log(`  ✗ Failed: ${err.message}`);
    }
  }

  // Clean up old files
  console.log('\nCleaning up...');
  const oldFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.avif') || f.endsWith('.jpg'));
  for (const file of oldFiles) {
    fs.unlinkSync(path.join(inputDir, file));
    console.log(`  Removed: ${file}`);
  }

  console.log('\nDone!');
}

main().catch(console.error);
