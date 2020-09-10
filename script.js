var trueAnswer = "";
var answerList = [];
var ansType = "";
var resultz = [];
var i = 0;
var length = 0;
var score = 0;
var streak = 0;
var highStreak = 0;

$(document).ready(function() {
    $("#gameStuff").hide();
    $("#finStuff").hide();
    $("#bool").hide();
    $("#multi").hide();
    $("#coor").hide();
    $("#conti").hide();
    $("#playBut").on("click",play,false);
    $("#endGame").on("click",endGame,false);
    $("#submit").on("click",submit,false);
    $("#conti").on("click",ask,false);
    $("#retryBut").on("click",retry,false);
    $("#resetBut").on("click",endGame(),false);
});

function play(){
    length = $("#resNo").val();
    var number = $("#category").val();
    var dif = $("#difficulty").val();
    console.log("Link: " + "https://opentdb.com/api.php?amount="+ length + "&category=" + number + "&difficulty=" + dif)
    $.ajax({
        url: "https://opentdb.com/api.php?amount="+ length + "&category=" + number + "&difficulty=" + dif,
        dataType: "json",
        success: function (results){
            resultz = results
            beginGame();
        }
    });
}

function beginGame(){
    console.log(resultz);
    console.log("Beginning Game");
    $("#resNo").hide();
    $("#category").hide();
    $("#difficulty").hide();
    $("#playBut").hide();
    $("h3").hide();
    $("#gameStuff").show();
    ask();
}

function ask(){
    console.log(i);
    if(parseInt(i) === parseInt(length)){
        finishGame();
    }else{
        console.log("Commencing Question");
        $("#coor").hide();
        $("#conti").hide();
        $("#quesText").show();
        $("#submit").show();
        $("#quesText").html(resultz.results[i].question);
        trueAnswer = resultz.results[i].correct_answer;
        ansType = resultz.results[i].type;
        if (resultz.results[i].type === "boolean") {
            $("#bool").show();
        } else {
            $("#multi").show();
            answerList = resultz.results[i].incorrect_answers;
            answerList.push(trueAnswer);
            for (var x = answerList.length - 1; x > 0; x--) {
                var j = Math.floor(Math.random() * x);
                var temp = answerList[x];
                answerList[x] = answerList[j];
                answerList[j] = temp;
            }
            $("#ch1").val(answerList[0]);
            $("#ch1L").html(answerList[0]);
            $("#ch2").val(answerList[1]);
            $("#ch2L").html(answerList[1]);
            $("#ch3").val(answerList[2]);
            $("#ch3L").html(answerList[2]);
            $("#ch4").val(answerList[3]);
            $("#ch4L").html(answerList[3]);
        }
    }
}

function submit(){
    var selectedAns = "";
    if (ansType === "boolean"){
        if ($("#true").prop("checked") === true){
            selectedAns = true;
        }else{
            selectedAns = false;
        }
    }else{
        if ($("#ch1").prop("checked") === true){
            selectedAns = $("#ch1").val();
        }else if ($("#ch2").prop("checked") === true){
            selectedAns = $("#ch2").val();
        }else if ($("#ch3").prop("checked") === true){
            selectedAns = $("#ch3").val();
        }else{
            selectedAns = $("#ch4").val();
        }
    }
    var cor = false;
    if(selectedAns === trueAnswer){
        score++;
        streak++;
        cor = true;
    }else{
        if(streak > highStreak){
            highStreak = streak;
        }
        streak = 0;
        cor = false;
    }
    $("#score").html("Score: " + score);
    $("#streak").html("Streak: " + streak);
    i++;
    $("#bool").hide();
    $("#multi").hide();
    correct(cor);
}

function correct(cor){
    $("#quesText").hide();
    $("#submit").hide();
    if (cor === true){
        $("#coor").html("CORRECT");
    }else{
        $("#coor").html("INCORRECT");
    }
    $("#coor").show();
    $("#conti").show();
}

function finishGame(){
    console.log("Finished Game");
    $("#coor").hide();
    $("#conti").hide();
    $("#gameStuff").hide();
    $("#finStuff").show();
    $("#finScore").html("You got " + score + " out of " + length + " questions correct.");
    $("#hiStreak").html("Your highest streak was " + highStreak);
    var scoreCent = (parseInt(score) / parseInt(length));
    scoreCent = scoreCent.toFixed(1);
    if (scoreCent === 1){
        $("#vicImage").attr("src","Images/100.gif");
    }else if(scoreCent >= .8){
        $("#vicImage").attr("src","Images/80+.png");
    }else if (scoreCent  >= .6){
        $("#vicImage").attr("src","Images/60+.png");
    }else if(scoreCent  >= .4){
        $("#vicImage").attr("src","Images/40+.jpg");
    }else if (scoreCent  >= .2){
        $("#vicImage").attr("src","Images/20+.jpg");
    }else if(scoreCent >= 0){
        $("#vicImage").attr("src","Images/0+.png");
    }else{
        $("#vicImage").attr("src","Images/0.jpg");
    }
}

function retry(){
    trueAnswer = "";
    answerList = [];
    ansType = "";
    resultz = [];
    i = 0;
    length = 0;
    score = 0;
    streak = 0;
    highStreak = 0;
    $("#score").html("Score: 0");
    $("#streak").html("Streak: 0");
    $("#finStuff").hide();
    $("#gameStuff").hide();
    $("#bool").hide();
    $("#multi").hide();
    $("#coor").hide();
    $("#conti").hide();
    play();
}

function endGame(){
    $("#finStuff").hide();
    $("#gameStuff").hide();
    $("#bool").hide();
    $("#multi").hide();
    $("#coor").hide();
    $("#conti").hide();
    $("#resNo").show();
    $("#category").show();
    $("#difficulty").show();
    $("#playBut").show();
    $("h3").show();
    trueAnswer = "";
    answerList = [];
    ansType = "";
    resultz = [];
    i = 0;
    length = 0;
    score = 0;
    streak = 0;
    highStreak = 0;
    $("#score").html("Score: 0");
    $("#streak").html("Streak: 0");

}