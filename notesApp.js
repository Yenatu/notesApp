document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const editNoteBtn = document.getElementById('editNoteBtn');
    const deleteNoteBtn = document.getElementById('deleteNoteBtn');
    const notesList = document.getElementById('notesList');
  
    let notes = [];
  
    // Load notes from localStorage
    if (localStorage.getItem('notes')) {
      notes = JSON.parse(localStorage.getItem('notes'));
      renderNotes();
    }
  
    // Event listeners
    addNoteBtn.addEventListener('click', addNote);
    editNoteBtn.addEventListener('click', editNote);
    deleteNoteBtn.addEventListener('click', deleteNote);
    notesList.addEventListener('click', selectNote);
  
    // Functions
    function renderNotes() {
      notesList.innerHTML = '';
      notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.classList.add('note');
        li.textContent = note.text;
        li.dataset.index = index;
        notesList.appendChild(li);
      });
    }
  
    function addNote() {
      const text = noteInput.value.trim();
      if (text) {
        notes.push({ text });
        saveNotes();
        renderNotes();
        noteInput.value = '';
      }
    }
  
    function editNote() {
      const selectedNote = document.querySelector('.selected');
      if (selectedNote) {
        const selectedIndex = parseInt(selectedNote.dataset.index);
        const newText = noteInput.value.trim();
        if (newText) {
          notes[selectedIndex].text = newText;
          saveNotes();
          renderNotes();
          noteInput.value = '';
          selectedNote.classList.remove('selected');
          editNoteBtn.disabled = true;
          deleteNoteBtn.disabled = true;
        }
      }
    }
  
    function deleteNote() {
      const selectedNote = document.querySelector('.selected');
      if (selectedNote) {
        const selectedIndex = parseInt(selectedNote.dataset.index);
        notes.splice(selectedIndex, 1);
        saveNotes();
        renderNotes();
        noteInput.value = '';
        selectedNote.classList.remove('selected');
        editNoteBtn.disabled = true;
        deleteNoteBtn.disabled = true;
      }
    }
  
    function selectNote(e) {
      const selectedNote = e.target;
      if (selectedNote.tagName === 'LI') {
        if (selectedNote.classList.contains('selected')) {
          selectedNote.classList.remove('selected');
          noteInput.value = '';
          editNoteBtn.disabled = true;
          deleteNoteBtn.disabled = true;
        } else {
          const allNotes = document.querySelectorAll('.note');
          allNotes.forEach(note => note.classList.remove('selected'));
          selectedNote.classList.add('selected');
          noteInput.value = notes[selectedNote.dataset.index].text;
          editNoteBtn.disabled = false;
          deleteNoteBtn.disabled = false;
        }
      }
    }
  
    function saveNotes() {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  });
  