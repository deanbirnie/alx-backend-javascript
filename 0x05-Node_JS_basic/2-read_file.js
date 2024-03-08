const fs = require("fs");

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    const lines = data.split("\n").filter((line) => line.trim() !== "");

    const students = lines.map((line) => {
      const [firstName, lastName, age, field] = line.split(",");
      return { firstName, lastName, age, field };
    });

    const fields = {};

    students.forEach((student) => {
      if (student.field in fields) {
        fields[student.field].count += 1;
        fields[student.field].list.push(student.firstName);
      } else {
        fields[student.field] = { count: 1, list: [student.firstName] };
      }
    });

    console.log(`Number of students: ${students.length}`);

    for (const field in fields) {
      const { count, list } = fields[field];
      console.log(
        `Number of students in ${field}: ${count}. List: ${list.join(", ")}`
      );
    }
  } catch (error) {
    throw new Error("Cannot load the database");
  }
}

module.exports = countStudents;
