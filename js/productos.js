const comestiblesDiv = document.getElementById("comestibles-list");
const limpiezaDiv = document.getElementById("limpieza-list");

const listaComestibles = [
    {
      "id": "c1",
      "nombre": "Leche Entera",
      "descripcion": "Leche entera de vaca. 1L.",
      "stock": 50,
      "precio": 1000,
      "image": "../resources/images/productos/comestibles/leche.png",
      "discount": 30
    },
    {
      "id": "c2",
      "nombre": "Arroz Gallo",
      "descripcion": "Arroz Gallito que no se pega. 500g.",
      "stock": 30,
      "precio": 3800,
      "image": "../resources/images/productos/comestibles/arroz.png",
      "discount": 0
    },
    {
      "id": "c3",
      "nombre": "Huevos Orgánicos",
      "descripcion": "HUEBOS DIVU, HUEBOS, 1/2 Docena.",
      "stock": 20,
      "precio": 3000,
      "image": "../resources/images/productos/comestibles/huevos.png",
      "discount": 0
    },
    {
      "id": "c4",
      "nombre": "Pan Integral",
      "descripcion": "Pan tipo Artesano Bimbo.",
      "stock": 20,
      "precio": 1800,
      "image": "../resources/images/productos/comestibles/pan.png",
      "discount": 30
    },
    {
      "id": "c5",
      "nombre": "Aceite de Oliva",
      "descripcion": "Aceite de oliva virgen extra, 500 ml.",
      "stock": 25,
      "precio": 12000,
      "image": "../resources/images/productos/comestibles/oliva.png",
      "discount": 0
    },
    {
      "id": "c6",
      "nombre": "Paty Fiesta",
      "descripcion": "Pack de 4 hamburguesas.",
      "stock": 20,
      "precio": 10000,
      "image": "../resources/images/productos/comestibles/burguer.png",
      "discount": 30
    }
];

const listaLimpieza = [
    {
        "id": "l1",
        "nombre": "I need a Hero",
        "descripcion": "I'm holding out for a hero. 3L.",
        "stock": 25,
        "precio": 3200,
        "image": "../resources/images/productos/limpieza/heroe.png",
        "discount": 30
    },
    {
        "id": "l2",
        "nombre": "Lavavajillas",
        "descripcion": "Cif en gel, 750 ml.",
        "stock": 40,
        "precio": 2000,
        "image": "../resources/images/productos/limpieza/detergente.png",
        "discount": 30
    },
    {
        "id": "l3",
        "nombre": "Friegasuelos",
        "descripcion": "Limpiador perfumado Ayudin, 900 ml.",
        "stock": 20,
        "precio": 1800,
        "image": "../resources/images/productos/limpieza/limpiador.png",
        "discount": 30
    },
    {
        "id": "l4",
        "nombre": "Limpiacristales",
        "descripcion": "Limpiacristales ecologico, 750 ml.",
        "stock": 30,
        "precio": 1200,
        "image": "../resources/images/productos/limpieza/limpiacris.png",
        "discount": 30
    },
    {
        "id": "l5",
        "nombre": "Limpia Manos",
        "descripcion": "Jabón liquido de manos antibacteriano, 221 ml.",
        "stock": 50,
        "precio": 2000,
        "image": "../resources/images/productos/limpieza/jabonliquido.png",
        "discount": 0
    },
    {
        "id": "l6",
        "nombre": "Suavizante de Ropa",
        "descripcion": "Vivere Clasico, 900 ml.",
        "stock": 20,
        "precio": 1900,
        "image": "../resources/images/productos/limpieza/vivere.png",
        "discount": 0
    }
];

// Productos => 0: comestibles, 1: limpieza
const productos = [listaComestibles, listaLimpieza];

//LLAMADOS DE FUNCIONES//

slowdownBanner();

// Crear Lista Dinamica de Productos
createProducts(productos[0], comestiblesDiv);
createProducts(productos[1], limpiezaDiv);

// Listeners botones de compra
escucharBtnsCompra();


// Funciones Creacion Elementos

function createImage(imagen, nombre, clase){
    let img = document.createElement('img');
    img.setAttribute('src', imagen);
    img.setAttribute('alt', nombre);
    img.setAttribute('class', clase);
  return img;
}

function createLi(field, text){
    let li = document.createElement('li');
    let texto = document.createTextNode(`${field} ${text}`);
    li.appendChild(texto);
  return li;
}

function createLiWithSpan(field, value, atributo, valorAtributo) {
    let li = document.createElement('li');
    li.textContent = `${field} `;

    let span = document.createElement('span');

    span.textContent = value;
    span.setAttribute(atributo, valorAtributo);

    li.appendChild(span);
  return li;
}

// Si tiene descuento el producto, agrega precio e imagen descuento, temporal no escalable si hay mas descuentos  
function createPriceLi(descuento, precio){
  if(descuento > 0){ 
      let precioDescuento = precio - (precio * (descuento / 100));
      let li = createLiWithSpan('Precio: $', precio, 'class', 'price-discount')
      let spanPDescuento = document.createElement('span');

      spanPDescuento.textContent = precioDescuento;
      li.appendChild(spanPDescuento);
    return li;
    
  } else {
    return createLi('Precio: $', precio);
  }  
}

function createInput(stock, id){
    let input = document.createElement('input');
    input.setAttribute('data-id', id);
    input.setAttribute('type', 'number');
    input.setAttribute('value', '0');
    input.setAttribute('min', '0');
    input.setAttribute('max', stock);
  return input;
}

function createButton(id){
    let button = document.createElement('button');
    button.setAttribute('type', 'button');  
    button.setAttribute('id', id); 
    button.setAttribute('class', 'btn-comprar');
    button.textContent = 'Comprar';
  return button;
}

function createProducts(productsList, divProductos){
  productsList.forEach(product =>{

    // Div para el card del producto
    let prodCard = document.createElement('div');
    prodCard.setAttribute('class', 'card');

    // Div para la imagen del producto
    let divImg = document.createElement('div');
    divImg.setAttribute('class', 'prod-image-container');

    divImg.appendChild(createImage(product.image, product.nombre, 'product-image'));

    //Si el producto tiene descuento, crea la imagen de % OFF
    if(product.discount > 0){
      divImg.appendChild(createImage('../resources/images/productos/30off.png', 'discount badge', 'discount-badge'));
    }

    // Div para la informacion del producto
    let divProdData = document.createElement('div');

    let ul = document.createElement('ul');

    ul.appendChild(createLi('Nombre:', product.nombre));
    ul.appendChild(createLi('Descripción:', product.descripcion));
    ul.appendChild(createLiWithSpan('Stock:', product.stock, 'data-id', product.id)); // Este li posee un span para modificar datos en el interior facilmente
    ul.appendChild(createPriceLi(product.discount, product.precio));

    // Adhiero la lista al div prod data
    divProdData.appendChild(ul);
    
    // Adhiero cada nodo al div Card
    prodCard.appendChild(divImg);
    prodCard.appendChild(divProdData);
    prodCard.appendChild(createInput(product.stock, product.id));
    prodCard.appendChild(createButton(product.id));

    divProductos.appendChild(prodCard);
  });
};


// Logica y listeners para cada boton de compra

function escucharBtnsCompra(){
  const comprarBtns = document.querySelectorAll('.btn-comprar');

  comprarBtns.forEach(btn => {
    
    btn.addEventListener('click', () => {
      console.log('btn apretado con id '+ btn.id);

      //capturar el input mas cercano al evento?
      let input = document.querySelector(`input[data-id='${btn.id}']`);
      let stockSpan = document.querySelector(`span[data-id='${btn.id}']`);
      
      let quantity = parseInt(input.value);
      let stock = parseInt(stockSpan.textContent);

      if((quantity > 0) && (quantity <= stock)){

        sumarAlCarrito(btn.id, quantity);
        actualizarStock(stockSpan, quantity);
        
        input.value = 0; // Luego de comprar, el valor del input vuelve a 0

        carrito.classList.remove('remove');
        carrito.classList.add('show');
        //carrito.classList.toggle('show', 'remove')

        alert("Producto agregado con exito.");


      } else {
        alert("Ingrese una cantidad valida.");
      }

    })
  });
};


// Stock Productos

function actualizarStock(stockSpan, quantity){
  let nuevoStock = parseInt(stockSpan.textContent) - quantity;
  stockSpan.textContent = nuevoStock;
  console.log('stock ' + stockSpan.textContent +' cantidad agregada '+ quantity);
}

// Cruz Carrito

document.querySelector('.cruz-modal').addEventListener('click', showCartModal);

// Carrito de Compras
const carrito = document.getElementById('carrito');
const pCarrito = document.getElementById('tot-carrito');

function buscarProdPorId(id) { 
  let product;

  for (let i = 0; i < productos.length; i++){
    product = productos[i].find(product => product.id === id); // Le especifico que con que campo comparar para saber si lo encuentra o no

    if (product){
      return product;
    }
  } 
  return product
}

function precioDescuento(precio, descuentoProd){
    let descuento = precio * (descuentoProd / 100);
    return (precio - descuento);
}

function calcularCompra(pDiscount, precio, cant){
  if (pDiscount > 0){
        let precioDesc = precioDescuento(precio, pDiscount) * cant;
      return (precioDesc);

    } else {
      return (precio * cant);
    }
}

function sumarAlCarrito(id, quantity) {
  let product = buscarProdPorId(id);
  
  if (product) { // Si lo encuentra
    let totCompra = calcularCompra(product.discount, product.precio, parseInt(quantity));
    let totCarrito = parseInt(pCarrito.innerText);

    pCarrito.innerText = totCarrito + totCompra;
    
  } else {
    console.log(`Producto con ID ${id} no encontrado`);
  }
}

//Funciones y Logica Metodos de Pago

const abrirModalPagos = document.getElementById('btn-pagar-carrito');
const btnSalirModal = document.getElementById('btn-cerrar-modal');
const metodosPago = document.getElementById('metodos-pago');
const totalAPagar = document.getElementById('totalPagoModal');
const tituloModal = document.getElementById('titulo-pagar-modal');
const pRecargo = document.getElementById('recargo-modal');

// Recargos segun metodo de pago

const recargoTransf = 0.05;
const recargoTresCuotas = 0.08;
const recargoSeisCuotas = 0.12;
const recargoDoceCuotas = 0.21;

function salirModal(){
  metodosPago.classList.replace('show', 'remove');
  metodosPago.close();
  paymentMethodsToDefaults();
}

abrirModalPagos.addEventListener('click', () => {
  // Si el carrito tiene articulos, muestra modal de pago
  if(parseInt(pCarrito.innerText) != 0){
    metodosPago.showModal();
    metodosPago.classList.remove('remove');
    metodosPago.classList.add('show');

    carrito.classList.replace('show', 'remove');

    //Muestro total actual del carrito en el modal
    totalAPagar.textContent = `$${pCarrito.textContent}`;
  } else {
    alert('No hay productos en el carrito.');
  }
  
});

btnSalirModal.addEventListener('click', salirModal);

// Listeners on change, luego de cargarse el documento
document.addEventListener('DOMContentLoaded', () => {
  // Al seleccionar metodo de pago, muestra el form correspondiente
  document.getElementById('payment-method').addEventListener('change', selectedPaymentMethod);

  // Listener change de cantidad de cuotas
  document.getElementById('cuotas-cant').addEventListener('change', mostrarPagoEnCuotas);
});

function calcularCuotas(cantCuotas){
  let total = parseInt(pCarrito.textContent); 
  let interes, montoCuota;

  if (cantCuotas === 3) {
    interes = recargoTresCuotas; 
  } else if (cantCuotas === 6) {
    interes = recargoSeisCuotas; 
  } else if (cantCuotas === 12) {
    interes = recargoDoceCuotas; 
  }
  
  montoCuota = (total / cantCuotas) * (1 + interes);

  pRecargo.innerText = `Pagas con ${cantCuotas} cuotas. Intereses por cuota: ${interes * 100}%.`; //rari aca

  return parseInt(montoCuota); 

}

function mostrarPagoEnCuotas(){
  
  let cantCuotas = parseInt(document.getElementById('cuotas-cant').value);

  // Si ya se han elegido las cuotas, mostrar cant cuotas y monto por cuota en modal
  if (cantCuotas){
    let montoCuota = calcularCuotas(cantCuotas);
  
    totalAPagar.textContent = `$${montoCuota}`; 
    tituloModal.innerText = 'Cantidad a Pagar por Cuota';

  }
}

function processPayment(metodoPago){
  let totalCarrito = parseInt(pCarrito.textContent);

  switch (metodoPago) {
    case 'presencial':
      return totalCarrito;

    case 'transfer':
      pRecargo.innerText = `Pagar por transferencia tiene un recargo del ${recargoTransf * 100}%.`;
      return (totalCarrito * (1 + recargoTransf)); 

    case 'credit-card': 
        mostrarPagoEnCuotas();
      return totalCarrito;

    default:
      break;
  }
}

function selectedPaymentMethod() {
  limpiarRecargoModal(); // Limpio el p del modal, con info vieja
  tituloModal.innerText = 'Total a Pagar';

  let metodoPago = document.getElementById('payment-method').value;
  console.log(metodoPago)

  // Aseguro ocultar metodos de pago
  document.querySelectorAll('.form-pago').forEach(form => form.classList.add('hidden'));

  // Muestra el metodo de pago seleccionado
  if (metodoPago) {
    document.getElementById(`${metodoPago}-form`).classList.remove('hidden');
    totalAPagar.textContent = `$${processPayment(metodoPago)}`; 
    console.log(totalAPagar.innerText)
    
  } else {
    console.log('metodo no encontrado');
  }
}


const metodPago = document.getElementById('payment-method');
const cuotasC = document.getElementById('cuotas-cant');
const bancoTarj = document.getElementById('banco-tarjeta');
const numTarj = document.getElementById('card-number');
const nomTarj = document.getElementById('card-name');
const expTarj = document.getElementById('expiry-date');

const numTarjPattern = /^[0-9]{9}$/;

function limpiarRecargoModal(){
  pRecargo.innerText = '';
}

function paymentMethodsToDefaults(){
  document.querySelectorAll('.form-pago').forEach(form => form.classList.add('hidden'));
  metodPago.value = 'select';
  bancoTarj.value = 'select';
  numTarj.value = '';
  nomTarj.value = '';
  expTarj.value = '';
  cuotasC.value = 'select';
  limpiarRecargoModal();
  tituloModal.innerText = 'Total a Pagar';
  
}

// Listeners botones reserva/ pago modal
const msjErrorModal = document.getElementById('mensaje-respuesta');

document.getElementById('btn-pagar-pres').addEventListener('click', hacerReserva);
document.getElementById('btn-pagar-transf').addEventListener('click', hacerReserva);
document.getElementById('btn-pagar-tarjeta').addEventListener('click', cardPaymentValidation);

function resetCarrito(){
  pCarrito.innerText = '0';
}

function hacerReserva(){
  mostrarAlertExito();
  salirModal();
  resetCarrito();
}

function mostrarAlertExito(){
  alert('Operacion Realizada con Exito!');
}

function cardPaymentValidation(){
  if (cuotasC.value === 'select' || bancoTarj.value === 'select' || 
    numTarj.value === '' || !numTarjPattern.test(numTarj.value) ||
    nomTarj.value === '' || expTarj.value === '' || cuotasC.value === 'select'){

      msjErrorModal.textContent = 'Por favor, verifique todos los campos antes de continuar.';
      msjErrorModal.classList.replace('hidden', 'error');

  } else {  
    mostrarAlertExito();
    msjErrorModal.classList.replace('error','hidden');
    resetCarrito();
    salirModal();
  }
}

// Changuito Icon

document.getElementById('cart-icon').addEventListener('click', showCartModal);

function showCartModal(){
  if(carrito.classList.contains('show')){
    carrito.classList.replace('show', 'remove');
  } else {
    carrito.classList.replace('remove', 'show');
    carrito.classList.add('show');
  }
  
}

// Banner Video 

function slowdownBanner(){
  const videoBanner = document.getElementById('banner-video');
  videoBanner.playbackRate = 0.90;
}

