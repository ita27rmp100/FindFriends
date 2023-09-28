var express = require('express');
var router = express.Router();
const mysql = require('mysql');

// إنشاء تجميع للاتصال بقاعدة البيانات MySQL
var pool = mysql.createPool({
  connectionLimit: 10, // قم بضبط الحد حسب احتياجاتك
  host: 'localhost',
  user: 'root',
  database: 'prog4teach',
  charset: 'utf8mb4',
});

/* الحصول على قائمة الدورات. */
router.get('/', function (req, res, next) {
  // استخدام تجميع الاتصال للحصول على اتصال
  pool.getConnection(function (err, connection) {
    if (err) {
      // التعامل مع أخطاء الاتصال
      console.error('خطأ في الحصول على الاتصال:', err);
      return res.status(500).send('خطأ داخلي في الخادم');
    }

    // تنفيذ الاستعلام
    connection.query('SELECT * FROM courses', function (error, result, fields) {
      connection.release(); // إعادة الاتصال إلى تجميع الاتصال

      if (error) {
        console.error('خطأ في تنفيذ الاستعلام:', error);
        return res.status(500).send('خطأ داخلي في الخادم');
      }

      const courses = JSON.parse(JSON.stringify(result));
      let coursesTable = '';

      for (let i = 0; i < courses.length; i++) {
        const course = `<tr>
                          <td>${courses[i].title}</td>
                          <td>${courses[i].date}</td>
                          <td>${courses[i].price}</td>
                          <td>${courses[i].status}</td>
                          <td><a href="${courses[i].link}" class="btn-outline-dark">اضغط هنا</a></td>
                        </tr>`;
        coursesTable += course;
      }

      // عرض القالب 'courses' مع بيانات الدورات
      console.log(coursesTable); // اطبع قيمة CT
        res.render('courses', {
        CT: coursesTable,
      });
    });
  });
});

module.exports = router;






// var express = require('express');
// var router = express.Router();
// const mysql = require('mysql');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     let Connection = mysql.createConnection({
//         host:'localhost',
//         user:'root',
//         database:'prog4teach',
//         charset:'utf8mb4'
//       })
//     Connection.query(`select * from courses`,function(error,result,fields){
//         // messages = result
//         courses = JSON.parse(JSON.stringify(result))
//         console.log(courses)
//         coursesTable = ''
//         for (let i = 0; i < courses.length; i++) {
//           course = `<tr>
//                         <td>${courses[i].title}</td>
//                         <td>${courses[i].date}</td>
//                         <td>${courses[i].price}</td>
//                         <td>${courses[i].status}</td>
//                         <td>${courses[i].link}</td>
//                     </tr>`
//           coursesTable += course
//         }
//         console.log(coursesTable)
//         res.render(
//           'courses', 
//           {
//             CT:coursesTable
//           });
//       })
// });

// module.exports = router;
