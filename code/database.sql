 -- 创建数据库
CREATE DATABASE ClassroomManagementSystem;

-- 创建表
-- 创建教室表
CREATE TABLE Classroom (
    ClassroomID INT PRIMARY KEY,
    ClassroomType NVARCHAR(50),
    Capacity INT,
    Multimedia NVARCHAR(50)
);

-- 创建院系表
CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    DepartmentName NVARCHAR(100)
);

-- 创建课程表
CREATE TABLE Course (
    CourseID INT PRIMARY KEY,
    CourseName NVARCHAR(100),
    Credits INT,
    CourseType NVARCHAR(50),
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

-- 创建教师表
CREATE TABLE Teacher (
    TeacherID INT PRIMARY KEY,
    TeacherName NVARCHAR(100),
    Gender NVARCHAR(10),
    Title NVARCHAR(50),
    IdentityCardNumber NVARCHAR(20),
    Password VARCHAR(12) NOT NULL DEFAULT '123456',
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

-- 创建学生表
CREATE TABLE Student (
    StudentID INT PRIMARY KEY,
    StudentName NVARCHAR(100),
    IdentityCardNumber NVARCHAR(20),
    Password VARCHAR(12) NOT NULL DEFAULT '123456',
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

-- 创建教师开课表
CREATE TABLE TeachersCourseSchedule (
    ClassroomID INT NOT NULL,
    ClassTime NVARCHAR(50) NOT NULL,
    TimeSlot NVARCHAR(50) NOT NULL,
    TeacherID INT,
    CourseID INT,
    PRIMARY KEY (ClassroomID, ClassTime, TimeSlot),
    FOREIGN KEY (ClassroomID) REFERENCES Classroom(ClassroomID),
    FOREIGN KEY (TeacherID) REFERENCES Teacher(TeacherID),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);

-- 创建教室借用表
CREATE TABLE ClassroomBorrowing (
    ClassroomID INT NOT NULL,
    StudentID INT,
    UseDate DATE NOT NULL,
    BorrowingTimeSlot NVARCHAR(50) NOT NULL,
    Purpose NVARCHAR(100),
    PRIMARY KEY (ClassroomID, UseDate, BorrowingTimeSlot),
    FOREIGN KEY (ClassroomID) REFERENCES Classroom(ClassroomID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
);

-- 创建实例
-- 添加10个教室
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (101, N'普通教室', 100, N'有多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (102, N'普通教室', 100, N'有多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (103, N'普通教室', 100, N'无多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (104, N'普通教室', 100, N'有多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (105, N'普通教室', 100, N'有多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (106, N'普通教室', 100, N'无多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (107, N'普通教室', 100, N'有多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (108, N'普通教室', 100, N'有多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (109, N'阶梯教室', 300, N'有多媒体');
INSERT INTO Classroom (ClassroomID, ClassroomType, Capacity, Multimedia) VALUES (110, N'阶梯教室', 300, N'有多媒体');

-- 添加6个院系
INSERT INTO Department (DepartmentID, DepartmentName) VALUES (1, N'计算机科学与技术');
INSERT INTO Department (DepartmentID, DepartmentName) VALUES (2, N'机械工程');
INSERT INTO Department (DepartmentID, DepartmentName) VALUES (3, N'电子工程');
INSERT INTO Department (DepartmentID, DepartmentName) VALUES (4, N'化学工程');
INSERT INTO Department (DepartmentID, DepartmentName) VALUES (5, N'物理学');
INSERT INTO Department (DepartmentID, DepartmentName) VALUES (6, N'生物科学');

-- 添加15个课程
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (1, N'计算机基础', 4, N'必修', 1);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (2, N'线性代数', 3, N'必修', 2);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (3, N'微积分', 3, N'必修', 3);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (4, N'数据结构', 4, N'必修', 1);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (5, N'操作系统', 4, N'选修', 1);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (6, N'机械设计基础', 4, N'必修', 2);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (7, N'电路分析', 3, N'必修', 3);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (8, N'有机化学', 3, N'必修', 4);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (9, N'量子物理', 3, N'选修', 5);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (10, N'生物信息学', 3, N'选修', 6);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (11, N'高等数学', 4, N'必修', 3);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (12, N'软件工程', 4, N'必修', 1);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (13, N'人工智能', 3, N'选修', 1);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (14, N'数据库原理', 4, N'必修', 1);
INSERT INTO Course (CourseID, CourseName, Credits, CourseType, DepartmentID) VALUES (15, N'数字信号处理', 3, N'选修', 3);

-- 添加12个教师
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (1, N'张三', N'男', 1, N'教授', N'110101199001011234', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (2, N'李四', N'男', 2, N'副教授', N'110101199001011235', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (3, N'王五', N'男', 3, N'讲师', N'110101199001011236', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (4, N'赵六', N'女', 4, N'助教', N'110101199001011237', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (5, N'孙七', N'女', 5, N'教授', N'110101199001011238', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (6, N'周八', N'男', 1, N'副教授', N'110101199001011239', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (7, N'吴九', N'女', 2, N'讲师', N'110101199001011240', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (8, N'郑十', N'男', 3, N'助教', N'110101199001011241', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (9, N'钱十一', N'女', 4, N'教授', N'110101199001011242', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (10, N'周十二', N'男', 5, N'副教授', N'110101199001011243', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (11, N'吴十三', N'女', 1, N'讲师', N'110101199001011244', 'Teacher');
INSERT INTO Teacher (TeacherID, TeacherName, Gender, DepartmentID, Title, IdentityCardNumber, UserType) VALUES (12, N'郑十四', N'男', 2, N'助教', N'110101199001011245', 'Teacher');

-- 添加12个学生
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201001, N'王小明', 1, '220104199001011234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201002, N'李晓华', 2, '220104199002021234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201003, N'张伟', 3, '220104199003031234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201004, N'刘洋', 4, '220104199004041234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201005, N'陈晨', 5, '220104199005051234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201006, N'林峰', 1, '220104199006061234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201007, N'周莉', 2, '220104199007071234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201008, N'吴静', 3, '220104199008081234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201009, N'赵雷', 4, '220104199009091234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201010, N'钱多', 5, '220104199010101234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201011, N'孙丽', 1, '220104199011111234', 'Student');
INSERT INTO Student (StudentID, StudentName, DepartmentID, IdentityCardNumber, UserType) VALUES (201012, N'李四', 2, '220104199012121234', 'Student');

-- 添加5个教师开课记录
INSERT INTO TeachersCourseSchedule (ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID) VALUES (101, N'周一第一节', N'08:00-09:40', 1, 1, 1);
INSERT INTO TeachersCourseSchedule (ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID) VALUES (102, N'周二第二节', N'10:00-11:40', 2, 2, 2);
INSERT INTO TeachersCourseSchedule (ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID) VALUES (103, N'周三第三节', N'14:00-15:40', 3, 3, 3);
INSERT INTO TeachersCourseSchedule (ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID) VALUES (104, N'周四第四节', N'16:00-17:40', 4, 4, 4);
INSERT INTO TeachersCourseSchedule (ClassroomID, ClassTime, TimeSlot, TeacherID, CourseID, DepartmentID) VALUES (105, N'周五第五节', N'19:00-20:40', 5, 5, 5);

-- 添加5个学生借教室记录
INSERT INTO ClassroomBorrowing (ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus) VALUES (101, 201001, '2024-04-10', '08:00-09:40', N'周一', N'自习', N'已批准');
INSERT INTO ClassroomBorrowing (ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus) VALUES (102, 201002, '2024-04-11', '10:00-11:40', N'周二', N'小组讨论', N'已批准');
INSERT INTO ClassroomBorrowing (ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus) VALUES (103, 201003, '2024-04-12', '14:00-15:40', N'周三', N'学术报告', N'已批准');
INSERT INTO ClassroomBorrowing (ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus) VALUES (104, 201004, '2024-04-13', '16:00-17:40', N'周四', N'研究项目', N'待审批');
INSERT INTO ClassroomBorrowing (ClassroomID, StudentID, UseDate, BorrowingTimeSlot, Workday, Purpose, ApprovalStatus) VALUES (105, 201005, '2024-04-14', '19:00-20:40', N'周五', N'社团活动', N'待审批');