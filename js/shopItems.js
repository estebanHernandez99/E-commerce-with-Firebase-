//root products
const products = document.getElementById('products');

let shopItems = {


}



function showShopItems(refDB, mainRoot, filter = null){
//get products from the database
let counter = 0;
let rootRow = createRow(mainRoot, true);

//build the rows and colums
let DBref = refDB.ref('products');

if(filter){

if(filter.byChild){

  DBref = DBref.orderByChild(filter.child);

   if(filter.range){
       DBref = DBref.startAt(filter.range.startAt).endAt(filter.range.endAt);
   }
   if(filter.equalTo){
      DBref = DBref.equalTo(filter.equalTo);
   }
}

if(filter.limitToFirst){
  DBref = DBref.limitToFirst(filter.limitToFirst.limit);
}

}



DBref.on('child_added', snap => {

  if(counter < 4){
    buildProduct(snap, rootRow);
    counter++;
  }else {
    rootRow = createRow(mainRoot, true);
    buildProduct(snap, rootRow);
    counter -= 3;
  }
});

}




function showShopItemsMain(refDB, mainRoot, filter = null, parameter){
//get products from the database
let counter = 0;
let rootRow = createRow(mainRoot, true);

//build the rows and colums
let DBref = refDB.ref('products');

if(filter){

if(filter.byChild){

  DBref = DBref.orderByChild(filter.child);

   if(filter.range){
       DBref = DBref.startAt(filter.range.startAt).endAt(filter.range.endAt);
   }
   if(filter.equalTo){
      DBref = DBref.equalTo(filter.equalTo);
   }
}

if(filter.limitToFirst){
  DBref = DBref.limitToFirst(filter.limitToFirst.limit);
}

}



DBref.on('child_added', snap => {
  if(counter < 1){
    setLabelCategory(rootRow, parameter);
  }
  if(counter < 3){
    buildProduct(snap, rootRow);
    counter++;
  }else {
    buildButton(rootRow, parameter);
  }
});

}


function buildButton(root, parameter){
  let col = document.createElement('div');
  col.classList.add('col-sm-3');

  let btn = document.createElement('a');
  btn.classList.add('btn');
  btn.classList.add('btn-comment');
  btn.classList.add('btn-block');
  btnTextNode = document.createTextNode('See More');
  btn.appendChild(btnTextNode);
  btn.href = `index.html?c=${parameter}`;

  col.appendChild(btn);

  root.appendChild(col);
}

function setLabelCategory(root, label){
  let h3 = document.createElement('h3');
  let h3TextNode = document.createTextNode(label.toUpperCase());
  h3.style ='padding:10px';
  h3.appendChild(h3TextNode);
  root.appendChild(h3);
}
