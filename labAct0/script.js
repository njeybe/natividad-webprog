class Student {
  constructor(name) {
    this.name = name;
    this.isPresent = null;
  }
}

const studentInput = document.getElementById("studentInput");
const addBtn = document.getElementById("addBtn");
const attendanceList = document.getElementById("attendanceList");

addBtn.addEventListener("click", () => {
  const name = studentInput.value.trim();
  if (name === "") {
    alert("Please enter a student name.");
    return;
  }

  const newStudent = new Student(name);
  console.log(newStudent);
  renderStudent(newStudent);
  studentInput.value = "";
});

function renderStudent(student) {
  const li = document.createElement("li");

  li.innerHTML = `
        <span class="student-info">
            <span class="name">${student.name}</span>
            <span class="status"></span>
        </span>
        <div class="actions">
            <button class="btn-present">Mark Present</button>
            <button class="btn-absent">Mark Absent</button>
            <button class="btn-remove">Remove</button>
        </div>
    `;

  const statusSpan = li.querySelector(".status");
  li.querySelector(".btn-present").addEventListener("click", () => {
    student.isPresent = true;
    statusSpan.innerHTML = " (Present)";
    statusSpan.className = "status status-present";
    li.classList.add("bg-present");
    li.classList.remove("bg-absent");
  });

  li.querySelector(".btn-absent").addEventListener("click", () => {
    student.isPresent = false;
    statusSpan.innerHTML = " (Absent)";
    statusSpan.className = "status status-absent";
    li.classList.add("bg-absent");
    li.classList.remove("bg-present");
  });
  li.querySelector(".btn-remove").addEventListener("click", () => li.remove());

  attendanceList.appendChild(li);
}
