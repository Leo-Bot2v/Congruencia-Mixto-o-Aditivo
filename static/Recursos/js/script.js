new QWebChannel(qt.webChannelTransport, function(channel) {
    backend = channel.objects.backend;

    // ✅ Aquí ya puedes usar backend con seguridad

    // Escuchar la respuesta del backend
    backend.message_received.connect(function(resultado_json) {
        var resultado = JSON.parse(resultado_json);
        var tablaBody = document.getElementById('tabla-body');
        tablaBody.innerHTML = '';

        resultado.forEach(function(item, index) {
            var row = tablaBody.insertRow();
            var cell1 = row.insertCell(0); cell1.innerText = item.i;
            var cell2 = row.insertCell(1); cell2.innerText = item.xo;
            var cell3 = row.insertCell(2); cell3.innerText = item.xn1;
            var cell4 = row.insertCell(3); cell4.innerText = item.uniforme;
        });
    });

    // También puedes mover aquí la llamada a `mostrarTabla` si lo necesitas inmediatamente
});

// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces dinámicas de neón y efectos visuales
const ambientLight = new THREE.AmbientLight(0x00ffff, 0.5); // Luz ambiental azul
const directionalLight = new THREE.DirectionalLight(0xff4500, 1); // Luz direccional naranja
directionalLight.position.set(0, 10, 10);
scene.add(ambientLight, directionalLight);

// Crear un objeto 3D flotante que cambia de forma
let geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
let material = new THREE.MeshStandardMaterial({
    color: 0xFF5733,
    emissive: 0xFF5733,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.9
});

let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Cámara dinámica que sigue el mouse
const mouse = new THREE.Vector2();
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animación interactiva con cambio de forma y luz
function animate() {
    requestAnimationFrame(animate);

    // Rotar el objeto
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    // Cambiar la posición de la cámara según el mouse
    camera.position.x += (mouse.x * 0.1 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 0.1 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Cambiar el color de la luz de manera interactiva
    directionalLight.color.setHSL((Math.sin(Date.now() * 0.001) + 1) / 2, 1, 0.5);
    
    // Animación fluida
    renderer.render(scene, camera);
}

animate();

document.getElementById("verMas").addEventListener("click", function(event) {
    event.preventDefault();
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.opacity = "1";
        modal.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
});
document.getElementById("cerrar").addEventListener("click", function() {
    let modal = document.getElementById("modal");
    modal.style.opacity = "0";
    modal.style.transform = "translate(-50%, -50%) scale(0.8)";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
});
document.getElementById("opHasta").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("opRepetido").classList.remove("active");
    document.getElementById("hasta").disabled = false;
});

document.getElementById("opRepetido").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("opHasta").classList.remove("active");
    document.getElementById("hasta").disabled = true;
});

function mostrarTabla(event) {
    event.preventDefault();

    let a = parseInt(document.getElementById('a').value);
    let xo = parseInt(document.getElementById('xo').value);
    let c = parseInt(document.getElementById('c').value);
    let m = parseInt(document.getElementById('m').value);
    let hasta = parseInt(document.getElementById('hasta').value);

    let usarHasta = document.getElementById("opHasta").classList.contains("active");

    if(a && xo && c && m)
    {
        if (usarHasta && (isNaN(hasta) || hasta <= 0)) {
            Swal.fire({
                title: "Error",
                text: "Si seleccionas 'Número Ingresado', el campo 'Hasta' debe ser mayor a 0.",
                icon: "error"
            });
            return;
        }

        document.getElementById('formulario').classList.add('hidden');
        document.getElementById('tabla').classList.remove('hidden');
        
        // Crear un objeto con los datos del formulario
        var datos = {
            a: a,
            xo: xo,
            c: c,
            m: m,
            hasta: usarHasta ? hasta : null
        };

        // Enviar los datos al backend de Python
        backend.recibir_mensaje(JSON.stringify(datos));  // Convertir el objeto a cadena JSON
    }
    else
    {
        Swal.fire({
            title: "¡Error!",
            text: "Debes completar todos los campos.",
            icon: "warning",
            confirmButtonText: "Entendido"
        });
    }
}
function mostrarFormulario(event) {
    event.preventDefault();
    document.getElementById('tabla').classList.add('hidden');
    document.getElementById('formulario').classList.remove('hidden');
}

function url(event)
{
    event.preventDefault();
    window.location.href = "https://fonts.google.com/knowledge/using_type/licensing";
    window.stop();
}