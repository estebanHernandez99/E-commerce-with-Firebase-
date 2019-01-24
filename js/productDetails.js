//DOM
const productDetails = document.getElementById('productDetails');
let newRow = createRow(productDetails, true);
firebase.database().ref('products/' + id).on('value', snap => {


  buildProductDetails(newRow, snap);
});



function buildProductDetails(root, productObj){

  let col1 = document.createElement('div');
  col1.classList.add('col-sm-6');

  let  col2 = document.createElement('div');
  col2.classList.add('col-sm-6');

  let thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail');

  let img = document.createElement('img');
  img.src = productObj.val().photo;
  img.style = 'width:100%; height:100%';

  thumbnail.appendChild(img);


  let h2Name = document.createElement('h2');
  let h2TextNode = document.createTextNode(productObj.val().title);
  h2Name.appendChild(h2TextNode);
  h2Name.style = 'margin-bottom:10px;';

  let subRow = document.createElement('div');
  subRow.classList.add('row');

  let subCol1 = document.createElement('div');
  subCol1.classList.add('col-sm-6');

  let subCol2 = document.createElement('div');
  subCol2.classList.add('col-sm-6');

  let stars = document.createElement('div');
  stars.style = 'padding:10px';

  let price = document.createElement('h3');
  let priceTextNode = document.createTextNode('$' + productObj.val().price);
  price.appendChild(priceTextNode);
  price.setAttribute('id', 'price')
  let priceHidden = document.createElement('p');
  priceHidden.setAttribute('id', 'priceHidden');
  priceHidden.style = 'display:none';
  let priceHTextNode = document.createTextNode(productObj.val().price);
  priceHidden.appendChild(priceHTextNode);


  let provider = document.createElement('div');
  let providerTextNode = document.createTextNode(productObj.val().provider);
  provider.appendChild(providerTextNode);

  subCol1.appendChild(stars);
  subCol2.appendChild(price);
  subCol2.appendChild(priceHidden);

  subRow.appendChild(subCol1);
  subRow.appendChild(subCol2);

  let cartStuff = document.createElement('div');
  cartStuff.classList.add('row');
  cartStuff.classList.add('text-center');
  cartStuff.style = `
  margin-top:20px;
  `;
  let newCol1 = document.createElement('div');
  newCol1.classList.add('col-sm-4');

  let newCol2 = document.createElement('div');
  newCol2.classList.add('col-sm-8');

//container for the quantity of items
  let quantity = document.createElement('div');

  let h4Quantity = document.createElement('h4');
  let h4QuantityTextNode = document.createTextNode('Quantity');
  h4Quantity.style = 'padding:1px; margin:0';
  h4Quantity.classList.add('text-center')
  h4Quantity.appendChild(h4QuantityTextNode);

  let inputNumber = document.createElement('input');
  inputNumber.type = 'number';
  inputNumber.min = '1';
  inputNumber.value  = '1';
  inputNumber.classList.add('form-control');
  inputNumber.setAttribute('id','quantity');
  inputNumber.style = `
  display:block;
  padding:10px;
  width:100px;
  margin-left:50%;
  transform:translate(-50%, 0);
  `;

  //listener when the input changes
  inputNumber.addEventListener('change', e => {
    let price = document.getElementById('price');
    let priceHidden = document.getElementById('priceHidden');
    price.innerHTML = '$' + Number(priceHidden.innerHTML) * Number(inputNumber.value);
  });

  quantity.appendChild(h4Quantity);
  quantity.appendChild(inputNumber);

  let btnCartC = document.createElement('div');

  let addToCart = document.createElement('a');
  let addToCartTextNode = document.createTextNode('Add to Cart ');
  addToCart.classList.add('btn');
  addToCart.classList.add('btn-cart');
  addToCart.classList.add('btn-lg');
  addToCart.appendChild(addToCartTextNode);
  addToCart.style = `
  width:100%;
  display:block;
  transform:translate:(0,-50%);
  `;

  let user = firebase.auth().currentUser;

  if(user != null){

  addToCart.onclick = function (){
    let productKey;
    let productData = {};
    firebase.database().ref('products/' + id).on('value', snap => {


      firebase.database().ref('/cart/'+ user.uid + '/' + id).set({
        provider:snap.val().provider,
        photo:snap.val().photo,
        title:snap.val().title,
        decription:snap.val().description + ' ',
        large_description: snap.val().large_description,
        category:snap.val().category,
        stars:snap.val().stars,
        price:snap.val().price,
        quantity:inputNumber.value
      });
    });
    addToCart.href = 'cart.html';

  }

}else {

  addToCart.href='auth.html';
}
  //addToCart.href =`cart.html?id=${productObj.key}`;


  let spanBtn = document.createElement('span');
  spanBtn.classList.add('glyphicon');
  spanBtn.classList.add('glyphicon-shopping-cart');

  addToCart.appendChild(spanBtn);

  btnCartC.appendChild(addToCart);

  newCol1.appendChild(quantity);
  newCol2.appendChild(btnCartC);

  cartStuff.appendChild(newCol1);
  cartStuff.appendChild(newCol2);
  //cartStuff.style  ='background-color:gray';

  let h3Description = document.createElement('h3');
  let h3DescTextNode = document.createTextNode('Description');
  h3Description.classList.add('text-center');
  h3Description.appendChild(h3DescTextNode);

  let description = document.createElement('p');
  let descTextNode = document.createTextNode(productObj.val().large_description);
  description.appendChild(descTextNode);

  col1.appendChild(thumbnail);

  col2.appendChild(h2Name);
  col2.appendChild(provider);
  col2.appendChild(subRow);
  col2.appendChild(cartStuff);
  col2.appendChild(h3Description);
  col2.appendChild(description);

  root.appendChild(col1);
  root.appendChild(col2);

}



//Write the comment set by the user in the database
function setComment(provider, providerID, comment, date){
  databaseRef.ref('comments/' + id).push().set({
    provider:provider,
    providerID:providerID,
    comment:comment,
    date:date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear() + '   At ' + (date.getHours() + 1) + ' : ' + date.getMinutes(),
  });
}

//Draw the comments for the respective product
function buildComments(root, comment){
  let media = document.createElement('div');
  media.classList.add('media');
  media.style ='position: relative !important';


  let mediaLeft = document.createElement('div');
  mediaLeft.classList.add('media-left');

  let img = document.createElement('img');
  img.classList.add('media-object');
  img.style = 'width:60px';
  img.src='https://www.w3schools.com/bootstrap/img_avatar1.png';

  mediaLeft.appendChild(img);

  let mediaBody = document.createElement('div');
  mediaBody.classList.add('media-body');

  let h4heading = document.createElement('h4');
  let h4TextNode = document.createTextNode(comment.val().provider + ' ');
  h4heading.appendChild(h4TextNode);
  h4heading.classList.add('media-heading');

  let small = document.createElement('small');
  let i = document.createElement('i');
  let iTextNode = document.createTextNode('Posted on ' + comment.val().date);
  i.appendChild(iTextNode);
  small.appendChild(i);

  h4heading.appendChild(small);

  let pComment = document.createElement('p');
  let pCommentTextNode = document.createTextNode(comment.val().comment);
  pComment.appendChild(pCommentTextNode);



  mediaBody.appendChild(h4heading);
  mediaBody.appendChild(pComment);

  media.appendChild(mediaLeft);
  media.appendChild(mediaBody);



  root.appendChild(media);
  }
