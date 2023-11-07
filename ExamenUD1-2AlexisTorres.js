let usuario = [];
let tecnico = [];
let incidencias = [];
let incidenciasresueltas = [];

class Persona {

    constructor(id, username, password, Nombre, Apellidos, correo_electronico) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.Nombre = Nombre;
        this.Apellidos = Apellidos;
        this.correo_electronico = correo_electronico;
    }

}

class Incidencia {

    constructor(id, id_usuario, descripcion, id_tecnico, estado) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.descripcion = descripcion;
        this.id_tecnico = id_tecnico;
        this.estado = estado;
    }

    setEstadoAsignada(id) {
        this.id_tecnico = id
        this.estado = "Asignada"
    }

    setEstadoResuelta() {
        this.estado = "Resuelta"
    }
    setEstadoCerrada() {
        this.estado = "Cerrada"
    }

    mostrarIncidencia() {
        document.write("<div class='evento'>");
        document.write("<h2> ID Incidencia: " + this.id + "</h2>");
        document.write("<p> ID Usuario: " + this.id_usuario + "</p>");
        document.write("<p>Descripcion: " + this.descripcion + "</p>");
        document.write("<p>ID Tecnico: " + this.id_tecnico + "</p>");
        document.write("<p> Estado: " + this.estado + "</p>");
        document.write("</div>");
    }
}

/*Funciones de Incidencias */
function mostrarIncidencias() {
    incidencias.forEach(inci => { inci.mostrarIncidencia() });
}
function marcarResueltas(usuario) {
    let id;
    tecnico.forEach(tec => {
        if (tec.usuario = usuario) {
            id = tec.id
        }

    });

    incidencias.forEach(inci => {
        let mensaje = "Incidencia :" + inci.id + " | Tecnico: " + inci.id_tecnico + " | Usuario: " + inci.id_usuario + " | Descripcion: " + inci.descripcion + "\n ¿Desa dar por resuelta la incidencia?";

        if (inci.id_tecnico = id) {
            if (confirm(mensaje)) {
                inci.estado = "Resuelta"
            }
        }
    });
}

function cerrarIncidencias() {
    incidencias.forEach(inci => {
        let mensaje = "Incidencia :" + inci.id + " | Tecnico: " + inci.id_tecnico + " | Usuario: " + inci.id_usuario + " | Descripcion: " + inci.descripcion + "\n ¿Desa cerrar la incidencia?";
        if (inci.estado === "Resuelta") {
            if (confirm(mensaje)) {
                inci.estado = "Cerrada"
            } else {
                let razon = prompt("Escriba porque no quiere eliminarla: ")
                inci.descripcion = inci.descripcion + " |" + new Date + " - " + razon;
                inci.estado = "Asignada"
            }
        }
    });
}

function eliminarIncidenciasCerradas() {
    i = 0
    incidencias.forEach(inci => {
        if (inci.estado === "Cerrada") { incidencias.splice(i, 1); incidenciasresueltas.push(inci) }
        i++;
    });

}

/*Funciones de generar*/
function nuevaIncidencia(user) {
    /*Esto solo es para que añada los id automaticamente, si no hay nada en el LS empieza con id = 1*/
    let id = 0;
    incidencias.forEach(inci => {
        if (inci.id != null) {
            id = inci.id
        }

    });
    id++

    let id_user;
    usuario.forEach(usu => {
        if (user === usu.username) {
            id_user = usu.id
        }
    });
    let descripcion = prompt("Describa la incidencia")

    incidencias.push(new Incidencia(id, id_user, descripcion, null, "Notificada"));
}


function darAltaUsuario() {
    /*Esto solo es para que añada los id automaticamente, si no hay nada en el LS empieza con id = 1*/
    let id = 0;
    usuario.forEach(usu => {
        if (usu.id != null) {
            id = usu.id
        }

    });

    id++
    let username = prompt("Escriba su usuario:")
    let password = prompt("Escriba su contraseña:")
    let Nombre = prompt("Escriba su Nombre:")
    let Apellidos = prompt("Escriba su Apellido:")
    let correo_electronico = prompt("Escriba su Correo Electronico:")
    usuario.push(new Persona(id, username, password, Nombre, Apellidos, correo_electronico));
}

function darAltaTecnico() {
    /*Esto solo es para que añada los id automaticamente, si no hay nada en el LS empieza con id = 1*/
    let id = 0;
    tecnico.forEach(tec => {
        if (tec.id != null) {
            id = tec.id
        }

    });
    id++
    let username = prompt("Escriba su usuario:")
    let password = prompt("Escriba su contraseña:")
    let Nombre = prompt("Escriba su Nombre:")
    let Apellidos = prompt("Escriba su Apellido:")
    let correo_electronico = prompt("Escriba su Correo Electronico:")
    tecnico.push(new Persona(id, username, password, Nombre, Apellidos, correo_electronico));
}

/** Funciones de comprobacion */
function comprobarUsuario(user) {
    let comprobacion = 0;
    usuario.forEach(usu => {
        if (user === usu.username) {
            i = 0
            while (i != 3) {
                let contraseña = prompt("Escriba su contraseña: ")
                if (contraseña === usu.password) {
                    comprobacion = 1;
                    return comprobacion;
                } else {
                    alert("Error, contraseña erronea")
                    i++;
                }

            }
            comprobacion = 2;
            return comprobacion;
        }

    });

    return comprobacion
}

function comprobarTecnico(user) {

    let comprobacion = 0;
    tecnico.forEach(tec => {
        if (user === tec.username) {
            i = 0;
            while (i != 3) {
                let contraseña = prompt("Escriba su contraseña: ")
                if (contraseña === tec.password) {
                    comprobacion = 1;
                    return comprobacion;
                } else {
                    alert("Error, contraseña erronea")
                    i++;
                }

            }
            comprobacion = 2;
            return comprobacion;
        }

    });
    return comprobacion
}


/* Funciones de Menus */
function gestorIncidencias(usuario) {
    let i = 0;
    cargarLocalStorage("incidencias")
    while (i === 0) {
        let p = prompt("Bienvenido " + usuario + " \n 1- Notificar Una Incidencia \n 2- Mostrar Incidencias \n 3- Cerrar Incidencias \n 4- Salir");
        if (p === "1") {
            nuevaIncidencia(usuario);
            guardarEnLocalStorage("incidencias", incidencias)
        }
        if (p === "2") {
            mostrarIncidencias();
            i = 1
            break
        }
        if (p === "3") {
            cerrarIncidencias();
            guardarEnLocalStorage("incidencias", incidencias)
        }
        if (p === "4") {
            i = 1;
        }
    }
}

function gestorTecnico(usuario) {
    /*Intento de que se actualizen todas las incidencias no asignadas */
    cargarLocalStorage("incidencias")
    cargarLocalStorage("tecnico");
    let i = 0;
    incidencias.forEach(inci => {
        console.log(i)
        i++
        let r = tecnico.find((element) => element.id === Math.round(Math.random() * tecnico.length))
        if (inci.id = null) {
            let id = r.id
            inci.setEstadoAsignada(id)
        }

    });

    /*Bucle del menu */
    p = true
    while (p) {
        let pr = prompt("Bienvenido " + usuario + " ¿Que Quieres hacer?\n 1- Ver Incidencias Asignadas \n 2- Marcar incidencia como resuelta \n 3- Archivar incidencias cerradas \n 4- Salir");

        if (pr === "1") {
            tecnico.forEach(tec => {
                if (tec.usuario === usuario) {
                    tec.id
                    incidencias.forEach(inci => {
                        if (inci.id_tecnico = tec.id) {
                            if (inci.estado = "Asignado") {
                                let mensaje = "Incidencia :" + inci.id + " | Tecnico: " + inci.id_tecnico + " | Usuario: " + inci.id_usuario + " | Descripcion: " + inci.descripcion + "";
                                alert(mensaje)
                            }
                        }
                    });
                }

            });

        }
        if (pr === "2") {
            marcarResueltas(usuario)
        }
        if (pr === "3") {
            eliminarIncidenciasCerradas();
            guardarEnLocalStorage("incidencias", incidencias)
            guardarEnLocalStorage("incidenciasresueltas", incidenciasresueltas)
        }
        if (pr === "4") {
            p = false
        }
    }
}

function menu() {

    let pregunta2;
    p = true
    while (p) {
        let pregunta = prompt("¿Eres usuario, tecnico o deseas salir? (U/T/S)")
        if (pregunta === "U") {
            pregunta2 = confirm("¿Estas registrado? Aceptar si lo estas");
            cargarLocalStorage("usuario");
            if (pregunta2) {
                let usuario = prompt("Escriba su usuario para iniciar sesion")
                let comprobacion = comprobarUsuario(usuario)
                console.log(comprobacion)
                if (comprobacion === 1) {
                    gestorIncidencias(usuario)
                    p = false
                    break
                } if (comprobacion === 2) {
                    alert("Tres intentos fallidos, cerrando programa")
                    p = false;
                    break
                } if (comprobacion === 0) {
                    (alert("Usuario no encontrado"))
                    break
                }

            } else {
                darAltaUsuario();
                guardarEnLocalStorage("usuario", usuario)
                let comprobacion = comprobarUsuario(prompt("Escriba su usuario para iniciar sesion"))

                if (comprobacion === 1) {
                    gestorIncidencias()
                    p = false
                    break
                } if (comprobacion === 2) {
                    alert("Tres intentos fallidos, cerrando programa")
                    p = false
                    break
                } if (comprobacion === 0) {
                    (alert("Usuario no encontrado"))
                    break
                }
            }
        }
        if (pregunta === "T") {
            pregunta2 = confirm("¿Estas registrado? Aceptar si lo estas");
            cargarLocalStorage("tecnico");
            if (pregunta2) {
                let usuario = prompt("Escriba su usuario para iniciar sesion")
                let comprobacion = comprobarTecnico(usuario)
                if (comprobacion === 1) {
                    gestorTecnico()
                    p = false
                    break
                } if (comprobacion === 2) {
                    alert("Tres intentos fallidos, cerrando programa")
                    p = false
                    break
                } if (comprobacion === 0) {
                    (alert("Usuario no encontrado"))
                    break
                }
            }
            else {
                darAltaTecnico();
                guardarEnLocalStorage("tecnico", tecnico)
                let usuario = prompt("Escriba su usuario para iniciar sesion")
                let comprobacion = comprobarTecnico(usuario)
                if (comprobacion === 1) {
                    gestorTecnico()
                    p = false
                    break
                } if (comprobacion === 2) {
                    alert("Tres intentos fallidos, cerrando programa")
                    p = false
                    break
                } if (comprobacion === 0) {
                    (alert("Usuario no encontrado"))
                    break
                }
            }
        }
        if (pregunta === "S") { i = 1; break; }
    }
}

/*Local Storage*/

function cargarLocalStorage(id) {
    if (localStorage.getItem(id)) {
        switch (id) {
            case ("usuario"):
                usuario = []
                array = JSON.parse(localStorage.getItem(id)).map(evento => {
                    usuario.push(new Persona(evento.id, evento.username, evento.password, evento.Nombre, evento.Apellidos, evento.correo_electronico))
                });
            case ("tecnico"):
                tecnico = []
                array = JSON.parse(localStorage.getItem(id)).map(evento => {
                    tecnico.push(new Persona(evento.id, evento.username, evento.password, evento.Nombre, evento.Apellidos, evento.correo_electronico))
                });
            case ("incidencias"):
                incidencias = []
                array = JSON.parse(localStorage.getItem(id)).map(evento => {
                    incidencias.push(new Incidencia(evento.id, evento.id_usuario, evento.descripcion, evento.id_tecnico, evento.estado))
                });
            case ("incidenciasresueltas"):
                incidenciasresueltas = []
                array = JSON.parse(localStorage.getItem(id)).map(evento => {
                    incidenciasresueltas.push(new Incidencia(evento.id, evento.id_usuario, evento.descripcion, evento.id_tecnico, evento.estado))
                });

        }
    }
}

function guardarEnLocalStorage(id, objeto) {
    localStorage.removeItem(id);
    localStorage.setItem(id, JSON.stringify(objeto));
}


/*Script que inicia el progama*/

i = 0;
while (i === 0) {
    menu();
}