# 拼音练习

面向初学儿童的 **汉语拼音互动练习** 网页：听读音、选答案，支持目标分数与闯关成功反馈。界面为中文，适配手机与桌面浏览器。

## 功能概览

| 模块 | 说明 |
|------|------|
| **首页** | 选择进入第一关或第二关（不展示累计得分） |
| **目标分数** | 选关后可选择目标 **10 / 20 / 30 / 50** 分，进入关卡后得分从 0 开始 |
| **第一关** | 听音节选答案：可练习 **声母 / 韵母 / 整体认读 / 混合**；四选一，选对得分 |
| **第二关** | 显示单个汉字，听完整音节读音，在 **声母** 与 **韵母** 中各选一项（含三拼音节，如 `iang`、`uang`） |
| **闯关成功** | 得分达到目标后出现庆祝页，并播放成功音效 |

读音使用 [pinyin-voice](https://www.npmjs.com/package/pinyin-voice) 的预录 MP3（非浏览器 TTS），避免拉丁字母被读成英文字母。

## 技术栈

- **Vite 8** + **TypeScript**
- 纯前端，无需后端；静态资源可部署到任意静态托管（GitHub Pages、Vercel、Netlify 等）

## 本地运行

**环境要求：** Node.js 18+（推荐 LTS）

```bash
git clone <你的仓库地址>.git
cd pinyin
npm install
npm run dev
```

浏览器访问终端提示的地址（一般为 `http://localhost:5173`）。首次安装会通过 `postinstall` 将 `pinyin-voice` 的音频复制到 `public/pinyin-voice/`。

## 构建与预览

```bash
npm run build
npm run preview
```

产物在 `dist/` 目录，可将该目录作为静态站点根目录部署。

## 项目结构（节选）

```
src/
  main.ts           # 页面与关卡逻辑
  data/             # 拼音表、第二关字库等
  audio/            # 播放封装、音效
  game/             # 第二关选项生成
scripts/
  copy-pinyin-voice.cjs  # 复制 npm 包内 mp3 到 public
```

## 说明

- 音频文件体积较大，`public/pinyin-voice` 通常已加入 `.gitignore`；克隆后务必执行 **`npm install`** 以生成该目录。
- `vite.config.ts` 中已开启 `server.host: true`，便于在本机或局域网调试。

## 许可证

依赖包（如 `pinyin-voice`）请遵循其各自许可证；本项目代码可按需自行添加许可证文件。
