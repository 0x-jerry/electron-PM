## TODO

### 功能

- [x] 确定 `tag` 和 `image` 的数据结构
- [x] 使用 `electron-settings` 保存用户设置
- [x] 设置界面
- [x] 在 `info` 中显示图片大小
- [x] 图片数据与数据库同步
- [x] 标签管理
- [ ] 图片预览以及添加标签
- [ ] 分页显示图片
- [ ] 图片搜索
  - [ ] 分类搜索
- [ ] 识别图片中的主要色调并显示在 `info` 中

### 优化

- [ ] `tag` 和 `info` 抽象成 `components`
- [ ] `production` 环境打包
- [ ] `better-sqlite3` 在 `windows` 平台使用需要安装 `windows-build-tools`
> Install all the required tools and configurations using Microsoft's windows-build-tools using npm install --global --production windows-build-tools from an elevated PowerShell or CMD.exe (run as Administrator).

### 视觉

- [ ] 图片按比例计算显示，目标为充满边框
- [ ] 屏幕缩放时，图片整体居中
- [ ] `logo` 设计
- [ ] 主题设计

