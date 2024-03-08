const http = require('http');
const fs = require('fs').promises;

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv[2] || '';

const setResponse = (res, statusCode, body) => {
  const headers = {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.from(body).length,
  };
  res.writeHead(statusCode, headers);
  res.end(body);
};

const countStudents = async (dataPath) => {
  try {
    if (!dataPath) {
      throw new Error('Cannot load the database');
    }

    const data = await fs.readFile(dataPath, 'utf-8');
    const lines = data.trim().split('\n').slice(1);

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
      const responseText = 'Hello Holberton School!';
      setResponse(res, 200, responseText);
    } else if (req.url === '/students') {
      const report = await countStudents(DB_FILE);
      const responseText = `This is the list of our students\n${report}`;
      setResponse(res, 200, responseText);
    } else {
      setResponse(res, 404, 'Not Found');
    }
  } catch (error) {
    setResponse(res, 500, `Internal Server Error: ${error.message}`);
  }
});

app.listen(PORT, HOST, () => {});

module.exports = app;
