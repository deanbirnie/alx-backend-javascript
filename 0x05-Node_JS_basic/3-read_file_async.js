const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');

        // Skip the first line (title row)
        lines.shift();

        const students = lines.map((line) => {
          const [firstName, lastName, age, field] = line.split(',');
          return {
            firstName, lastName, age, field,
          };
        });

        const fields = {};

        students.forEach((student) => {
          if (Object.prototype.hasOwnProperty.call(student, 'field')) {
            if (student.field in fields) {
              fields[student.field].count += 1;
              fields[student.field].list.push(student.firstName);
            } else {
              fields[student.field] = { count: 1, list: [student.firstName] };
            }
          }
        });

        console.log(`Number of students: ${students.length}`);

        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            const { count, list } = fields[field];
            console.log(
              `Number of students in ${field}: ${count}. List: ${list.join(
                ', ',
              )}`,
            );
          }
        }

        resolve();
      }
    });
  });
}

module.exports = countStudents;
