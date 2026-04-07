//Variables i elements 
const formulari = document.getElementById("formulari-notes");
const divErrors = document.getElementById("missatges-error");
const cosTaula = document.getElementById("cos-taula");

let alumnes = []; 

//Funció per validar i processar el formulari
formulari.addEventListener("submit", function(e) {
    e.preventDefault(); 
    validarFormulari();
});

function validarFormulari() {
    divErrors.innerHTML = ""; 
    
    const nom = document.getElementById("nom").value.trim();
    const examen = parseFloat(document.getElementById("examen").value);
    const practiques = parseFloat(document.getElementById("practiques").value);
    const actitud = parseFloat(document.getElementById("actitud").value);

    let errors = [];

    if (nom === "") errors.push("El nom no pot estar buit.");
    
    if (isNaN(examen) || examen < 0 || examen > 10) 
        errors.push("La nota d'examen ha de ser un número entre 0 i 10.");
    
    if (isNaN(practiques) || practiques < 0 || practiques > 10) 
        errors.push("La nota de pràctiques ha de ser un número entre 0 i 10.");
    
    if (isNaN(actitud) || actitud < 0 || actitud > 10) 
        errors.push("La nota d'actitud ha de ser un número entre 0 i 10.");

    if (errors.length > 0) {
        divErrors.innerHTML = errors.join("<br>");
    } else {
        afegirAlumne(nom, examen, practiques, actitud);
        formulari.reset(); 
    }
}

//Funció per calcular la nota i crear l'objecte
function afegirAlumne(nom, ex, pr, ac) {
    const notaFinal = (ex * 0.6) + (pr * 0.3) + (ac * 0.1);
    
    let nouAlumne = {
        nom: nom,
        notaFinal: notaFinal,
        estat: notaFinal >= 5 ? "Aprovat" : "Suspès"
    };

    alumnes.push(nouAlumne);
    mostrarAlumnes();
}

//Funció per mostrar la taula

function mostrarAlumnes() {
    cosTaula.innerHTML = ""; 
    alumnes.forEach(alumne => {
        let classeColor = alumne.notaFinal >= 5 ? "celda-aprovat" : "celda-suspes";
        let fila = `
            <tr>
                <td>${alumne.nom}</td>
                <td class="${classeColor}">${alumne.notaFinal.toFixed(2)}</td>
                <td>${alumne.estat}</td>
            </tr>
        `;
        cosTaula.innerHTML += fila;
    });
}
//Funció per ordenar 
function ordenarAlumnes(criteri) {
    if (criteri === 'desc') {
        alumnes.sort((a, b) => b.notaFinal - a.notaFinal);
    } else {
        alumnes.sort((a, b) => a.notaFinal - b.notaFinal);
    }
    mostrarAlumnes();
}