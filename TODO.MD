## TODO

### 功能

- [x] 确定 `tag` 和 `image` 的数据结构
- [x] 使用 `electron-settings` 保存用户设置
- [x] 设置界面
- [x] 在 `info` 中显示图片大小
- [x] 在 `info` 中显示图片分辨率
- [x] 图片数据与数据库同步
- [x] 标签管理
- [x] 分页显示图片
- [x] 图片预览
- [x] 添加 Alert 组件
- [x] 给图片添加标签
- [x] 图片搜索
- [x] 第一次打开时，提示添加路径
- [ ] ~~识别图片中的主要色调并显示在 `info` 中~~
- [ ] ~~添加使用说明页面~~
- [ ] ~~颜色主题~~
- [x] 图片右键菜单
- [ ] 动态调整图片宽度
- [ ] 设置里面 开/关 实时搜索
- [ ] 搜索标签显示
- [ ] 多语言支持

### Bug

- [x] 同步更新 `tag` 显示，存在内存泄漏
- [x] 第一次打开右边的宽度不正确
- [x] `better-sqlite3` 在 `windows` 平台使用调试需要安装 `windows-build-tools`
> Install all the required tools and configurations using Microsoft's windows-build-tools using npm install --global --production windows-build-tools from an elevated PowerShell or CMD.exe (run as Administrator).

### 优化

- [x] `sqlite` 大量插入优化速度
- [x] 分页组件 `pageNav`
- [x] `logo` 大小更改为 512x512
- [x] 修改 database 存储路径
- [x] `tag` 组件
- [x] 控制 app 的最小宽高
- [ ] ~~`info` 组件~~
- [ ] ~~设置页面保存提示~~
- [x] 搜索按回车则显示结果，ESC 则显示之前的结果
- [ ] 改用系统右键菜单
- [ ] 图片数量过多时，略有卡顿
- [ ] 搜索图片不存在时, 不一样的提示，非默认页面
- [ ] `production` 环境打包

### UI & UX

- [x] `logo` 设计
- [x] 主题设计
- [x] 图片按比例计算显示，目标为充满边框
- [x] 图片详情页设计
- [x] 屏幕缩放时，图片整体居中
- [ ] 重新设计主页
- [ ] 动画效果设计
