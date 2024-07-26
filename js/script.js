const comestiblesDiv = document.getElementById("comestibles-list");
const limpiezaDiv = document.getElementById("limpieza-list");


const listaComestibles = [
    {
      "id": "c1",
      "nombre": "Leche Entera",
      "descripcion": "Leche entera de vaca. 1 litro.",
      "stock": 50,
      "precio": 0.99,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c2",
      "nombre": "Arroz Gallo",
      "descripcion": "Arroz Gallito que no se pega. 1 kg.",
      "stock": 30,
      "precio": 1.5,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c3",
      "nombre": "Huevos Orgánicos",
      "descripcion": "Huevos orgánicos, docena.",
      "stock": 20,
      "precio": 2.75,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c4",
      "nombre": "Pan Integral",
      "descripcion": "Hecho con harina de trigo entero.",
      "stock": 20,
      "precio": 1.5,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c5",
      "nombre": "Aceite de Oliva",
      "descripcion": "Aceite de oliva virgen extra, 500 ml.",
      "stock": 25,
      "precio": 4.99,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "id": "c6",
      "nombre": "Paty Fiesta",
      "descripcion": "Pack de 4 hamburguesas.",
      "stock": 20,
      "precio": 3.5,
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

function createImage(imagen, nombre){
    let img = document.createElement('img');
    img.setAttribute('src', imagen);
    img.setAttribute('alt', nombre);
  return img;
}

function createLi(textField, text){
    let li = document.createElement('li');
    let texto = document.createTextNode(`${textField}: ${text}`);
    li.appendChild(texto);
  return li;
}

function createInput(stock){
    let input = document.createElement('input');
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
      
      prodCard.appendChild(createImage(product.image, product.nombre));
      prodCard.appendChild(ul);
      prodCard.appendChild(createInput(product.stock));
      prodCard.appendChild(createButton(product.id));
  
      divProductos.appendChild(prodCard);
    });
};

createProducts(listaComestibles, comestiblesDiv);
createProducts(listaLimpieza, limpiezaDiv);


