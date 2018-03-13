//txt file with ajax********************************
//loome event listeneri
document.getElementById('txt').addEventListener('click',loadData);

function loadData(){
	//uus object
	const xhr=new XMLHttpRequest();

	//avame requesti
	xhr.open('GET','fail.txt',true);

	//testime staatust
	//console.log('READYSTATE',xhr.readyState);

	//progressi ajal, nt loading/spinnerid
	xhr.onprogress=function(){
		//console.log('READYSTATE',xhr.readyState);
	}

	xhr.onload=function(){
		//testime faili sisu
		if(this.status===200){
			//console.log(this.responseText);
			document.getElementById('outputTXT').innerHTML=`<p>${this.responseText}</p>`;
		}
	}


	xhr.send();
}
/******************************************************/
/******************************************************/
/******************************************************/
//json file with AJAX
document.getElementById('json1').addEventListener('click', loadCustomer);

document.getElementById('json2').addEventListener('click', loadCustomers);

// Load Single Customer
function loadCustomer(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customer.json', true);

  xhr.onload = function(){
    if(this.status === 200) {
      // console.log(this.responseText);

      const customer = JSON.parse(this.responseText);

      const output = `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
      `;

      document.getElementById('jsonOut1').innerHTML = output;
    }
  }

  xhr.send();
}


// Load Customers
function loadCustomers(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customers.json', true);

  xhr.onload = function(){
    if(this.status === 200) {
      // console.log(this.responseText);

      const customers = JSON.parse(this.responseText);

      let output = '';

      customers.forEach(function(customer){
        output += `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
      `;
      });

      document.getElementById('jsonOut2').innerHTML = output;
    }
  }

  xhr.send();
}
/********************************************************
*********************************************************
chuck norris jokes*/
//loome event listeneri
document.querySelector('.get-jokes').addEventListener('click', getJokes);
//loome fn huumori saamiseks
function getJokes(e) {
	//muutuja nr saamiseks
  const number = document.querySelector('input[type="number"]').value;
//loome request objekti
  const xhr = new XMLHttpRequest();
//avame requesti koos api aadressi ja numbriga
  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
		//kontrollime staatust
    if(this.status === 200) {
			//loome muutuja päringu vastusega
      const response = JSON.parse(this.responseText);
//muutuja, mille sisestame HTMLi
      let output = '';
//kontrollime vastuse tüüpi
      if(response.type === 'success') {
				//tsükliga anname muutujale uue väärtuse
		
		
		output+='<div class="list-group">';
        response.value.forEach(function(joke){
          output += `<a href="#" class="list-group-item list-group-item-action">${joke.joke}</a>`;
        });
		output+='</div>';
      } else {
        output += '<li>Something went wrong</li>';
      }
//sisestame muutuja HTMLi
      document.querySelector('.jokes').innerHTML = output;
    }
  }
//saadame päringu
  xhr.send();
//takistame vormi submiti
  e.preventDefault();
}

/*********************************************************
*********************************************************
tsitaadid*/

//loome event listeneri
document.getElementById('tsiteeri').addEventListener('click', getQuote);
//loome fn huumori saamiseks
function getQuote(e) {
//loome request objekti
  const xhr = new XMLHttpRequest();
//avame requesti koos api aadressi ja numbriga
//http://quotesondesign.com/api/3.0/api-3.0.json
//xhr.open('GET', `quoteTEST.json`, true);

	//xhr.open('GET', `http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`, true);
xhr.open('GET','https://random-quote-generator.herokuapp.com/api/quotes/random',true);
  xhr.onload = function() {
		//kontrollime staatust
    if(this.status === 200) {
			//loome muutuja päringu vastusega
      const response = JSON.parse(this.responseText);//.slice(1,-1));
//muutuja, mille sisestame HTMLi
      let output = '';
      //output += `<li>${response.content}</li><li>${response.title}</li>`;
	  
	  output += `<blockquote class="blockquote text-right">
  <p class="mb-0">${response.quote}</p>
  <footer class="blockquote-footer"><cite title="Source Title">${response.author}</cite></footer>
</blockquote>`;
	  
	  

//sisestame muutuja HTMLi
      document.getElementById('tsitaat').innerHTML = output;
    }
  }
//saadame päringu
  xhr.send();
//takistame vormi submiti
  e.preventDefault();
}

/***********************************************
AIzaSyBJ-CJQ4sE9BAmXHed7wm7_y26jZl6NVjw
google api key
**************************************************
gallery//*/
//loome event listeneri
document.getElementById('picButton').addEventListener('click', getGallery);
//loome fn huumori saamiseks
function getGallery(e) {
	const amount=document.getElementById('nrPic').value;
	let output='';
	let rand=0;
	for (let i = 0; i < amount; i++) {
		rand=Math.floor((Math.random() * 1000) + 1);
		output+=`<a data-featherlight="image" href="https://picsum.photos/500/?image=${rand}"><img src="https://picsum.photos/200/?image=${rand}"></a>`;
	}
	document.getElementById('gallery').innerHTML=output;
//takistame vormi submiti
  e.preventDefault();
}

/*********************************************** 
 * 98ed840bf1434175938d803d490084a1
*/
//uudiste api
document.onload=allNews();

function allNews(){
const xhr = new XMLHttpRequest();
	
xhr.open('GET','https://newsapi.org/v2/top-headlines?country=us&apiKey=98ed840bf1434175938d803d490084a1',true);
  xhr.onload = function() {
		 let output = '';     
    if(this.status === 200) {		
      let response = JSON.parse(this.responseText);
      output+='<div class="list-group">';
      response.articles.forEach(function(story){
        output += `<a href="${story.url}" target="_blank" class="list-group-item list-group-item-action">${story.title} - ${story.source.name}</a>`;
      });
      output+='</div>';      
    }else{output='error: '}
    document.getElementById('newsOut').innerHTML = output;
  }
  xhr.send();
}

/************************************************** */
//loome klassi
class News{
  //asünkroonne funktsioon
async getNews(txt){
  const response=await fetch(`https://newsapi.org/v2/top-headlines?q=${txt}&from=2018-01-12&sortBy=popularity&apiKey=98ed840bf1434175938d803d490084a1`);
  const result=await response.json();
  return result;
  }
}
//initsialiseerime objekti
const news=new News();
//otsi uudiseid
const title=document.getElementById('searchTitle');
//event listener
title.addEventListener('keyup',(e)=>{
  //sisend
  const userTxt=e.target.value;
  if(userTxt!==''){
    //console.log(userTxt);
    //loome HTTP kutse
    news.getNews(userTxt)
    .then(andmed=>{
     if(andmed.articles.message==='Not Found'){
      document.getElementById('newsOut').innerHTML='<p>Didnt find any News</p>'
     }else{
       let output='';
      output+='<div class="list-group">';
      andmed.articles.forEach(function(story){
        output += `<a href="${story.url}" target="_blank" class="list-group-item list-group-item-action">${story.title} - ${story.source.name}</a>`;
      });
      output+='</div>';   
      document.getElementById('newsOut').innerHTML=output;
     }
    })
  }else{
    allNews();
  }
});
/***********************************
*************************************/
//OMDB API key 7036d587  http://www.omdbapi.com/?apikey=7036d587&t=ted&plot=full  http://www.omdbapi.com/?apikey=[yourkey]&
//loome klassi
class Movies{
  //asünkroonne funktsioon
async getMovies(txt){
  const response=await fetch(`http://www.omdbapi.com/?apikey=7036d587&s=${txt}`);
  const result=await response.json();
  return result;
  }
}
//initsialiseerime objekti
const movies=new Movies();
//otsi uudiseid
const mov=document.getElementById('searchMovie');
//event listener
mov.addEventListener('keyup',(e)=>{
  //sisend
  const userTxt=e.target.value;
  if(userTxt!==''){
    //console.log(userTxt);
    //loome HTTP kutse
    movies.getMovies(userTxt)
    .then(andmed=>{
     if(andmed.Response==='False' || userTxt===''){
      document.getElementById('movieList').innerHTML='<p>Didnt find any Movies</p>'
     }else{
       let output='';
       let counter=0;
       
       //andmed.forEach(function(movie){console.log(movie.Title);});
       
      output+='<div id="accordion">';
      andmed.Search.forEach(function(m){
        counter++;
        output += `
          <div class="card">
            <div class="card-header" id="heading${counter}">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${counter}" aria-expanded="false" aria-controls="collapse${counter}">
                  ${m.Title}
                </button>
              </h5>
            </div>

            <div id="collapse${counter}" class="collapse" aria-labelledby="heading${counter}" data-parent="#accordion">
              <div class="card-body">

                <div class="card">
                <div class="card-title">
                   <img src="${m.Poster}" alt="">
                </div>               
                <div class="card-body">
                  <p>Year: ${m.Year}</p>
                  <p>IMDB link: <a href="http://www.imdb.com/title/${m.imdbID}" target="_blank">${m.Title}</a></p>
                  <p>Type: ${m.Type}</p>
                  
                </div>
              </div>

              </div>
            </div>
        </div>
        `;
      });
      output+='</div>';  
      document.getElementById('movieList').innerHTML=output;
     }
    })
  }
});
