const http = require('http');
const fs = require('fs').promises;

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv[2] || '';

const countStudents = async (dataPath) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const lines = data.trim().split('\n').slice(1); // Skip the title row

    const studentGroups = lines.reduce((groups, line) => {
      const [firstName, , , field] = line.split(',');
      return {
        ...groups,
        [field]: [...(groups[field] || []), firstName],
      };
    }, {});

    const totalStudents = lines.length;
    const report = [
      `Number of students: ${totalStudents}`,
      ...Object.entries(studentGroups).map(
        ([field, students]) => `Number of students in ${field}: ${
          students.length
        }. List: ${students.join(', ')}`,
      ),
    ];

    return report.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
      const report = await countStudents(DB_FILE);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`This is the list of our students\n${report}`);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Internal Server Error: ${error.message}`);
  }
});

app.listen(PORT, HOST, () => {});

module.exports = app;
