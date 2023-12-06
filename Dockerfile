# 使用Node 18作为基础镜像
FROM node:18

# 创建app目录
WORKDIR /usr/src/app

# 先复制package*.json，这样如果没有任何依赖变更，Docker可以使用缓存来加快构建速度
COPY package*.json ./

# 安装pnpm
RUN npm install -g pnpm

# 使用pnpm安装依赖
RUN pnpm install

# 之后复制其他文件，这样我们可以最大化Docker层的缓存
COPY . .

# 暴露的端口
EXPOSE 8000

# 启动命令
CMD [ "pnpm", "run", "preview" ]
