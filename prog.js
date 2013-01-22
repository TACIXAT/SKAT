ranges = [[0, 13], [14, 18], [19, 29], [30, 35], [36, 39], [40, 44], [45, 50]];
charList = 
	[
		//simple consonants 0-13
		["g", "ㄱ"],
		["n", "ㄴ"],
		["d", "ㄷ"],
		["l/r", "ㄹ"],
		["m", "ㅁ"],
		["b", "ㅂ"],
		["s", "ㅅ"],
		["null/ng", "ㅇ"],
		["j", "ㅈ"],
		["ch", "ㅊ"],
		["k", "ㅋ"],
		["t", "ㅌ"],
		["p", "ㅍ"],
		["h", "ㅎ"],
		 //double consonants 14-18
		["kk", "ㄲ"],
		["tt", "ㄸ"],
		["pp", "ㅃ"], 
		["ss", "ㅆ"],
		["jj", "ㅉ"],
		//consonant clusters 19-29
		["gs", "ㄳ"],
		["nj", "ㄵ"],
		["nh", "ㄶ"],
		["lg", "ㄺ"],
		["lm", "ㄻ"],
		["lb", "ㄼ"],
		["ls", "ㄽ"],
		["lt", "ㄾ"],
		["lp", "ㄿ"],
		["lh", "ㅀ"],
		["bs", "ㅄ"],
		//simple vowels 30-35
		["a", "ㅏ"],
		["eo", "ㅓ"], 
		["o", "ㅗ"],
		["u", "ㅜ"], 
		["eu", "ㅡ"],
		["i", "ㅣ"],
		//iotized vowels 36-39
		["ya", "ㅑ"], 
		["yeo", "ㅕ"], 
		["yo", "ㅛ"], 
		["yu", "ㅠ"],
		//diphtongs 40-44
		["ae", "ㅐ"],
		["yae", "ㅒ"],
		["e", "ㅔ"],
		["ye", "ㅖ"],
		["ui", "ㅢ"],
		//with w 45-50
		["wa", "ㅘ"],
		["wae", "ㅙ"],
		["oe", "ㅚ"],
		["wo", "ㅝ"],
		["we", "ㅞ"],
		["wi", "ㅟ"]
		//...
	];

score = 0;
completed = 0;
currentReview = 0;

$(document).ready(function() {
	$("#reviewDiv").hide();
	$("#settingsDiv").hide();
	getNewQuiz();
});

function toggleChoices(show){
	if(show){
		$("#reload").hide();
		$("#c1").show();
		$("#c2").show();
		$("#c3").show();
	} else {
		$("#c1").hide();
		$("#c2").hide();
		$("#c3").hide();
		$("#reload").show();
	}
}

function getNewQuiz() {
	//var vows = $("#useVowels").prop("checked");
	//var cons = $("#useConsonants").prop("checked");
	toggleChoices(true);
	
	resetValues();
	correct = selectRandomCharacter(true);
	setButtonChoices(correct);
};

function resetValues() {
	$("#answer").html("Select an answer.");
	$("#feedback").html("(The correct answer)");
	$("#feedback").css("color", "black");
	$("#feedbackDiv").attr('onclick', '').unbind('click');
};

function selectRandomCharacter(setChar) {
	var lstIdx = Math.floor(Math.random()*charList.length);
	
	if(setChar) {
		$("#charDiv").html(charList[lstIdx][1]);
	}
	
	return charList[lstIdx][0];
};

function setButtonChoices(correct) {
	buttons = ["#c1", "#c2", "#c3"];
	idxList = getRandomList();
	
	$(buttons[idxList[0]]).html(correct);

	for(i=1; i<idxList.length; i++) {
		var choice = selectRandomCharacter(false);
		while(choice == correct){
			choice = selectRandomCharacter(false);
		}
		$(buttons[idxList[i]]).html(choice);
	}
};

function getRandomList() {
	idxList = [0, 1, 2];
	for(i=0; i<3; i++){
		swapIdx = Math.floor(Math.random()*3);
		temp = idxList[swapIdx];
		idxList[swapIdx] = idxList[i];
		idxList[i] = temp;
	}

	return idxList;
};

function checkAnswer(choice) {
	$("#feedbackDiv").click(function() {
		getNewQuiz();
	});

	toggleChoices(false);
	
	completed++;
	if(choice == correct) {
		score++;
		$("#answer").html(correct);
		$("#feedback").html("Good Work!");
		$("#feedback").css("color", "green");
	} else {
		$("#answer").html(correct);
		$("#feedback").css("color", "red");
		$("#feedback").html("Incorrect!");
	}

	$("#scoreDiv").html("&nbsp;score: " + score + "&nbsp;&nbsp;&nbsp;&nbsp;completed: " + completed);
};

function toggleQuiz(showQuiz){
	if(showQuiz){
		$("#reviewDiv").hide();
		$("#quizDiv").show();
	} else {
		$("#quizDiv").hide();
		$("#reviewDiv").show();
	}
};

function getNext() {
	var vows = $("#rUseVowels").prop("checked");
	var cons = $("#rUseConsonants").prop("checked");
	var rand = $("#rUseRandom").prop("checked");

	console.log(currentReview);

	if(!rand)
		currentReview++;
	else
		currentReview = Math.floor(Math.random()*charList.length);

	currentReview %= charList.length;
	setReview(currentReview);
};

function setReview(currChar){
	//srcList[currSrc];
	$("#rCharDiv").html(charList[currChar][1]);
	$("#rName").html(charList[currChar][0]);
};