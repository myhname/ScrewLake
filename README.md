# Screw-Lake-Notes

## 项目说明

- 个人练习作品，顺便打发时间，毕竟也不能一直打游戏
- 后端暂不开发，一方面是不太会后端，另一方面还没打算搞服务器那些，所以借助electron来读写本地文件就足够完成功能需求了
- 但是会预留接口，方便后续开发补上后端，请求本地数据的方法单独封装一个中间层即可
- 预计完成四个模块的开发，每个模块完成基础功能项，剩下的尽量完成，上班族时间并没有那么充裕，而且我是老半途而废选手了
    - 记账本
    - 记事本： md + pdf
    - 日程提醒
    - 资源管理：图片 + 番剧

## 运行说明

- 本地（开发）环境执行

```bash
# 拉取依赖
npm install 

# 运行vue页面
npm run dev

# 运行 electron 服务
npm run electron:dev
# 或 (不监听代码改变)
npm run serve
```

- 构建测试环境包

```bash
# vue页面
npm run test 

# electron 未区分测试/生产环境， 依次执行，后续验证之后再补充打包细节
npm run start

npm run package

npm run make
```

- 构建生产环境包

```bash
npm run build
```

## 项目开发计划及模块功能安排
