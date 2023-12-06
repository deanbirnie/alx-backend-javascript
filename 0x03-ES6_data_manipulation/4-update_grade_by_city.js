export default function updateStudentGradeByCity(students, city, newGrades) {
  if (Array.isArray(students) && Array.isArray(newGrades)) {
    const studentsByCity = students.filter((student) => student.location === city);
    const studentsIdByCity = studentsByCity.map((student) => student.id);
    const updatedStudents = students.map((student) => {
      if (studentsIdByCity.includes(student.id)) {
        const newGrade = newGrades.filter((grade) => grade.studentId === student.id);
        return { ...student, grade: newGrade[0].grade };
      }
      return student;
    });
    return updatedStudents;
  }
  return [];
}
