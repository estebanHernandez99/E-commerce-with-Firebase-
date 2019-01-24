
let databaseRef = firebase.database();



//write new user inb the database
function writeNewUser(userID, name, email, photoURL, emailVerified){
  databaseRef.ref('users/' + userID).set({
    username:name,
    email:email,
    photo: photoURL,
    emailVerified: emailVerified
  }).then( e => {
    window.location.href ='index.html';
  });
}

//Create new product in the database
function createNewProduct(provider,photo, header, description,large_description,category,stars, price){
  //add a new
  let newProductKey = databaseRef.ref().child('products').push().key;

  let productData = {
    provider:provider,
    photo:photo,
    title:header,
    decription:description,
    large_description: large_description,
    category:category,
    stars:stars,
    price:price
  }
  /*databaseRef.ref('products').push().set({
    provider:provider,
    photo:photo,
    title:header,
    decription:description,
    large_description: large_description,
    category:category,
    stars:stars,
    price:price
  });*/

  let updates = {}
  updates['/products/' + newProductKey] = productData;
  updates['/comments/' + newProductKey] = {};

  databaseRef.ref().update(updates);
}

//contructor of the products set
function buildProduct(productObj, root){
  let col = document.createElement('div');
  col.classList.add('col-sm-3');


  let link = document.createElement('a');
  link.href = 'product.html?id=' + productObj.key;
  link.style = 'text-decoration:none;';



  let panel = document.createElement('div');
  panel.classList.add('product');

  let thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail');
  thumbnail.classList.add('shopItem');
  thumbnail.title = productObj.val().title;



  let img = document.createElement('img');
  img.src = productObj.val().photo;
  img.style.width='100%';
  //img.style.height = '100%';



  let caption = document.createElement('div');
  caption.classList.add('caption');

  let header = document.createElement('h4');
  let headerNode = document.createTextNode(productObj.val().title);
  header.style = `
    height:40px;
    overflow:hidden;
    color:blue;
  `;
  header.appendChild(headerNode);

  /*let description = document.createElement('p');
  let descriptionNode = document.createTextNode(productObj.val().text);
  description.appendChild(descriptionNode);*/

  let price = document.createElement('h4');
  price.classList.add('text-center');
  let priceNode = document.createTextNode('$' + productObj.val().price);
  price.appendChild(priceNode);

/*  let button = document.createElement('button');
  button.classList.add('btn');
  button.classList.add('btn-danger');
  button.classList.add('btn-lg');
  let btnText = document.createTextNode('Add to Cart ');
  button.appendChild(btnText);
  let span = document.createElement('span');
  span.classList.add('glyphicon');
  span.classList.add('glyphicon-shopping-cart');
  button.appendChild(span);*/

  caption.appendChild(header);
  //caption.appendChild(description);
  caption.appendChild(price);
  //caption.appendChild(button);

  thumbnail.appendChild(img);
  thumbnail.appendChild(caption);

  panel.appendChild(thumbnail);

  link.appendChild(panel);

  col.appendChild(link);
  root.appendChild(col);

}

//crea una fila (pide la raiz , y pregunta si devuelve el emento)
function createRow(root,isReturnable){
  let row = document.createElement('div');
  row.classList.add('row');
  row.classList.add('text-center');
  root.appendChild(row);

  if(isReturnable == true){
    return row;
  }
}





//wrtite comments for the products
