const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 1245;
const DB_FILE = process.argv[2] || '';

const countStudents = async (dataPath) => {
  try {
    if (!dataPath) {
      throw new Error('Cannot load the database');
    }

    const data = await fs.readFile(dataPath, 'utf-8');
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(
        0,
        studentRecord.length - 1,
      );
      const field = studentRecord[studentRecord.length - 1];

      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }

      const studentEntries = studentPropNames.map((propName, idx) => [
        propName,
        studentPropValues[idx],
      ]);

      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce(
      (pre, cur) => pre + cur.length,
      0,
    );

    const reportParts = [`Number of students: ${totalStudents}`];

    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(
        `Number of students in ${field}: ${group.length}. List: ${group
          .map((student) => student.firstname)
          .join(', ')}`,
      );
    }

    return reportParts.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (_, res) => {
  try {
    const report = await countStudents(DB_FILE);
    res.setHeader('Content-Type', 'text/plain');
    res.send(`This is the list of our students\n${report}`);
  } catch (error) {
    res
      .status(500)
      .send('Internal Server Error: Unable to fetch student information');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
