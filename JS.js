let COLORS = ["pink" , "yellow" , "blue" , "purple"]
let LEVEL = 0;
let GAME_PATTERN = [];
let USER_CLICKED_PATTERN = [];
let STARTED = false;

$(document).keypress(function(){
    $("h3").remove();
    if(!STARTED){
        $("h1").text("Level " + LEVEL)
        nextSeq();
        STARTED = true ;
    }
}) ;

$(".color").click(function(){
    let clickedColor = $(this).attr("id") ;
    USER_CLICKED_PATTERN.push(clickedColor) ;

    animateColors(clickedColor) ;
    playColorSound(clickedColor) ;
    checkAnswer(USER_CLICKED_PATTERN.length -1) ;
})

function animateColors(color){
    $("#"+color).addClass("pressed") ;
    setTimeout(function(){
        $("#"+color).removeClass("pressed") ;  // this function sets the time for this action after that time gone
    } , 150 ) ;

}

function playColorSound(color){
    aud = new Audio("res/sounds/"+color+".mp3")
    aud.play() ;
}

function checkAnswer(currentColor){
    if(GAME_PATTERN[currentColor] === USER_CLICKED_PATTERN[currentColor]){
        if(GAME_PATTERN.length === USER_CLICKED_PATTERN.length ){
            setTimeout(function(){
                nextSeq();
            } , 1000)
        }
    }
    else{
        // WRONG ANSWER -- > WRONG BEHAVE
        $("h3").remove();
        $("body").css("background-color","red");
        setTimeout(function(){
            $("body").css("background-color","#025464"); // we can make this as an class
        },100)

        $("h1").text("Ohh shit.. , Restart the game ,Click on any key");
        $("<h3> Score : "+LEVEL+"</h3>").insertAfter("h1");
        playColorSound("wrong");
        startOver();
    }
}

function nextSeq(){
    USER_CLICKED_PATTERN = [] ;
    LEVEL++;
    $("h1").text("LEVEL " +LEVEL);

    // CHOOSE RANDOM COLOR
    let randColor = Math.floor(Math.random() * 4);
    let randButoonColor = COLORS[randColor] ; 

    // PUSH THE MOVE TO GAME 
    GAME_PATTERN.push(randButoonColor) ;
    $("#"+randButoonColor).fadeIn(100).fadeOut(100).fadeIn(100) ;
    playColorSound(randButoonColor);


}

function startOver(){
    GAME_PATTERN = [] ;
    STARTED = false ;
    LEVEL = 0 ;

}

