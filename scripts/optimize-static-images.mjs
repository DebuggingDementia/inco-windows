import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

const QUALITY = 84;
const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;

const EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
]);

// Files that should remain in their original format.
// Keep the social preview image unchanged.
const EXCLUDED_FILES = new Set([
  'Background gradient main page(1).png',
]);

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.css',
  '.scss',
  '.html',
]);

const dryRun = process.argv.includes('--dry-run');


async function walk(directory) {
  const entries = await fs.readdir(
    directory,
    {
      withFileTypes: true,
    }
  );

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      files.push(
        ...(await walk(fullPath))
      );

      continue;
    }

    files.push(fullPath);
  }

  return files;
}


async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}


function toPublicUrl(filePath) {
  const relative = path.relative(
    path.join(ROOT, 'public'),
    filePath
  );

  return (
    '/' +
    relative
      .split(path.sep)
      .join('/')
  );
}


async function optimizeImage(source) {
  const parsed = path.parse(source);

  const destination = path.join(
    parsed.dir,
    `${parsed.name}.webp`
  );

  const oldUrl = toPublicUrl(source);
  const newUrl = toPublicUrl(destination);

  if (dryRun) {
    const size = (
      await fs.stat(source)
    ).size;

    console.log(
      `WOULD OPTIMIZE: ${oldUrl} ` +
      `(${(size / 1024).toFixed(1)} KB)`
    );

    return {
      source,
      destination,
      oldUrl,
      newUrl,
    };
  }

  const before = (
    await fs.stat(source)
  ).size;

  let shouldGenerate = true;

  if (await fileExists(destination)) {
    const sourceStat = await fs.stat(source);
    const destinationStat =
      await fs.stat(destination);

    shouldGenerate =
      sourceStat.mtimeMs >
      destinationStat.mtimeMs;
  }

  if (shouldGenerate) {
    await sharp(source)
      .rotate()
      .resize({
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: QUALITY,
        alphaQuality: 100,
        effort: 6,
      })
      .toFile(destination);
  }

  const after = (
    await fs.stat(destination)
  ).size;

  const reduction =
    before > 0
      ? ((before - after) / before) * 100
      : 0;

  console.log(
    `OK: ${oldUrl}\n` +
    `    ${(before / 1024).toFixed(1)} KB` +
    ` -> ${(after / 1024).toFixed(1)} KB` +
    ` (${reduction.toFixed(1)}% smaller)`
  );

  return {
    source,
    destination,
    oldUrl,
    newUrl,
  };
}


async function updateReferences(mappings) {
  const targets = [];

  const srcDirectory = path.join(
    ROOT,
    'src'
  );

  if (await fileExists(srcDirectory)) {
    const srcFiles = await walk(
      srcDirectory
    );

    targets.push(...srcFiles);
  }

  const indexHtml = path.join(
    ROOT,
    'index.html'
  );

  if (await fileExists(indexHtml)) {
    targets.push(indexHtml);
  }

  let changedFiles = 0;
  let changedReferences = 0;

  for (const file of targets) {
    const extension = path
      .extname(file)
      .toLowerCase();

    if (
      file !== indexHtml &&
      !TEXT_EXTENSIONS.has(extension)
    ) {
      continue;
    }

    let content;

    try {
      content = await fs.readFile(
        file,
        'utf8'
      );
    } catch {
      continue;
    }

    let updated = content;

    for (const mapping of mappings) {
      const replacements = [
        [
          mapping.oldUrl,
          mapping.newUrl,
        ],
        [
          mapping.oldUrl.slice(1),
          mapping.newUrl.slice(1),
        ],
        [
          encodeURI(mapping.oldUrl),
          encodeURI(mapping.newUrl),
        ],
      ];

      for (
        const [oldValue, newValue]
        of replacements
      ) {
        if (updated.includes(oldValue)) {
          const occurrences =
            updated.split(oldValue).length - 1;

          changedReferences += occurrences;

          updated = updated.replaceAll(
            oldValue,
            newValue
          );
        }
      }
    }

    if (updated !== content) {
      changedFiles += 1;

      if (!dryRun) {
        await fs.writeFile(
          file,
          updated,
          'utf8'
        );
      }

      console.log(
        `${dryRun ? 'WOULD UPDATE' : 'UPDATED'}: ` +
        path.relative(ROOT, file)
      );
    }
  }

  return {
    changedFiles,
    changedReferences,
  };
}


async function main() {
  console.log('');
  console.log(
    'INCO Static Image Optimization'
  );

  console.log(
    `Quality: ${QUALITY}`
  );

  console.log(
    `Maximum size: ` +
    `${MAX_WIDTH}x${MAX_HEIGHT}`
  );

  if (dryRun) {
    console.log(
      'DRY RUN — no files will be changed.'
    );
  }

  console.log('');

  const allFiles = await walk(
    IMAGES_DIR
  );

  const candidates = allFiles.filter(
    (file) => {
      const extension = path
        .extname(file)
        .toLowerCase();

      const filename = path.basename(
        file
      );

      return (
        EXTENSIONS.has(extension) &&
        !EXCLUDED_FILES.has(filename)
      );
    }
  );

  const mappings = [];

  let beforeTotal = 0;
  let afterTotal = 0;

  for (const source of candidates) {
    const before = (
      await fs.stat(source)
    ).size;

    const mapping =
      await optimizeImage(source);

    mappings.push(mapping);

    beforeTotal += before;

    if (
      !dryRun &&
      await fileExists(
        mapping.destination
      )
    ) {
      afterTotal += (
        await fs.stat(
          mapping.destination
        )
      ).size;
    }
  }

  console.log('');
  console.log(
    'Updating frontend references...'
  );

  const references =
    await updateReferences(
      mappings
    );

  console.log('');
  console.log(
    'Optimization complete'
  );

  console.log(
    `Images found: ${candidates.length}`
  );

  console.log(
    `Source files updated: ` +
    `${references.changedFiles}`
  );

  console.log(
    `References updated: ` +
    `${references.changedReferences}`
  );

  if (!dryRun) {
    const beforeMb =
      beforeTotal / 1024 / 1024;

    const afterMb =
      afterTotal / 1024 / 1024;

    const savedMb =
      beforeMb - afterMb;

    const reduction =
      beforeTotal > 0
        ? (
            (beforeTotal - afterTotal) /
            beforeTotal
          ) * 100
        : 0;

    console.log('');
    console.log(
      `Original: ${beforeMb.toFixed(2)} MB`
    );

    console.log(
      `WebP:     ${afterMb.toFixed(2)} MB`
    );

    console.log(
      `Saved:    ${savedMb.toFixed(2)} MB ` +
      `(${reduction.toFixed(1)}%)`
    );
  }

  console.log('');
}


main().catch((error) => {
  console.error(error);
  process.exit(1);
});