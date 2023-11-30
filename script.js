/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
//

let todolistForm = document.getElementById("form-1");

let todolistInput = document.getElementById("list-input");

let todolistResult = document.getElementById("form-results-1");

let todolistCountP = document.getElementById("todolist-count");


//Array of to do list
let todolistArray = [];

todolistForm.addEventListener("submit",handlesubmit)


function handlesubmit (event) {
    event.preventDefault();

    const inputValue = todolistInput.value;

    todolistArray.push(inputValue);

    //Clear the input
    todolistInput.value = "";

    renderData();

}


function renderData() {
   
    todolistResult.innerHTML ="";
   
    for (let i=0; i<todolistArray.length;i++) {
        
        let tempListItem = document.createElement("li");

        //tempListItem.textContent = todolistArray[i];

        let tempButton = document.createElement ("button");
        let tempParagraph = document.createElement("p");

        tempParagraph.textContent = todolistArray[i];

        tempButton.textContent = "remove";
        tempButton.className = "+"; 


        tempButton.dataset.super =i;

        tempParagraph.addEventListener("click", function (event) {
            event.target.classList.toggle("strikethrough"); // Toggle the class for strikethrough
            saveStrikethroughStatus(i, event.target.classList.contains("strikethrough"));
        });


        tempButton.addEventListener("click",function(event){
            console.log ("You clicked me");
            console.log("You cliked on", event.target.dataset.super);

            //Remove this item from the array 
            todolistArray.splice(event.target.dataset.super,1);

            //Rerender the list
            renderData();
        

        });

        const Striked = getStrikethroughStatus(i);
        if (Striked) {
            tempParagraph.classList.add("strikethrough");
        }

        tempListItem.appendChild(tempParagraph);
        tempListItem.appendChild(tempButton);

        todolistResult.appendChild(tempListItem);
    }

}

// Function to save strikethrough status to local storage
function saveStrikethroughStatus(i, status) {
    localStorage.setItem(`strikethrough_${i}`, status);
}

function getStrikethroughStatus(i) {
    return localStorage.getItem(`strikethrough_${i}`) === 'true';
}
document.getElementById('suggestion-btn').addEventListener('click', function() {
    let suggestions = ['Cook dinner', 'Exercise', 'Pay hydro bill']; // Example suggestions
    let suggestionList = document.getElementById('suggestion-results');
    suggestionList.innerHTML = ''; // Clear existing suggestions
    suggestions.forEach(suggestion => {
        let li = document.createElement('li');
        li.textContent = suggestion;
        suggestionList.appendChild(li);
    });
});
function displayDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', options);
}

window.onload = displayDate;
document.getElementById('suggestion-btn').addEventListener('click', function() {
    let suggestions = ['Cook dinner🍕', 'Exercise', '*Pay hydro bill']; // Example suggestions
    let suggestionList = document.getElementById('suggestion-results');
    suggestionList.innerHTML = ''; // Clear existing suggestions
    suggestionList.style.display = 'none'; // Hide before populating

    setTimeout(function() { // Delay the display
        suggestions.forEach(suggestion => {
            let li = document.createElement('li');
            li.textContent = suggestion;
            suggestionList.appendChild(li);
        });
        suggestionList.style.display = 'block'; // Show with fade-in effect
    }, 500); // 500 milliseconds delay
});
function addTask(taskText, reminderDate) {
    let li = document.createElement('li');
    li.textContent = taskText;

    if (reminderDate) {
        let date = new Date(reminderDate);
        let now = new Date();
        if (date > now) {
            setTimeout(() => {
                alert('Reminder: ' + taskText);
            }, date - now);
        }
    }

    document.getElementById('form-results-1').appendChild(li);
}
document.getElementById('form-1').addEventListener('submit', function(event) {
    event.preventDefault();
    let taskText = document.getElementById('list-input').value;
    let reminderDate = document.getElementById('reminder-date').value;
    addTask(taskText, reminderDate);
});
function addTask(taskText) {
    let li = document.createElement('li');
    let markDoneButton = document.createElement('button');
    markDoneButton.textContent = 'Mark as Done';
    markDoneButton.onclick = function() {
        li.style.textDecoration = 'line-through';
        // Optionally remove or disable the button after marking as done
        markDoneButton.disabled = true;
    };

    li.appendChild(document.createTextNode(taskText));
    li.appendChild(markDoneButton);
    document.getElementById('form-results-1').appendChild(li);
}
