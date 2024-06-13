import { watch } from 'chokidar';

export const initWatcher = (callback) => {
    const watcher = watch(process.env.SERVER_PROPERTIES, {
        ignored: /(^|[\/\\])\../,
        persistent: true
    });

    watcher.on('change', async function() {
        await callback();
    });
};