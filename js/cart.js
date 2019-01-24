


function buildLoginBtn(root, href){
let h3 = document.createElement('h3');
let h3TextNode  =document.createTextNode('You are not Logged in');
h3.appendChild(h3TextNode);
let aBtn = document.createElement('a');
aBtn.classList.add('btn');
aBtn.classList.add('btn-comment');
let btnTextNode = document.createTextNode('Login');
aBtn.appendChild(btnTextNode);
aBtn.href=href;

root.appendChild(h3);
root.appendChild(aBtn);
}



function buildCartProducts(productObj, root){
  let container = document.createElement('div');
  container.classList.add('container');
  container.style = `
  border:2px solid lightgray !important;
  border-radius:10px !important;
  `;
  container.classList.add('item');


  let wrapper = document.createElement('a');
  wrapper.href ='product.html?id=' + productObj.key;

  container.style = 'position:relative';


  let row = document.createElement('div');
  row.classList.add('row');

  let col1 = document.createElement('div');
  col1.classList.add('col-sm-4');

  let col2 = document.createElement('div');
  col2.classList.add('col-sm-6');

  let col3 = document.createElement('div');
  col3.classList.add('col-sm-2');
  col3.style = 'position:relative';


  let thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail');

  let img = document.createElement('img');
  img.src = productObj.val().photo;
  img.style.height='100%';

  thumbnail.appendChild(img);

  col1.appendChild(thumbnail);

  let h3header = document.createElement('h3');
  let h3TextNode = document.createTextNode(productObj.val().title);
  h3header.appendChild(h3TextNode);

  let h4Price= document.createElement('h4');
  let h4TextNode = document.createTextNode('$' + productObj.val().price);
  h4Price.appendChild(h4TextNode);

  let priceHidden = document.createElement('p');
  priceHidden.style  = ' display:none';
  let priceHiddenTextNode = document.createTextNode(productObj.val().price);
  priceHidden.appendChild(priceHiddenTextNode);


  wrapper.appendChild(h3header);
  col2.appendChild(wrapper);
  col2.appendChild(h4Price);
  col2.appendChild(priceHidden);



  let deleteBtn = document.createElement('a');
  let deleteBtnTextNode = document.createTextNode('Delete from Cart ');
  deleteBtn.appendChild(deleteBtnTextNode);
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('btn-danger');
  deleteBtn.style = `
  margin-top:20px;
  `;

let user = firebase.auth().currentUser;
  deleteBtn.onclick = function (){
    firebase.database().ref('cart/'+ user.uid + '/' + productObj.key).set(null);
  }

  deleteBtn.href = 'cart.html';

  let containerQuantity = document.createElement('div');
  containerQuantity.style = `
  margin-top:20px;
  margin-bottom:10px;
  `;
  let h4Quantity = document.createElement('h4');
  let h4QuantityTextNode = document.createTextNode('Quantity');
  h4Quantity.appendChild(h4QuantityTextNode);
  h4Quantity.classList.add('text-center');
  h4Quantity.style  =`
  color:#2f323a !important;
  `;

  let quantity = document.createElement('input');
  quantity.type = 'number';
  quantity.min = '1';
  quantity.value = productObj.val().quantity;
  quantity.style  = `
  width:60px;
  margin-left:50%;
  transform:translate(-50%, 0);
  `;

  h4Price.innerHTML = '$' + Number(priceHidden.innerHTML) * Number(quantity.value);
  quantity.addEventListener('change', e => {
    h4Price.innerHTML = '$' + Number(priceHidden.innerHTML) * Number(quantity.value);
    firebase.database().ref('cart/'+ user.uid + '/' + productObj.key + '/quantity').set(quantity.value);
  });


  containerQuantity.appendChild(h4Quantity);
  containerQuantity.appendChild(quantity);


  col3.appendChild(deleteBtn);
  col3.appendChild(containerQuantity);

  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);


  container.appendChild(row);
  root.appendChild(container);

}

function buildProceedToCheckOut(list, root){
  let counter = 0;
  let total = 0;

  list.forEach( (value, index, array) => {
    counter += Number(value.val().quantity);
    total += value.val().price * Number(value.val().quantity);
  });

  let row1 = document.createElement('div');
  row1.classList.add('row');
  row1.classList.add('text-center');
  row1.setAttribute('id','checkoutRow');

  let col1 = document.createElement('div');
  col1.classList.add('col-sm-2');

  let col2 = document.createElement('div');
  col2.classList.add('col-sm-6');

  let col3 = document.createElement('div');
  col3.classList.add('col-sm-4');

  let h4NItems = document.createElement('h4');
  h4NItems.classList.add('text-center');
  let h4TextNode = document.createTextNode(counter + ' Items');
  h4NItems.appendChild(h4TextNode);

  let h4Total = document.createElement('h4');
  h4Total.classList.add('text-center');
  let h4TotalTextNode = document.createTextNode('Total: ' + total);
  h4Total.appendChild(h4TotalTextNode);

  let btn = document.createElement('a');
  let btnTextNode = document.createTextNode('Proceed To checkout');
  btn.classList.add('btn');
  btn.classList.add('btn-cart');
  btn.style = `
  margin-left:50%;
  transform:translate(-50%, 0);
  display:block;
  width:100%;
  margin-bottom:0;
  `;
  btn.appendChild(btnTextNode);

  col1.appendChild(h4NItems);

  col2.appendChild(h4Total);

  col3.appendChild(btn);

  row1.appendChild(col1);
  row1.appendChild(col2);
  row1.appendChild(col3);

  root.appendChild(row1);

}
