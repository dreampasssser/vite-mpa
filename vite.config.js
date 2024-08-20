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
        globSync('src/{html,js,css,images}/**/*.{html,js,scss,ico,png,jpg,jpeg,webp,gif,svg}').map(
          (file) => {
            console.log('file: ', file)
            // console.log('import.meta.url: ', import.meta.url)

            return [
              // 这里将删除 `src/` 以及每个文件的扩展名。
              // 因此，例如 src/nested/foo.js 会变成 nested/foo
              relative('src', file.slice(0, file.length - extname(file).length)),
              // 这里可以将相对路径扩展为绝对路径，例如
              // src/nested/foo 会变成 /project/src/nested/foo.js
              fileURLToPath(new URL(file, import.meta.url)),
            ]
          },
        ),
      ),
      // output: {
      //   // format: 'es',
      //   // dir: 'dist',
      //   entryFileNames(chunkInfo) {
      //     // console.log('chunkInfo: ', chunkInfo)
      //     if (chunkInfo.facadeModuleId.endsWith('.js')) {
      //       return '[name]-[hash].js'
      //     }
      //     const imgExts = ['.ico', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']
      //     if (imgExts.some((ext) => chunkInfo.facadeModuleId.endsWith(ext))) {
      //       console.log('chunkInfo.name: ', chunkInfo.name)
      //       const ext = chunkInfo.facadeModuleId.slice(chunkInfo.facadeModuleId.lastIndexOf('.'))
      //       console.log('ext: ', ext)
      //       return `${chunkInfo.name}${ext}`
      //     }
      //     return '[name]'
      //   },
      //   assetFileNames(assetInfo) {
      //     console.log('assetInfo: ', assetInfo)
      //     // if (/\.(ico|png|jp?g|webp|gif|svg)$/.test(assetInfo.name)) {
      //     //   return 'images/[name]-[hash][extname]'
      //     // }
      //     // if (/\.css$/.test(assetInfo.name)) {
      //     //   return 'css/[name]-[hash][extname]'
      //     // }
      //     return '[name]-[hash][extname]'
      //   },
      // },
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
