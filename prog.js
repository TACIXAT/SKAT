var srcList = [
	[ //vowels
		"ae.gif",
		"a.gif",
		"e.gif",
		"eo.gif",
		"eu.gif",
		"i.gif",
		"oe.gif",
		"o.gif",
		"u.gif",
		"ui.gif",
		"wae.gif",
		"wa.gif",
		"we.gif",
		"wi.gif",
		"wo.gif",
		"yae.gif",
		"ya.gif",
		"ye.gif",
		"yeo.gif",
		"yo.gif",
		"yu.gif"],
	[ //consonants
		"bp.gif",
		"ch.gif",
		"dt.gif",
		"gk.gif",
		"h.gif",
		"j.gif",
		"jj.gif",
		"k.gif",
		"kk.gif",
		"m.gif",
		"ng.gif",
		"n.gif",
		"p.gif",
		"pp.gif",
		"rl.gif",
		"s.gif",
		"ss.gif",
		"t.gif",
		"tt.gif"]
	];

sDir = ["vowels/", "consonants/"];
score = 0;
completed = 0;

$(document).ready(function() {
	$("#reviewDiv").hide();
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
	var vows = $("#useVowels").prop("checked");
	var cons = $("#useConsonants").prop("checked");
	toggleChoices(true);
	if(vows || cons){
		resetValues();
		correct = selectRandomCharacter(true, vows, cons);
		setButtonChoices(correct, vows, cons);
	} else {
		$("#useVowels").prop("checked", "true");
		vows = $("#useVowels").prop("checked");
		resetValues();
		correct = selectRandomCharacter(true, vows, cons);
		setButtonChoices(correct, vows, cons);
	}
};

function resetValues() {
	$("#answer").html("Select an answer.");
	$("#feedback").html("(The correct answer.)");
	$("#feedback").css("color", "black");
	$("#feedbackDiv").attr('onclick', '').unbind('click');
};

function selectRandomCharacter(setImg, vows, cons) {
	var srcIdx = 0;
	if(vows && cons) {
		srcIdx = Math.floor(Math.random()*2);
	} else if(cons) {
		srcIdx = 1;
	}

	var lstIdx = Math.floor(Math.random()*srcList[srcIdx].length);
	
	if(setImg) {
		var srcDir = srcIdx == 0 ? "vowels/" : "consonants/";
		$("#charImg").attr("src", srcDir + srcList[srcIdx][lstIdx]);
	}
	
	var dotIdx = srcList[srcIdx][lstIdx].indexOf(".");
	return srcList[srcIdx][lstIdx].substring(0,dotIdx);
};

function setButtonChoices(correct, vows, cons) {
	buttons = ["#c1", "#c2", "#c3"];
	idxList = getRandomList();
	
	$(buttons[idxList[0]]).html(correct);

	for(i=1; i<idxList.length; i++) {
		var choice = selectRandomCharacter(false, vows, cons);
		while(choice == correct){
			choice = selectRandomCharacter(false, vows, cons);
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
	var currSrc = parseInt($("#rMeta").attr("name"));
	var currIdx = parseInt($("#rMeta").attr("value"));

	console.log(currSrc);
	console.log(currIdx);

	if(!(cons && vows)){
		newSrc = 0;
		if(cons)
			newSrc = 1;

		if((newSrc - currSrc) != 0){
			currIdx = 0;
		}
		currSrc = newSrc;
	}

	if(!rand){
		currIdx++;
		currIdx %= srcList[currSrc].length;
		if(currIdx == 0 && cons && vows){
			currSrc++;
			currSrc %= srcList.length;
		}
	} else {
		if(cons && vows)
			currSrc = Math.floor(Math.random()*2);
		currIdx = Math.floor(Math.random()*srcList[currSrc].length);
	}

	setReview(currSrc, currIdx);
};

function setReview(currSrc, currIdx){
	srcList[currSrc][currIdx];
	var srcDir = currSrc == 0 ? "vowels/" : "consonants/";
	var charName = srcList[currSrc][currIdx];
	var dotIdx = srcList[currSrc][currIdx].indexOf(".");
	$("#rMeta").attr("name", currSrc);
	$("#rMeta").attr("value", currIdx);
	$("#rImg").attr("src", srcDir + charName);
	$("#rName").html(charName.substring(0,dotIdx));

};