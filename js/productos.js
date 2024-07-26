const comestiblesDiv = document.getElementById("comestibles-list");
const limpiezaDiv = document.getElementById("limpieza-list");

const listaComestibles = [
    {
      "id": "c1",
      "nombre": "Leche Entera",
      "descripcion": "Leche entera de vaca. 1 litro.",
      "stock": 50,
      "precio": 1000,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c2",
      "nombre": "Arroz Gallo",
      "descripcion": "Arroz Gallito que no se pega. 1 kg.",
      "stock": 30,
      "precio": 3800,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c3",
      "nombre": "Huevos Orgánicos",
      "descripcion": "Huevos orgánicos, docena.",
      "stock": 20,
      "precio": 3000,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c4",
      "nombre": "Pan Integral",
      "descripcion": "Hecho con harina de trigo entero.",
      "stock": 20,
      "precio": 1800,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c5",
      "nombre": "Aceite de Oliva",
      "descripcion": "Aceite de oliva virgen extra, 500 ml.",
      "stock": 25,
      "precio": 12000,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c6",
      "nombre": "Paty Fiesta",
      "descripcion": "Pack de 4 hamburguesas.",
      "stock": 20,
      "precio": 10000,
      "image": "./images/productos/comestibles/arroz.png"
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

function createImage(imagen, nombre){
    let img = document.createElement('img');
    img.setAttribute('src', imagen);
    img.setAttribute('alt', nombre);
  return img;
}

function createLi(field, text){
    let li = document.createElement('li');
    let texto = document.createTextNode(`${field}: ${text}`);
    li.appendChild(texto);
  return li;
}

function createLiWithSpan(field, value, dataId) {
    let li = document.createElement('li');
    li.textContent = `${field}: `;

    let span = document.createElement('span');

    span.textContent = value;
    span.setAttribute('data-id', dataId);

    li.appendChild(span);
  return li;
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

//parametros: lista tipo producto, contenedor a guardar la lista
function createProducts(productsList, divProductos){
    productsList.forEach(product =>{

      let prodCard = document.createElement('div');
      prodCard.setAttribute('class', 'card');
  
      let ul = document.createElement('ul');
  
      ul.appendChild(createLi('Nombre', product.nombre));
      ul.appendChild(createLi('Descripción', product.descripcion));
      ul.appendChild(createLiWithSpan('Stock', product.stock, product.id)); // Este li posee un span para modificar facilmente el stock luego
      ul.appendChild(createLi('Precio', product.precio));
      
      prodCard.appendChild(createImage(product.image, product.nombre));
      prodCard.appendChild(ul);
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
      
      let quantity = input.value;
      let stock = parseInt(stockSpan.textContent);

      if((quantity > 0) && (quantity <= stock)){

        sumarAlCarrito(btn.id, quantity);
        actualizarStock(stockSpan, quantity);
        
        input.value = 0; // Luego de comprar, el valor del input vuelve a 0

      } else {
        alert("Ingrese una cantidad valida.");
      }

    })
  });
};


// Carrito de Compras

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

function sumarAlCarrito(id, quantity) {
  let product = buscarProdPorId(id);

  if (product) { // Si lo encuentra
    
    let totCompra = quantity * product.precio;
    let totCarrito = parseInt(pCarrito.innerText);
    pCarrito.innerText = totCarrito + totCompra;

  } else {
    console.log(`Producto con ID ${id} no encontrado`);
  }

}

// Stock Productos

function actualizarStock(stockSpan, quantity){
  let nuevoStock = parseInt(stockSpan.textContent) - quantity;
  stockSpan.textContent = nuevoStock;
  console.log('stock ' + stockSpan.textContent +' cantidad '+ quantity);
}
