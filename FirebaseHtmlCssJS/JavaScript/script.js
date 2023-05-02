import { onValue, remove, set, ref, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { db } from "./FirebaseConfig.js";

window.salvarDado = () => salvarDado();
window.removerDado = () => removerDado();
window.showComRemocao = () => showComRemocao();
window.esconderTabela = () => esconderTabela();


//Parte Logica para Salvar e Remover dados do Database
function salvarDado() {
    let inputId = document.getElementById("inputId").value;
    let inputName = document.getElementById("inputName").value;
    let inputAge = document.getElementById("inputAge").value;
    set(ref(db, 'UserID/' + inputId), {
        ID: inputId,
        username: inputName,
        age: inputAge
    })
    console.log("Dado Salvo");

}

function removerDado() {
    let inputRemove = document.getElementById("removeId").value;
    if (!inputRemove) {
        console.log("Por favor insira um ID válido");
        return;
    }
    const idRef = ref(db, "UserID/" + inputRemove);
    get(idRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                remove(idRef)
                    .then(() => {
                        console.log("Id Removido");
                    })
                    .catch((error) => {
                        console.log("Erro na remoção");
                    });
            } else {
                console.log("ID inexistente");
            }
        })
        .catch((error) => {
            console.log("Erro ao acessar o Firebase Realtime Database");
        });

}


//Parte visual dos dados do Database
function showComRemocao() {
    var usuariosRef = ref(db, "UserID");
    onValue(usuariosRef, (snapshot) => {
        const lista = [];
        snapshot.forEach((childSnapshot) => {
            lista.push({ key: childSnapshot.key, ...childSnapshot.val() });
        });

        const tabela = document.getElementById("TableContainer");
        const tbody = tabela.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";

        lista.forEach((dado) => {
            const tr = document.createElement("tr");

            const tdId = document.createElement("td");
            tdId.textContent = dado.ID;
            tr.appendChild(tdId);

            const tdNome = document.createElement("td");
            tdNome.textContent = dado.username;
            tr.appendChild(tdNome);

            const tdIdade = document.createElement("td");
            tdIdade.textContent = dado.age;
            tr.appendChild(tdIdade);

            const tdButton = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = "Remover";
            button.addEventListener("click", () => {
                // Remove o dado do Realtime Database
                remove(ref(db, "UserID/" + dado.key))
                    .then(() => {
                        console.log("Dado removido com sucesso");
                    })
                    .catch((error) => {
                        console.log("Erro ao remover dado:", error);
                    });

                // Remove a linha da tabela
                tr.remove();
            });
            tdButton.appendChild(button);
            tr.appendChild(tdButton);

            tbody.appendChild(tr);
        });
    });
}

function esconderTabela() {

    const tabela = document.getElementById('TableContainer');
    const tbody = tabela.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
}



//Metodo para mostrar os dados do Database em JSON
/*function mostrarTabela() {
    const listDB = ref(db, "UserID/");
    let txtId = document.getElementById("text");
    onValue(listDB, (snapshot) => {
        var lista = [];
        lista.push(snapshot.val());
        const dado = snapshot.val();
        txtId.innerHTML = JSON.stringify(dado, undefined, 2);
        console.log(lista);
        console.log(lista.length);

    });
}
*/

//Funcao para mostrar os dados do Database em uma Table no HTML
/*function show() {

    var usuariosRef = ref(db, 'UserID');
    onValue(usuariosRef, (snapshot) => {
        const lista = [];
        lista.length = 0;
        snapshot.forEach((childSnapshot) => {
            lista.push(childSnapshot.val());

        });

        const tabela = document.getElementById('TableContainer');
        const tbody = tabela.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';


        lista.forEach((dado) => {
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdNome = document.createElement('td');
            const tdIdade = document.createElement('td');


            tdId.textContent = dado.ID;
            tdNome.textContent = dado.username;
            tdIdade.textContent = dado.age;

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdIdade);

            tbody.appendChild(tr);



        });

    });
}
*/