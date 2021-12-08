import 'zx/globals';

async function rmdir(path) {
    const exists = await fs.pathExists(path);
    if(!exists) {
        return;
    }
    await fs.rmdir(path, {
        recursive: true
    });
}

await rmdir('./report');

await rmdir('./lib');

await rmdir('./docs');
