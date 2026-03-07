// 1. Class Creation
class Student {
    constructor(name) {
        this.name = name;
        this.isPresent = null; // null = undecided, true = Present, false = Absent
    }
}

const studentInput = document.getElementById('studentInput');
const addBtn = document.getElementById('addBtn');
const attendanceList = document.getElementById('attendanceList');

// 2. Capture input and add student
addBtn.addEventListener('click', () => {
    const name = studentInput.value.trim();
    
    if (name === "") return; // Don't add empty names

    // Instantiate new Student object
    const newStudent = new Student(name);
    console.log("New Student Object:", newStudent);

    addStudentToUI(newStudent);
    studentInput.value = ""; // Clear input
});

// 3. Append to List & Handle Actions
function addStudentToUI(student) {
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span class="name-text">${student.name}</span>
        <div class="actions">
            <button class="btn-present">✅</button>
            <button class="btn-absent">❌</button>
            <button class="btn-remove">🗑️</button>
        </div>
    `;

    const nameSpan = li.querySelector('.name-text');

    // Mark Present
    li.querySelector('.btn-present').addEventListener('click', () => {
        student.isPresent = true;
        nameSpan.className = "name-text present";
        console.log(`${student.name} is now Present:`, student);
    });

    // Mark Absent
    li.querySelector('.btn-absent').addEventListener('click', () => {
        student.isPresent = false;
        nameSpan.className = "name-text absent";
        console.log(`${student.name} is now Absent:`, student);
    });

    // Remove Entry
    li.querySelector('.btn-remove').addEventListener('click', () => {
        li.remove();
    });

    attendanceList.appendChild(li);
}