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

let response = {};


submit.addEventListener('click', () => {
    fetch(`${url}${document.getElementById('name').value}`).then(res => {
        res.json().then(info => {
            response = info;
            answer.innerHTML = response.gender;
            possibility.innerHTML = response.probability;
        });
    });
    savedAnswer.innerHTML = localStorage.getItem(document.getElementById('name').value);
});

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

clear.addEventListener('click', () => {
    localStorage.removeItem(document.getElementById('name').value);
    savedAnswer.innerHTML = '___';
});
 