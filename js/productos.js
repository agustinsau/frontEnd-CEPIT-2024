const comestiblesDiv = document.getElementById("comestibles-list");
const limpiezaDiv = document.getElementById("limpieza-list");

const listaComestibles = [
    {
      "id": "c1",
      "nombre": "Leche Entera",
      "descripcion": "Leche entera de vaca. 1 litro.",
      "stock": 50,
      "precio": 1000,
      "image": "../resources/images/productos/comestibles/arroz.png",
      "discount": 30
    },
    {
      "id": "c2",
      "nombre": "Arroz Gallo",
      "descripcion": "Arroz Gallito que no se pega. 1 kg.",
      "stock": 30,
      "precio": 3800,
      "image": "../resources/images/productos/comestibles/arroz.png",
      "discount": 0
    },
    {
      "id": "c3",
      "nombre": "Huevos Orgánicos",
      "descripcion": "Huevos orgánicos, docena.",
      "stock": 20,
      "precio": 3000,
      "image": "../resources/images/productos/comestibles/arroz.png",
      "discount": 0
    },
    {
      "id": "c4",
      "nombre": "Pan Integral",
      "descripcion": "Hecho con harina de trigo entero.",
      "stock": 20,
      "precio": 1800,
      "image": "../resources/images/productos/comestibles/arroz.png",
      "discount": 30
    },
    {
      "id": "c5",
      "nombre": "Aceite de Oliva",
      "descripcion": "Aceite de oliva virgen extra, 500 ml.",
      "stock": 25,
      "precio": 12000,
      "image": "../resources/images/productos/comestibles/arroz.png",
      "discount": 0
    },
    {
      "id": "c6",
      "nombre": "Paty Fiesta",
      "descripcion": "Pack de 4 hamburguesas.",
      "stock": 20,
      "precio": 10000,
      "image": "../resources/images/productos/comestibles/arroz.png",
      "discount": 30
    }
];

const listaLimpieza = [
    {
        "id": "l1",
        "nombre": "Detergente Líquido",
        "descripcion": "Detergente líquido para ropa, 2 litros.",
        "stock": 25,
        "precio": 3.99,
        "image": ""
    },
    {
        "id": "l2",
        "nombre": "Lavavajillas",
        "descripcion": "Lavavajillas en gel, 750 ml.",
        "stock": 40,
        "precio": 2.49,
        "image": ""
    },
    {
        "id": "l3",
        "nombre": "Friegasuelos",
        "descripcion": "Friegasuelos perfumado, 1.5 litros.",
        "stock": 20,
        "precio": 1.99,
        "image": ""
    },
    {
        "id": "l4",
        "nombre": "Limpiacristales",
        "descripcion": "Limpiacristales con amoníaco, 500 ml.",
        "stock": 30,
        "precio": 2.0,
        "image": ""
    },
    {
        "id": "l5",
        "nombre": "Jabón de Manos",
        "descripcion": "Jabón de manos antibacteriano, 500 ml.",
        "stock": 50,
        "precio": 1.5,
        "image": ""
    },
    {
        "id": "l6",
        "nombre": "Suavizante de Ropa",
        "descripcion": "Suavizante para ropa, 2 litros.",
        "stock": 20,
        "precio": 2.5,
        "image": ""
    }
];

// Productos => 0: comestibles, 1: limpieza
const productos = [listaComestibles, listaLimpieza];

//LLAMADOS DE FUNCIONES//

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


        //AGREGAR FEEDBACK QUE SE AGREGO BIEN EL PRODUCTO AL CARRO

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
const cerrarModalPagos = document.getElementById('btn-cerrar-modal');
const metodosPago = document.getElementById('metodos-pago');
const totalAPagar = document.getElementById('totalPagoModal');

// Recargos segun metodo de pago

const recargoTransf = 0.05;
const recargoTresCuotas = 0.08;
const recargoSeisCuotas = 0.12;
const recargoDoceCuotas = 0.21;

abrirModalPagos.addEventListener('click', () => {
  metodosPago.showModal();
  metodosPago.classList.remove('remove');
  metodosPago.classList.add('show');

  carrito.classList.replace('show', 'remove');

  //Muestro total actual del carrito en el modal
  totalAPagar.textContent = `$ ${pCarrito.textContent}`;
});

cerrarModalPagos.addEventListener('click', () => {
  metodosPago.classList.replace('show', 'remove');
  metodosPago.close();
  paymentMethodsToDefaults();
});

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

  return montoCuota;

}

function mostrarPagoEnCuotas(){
  let cantCuotas = parseInt(document.getElementById('cuotas-cant').value);
        
  let montoCuota = calcularCuotas(cantCuotas);

  //mostrar cant cuotas y monto por cuota en modal
  
  totalAPagar.textContent = `$ ${parseInt(montoCuota)} `;
}

function processPayment(metodoPago){
  let totalCarrito = parseInt(pCarrito.textContent);

  switch (metodoPago) {
    case 'presencial':
      return totalCarrito;

    case 'transfer':
      return (totalCarrito * (1 + recargoTransf)); 

    case 'credit-card': 
        mostrarPagoEnCuotas();
      return totalCarrito;

    default:
      break;
  }
}

function selectedPaymentMethod() {
  let metodoPago = document.getElementById('payment-method').value;
  console.log(metodoPago)

  // Aseguro ocultar metodos de pago
  document.querySelectorAll('.form-pago').forEach(form => form.classList.add('hidden'));

  // Muestra el metodo de pago seleccionado
  if (metodoPago) {
    document.getElementById(`${metodoPago}-form`).classList.remove('hidden');
    totalAPagar.textContent = `$ ${processPayment(metodoPago)}`; 
    console.log(totalAPagar.innerText)
    
  } else {
    console.log('metodo no encontrado');
  }
}

function paymentMethodsToDefaults(){
  document.getElementById('payment-method').value = 'select';
  document.getElementById('cuotas-cant').value = 'select';
  document.querySelectorAll('.form-pago').forEach(form => form.classList.add('hidden'));
}

