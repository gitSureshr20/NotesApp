const inputBox = document.querySelector(".input");
const addButton = document.querySelector(".addBtn");
const notesListWraper = document.querySelector(".notes-list-wrapper");
const inputContainer = document.querySelector(".container");
const errorMessageText = document.querySelector(".error-message-text");

let currentEditedNote = null;
//creating/adding new note

function createNewNoteItem(getCurrentNote) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = getCurrentNote;
  li.appendChild(p);

  //edit button
  const edit = document.createElement("button");
  edit.innerText = "Edit";
  edit.classList.add("btn", "editBtn");
  li.appendChild(edit);

  //delete button

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("btn", "deleteBtn");
  li.appendChild(deleteBtn);

  return li;
}

function saveNotesToStorage(getCurrentNote) {
  let notesList;
  if (localStorage.getItem("notes") === null) {
    notesList = [];
  } else {
    notesList = JSON.parse(localStorage.getItem("notes"));
  }
  notesList.push(getCurrentNote);
  localStorage.setItem("notes", JSON.stringify(notesList));
}

function addNewNote() {
    const extractInputText = inputBox.value.trim();
    if (extractInputText.length <= 0) {
      errorMessageText.textContent =
        "Input can not be empty ! You must write some note to proceed";
      return false;
    }

  if (addButton.innerText === "Edit Note") {
    handleEditCurrentNote(currentEditedNote.target.previousElementSibling.innerHTML)

    currentEditedNote.target.previousElementSibling.innerHTML = extractInputText;
    addButton.innerHTML = "Add Note";
    inputBox.value = "";
    errorMessageText.textContent ="";
  } else {
    const newNoteItem = createNewNoteItem(extractInputText);

    notesListWraper.appendChild(newNoteItem);
    inputBox.value = "";
    errorMessageText.textContent ="";
    saveNotesToStorage(extractInputText);
  }
}

function fetchallNotes() {
  let notesList;

  if (localStorage.getItem("notes" === null)) {
    notesList = [];
  } else {
    notesList = JSON.parse(localStorage.getItem("notes"));
    notesList.forEach((noteItem) => {
      const extractLi = createNewNoteItem(noteItem);
      notesListWraper.appendChild(extractLi);
    });
  }
}

function handleEditCurrentNote(currentNote){
    let notes = JSON.parse(localStorage.getItem('notes'))
    let index = notes.indexOf(currentNote);
    notes[index]=inputBox.value;
    localStorage.setItem("notes",JSON.stringify(notes))

}

function handleDeleteNotes(currentNote) {
  if (localStorage.getItem("notes") === null) {
    notesList = [];
  } else {
    notesList = JSON.parse(localStorage.getItem("notes"));
  }
  let currentNoteText = currentNote.children[0].innerHTML;

  let index = notesList.indexOf(currentNoteText);
  notesList.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesList));
}
function handleEditOrDeleteNote(event) {
  // console.log(event.target.previousElementSibling, event.target.innerHTML);

  if (event.target.innerHTML === "Delete") {
    notesListWraper.removeChild(event.target.parentElement);
    handleDeleteNotes(event.target.parentElement);
  }

  if (event.target.innerHTML === "Edit") {
    let inputValue = event.target.previousElementSibling.innerHTML;
    inputBox.value = inputValue;
    inputBox.focus();
    addButton.innerText = "Edit Note";
    currentEditedNote = event;
  }
}

document.addEventListener("DOMContentLoaded", fetchallNotes);
addButton.addEventListener("click", addNewNote);
notesListWraper.addEventListener("click", handleEditOrDeleteNote);
