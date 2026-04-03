# 构建静态资源
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
# postinstall 会跑复制脚本，但此时尚未 COPY 源码；忽略脚本，由 npm run build 时的 prebuild 复制音频
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

# 运行：Nginx 托管 dist
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
