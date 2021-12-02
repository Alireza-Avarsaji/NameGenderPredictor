// ? api url
const url = 'https://api.genderize.io/?name=';

// ? buttons
const submit = document.getElementsByClassName('submit')[0];
const save = document.getElementsByClassName('save')[0];
const clear = document.getElementsByClassName('clear')[0];

// ? results
const answer = document.getElementById('answer');
const possibility = document.getElementById('possibility');
const savedAnswer = document.getElementById('saved-ans');

// ? fetched response from api converted to js object
let response = {};

// ? submit button onclick
submit.addEventListener('click', () => {
    fetch(`${url}${document.getElementById('name').value}`).then(res => {
        res.json().then(info => {
            response = info;
            // ! handle null result
            if(!response.gender || response.probability == 0){
                console.log('hi');
                answer.innerText = 'Unknown';
                possibility.innerHTML = 0;
            }
            else{
                answer.innerHTML = response.gender;
                possibility.innerHTML = response.probability;
            }
        });
    }) //! catch network error
    .catch(err => {
        let error = document.getElementById("error");
        error.innerHTML = 'network error!'
    });
    savedAnswer.innerHTML = localStorage.getItem(document.getElementById('name').value);
});

// ? save button onclick
save.addEventListener('click', () => {
    const radioGroup = document.querySelectorAll('input[name="gender-type"]');
            let selectedValue;
            for (const rb of radioGroup) {
                if (rb.checked) {
                    selectedValue = rb.value;
                    break;
                }
            }
        if(selectedValue){
            localStorage.setItem(document.getElementById('name').value, selectedValue);
        }
        else{
            localStorage.setItem(document.getElementById('name').value, answer.innerHTML);
        }
});

// ? clear button onclick
clear.addEventListener('click', () => {
    localStorage.removeItem(document.getElementById('name').value);
    savedAnswer.innerHTML = '___';
});
 