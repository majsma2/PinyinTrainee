# 拼音练习 · PinyinTrainee

本项目完全使用Cursor搭建
面向初学儿童的 **汉语拼音互动练习** 网页：听读音、选答案，支持目标分数与闯关成功反馈。界面为中文，适配手机与桌面浏览器。

仓库地址：<https://github.com/majsma2/PinyinTrainee>

## 功能概览

| 模块 | 说明 |
|------|------|
| **首页** | 选择进入第一～四关（不展示累计得分） |
| **目标分数** | 选关后可选择目标 **10 / 20 / 30 / 50** 分，进入关卡后得分从 0 开始 |
| **第一关** | 听音节选答案：可练习 **声母 / 韵母 / 整体认读 / 混合**；四选一，选对得分 |
| **第二关** | 显示单个汉字，听完整音节读音，在 **声母** 与 **韵母** 中各选一项（含三拼音节，如 `iang`、`uang`） |
| **第三关** | 与第二关相同字库与读音；**不**给声母韵母选项，用 **全键盘** 输入拼音音节，**无需输入声调** |
| **第四关** | 与第三关相同输入方式，但 **不播放读音**；字库为生僻复杂字（如龘、鷟），凭字形输入无调拼音 |
| **闯关成功** | 得分达到目标后出现庆祝页，并播放成功音效 |

读音使用 [pinyin-voice](https://www.npmjs.com/package/pinyin-voice) 的预录 MP3

## 技术栈

- **Vite 8** + **TypeScript**
- 纯前端，无需后端；静态资源可部署到任意静态托管（GitHub Pages、Vercel、Netlify 等）

## 本地运行

**环境要求：** **Node.js ≥ 20.19**（Vite 8 官方要求；低于 20 会报错且无法启动 `vite`）

```bash
git clone https://github.com/majsma2/PinyinTrainee.git
cd PinyinTrainee
npm install
npm run dev
```

浏览器访问终端提示的地址（一般为 `http://localhost:5173`）。首次安装会通过 `postinstall` 将 `pinyin-voice` 的音频复制到 `public/pinyin-voice/`。

### Linux / 服务器上 Node 版本过低时

若 `node -v` 仍为 16.x 等，请先升级 Node 再执行 `npm install`。例如用 **nvm** 安装 20 LTS：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# 重新登录 shell 或执行：source ~/.nvm/nvm.sh
nvm install 20
nvm use 20
node -v   # 应显示 v20.x
cd ~/PinyinTrainee && npm install && npm run dev
```

对外访问开发服务器时，需保证 Vite 监听 `0.0.0.0`（本仓库 `vite.config.ts` 已设置 `server.host: true`），并在防火墙/安全组放行 **5173** 端口。

## 构建与预览

```bash
npm run build
npm run preview
```

产物在 `dist/` 目录，可将该目录作为静态站点根目录部署。

## Docker

镜像内为 **多阶段构建**：Node 执行 `npm ci` 与 `npm run build`，再用 **Nginx** 托管 `dist`（端口 **80**）。构建时会自动复制 `pinyin-voice` 音频进静态资源。

```bash
docker build -t pinyin-trainee .
docker run --rm -p 8080:80 pinyin-trainee
```

浏览器访问 <http://localhost:8080>。

或使用 Compose：

```bash
docker compose up --build
```

默认同样映射为 `8080:80`，见仓库根目录 [`docker-compose.yml`](docker-compose.yml)。

## 项目结构（节选）

```
src/
  main.ts           # 页面与关卡逻辑
  data/             # 拼音表、第二关字库、第四关生僻字等
  audio/            # 播放封装、音效
  game/             # 第二关选项、拼音比对（第三、四关）
scripts/
  copy-pinyin-voice.cjs  # 复制 npm 包内 mp3 到 public
```

## 说明

- 音频文件体积较大，`public/pinyin-voice` 通常已加入 `.gitignore`；克隆后务必执行 **`npm install`** 以生成该目录。
- `vite.config.ts` 中已开启 `server.host: true`，便于在本机或局域网调试。

## 许可证

依赖包（如 `pinyin-voice`）请遵循其各自许可证；本项目代码可按需自行添加许可证文件。
