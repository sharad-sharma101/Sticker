const addnote = document.querySelector('#add');

const updateNote = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i> </button>
        <button class="delete"> <i class="fas fa-trash-alt"></i>
    </div>
    <div class="main ${text ? "" : "hidden"}"> </div>
    <textarea class="main ${text ? "hidden" : ""}"> </textarea>`;

    note.insertAdjacentHTML("afterbegin" , htmlData);

    const editButton = note.querySelector(".edit");
    const delButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");

    delButton.addEventListener("click" ,() => {
        note.remove();
        updateNote();
    });

    textarea.value = text ;
    mainDiv.innerHTML = text;

    editButton.addEventListener("click" , ()=>{
        mainDiv.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    })

    textarea.addEventListener("change" , (event) => {
       const value = event.target.value;
       mainDiv.innerHTML = value ;

       updateNote();
    });

    document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){
    notes.forEach((note) => addNewNote(note) );
}
addnote.addEventListener("click" , () => addNewNote());
