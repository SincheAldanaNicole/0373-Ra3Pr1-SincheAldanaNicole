//Variables i elements 
const formulari = document.getElementById("formulari-notes");
const divErrors = document.getElementById("missatges-error");
const cosTaula = document.getElementById("cos-taula");
let alumnes = []; 

formulari.addEventListener("submit", function(e) {
    e.preventDefault();
    validarFormulari();
});

//Validació del formulari
function validarFormulari() {
    divErrors.innerHTML = "";
    const nom = document.getElementById("nom").value.trim();
    const examen = parseFloat(document.getElementById("examen").value);
    const practiques = parseFloat(document.getElementById("practiques").value);
    const actitud = parseFloat(document.getElementById("actitud").value);

    let errors = [];

    if (nom === "") errors.push("El nom no pot estar buit.");
    if (isNaN(examen) || examen < 0 || examen > 10) errors.push("Nota Examen incorrecta (0-10).");
    if (isNaN(practiques) || practiques < 0 || practiques > 10) errors.push("Nota Pràctiques incorrecta (0-10).");
    if (isNaN(actitud) || actitud < 0 || actitud > 10) errors.push("Nota Actitud incorrecta (0-10).");

    if (errors.length > 0) {
        divErrors.innerHTML = errors.join("<br>");
    } else {
        const notaFinal = calcularNotaFinal(examen, practiques, actitud);
        afegirAlumne(nom, notaFinal);
        formulari.reset();
    }
}

//Càlcul de la nota final 
function calcularNotaFinal(ex, pr, ac) {
    return (ex * 0.6) + (pr * 0.3) + (ac * 0.1);
}

//Afegir alumne a l'array com a objecte
function afegirAlumne(nom, nota) {
    let estat = nota >= 5 ? "Aprovat" : "Suspès"; 
    
    let alumne = {
        nom: nom,
        notaFinal: nota,
        estat: estat
    };

    alumnes.push(alumne);
    mostrarAlumnes();
}

//Mostrar la taula d'alumnes
function mostrarAlumnes() {
    cosTaula.innerHTML = ""; 

    alumnes.forEach(alumne => {
        
        let classeEstat = alumne.estat === "Aprovat" ? "celda-aprovat" : "celda-suspes";

        let fila = `
            <tr>
                <td>${alumne.nom}</td>
                <td>${alumne.notaFinal.toFixed(2)}</td>
                <td class="${classeEstat}">${alumne.estat}</td>
            </tr>
        `;
        cosTaula.innerHTML += fila;
    });
}

//Ordenació de la llista 
function ordenarAlumnes(criteri) {
    if (criteri === 'desc') {
        alumnes.sort((a, b) => b.notaFinal - a.notaFinal);
    } else {
        alumnes.sort((a, b) => a.notaFinal - b.notaFinal);
    }
    mostrarAlumnes();
}