

var nombre, email, phone, mensaje;




async function enviaremail() {  
  nombre = document.getElementById("nombre").value;
  email = document.getElementById("email").value;
  phone = document.getElementById("phone").value;
  mensaje = document.getElementById("mensaje").value;

  const data = {
    nombre, email, phone, mensaje
  }

  console.log('nuestros datos',data);
  
  let response = await fetch('http://127.0.0.1:5000/enviar_correo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  

let result = await response.json();
alert(result.message);
}



