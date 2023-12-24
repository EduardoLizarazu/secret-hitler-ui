// const code = prompt('Ingresa el codigo');

// if (code === '1234') {
//     allHidden =document.querySelectorAll('.hidden');
//     allHidden.forEach(element => {
//         element.classList.remove('hidden');
//     });
// }

// Realizar una solicitud POST a la API
const API = {
    development: 'http://127.0.0.1:8000/votes',
    production: 'https://secret-hitler-87c101201aa1.herokuapp.com/votes'
};
const URL = API.development;

function toggleBorder(buttonId) {
    // Obtener el botón que se hizo clic
    const clickedButton = document.getElementById(buttonId);

    // Quitar la clase "active" de todos los botones
    const allButtons = document.querySelectorAll('.buttons button');
    allButtons.forEach(button => button.classList.remove('active'));

    // Agregar la clase "active" al botón clicado
    clickedButton.classList.add('active');
}


let allowed = false;
function startVoting() {
    const startVotingBtn = document.getElementById('startVotingButton');
    startVotingBtn.classList.toggle('allowed');
    allowed = !allowed;
    fetch(`${URL}/start`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({allowed : allowed})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

function submitVote() {
    // Obtener el botón activo
    const activeButton = document.querySelector('.buttons button.active');

    if (activeButton) {
        const voteType = activeButton.innerText;
        
        activeButton.classList.remove('active');

        // Enviar la solicitud UPDATE a la API
        const vote = { vote: activeButton.getAttribute('data-vote') };
        fetch(URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vote)
        })
        .then(response => response.json())
        .then(data => {
            data.voted ? alert('Voto enviado a ' + data.voted) : alert('Voto no enviado');
        })
        .catch(error => console.error(error));

    } else {
        alert('Por favor, seleccione una opción antes de enviar el voto.');
    }

    const allButtons = document.querySelectorAll('.buttons button');
    allButtons.forEach(button => button.classList.remove('active'));

}



function showResults() { 
    fetch(`${URL}/results`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            const naziScore = document.getElementById('getNaziVote');
            const alliesScore = document.getElementById('getAlliesVote');
            naziScore.innerHTML = data.votes.nazi;
            alliesScore.innerHTML = data.votes.allies;
            console.log(data);
        });
    
}

function resetVotes() {
    
    fetch(`${URL}/reset`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    const naziScore = document.getElementById('getNaziVote');
            const alliesScore = document.getElementById('getAlliesVote');
            naziScore.innerHTML = '0';
            alliesScore.innerHTML = '0';
    
    const startVotingBtn = document.getElementById('startVotingButton');
    startVotingBtn.classList.remove('allowed');

    allowed = false;

    alert('Votos reiniciados');

}







