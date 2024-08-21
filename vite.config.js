import { globSync } from 'glob'
import { defineConfig } from 'vite'
import { relative, resolve, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  root: './src',
  publicDir: '../public',
  appType: 'mpa',
  server: {
    open: '/html/index.html',
  },
  build: {
    emptyOutDir: true,
    outDir: '../dist',
    assetsDir: './',
    rollupOptions: {
      input: Object.fromEntries(
        globSync('src/{html,js,css}/**/*.{html,js,scss}').map((file) => {
          console.log('file: ', file)
          return [
            // 这里将删除 `src/` 以及每个文件的扩展名。
            // 因此，例如 src/nested/foo.js 会变成 nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // 这里可以将相对路径扩展为绝对路径，例如
            // src/nested/foo 会变成 /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url)),
          ]
        }),
      ),
      output: {
        // format: 'es',
        // dir: 'dist',
        assetFileNames(assetInfo) {
          console.log('assetInfo: ', assetInfo)
          // 图片需单独处理，因为它的 `name` 不带路径，就算变成入口文件也依旧不带
          const imgExts = ['.ico', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']
          if (
            assetInfo.originalFileName &&
            imgExts.some((ext) => assetInfo.originalFileName.endsWith(ext))
          ) {
            const index = assetInfo.originalFileName.lastIndexOf('.')
            const assetName = assetInfo.originalFileName.slice(0, index)
            return `${assetName}-[hash][extname]`
          }
          return '[name]-[hash][extname]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@js': resolve(__dirname, 'src/js'),
      '@css': resolve(__dirname, 'src/css'),
      '@images': resolve(__dirname, 'src/images'),
    },
  },
})
