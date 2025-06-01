const express = require('express');
const sql = require('mssql');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

// 数据库配置
const config = {
    user: 'sa',
    password: '123456',
    server: 'LAPTOP-AEKOHBI5',
    database: 'ClassroomManagementSystem',
    options: {
        encrypt: true, 
        trustServerCertificate: true
    }
};

// 指定静态文件目录
app.use(express.static('public'));

// 登录路由

// 验证教师凭据的函数
async function verifyTeacherCredentials(teacherId, password) {
  try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM Teacher WHERE TeacherID = ${teacherId} AND Password = ${password}`;
      return result.recordset.length > 0;
  } catch (err) {
      console.error('数据库查询出错:', err);
      return false;
  }
}

// 验证学生凭据的函数
async function verifyStudentCredentials(studentId, password) {
  try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM Student WHERE StudentID = ${studentId} AND Password = ${password}`;
      return result.recordset.length > 0;
  } catch (err) {
      console.error('数据库查询出错:', err);
      return false;
  }
}

// 教师登录API端点
app.post('/loginTeacher', async (req, res) => {
  const { teacherId, password } = req.body;
  if (await verifyTeacherCredentials(teacherId, password)) {
      res.json({ success: true, userType: 'Teacher' });
  } else {
      res.json({ success: false, message: '账号或密码错误' });
  }
});

// 学生登录API端点
app.post('/loginStudent', async (req, res) => {
  const { studentId, password } = req.body;
  if (await verifyStudentCredentials(studentId, password)) {
      res.json({ success: true, userType: 'Student' });
  } else {
      res.json({ success: false, message: '账号或密码错误' });
  }
});

// 获取课程信息的API
app.get('/getCourses', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Course`;
        // 构造符合Layui表格要求的响应格式
        const response = {
            code: 0, // 成功的状态码
            msg: "", // 可选的消息
            count: result.recordset.length, // 数据总数
            data: result.recordset // 实际的课程数据
        };
        res.json(response); // 发送构造后的JSON响应
    } catch (err) {
        console.error(err);
        res.status(500).send('服务器错误');
    }
});

//获取开课表信息的API
app.get('/getTeachersCourses', async (req, res) => {
  try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM TeachersCourseSchedule`;
      // 构造符合Layui表格要求的响应格式
      const response = {
          code: 0, // 成功的状态码
          msg: "", // 可选的消息
          count: result.recordset.length, // 数据总数
          data: result.recordset // 实际的课程数据
      };
      res.json(response); // 发送构造后的JSON响应
  } catch (err) {
      console.error(err);
      res.status(500).send('服务器错误');
  }
});

// 获取教室信息的API
app.get('/getClassrooms', async (req, res) => {
  try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM Classroom`;
      // 构造符合Layui表格要求的响应格式
      const response = {
          code: 0, // 成功的状态码
          msg: "", // 可选的消息
          count: result.recordset.length, // 数据总数
          data: result.recordset // 实际的课程数据
      };
      res.json(response); // 发送构造后的JSON响应
  } catch (err) {
      console.error(err);
      res.status(500).send('服务器错误');
  }
});

//获取教室借用表API
app.get('/getClassroomBorrowings', async (req, res) => {
  try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM ClassroomBorrowing`;
      // 构造符合Layui表格要求的响应格式
      const response = {
          code: 0, // 成功的状态码
          msg: "", // 可选的消息
          count: result.recordset.length, // 数据总数
          data: result.recordset // 实际的教室借用数据
      };
      res.json(response); // 发送构造后的JSON响应
  } catch (err) {
      console.error(err);
      res.status(500).send('服务器错误');
  }
});


// 使用body-parser中间件解析JSON格式的请求体
app.use(bodyParser.json());

app.post('/addCourse', async (req, res) => {
    console.log(req.body); // 打印接收到的请求体
    const { CourseID, CourseName, Credits, CourseType, DepartmentID } = req.body;
  
    try {
      console.log('连接数据库...');
      await sql.connect(config);
      console.log('数据库连接成功');
  
      console.log('执行插入操作...');
      const result = await new sql.Request()
        .input('CourseID', sql.Int, CourseID)
        .input('CourseName', sql.NVarChar(100), CourseName)
        .input('Credits', sql.Int, Credits)
        .input('CourseType', sql.NVarChar(50), CourseType)
        .input('DepartmentID', sql.Int, DepartmentID)
        .query('INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (@CourseID, @CourseName, @Credits, @CourseType, @DepartmentID)');
      console.log('插入操作成功', result);
  
      res.status(200).json({ message: '课程添加成功', result });
    } catch (err) {
      console.error('SQL error', err);
      console.error('Original error', err.originalError);
      res.status(500).send('服务器错误');
    }
  });

//添加教室
app.post('/addClassroom', async (req, res) => {
  console.log(req.body); // 打印接收到的请求体
  const { ClassroomID, ClassroomType, Capacity, Multimedia } = req.body;

  try {
    console.log('连接数据库...');
    await sql.connect(config);
    console.log('数据库连接成功');

    console.log('执行插入操作...');
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .input('ClassroomType', sql.NVarChar(100), ClassroomType)
      .input('Capacity', sql.Int, Capacity)
      .input('Multimedia', sql.NVarChar(50), Multimedia)
      .query('INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (@ClassroomID, @ClassroomType, @Capacity, @Multimedia)');
    console.log('插入操作成功', result);

    res.status(200).json({ message: '教室添加成功', result });
  } catch (err) {
    console.error('SQL error', err);
    console.error('Original error', err.originalError);
    res.status(500).send('服务器错误');
  }
});

//添加开课表
app.post('/addTeachersCourse', async (req, res) => {
  console.log(req.body); // 打印接收到的请求体
  const { ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID } = req.body;

  try {
    console.log('连接数据库...');
    await sql.connect(config);
    console.log('数据库连接成功');

    console.log('执行插入操作...');
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .input('ClassTime', sql.NVarChar(50), ClassTime)
      .input('TimeSlot', sql.NVarChar(50), TimeSlot)
      .input('TeacherID', sql.Int, TeacherID)
      .input('CourseID', sql.Int, CourseID)
      .input('DepartmentID', sql.Int, DepartmentID)
      .query('INSERT INTO TeachersCourseSchedule (ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID) VALUES (@ClassroomID, @ClassTime, @TimeSlot, @TeacherID, @CourseID, @DepartmentID)');
    console.log('插入操作成功', result);

    res.status(200).json({ message: '教师开课信息添加成功', result });
  } catch (err) {
    console.error('SQL error', err);
    console.error('Original error', err.originalError);
    res.status(500).send('服务器错误');
  }
});

//添加教室借用信息
app.post('/addClassroomBorrowing', async (req, res) => {
  console.log(req.body); // 打印接收到的请求体
  const { ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus } = req.body;

  try {
    console.log('连接数据库...');
    await sql.connect(config);
    console.log('数据库连接成功');

    console.log('执行插入操作...');
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .input('StudentID', sql.Int, StudentID)
      .input('UseDate', sql.Date, UseDate)
      .input('BorrowingTimeSlot', sql.NVarChar(50), BorrowingTimeSlot)
      .input('Workday', sql.NVarChar(50), Workday)
      .input('Purpose', sql.NVarChar(100), Purpose)
      .input('ApprovalStatus', sql.NVarChar(50), ApprovalStatus)
      .query('INSERT INTO ClassroomBorrowing (ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus) VALUES (@ClassroomID, @StudentID, @UseDate, @BorrowingTimeSlot, @Workday, @Purpose, @ApprovalStatus)');
    console.log('插入操作成功', result);

    res.status(200).json({ message: '教室借用信息添加成功', result });
  } catch (err) {
    console.error('SQL error', err);
    console.error('Original error', err.originalError);
    res.status(500).send('服务器错误');
  }
});


// 更新课程的路由
app.post('/updateCourse', async (req, res) => {
    const { CourseID, CourseName, Credits, CourseType, DepartmentID } = req.body;
    try {
      await sql.connect(config);
      const result = await new sql.Request()
        .input('CourseID', sql.Int, CourseID)
        .input('CourseName', sql.NVarChar(100), CourseName)
        .input('Credits', sql.Int, Credits)
        .input('CourseType', sql.NVarChar(50), CourseType)
        .input('DepartmentID', sql.Int, DepartmentID)
        .query('UPDATE Course SET CourseName = @CourseName, Credits = @Credits, CourseType = @CourseType, DepartmentID = @DepartmentID WHERE CourseID = @CourseID');
      
      res.status(200).json({ message: '课程更新成功', result });
    } catch (err) {
      console.error('SQL error', err);
      res.status(500).send('服务器错误');
    }
  });

//更新教室的路由
app.post('/updateClassroom', async (req, res) => {
  const { ClassroomID, ClassroomType, Capacity, Multimedia } = req.body;
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .input('ClassroomType', sql.NVarChar(100), ClassroomType)
      .input('Capacity', sql.Int, Capacity)
      .input('Multimedia', sql.NVarChar(50), Multimedia)
      .query('UPDATE Classroom SET ClassroomType = @ClassroomType, Capacity = @Capacity, Multimedia = @Multimedia WHERE ClassroomID = @ClassroomID');
    
    res.status(200).json({ message: '教室信息更新成功', result });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('服务器错误');
  }
});

//更新开课表的路由
app.post('/updateTeachersCourse', async (req, res) => {
  const { ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID } = req.body;
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .input('ClassTime', sql.NVarChar(50), ClassTime)
      .input('TimeSlot', sql.NVarChar(50), TimeSlot)
      .input('TeacherID', sql.Int, TeacherID)
      .input('CourseID', sql.Int, CourseID)
      .input('DepartmentID', sql.Int, DepartmentID)
      .query('UPDATE TeachersCourseSchedule SET ClassTime = @ClassTime, TimeSlot = @TimeSlot, TeacherID = @TeacherID, CourseID = @CourseID, DepartmentID = @DepartmentID WHERE ClassroomID = @ClassroomID');
    
    res.status(200).json({ message: '教师开课信息更新成功', result });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('服务器错误');
  }
});

//更新教室借用表的路由
app.post('/updateClassroomBorrowing', async (req, res) => {
  const { ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus } = req.body;
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .input('StudentID', sql.Int, StudentID)
      .input('UseDate', sql.Date, UseDate)
      .input('BorrowingTimeSlot', sql.NVarChar(50), BorrowingTimeSlot)
      .input('Workday', sql.NVarChar(50), Workday)
      .input('Purpose', sql.NVarChar(100), Purpose)
      .input('ApprovalStatus', sql.NVarChar(50), ApprovalStatus)
      .query('UPDATE ClassroomBorrowing SET StudentID = @StudentID, UseDate = @UseDate, BorrowingTimeSlot = @BorrowingTimeSlot, Workday = @Workday, Purpose = @Purpose, ApprovalStatus = @ApprovalStatus WHERE ClassroomID = @ClassroomID');
    
    res.status(200).json({ message: '教室借用信息更新成功', result });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('服务器错误');
  }
});




// 删除课程的路由
app.post('/deleteCourse', async (req, res) => {
    const { CourseID } = req.body;
    try {
      await sql.connect(config);
      const result = await new sql.Request()
        .input('CourseID', sql.Int, CourseID)
        .query('DELETE FROM Course WHERE CourseID = @CourseID');
      
      res.status(200).json({ message: '课程删除成功' });
    } catch (err) {
      console.error('SQL error', err);
      res.status(500).send('服务器错误');
    }
  });

  // 删除教室的路由
app.post('/deleteClassroom', async (req, res) => {
  const { ClassroomID } = req.body;
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .query('DELETE FROM Classroom WHERE ClassroomID = @ClassroomID');
    
    res.status(200).json({ message: '教室删除成功' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('服务器错误');
  }
});

// 删除教师开课信息的路由
app.post('/deleteTeachersCourse', async (req, res) => {
  const { ClassroomID } = req.body; // 假设我们使用ClassroomID作为删除的唯一标识
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .query('DELETE FROM TeachersCourseSchedule WHERE ClassroomID = @ClassroomID');
    
    res.status(200).json({ message: '教师开课信息删除成功' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('服务器错误');
  }
});

//删除教室借用信息的路由
app.post('/deleteClassroomBorrowing', async (req, res) => {
  const { ClassroomID } = req.body; // 使用ClassroomID作为删除的唯一标识
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input('ClassroomID', sql.Int, ClassroomID)
      .query('DELETE FROM ClassroomBorrowing WHERE ClassroomID = @ClassroomID');
    
    res.status(200).json({ message: '教室借用信息删除成功' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('服务器错误');
  }
});


//搜索课程的路由
app.get('/searchCourses', async (req, res) => {
  const searchTerm = req.query.search || '';
  
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Course WHERE CourseName LIKE ${'%' + searchTerm + '%'} `;
    
    // 构造符合规范的JSON响应
    const response = {
      code: 0,
      msg: "",
      count: result.recordset.length,
      data: result.recordset
    };

    // 发送JSON响应
    res.json(response);
  } catch (err) {
    console.error('SQL error', err);
    // 发送错误时的JSON格式也应符合规范
    res.status(500).json({ code: 1, msg: '服务器错误', count: 0, data: [] });
  }
});

//搜索教室的路由
app.get('/searchClassrooms', async (req, res) => {
  const searchTerm = req.query.search || '';
  
  try {
    await sql.connect(config);
    // 根据教室ID、教室类型或多媒体设备进行搜索
    const result = await sql.query`SELECT * FROM Classroom WHERE ClassroomID LIKE ${'%' + searchTerm + '%'} OR ClassroomType LIKE ${'%' + searchTerm + '%'} OR Multimedia LIKE ${'%' + searchTerm + '%'}`;
    
    // 构造符合规范的JSON响应
    const response = {
      code: 0,
      msg: "",
      count: result.recordset.length,
      data: result.recordset
    };

    // 发送JSON响应
    res.json(response);
  } catch (err) {
    console.error('SQL error', err);
    // 发送错误时的JSON格式也应符合规范
    res.status(500).json({ code: 1, msg: '服务器错误', count: 0, data: [] });
  }
});


// 搜索教师开课信息的路由
app.get('/searchTeachersCourses', async (req, res) => {
  const searchTerm = req.query.search || '';
  
  try {
    await sql.connect(config);
    // 根据教室ID、课程ID或教师ID进行搜索
    const result = await sql.query`SELECT * FROM TeachersCourseSchedule WHERE ClassroomID LIKE ${'%' + searchTerm + '%'} OR CourseID LIKE ${'%' + searchTerm + '%'} OR TeacherID LIKE ${'%' + searchTerm + '%'}`;
    
    // 构造符合规范的JSON响应
    const response = {
      code: 0,
      msg: "",
      count: result.recordset.length,
      data: result.recordset
    };

    // 发送JSON响应
    res.json(response);
  } catch (err) {
    console.error('SQL error', err);
    // 发送错误时的JSON格式也应符合规范
    res.status(500).json({ code: 1, msg: '服务器错误', count: 0, data: [] });
  }
});

//搜索教室借用信息的路由
app.get('/searchClassroomBorrowings', async (req, res) => {
  const searchTerm = req.query.search || '';
  
  try {
    await sql.connect(config);
    // 根据教室ID、学生ID、使用日期、借用时间段、工作日、借用目的或审批状态进行搜索
    const result = await sql.query`SELECT * FROM ClassroomBorrowing WHERE ClassroomID LIKE ${'%' + searchTerm + '%'} OR StudentID LIKE ${'%' + searchTerm + '%'} OR UseDate LIKE ${'%' + searchTerm + '%'} OR BorrowingTimeSlot LIKE ${'%' + searchTerm + '%'} OR Workday LIKE ${'%' + searchTerm + '%'} OR Purpose LIKE ${'%' + searchTerm + '%'} OR ApprovalStatus LIKE ${'%' + searchTerm + '%'}`;
    
    // 构造符合规范的JSON响应
    const response = {
      code: 0,
      msg: "",
      count: result.recordset.length,
      data: result.recordset
    };

    // 发送JSON响应
    res.json(response);
  } catch (err) {
    console.error('SQL error', err);
    // 发送错误时的JSON格式也应符合规范
    res.status(500).json({ code: 1, msg: '服务器错误', count: 0, data: [] });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});