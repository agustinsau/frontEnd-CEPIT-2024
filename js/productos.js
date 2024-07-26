const comestiblesDiv = document.getElementById("comestibles-list");
const limpiezaDiv = document.getElementById("limpieza-list");

//sumar las dos listas en una? y acceder tipo productos.ListaComestibles, productos.ListaLimpieza y asi
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
        "nombre": "Detergente Líquido",
        "descripcion": "Detergente líquido para ropa, 2 litros.",
        "stock": 25,
        "precio": 3.99,
        "image": ""
    },
    {
        "nombre": "Lavavajillas",
        "descripcion": "Lavavajillas en gel, 750 ml.",
        "stock": 40,
        "precio": 2.49,
        "image": ""
    },
    {
        "nombre": "Friegasuelos",
        "descripcion": "Friegasuelos perfumado, 1.5 litros.",
        "stock": 20,
        "precio": 1.99,
        "image": ""
    },
    {
        "nombre": "Limpiacristales",
        "descripcion": "Limpiacristales con amoníaco, 500 ml.",
        "stock": 30,
        "precio": 2.0,
        "image": ""
    },
    {
        "nombre": "Jabón de Manos",
        "descripcion": "Jabón de manos antibacteriano, 500 ml.",
        "stock": 50,
        "precio": 1.5,
        "image": ""
    },
    {
        "nombre": "Suavizante de Ropa",
        "descripcion": "Suavizante para ropa, 2 litros.",
        "stock": 20,
        "precio": 2.5,
        "image": ""
    }
];

//LLAMADOS DE FUNCIONES///////////////////////////////

// Crear Lista Dinamica de Productos
createProducts(listaComestibles, comestiblesDiv);
createProducts(listaLimpieza, limpiezaDiv);

// Listeners botones de compra
escucharBtnsCompra();

/////////////////////////////////////////////////////

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
      ul.appendChild(createLi('Stock', product.stock));
      ul.appendChild(createLi('Precio', product.precio));

      //li.setAttribute('data-id', id); UN SPAN CON DATA ID ESPECIFICO PARA TOCAR EL STOCK?
      
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
  //console.log(comprarBtns)

  comprarBtns.forEach(btn => {
    
    btn.addEventListener('click', () => {
      console.log('btn apretado con id '+ btn.id);

      //capturar el input mas cercano al evento?
      let input = document.querySelector(`input[data-id='${btn.id}']`);

      let stock = input.max;
      let quantity = input.value;

      if((quantity > 0) && (quantity <= stock)){
        
        console.log('stock ' + stock +' cantidad '+ quantity);

        sumarAlCarrito(btn.id, quantity);
        //actualizarStock(btn.id, quantity);
        input.value = 0; // Vuelvo el valor del input a 0

      } else {
        alert("Ingrese una cantidad valida.");
      }

    })
  });
};


// Carrito de Compras

const pCarrito = document.getElementById('tot-carrito');

function buscarProdPorId(prodList, id) {
  return prodList.find(product => product.id === id); // Le especifico que con que campo comparar para saber si lo encuentra o no
}

function sumarAlCarrito(id, quantity) {
  let product = buscarProdPorId(listaComestibles, id);

  if (product) { // Si lo encuentra
    
    let totCompra = quantity * product.precio;
    let totCarrito = parseInt(pCarrito.innerText);
    pCarrito.innerText = totCarrito + totCompra;

  } else {
    console.log(`Producto con ID ${productId} no encontrado`);
  }

}

// Stock Productos

function actualizarStock(prodId, quantity){
  let liStock = document.querySelector(`li[data-id='${prodId}']`);
}
