let comestiblesLi = document.getElementById("comestibles-list");



const listaComestibles = [
    {
      "nombre": "Leche Entera",
      "descripcion": "Leche entera de vaca. 1 litro.",
      "stock": 50,
      "precio": 0.99,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "nombre": "Arroz Gallo",
      "descripcion": "Arroz Gallito que no se pega. 1 kg.",
      "stock": 30,
      "precio": 1.5,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "nombre": "Huevos Orgánicos",
      "descripcion": "Huevos orgánicos, docena.",
      "stock": 20,
      "precio": 2.75,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "nombre": "Pan Integral",
      "descripcion": "Hecho con harina de trigo entero.",
      "stock": 20,
      "precio": 1.5,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
      "nombre": "Aceite de Oliva",
      "descripcion": "Aceite de oliva virgen extra, 500 ml.",
      "stock": 25,
      "precio": 4.99,
      "image": "./images/productos/comestibles/arroz.png"
    },
    {
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

function createProduct(){
    console.log('entro al func')
    listaComestibles.forEach(product =>{

        let prodCard = document.createElement('div');
        prodCard.setAttribute('class', 'card');
    
        let img = document.createElement('img');
        img.setAttribute('src', product.image);
        img.setAttribute('alt', product.nombre);
        //img.setAttribute("class", clase);
    
        let ul = document.createElement('ul');
    
        let liNombre = document.createElement('li');
        let texto = document.createTextNode(`Nombre: ${product.nombre}`);
        liNombre.appendChild(texto);
    
        let liDescripcion = document.createElement('li');
        texto = document.createTextNode(`Descripción: ${product.descripcion}`);
        liDescripcion.appendChild(texto);
    
        let liStock = document.createElement('li');
        texto = document.createTextNode(`Stock: ${product.stock}`);
        liStock.appendChild(texto);
    
        let liPrecio = document.createElement('li');
        texto = document.createTextNode(`Precio: ${product.precio}`);
        liPrecio.appendChild(texto);
    
        ul.appendChild(liNombre);
        ul.appendChild(liDescripcion);
        ul.appendChild(liStock);
        ul.appendChild(liPrecio);
    
        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('value', '0');
        input.setAttribute('min', '0');
        input.setAttribute('max', product.stock);
    
        let button = document.createElement('button');
        button.setAttribute('type', 'button');  
        button.textContent = 'Comprar';
        
    
        prodCard.appendChild(img);
        prodCard.appendChild(ul);
        prodCard.appendChild(input);
        prodCard.appendChild(button);
    
        comestiblesLi.appendChild(prodCard);
    });
};

createProduct();


