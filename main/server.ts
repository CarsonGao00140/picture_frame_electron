import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from '@koa/router';
import multer from "@koa/multer";
import mime from 'mime';

export default (imagesDir: string, port: number) => {
    const app = new Koa();
    const router = new Router();

    router.get('/images', async (ctx) => {
        const files = await fs.promises.readdir(imagesDir);
        const images = files.filter(file => mime.getType(file) === 'image/avif');
        ctx.body = { images };
    });

    router.get('/image/:name', async (ctx) => {
        const name = path.basename(ctx.params['name']!);
        const imagePath = path.join(imagesDir, `${name}.avif`);

        try {
            const imageData = await fs.promises.readFile(imagePath);
            ctx.type = 'image/avif';
            ctx.body = imageData;
        } catch {
            ctx.status = 404;
            ctx.body = { error: "Image not found" };
        }
    });

    router.post('/images')

    app.use(router.routes());
    app.use(router.allowedMethods());
    
    return app.listen(port, () => {
        console.log(`Koa server running at http://localhost:${port}`);
    });
}
