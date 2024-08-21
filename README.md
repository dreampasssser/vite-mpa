用 `vite` 实现多页面应用程序的打包，并保持目录结构。

存在的问题（vite@5.4.1）：

- `html`、`css`、`js` 可以转到目标目录，但图片不支持转到嵌套的目录。【已解决】

  vite@5.4.2新增了 `originalFileName`，可以在 `output.assetFileNames` 中用 `originalFileName` 解决。

- `html` 中对 `css`、`js`、`img` 的引用需使用相对路径，若使用别名，打包能识别，但开发环境无法识别。【待解决】

- `js` 文件生成的路径是反斜杠。但好像不影响正常使用。
