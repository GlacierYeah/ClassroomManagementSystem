# ClassroomManagementSystem
教室管理系统
## 项目简介

ClassroomManagementSystem 是一个用于教室管理的系统。该系统具备用户登录验证、课程管理、开课表管理、教室管理以及教室借用管理等功能，使用 Node.js 和 Express 框架构建，使用 MSSQL 数据库进行数据存储与管理。

## 项目功能

### 用户认证

- **教师登录**：教师可通过输入教师 ID 和密码进行身份验证。系统会在 `Teacher` 表中验证输入信息，验证成功后返回登录成功信息及用户类型为 “Teacher”，验证失败则提示 “账号或密码错误”。
- **学生登录**：学生使用学生 ID 和密码登录，系统在 `Student` 表中进行验证，验证结果的返回方式与教师登录相同。

### 数据管理

- **课程管理**：支持课程信息的查询、添加和更新操作。通过 `/getCourses` 接口获取所有课程信息，使用 `/addCourse` 接口添加新的课程信息，利用 `/updateCourse` 接口更新现有课程信息。
- **开课表管理**：提供开课表信息的查询和添加功能。使用 `/getTeachersCourses` 接口查询教师开课表信息，通过 `/addTeachersCourse` 接口添加新的开课表信息。
- **教室管理**：支持教室信息的查询、添加、更新和删除操作。通过 `/getClassrooms` 接口获取教室信息，使用 `/addClassroom` 接口添加新的教室信息，利用 `/updateClassroom` 接口更新教室信息，通过 `/deleteClassroom` 接口删除指定教室信息。
- **教室借用管理**：提供教室借用信息的查询、添加、更新和删除功能。使用 `/getClassroomBorrowings` 接口查询教室借用信息，通过 `/addClassroomBorrowing` 接口添加新的教室借用信息，利用 `/updateClassroomBorrowing` 接口更新教室借用信息，通过 `/deleteClassroomBorrowing` 接口删除指定教室借用信息。

### 前端页面

系统提供了多个前端 HTML 页面，方便用户进行操作：

- **登录页面 (`login.html`)**：用户输入账号和密码进行登录。
- **教师控制面板页面 (`teacher-dashboard.html`)**：教师登录成功后进入，提供教师相关操作入口。
- **教师课程列表页面 (`teacher_courses_list.html`)**：教师查看课程列表，可进行搜索、编辑等操作。
- **教师教室列表页面 (`teacher_classrooms_list.html`)**：教师查看教室列表，可进行搜索、查看详情、删除等操作。
- **教师管理课程信息页面 (`teacher_manage_courses.html`)**：教师对课程信息进行增删改查操作。
- **教师管理教室使用情况页面 (`teacher_manage_classrooms.html`)**：教师对教室借用信息进行管理。
- **学生控制面板页面 (`student-dashboard.html`)**：学生登录成功后进入，提供学生相关操作入口。
- **学生课程列表页面 (`student_courses_list.html`)**：学生查看课程列表，可进行搜索操作。
- **学生教室列表页面 (`student_classrooms_list.html`)**：学生查看教室列表，可进行搜索操作。
- **学生借用教室申请页面 (`student_book_classrooms.html`)**：学生提交借用教室申请。

## 项目结构

plaintext











```plaintext
ClassroomManagementSystem/
├── README.md             # 项目说明文档
├── 教室管理系统项目报告.doc # 项目相关报告文档
├── code/                 # 项目代码目录
│   ├── .vscode/          # VSCode 配置文件目录
│   │   └── launch.json   # 启动配置文件
│   ├── database.sql      # 数据库相关 SQL 脚本
│   ├── node_modules/     # 项目依赖模块目录
│   ├── package-lock.json # 项目依赖的精确版本锁定
│   ├── package.json      # 项目依赖和脚本配置
│   ├── pic/              # 项目相关图片资源目录
│   ├── public/           # 公共资源目录，可存放前端静态文件等
│   │   ├── login.html                   # 登录页面
│   │   ├── teacher-dashboard.html       # 教师控制面板页面
│   │   ├── teacher_courses_list.html    # 教师课程列表页面
│   │   ├── teacher_classrooms_list.html # 教师教室列表页面
│   │   ├── teacher_manage_courses.html  # 教师管理课程信息页面
│   │   ├── teacher_manage_classrooms.html # 教师管理教室使用情况页面
│   │   ├── student-dashboard.html       # 学生控制面板页面
│   │   ├── student_courses_list.html    # 学生课程列表页面
│   │   ├── student_classrooms_list.html # 学生教室列表页面
│   │   └── student_book_classrooms.html # 学生借用教室申请页面
│   ├── server.js         # 项目主入口文件
│   └── test.sql          # 测试相关的 SQL 脚本
```

## 技术栈

### 后端

- **Node.js**：JavaScript 运行环境，用于构建服务器端应用程序。
- **Express**：基于 Node.js 的 Web 应用框架，用于处理 HTTP 请求和路由。
- **MSSQL**：微软的关系型数据库管理系统，用于存储和管理数据。

### 前端

- **HTML**：用于构建网页结构。
- **CSS**：用于美化网页样式。
- **JavaScript**：用于实现网页的交互功能。

### 依赖模块

项目使用了多个 npm 模块，部分重要模块如下：

- **body-parser**：用于解析 HTTP 请求体。
- **mssql**：用于与 MSSQL 数据库进行交互。
- **mysql**：用于与 MySQL 数据库进行交互。
- **open**：用于在浏览器中打开指定的 URL。

## 运行步骤

### 克隆项目

bash











```bash
git clone https://github.com/your-repo/ClassroomManagementSystem.git
cd ClassroomManagementSystem/code
```

### 安装依赖

bash











```bash
npm install
```

### 配置数据库

在 `server.js` 文件中，根据实际情况修改数据库连接配置：

javascript











```javascript
const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server',
  database: 'your_database',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
```

### 启动项目

bash











```bash
npm start
```

### 访问项目

打开浏览器，访问 `http://localhost:3000`（端口号可能需要根据实际配置进行修改），即可看到项目的登录页面。

## 注意事项

- **数据库配置**：确保数据库服务已经启动，并且配置的数据库连接信息正确无误。
- **依赖版本**：项目使用了特定版本的依赖，建议使用 `package-lock.json` 文件来确保安装的依赖版本一致。
- **数据安全**：在处理用户输入的数据时，要注意进行数据验证和过滤，防止 SQL 注入等安全问题。

## 贡献

如果你对本项目感兴趣，可以通过以下方式进行贡献：

- 提交 Bug 报告或功能建议。
- 提交代码补丁或新功能实现。

## 许可证

本项目采用 [MIT 许可证](https://opensource.org/licenses/MIT)。
