
var database = firebase.database();
var ref = database.ref('luces');

function apagar_luz(id) {
    const newData = {
        estado: 0
    }
    ref.child(id).update(newData);
}

function encender_luz(id) {
    const newData = {
        estado: 1
    }
    ref.child(id).update(newData);
}


//CONSULTA AL ABRIR LA APP
function consulta_estados() {
    for (let i = 1; i <= 4; i++) {
        ref.once("value").then(function (snapshot) {
            var estado = snapshot.child(i).child("estado").val();
            console.log(estado);

            if (estado == 0) {
                $('#m_' + i).html('LED '+i+': Apagado')
                $('#led_' + i).bootstrapToggle('off');
            } else {
                $('#m_' + i).html('LED '+i+': Encendido')
                $('#led_' + i).bootstrapToggle('on');
            }
        });
    }
}


//DETECTAMOS LOS ESTADOS DE LAS LUCES EN LA BASE DE DATOS
ref.on("value", snapshot => {
    for (let i = 1; i <= 4; i++) {
        var estado = snapshot.child(i).child("estado").val();
        console.log(estado);

        if (estado == 0) {
            $('#m_' + i).html('LED '+i+': Apagado')
            $('#led_' + i).bootstrapToggle('off');
        } else {
            $('#m_' + i).html('LED '+i+': Encendido')
            $('#led_' + i).bootstrapToggle('on');
        }
    }
});


//EVENTOS DE LOS BOTONES TOGGLE
$('#led_1').change(function () {
    if ($(this).prop('checked') == true) {
        encender_luz(1);
    } else {
        apagar_luz(1);
    }
})

$('#led_2').change(function () {
    if ($(this).prop('checked') == true) {
        encender_luz(2);
    } else {
        apagar_luz(2);
    }
})

$('#led_3').change(function () {
    if ($(this).prop('checked') == true) {
        encender_luz(3);
    } else {
        apagar_luz(3);
    }
})

$('#led_4').change(function () {
    if ($(this).prop('checked') == true) {
        encender_luz(4);
    } else {
        apagar_luz(4);
    }
})

consulta_estados();

/* INSERTAR LUCES
    for(let i = 1; i <= 4; i++){
        database.ref("/luces/"+i).set({
            nombre: "Led_1",
            descripcion: "Sala",
            estado: 0
        });
    }

    ELIMINAR:
    ref.child(id).remove();

*/