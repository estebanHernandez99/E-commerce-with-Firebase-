//DOM
let url_string = window.location.href;
let url = new URL(url_string);
let c = url.searchParams.get('c');
let auth = url.searchParams.get('auth');
