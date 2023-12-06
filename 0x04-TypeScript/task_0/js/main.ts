interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: 'Dean',
    lastName: 'Birnie',
    age: 28,
    location: 'South Africa',
}

const student2: Student = {
    firstName: 'Glynn',
    lastName: 'Birnie',
    age: 31,
    location: 'South Africa',
}

const studentsList: Array<Student> = [student1, student2];

const table = document.createElement('table');
const tbody = document.createElement('tbody');

studentsList.forEach((student) => {
    const row = tbody.insertRow();
    const firstNameCell = row.insertCell();
    const locationCell = row.insertCell();
    firstNameCell.textContent = student.firstName;
    locationCell.textContent = student.location;
});

table.appendChild(tbody);
document.body.appendChild(table);
