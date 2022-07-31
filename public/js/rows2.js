

var enlarge_img = false;
var ranked = false;
var rank_clicks = 0; // number of rankings made
var img_pos = 1;  // number of the image 
var column = 2; // Starting Column at 2 to make space for Enlarge Button
var row = 1;   
var rank = 1; // current rank

var enl_row = "";
var enl_col = "";
var enl_src = "";
var enl_num = 0;

var rankings = {};
var positions = {};


// Current Rank Image

var current_rank = document.createElement("div"); 
current_rank.id = "current_rank";
current_rank.className = "current_rank";
current_rank.style.gridColumn = "6/7";
current_rank.style.gridRow = "1/2";


var cur_text = document.createElement("div");
cur_text.innerText = "Current Rank:";
cur_text.style.color = "yellow";

var current_rank_img = document.createElement('img');
current_rank_img.style.position = "bottom"; 
current_rank_img.src = ("/images/" + rank + ".png");
current_rank_img.id = "current_rank_img";
current_rank_img.className = "current_rank_img";
current_rank_img.style.width = "150px";
current_rank_img.style.height = "150px";

current_rank.appendChild(cur_text);

current_rank.appendChild(current_rank_img);

document.getElementById("image-container")
  .appendChild(current_rank);


function create_img_grid(rows, cols){


enlarge_img = false;
rank_clicks = 0; // number of rankings made
img_pos = 1;  // number of the image 
column = 2; // Starting Column at 2 to make space for Enlarge Button
row = 1;   
rank = 1; // current rank



  for (c = 0; c < (rows * cols); c++) {

      // creates div and img src
      let cat_img = document.createElement('div');
      cat_img.className = "cat_img";
      cat_img.id = "cat_img";
      let img = document.createElement('img');
      img.className = "img";

      // styling for div

      cat_img.style.gridColumn = column + "/" + (column+1);
      cat_img.style.gridRow = row + "/" + (row+1);
      cat_img.style.height = "100%";
      cat_img.style.width = "100%";
      cat_img.style.fit = "contain";


      // attached img and styling

      img.src = ("/images/cat" + img_pos + ".jpeg");
      img.style.height="150px";
      img.style.width="150px";

      positions[img.src] = c;

      if(ranked == false){
      rankings[img.src] = "";
      }

      cat_img.appendChild(img);
      document.getElementById("image-container")
      .appendChild(cat_img);
      
      column++;
      img_pos++;

      // resets to next row at column == 5

      if(column == 5){

      column = 2;
      row++;
      }


      cat_img.onclick = function(){

      if(enlarge_img == true){

          current_rank.style.display = "none";

          enl_row = cat_img.style.gridColumn;
          enl_col = cat_img.style.gridRow;
          enl_src = img.src;
          enl_num = positions[img.src];

          let enl_img = document.createElement("img");
          enl_img.id = "enl_img";


          
          enl_img.className = "enl_img";
          enl_img.src = img.src;
          enl_img.style.height = "500px";
          enl_img.style.width = "500px";


      

          rank_images = document.getElementsByClassName("rank_img");
          
          if(rank_images.length > 0){
          //console.log(rank_images.length)
          //console.log(rank_images)
          for(var i = 0; i < rank_images.length; i++){
              rank_images[i].style.display = "none";
          }
          }


          images = document.getElementsByClassName("img");
          for(var i = 0; i < images.length; i++){
          images[i].style.display = "none";
          }
          

          cat_img.appendChild(enl_img);
          


      } else {



          if(rank <= 6){

          // Changes Ranking Displayed on Side of Images

          var cur_rank_img = document.getElementById("current_rank_img");
          cur_rank_img.src = ("images/" + rank + ".png");
          
          // creates an img element to append to current_rank_img div

          let rank_img = document.createElement('img');
          rank_img.className = "rank_img"
              
          // sets the styling for the image
      
          rank_img.src = ("/images/" + rank + ".png");
          rank_img.style.height = "150px";
          rank_img.style.width = "150px";
          rank_img.style.overflow = "hidden"
          rank_img.style.gridColumn = cat_img.style.gridColumn;
          rank_img.style.gridRow = cat_img.style.gridRow;
          document.getElementById("image-container")
          .appendChild(rank_img);


          // sets the rank for the image file name in the array
          
          rankings[img.src] = rank;
          
          ranked = true;
          // console.log(rank)
          rank_clicks++;
          if(rank < 6){
            rank++;
          }
          
          }



          
      
      }
    }      


      
  }
}


function createEnlarge(){

    // styling for the Enlarge Button

    var enlarge = document.createElement('div');
    enlarge.style.width = "100px";
    enlarge.style.height = "35px";
    enlarge.innerText = "Enlarge";
    enlarge.style.gridColumn = "1/2";
    enlarge.style.gridRow = "1/2";
    enlarge.style.color = "yellow";
  
    document.getElementById("image-container")
      .appendChild(enlarge);
  
    enlarge.onclick = function(){
      if(enlarge_img == false){
        enlarge.style.border = "5px solid black";
        enlarge_img = true;
        
      } else {
        enlarge.style.border = "";
        enlarge_img = false;
      }
    }
  
}



function createUndo(){
// The Menu Buttons Div Container


  var undo_button = document.createElement("div");
  undo_button.id = "undo_button";
  undo_button.className = "undo_button";
  undo_button.style.gridColumn = "6/7";
  undo_button.style.gridRow = "2/3";


 // Undo Button I.E. img


 var undo_button_img = document.createElement('img');
  undo_button_img.style.position = "bottom"; 
  undo_button_img.src = ("/images/undo" + ".png");
  undo_button_img.id = "undo_button_img";
  undo_button_img.className = "undo_button_img";
  undo_button_img.style.width = "150px";
  undo_button_img.style.height = "150px";


  undo_button.appendChild(undo_button_img);

  document.getElementById("image-container")
    .appendChild(undo_button);


 
  
  undo_button.onclick = function(){

    if(enlarge_img == false && rank_clicks >= 1){

      select = document.getElementById("image-container");
      select.removeChild(select.lastChild);
    
      i = 1;
      for(let key in rankings){
        if(rankings[key] == rank){
            console.log("Removing " + rankings[key]);
            rankings[key] = "";
            
        }
        i++
      }

      rank--;
      console.log(rank);
      var cur_rank_img = document.getElementById("current_rank_img");
      cur_rank_img.src = ("/images/" + rank + ".png");
      

    } else if (enlarge_img == true){

      // console.log(enlarge_img);

      current_rank.style.display = "";

      enl_img = document.getElementById("enl_img");

      // Removes the Enlarged Image

      enl_img.parentNode.removeChild(enl_img);


      // Number Ranking Placed on Top of Image

      rank_images = document.getElementsByClassName("rank_img");

      // UnHides the Ranking images
          
      if(rank_images.length > 0){
        for(var i = 0; i < rank_images.length; i++){
            // console.log(rank_images[i].src)
            rank_images[i].style.display = "";
        }
      }

      // UnHides the Images


      images = document.getElementsByClassName("img");
      console.log(images);
      for(var i = 0; i < images.length; i++){
            
          images[i].style.display = "";
      
      }

      
      enlarge_img = false;
      
    }
    
  }

 

}



function postData(evt){


  if(evt.preventDefault){
    evt.preventDefault();
  } else {
      evt.returnValue = false;
  }

  console.log(rank);
  console.log(rankings);


  if(rank == 6){

    console.log("Posting Data...");


    Object.keys(rankings).forEach(function(key) {
      let hidden_rank = document.createElement("input");
      hidden_rank.type = "hidden";
      console.log(key)
      console.log(rankings[key]);
      hidden_rank.name = key;
      hidden_rank.value = rankings[key];
      field_info.appendChild(hidden_rank);
  });

    

   
    document.getElementsByTagName("form")[0].submit();

  } else {
    window.alert("Please Rank All Images!!!");
  } 

}
  



function createEventListeners(){

  init();

  var button = document.getElementById("submitbutton");

  if(button.addEventListener){
    button.addEventListener("click", postData, false);
} else if(button.attachEvent){
    button.attachEvent("onclick", postData);
}

}
  


function init(){
    // Still have to add functionality for Post Request.
    create_img_grid(2,3);
    createEnlarge();
    createUndo();
    
}





if(window.addEventListener){
    window.addEventListener("load", createEventListeners, false);
} else if(window.attachEvent){
    window.attachEvent("onload", createEventListeners);
}
