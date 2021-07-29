// function that save the data.
function storeInMemory(note) {
    const arr = localStorage.getItem("notes"); // display data in local storage.
    let newArr = JSON.parse(arr);
    if(newArr === null) {
        newArr = [];    
    }
    let counter = localStorage.getItem("counter"); // display data in local storage.
    if(counter === null) {
        counter = 0;    
    }
    note.id = counter;
    newArr.push(note);
    counter++;
    const currentArr = JSON.stringify(newArr);
    localStorage.setItem("notes",currentArr); // put in the data.
    localStorage.setItem("counter",counter);
}

// function that show the data.
function displayAllNotes(){
    const allNotes = localStorage.getItem("notes");
    const arr = JSON.parse(allNotes);
    let text = "";
    for(let i = 0; i < arr.length; i++ ) {
        text += `<div class="notesView" id="${arr[i].id}">
                    <i id="resetClick" class="fa fa-close" onclick="deleteNote(${i})" ></i>
                    <br>
                    <span class="titleFromUser">${arr[i].title}</span>
                    <span  class="detailsFromUser overflow-auto">${arr[i].details}</span>
                    <span class="timeFromUser">
                        ${arr[i].date}
                        &nbsp &nbsp <br>
                        ${arr[i].time}
                    </span>
                </div> ` 
    }
    const allNotesBox = document.getElementById("allNotes");
    allNotesBox.innerHTML = text;   
}

// delete specific note from array that save in local storage.
function deleteNoteFromMemory(noteIndex){
    const allNotes = localStorage.getItem("notes");
    const arr = JSON.parse(allNotes);
    for(let i = noteIndex; i < arr.length; i++ ) {
        arr[i] = arr[i+1];
    }
    arr.pop();
    const currentArr = JSON.stringify(arr);
    localStorage.setItem("notes",currentArr); // put in the data.
}
function deleteNote(noteIndex) {
    deleteNoteFromMemory(noteIndex);
    displayAllNotes();
}

// Required Fields and take the values from html.
function requiredBox() {
    const titleBox = document.getElementById("titleBox");
    const detailsBox = document.getElementById("detailsBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const titleOfNote = titleBox.value;
    const details = detailsBox.value;
    const dateOfNote = dateBox.value;
    const timeOfNote = timeBox.value;
    const note = {
        title: titleOfNote,
        details: details,
        date: dateOfNote,
        time: timeOfNote
    };
    storeInMemory(note);
    displayAllNotes();
}

// default setting of field.
function defaultValues(validDetails) { 
    for(let i = 0; i < validDetails.length; i++) {
        validDetails[i].style.backgroundColor = "";
    }
}

// check if user ism't insert some details.
function checkDetails(validDetails) {
    let isValid = true;
    for(let i = 0; i < validDetails.length; i++) { 
        if(validDetails[i].value === "") { 
            validDetails[i].style.backgroundColor = "pink";
            validDetails[i].focus();
            isValid = false;
        }
    }
    return isValid;
}

// on tap on button of save- check if user insert details.
function saveDetails() { 
    const validDetails = document.getElementsByClassName("requiredDetails");
    defaultValues(validDetails);
    if(checkDetails(validDetails)) {
        requiredBox();
    }
    else{
        alert("Error, Please insert values in the marked fields");
    }
    event.preventDefault();
}

