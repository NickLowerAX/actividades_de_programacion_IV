class ListaPrestamos extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.prestamos = [];
    }

    connectedCallback() {
        this.cargarDesdeLocalStorage();
        this.render();
    }

    agregarPrestamo(estudiante, libro, fechaPrestamo, fechaDevolucion, estado) {

        const nuevoPrestamo = {
            estudiante,
            libro,
            fechaPrestamo,
            fechaDevolucion,
            estado
        };

        this.prestamos.push(nuevoPrestamo);

        this.guardarEnLocalStorage();
        this.render();
    }

    guardarEnLocalStorage() {
        localStorage.setItem("prestamos", JSON.stringify(this.prestamos));
    }

    cargarDesdeLocalStorage() {
        const datos = localStorage.getItem("prestamos");
        if (datos) {
            this.prestamos = JSON.parse(datos);
        }
    }

    eliminarPrestamo(index) {
        this.prestamos.splice(index, 1);
        this.guardarEnLocalStorage();
        this.render();
    }

    render() {
        const hoy = new Date().toISOString().split("T")[0];

        this.shadowRoot.innerHTML = `
            <style>
                h3 { color: #1a237e; }
                ul { padding: 0; }
                li { 
                    list-style: none; 
                    margin: 8px 0; 
                    padding: 8px;
                    background: #f2f2f2;
                    border-radius: 5px;
                }
                .vencido { color: red; font-weight: bold; }
                button {
                    margin-top: 5px;
                    padding: 4px 8px;
                    background: crimson;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            </style>

            <h3>Préstamos Registrados</h3>

            ${this.prestamos.length === 0 ? "<p>No hay préstamos registrados.</p>" : ""}

            <ul>
                ${this.prestamos.map((p, index) => {
                    const vencido = (p.fechaDevolucion < hoy && p.estado === "Prestado");

                    return `
                        <li class="${vencido ? "vencido" : ""}">
                            <strong>${p.estudiante}</strong><br>
                            Libro: ${p.libro}<br>
                            Préstamo: ${p.fechaPrestamo}<br>
                            Devolución: ${p.fechaDevolucion}<br>
                            Estado: ${p.estado}
                            ${vencido ? "<br>⚠ VENCIDO" : ""}
                            <br>
                            <button data-index="${index}">Eliminar</button>
                        </li>
                    `;
                }).join("")}
            </ul>
        `;

        // Evento para botones eliminar
        this.shadowRoot.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                this.eliminarPrestamo(index);
            });
        });
    }
}

customElements.define("lista-prestamos", ListaPrestamos);


// ---------------- FORMULARIO ----------------

const form = document.getElementById("formPrestamo");
const componente = document.querySelector("lista-prestamos");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const estudiante = document.getElementById("estudiante").value.trim();
    const libro = document.getElementById("libro").value.trim();
    const fechaPrestamo = document.getElementById("fechaPrestamo").value;
    const fechaDevolucion = document.getElementById("fechaDevolucion").value;
    const estado = document.getElementById("estado").value;

    // VALIDACIONES
    if (
        estudiante === "" ||
        libro === "" ||
        fechaPrestamo === "" ||
        fechaDevolucion === "" ||
        estado === ""
    ) {
        alert("Complete todos los campos.");
        return;
    }

    if (fechaDevolucion < fechaPrestamo) {
        alert("La fecha de devolución no puede ser menor a la fecha de préstamo.");
        return;
    }

    componente.agregarPrestamo(
        estudiante,
        libro,
        fechaPrestamo,
        fechaDevolucion,
        estado
    );

    form.reset();
});