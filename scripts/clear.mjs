import 'zx/globals';

async function rmdir(path) {
    const exists = await fs.pathExists(path);
    if (!exists) {
        return;
    }
    await fs.rm(path, {
        recursive: true
    });
}

const dirs = argv._.slice(1);

for (let dir of dirs) {
    await rmdir(dir);
}
