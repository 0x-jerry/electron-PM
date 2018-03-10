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
- [ ] 给图片添加标签
- [ ] 图片搜索
- [ ] 分类显示
- [ ] 识别图片中的主要色调并显示在 `info` 中
- [ ] 中文路径支持

### Bug

- [ ] 同步更新 `tag` 显示存在内存泄漏，已移除此功能

### 优化

- [x] `sqlite` 大量插入优化速度
- [x] 分页组件 `pageNav`
- [ ] 控制 app 的最小宽高
- [ ] 设置页面保存提示
- [ ] `tag` 组件
- [ ] `info` 组件
- [ ] 阻止 scroll 事件冒泡
> 阻止事件冒泡： `event.stopPropagation()`
>
> 取消事件： `event.preventDefault()`
- [ ] `production` 环境打包
- [x] `better-sqlite3` 在 `windows` 平台使用需要安装 `windows-build-tools`
> Install all the required tools and configurations using Microsoft's windows-build-tools using npm install --global --production windows-build-tools from an elevated PowerShell or CMD.exe (run as Administrator).

### 视觉

- [ ] 图片按比例计算显示，目标为充满边框
- [ ] 屏幕缩放时，图片整体居中
- [ ] `logo` 设计
- [ ] 主题设计

