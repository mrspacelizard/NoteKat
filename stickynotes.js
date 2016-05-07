var loadFont;
//~~~~~~~~~~~~~~~~Function Definitions~~~~~~~~~~~~~~~~
var upload_image = function(arg) {

	$(arg).find("#insertImage").click(function() {
		var imageUrl = prompt(imagePrompt);
		$(arg).find("#stickyimg").remove();
		var stickyImage = document.createElement('img');
		stickyImage.src = imageUrl;
		stickyImage.id = 'stickyimg';			
		if (imageUrl != null) {
			$(this).parent().append(stickyImage);
		};
		
	});

};

var closeTheSticky = function() {
	$('.sticky>#closeSticky').click(function() {
		$(this).parent().remove();
	});
};

var imagePrompt = "Paste in the URL of the image that you would like to use.";

var stickyClick = function() {
	var mySticky = document.createElement('div');
	var handle = document.createElement("div");
	var myStickyText = document.createElement('textarea');
	var closeSticky = document.createElement('img');
	var insertImage = document.createElement('i');
	mySticky.appendChild(handle);
	mySticky.appendChild(myStickyText);
	mySticky.appendChild(closeSticky);
	mySticky.appendChild(insertImage);
	document.getElementById('stickyCanvas').appendChild(mySticky);
	myStickyText.id = 'stickyText';
	closeSticky.id = 'closeSticky';
	insertImage.id = 'insertImage';
	mySticky.id = 'stickyId';
	handle.id = "handle";
	myStickyText.className = 'stickyText mdl-textfield__input';
	mySticky.className = 'sticky';
	handle.className = "handle";
	insertImage.className = 'material-icons';
	insertImage.textContent = 'insert_photo';
	closeSticky.src = 'x-button.png';
	insertImage.src = 'insertimg.png';
	mySticky.style.position = "absolute";
	mySticky.style.top = "150px";
	mySticky.style.left = "5px;"

	

	upload_image(mySticky);

	closeTheSticky();

	$(".sticky").draggable({
		handle: ".handle"
	});

};

var changeFontSize = function(fontSize) {
var allStickyTexts = document.getElementsByClassName("stickyText");
	for (var i = 0; i < allStickyTexts.length; i++) {
		allStickyTexts[i].style.fontSize = fontSize + "pt";
	};
};

var changeStickyFont = function(font) {
	var allStickyTexts = document.getElementsByClassName("stickyText");
	for (var i = 0; i < allStickyTexts.length; i++) {
		allStickyTexts[i].style.fontFamily = font;
	};
};

var changeStickyBackground = function(backgroundColor) {
	var allStickies = document.getElementsByClassName("sticky");
	for (var i = 0; i < allStickies.length; i++) {
		allStickies[i].style.backgroundColor = backgroundColor;
	};
};

//~~~~~~~~~~~~~~~~Event Definitions~~~~~~~~~~~~~~~~

document.getElementById('newSticky').onclick = stickyClick;

document.getElementById('changeFontSize').onchange = function() {
	console.log ("Calling changeFontSize with value " + this.value);
	changeFontSize(this.value);
};

document.getElementById('fontSelect').onchange = function() {
	changeStickyFont(this.value);
};

document.getElementById('backgroundColorInput').onchange = function() {
	changeStickyBackground(this.value);
};

document.getElementById('save').onclick = function() {
	if (document.getElementsByClassName('sticky').length > 0) {
		if (document.getElementById('stickyText').style.fontFamily == "") {
			document.getElementById('stickyText').style.fontFamily = "Helvetica";
		};
	
		if (document.getElementById('stickyText').style.fontSize == "") {
			document.getElementById('stickyText').style.fontSize = "16pt";
			
		};

		if (document.getElementById('stickyId').style.backgroundColor == "") {
			document.getElementById('stickyId').style.backgroundColor = "lemonchiffon";	
		};

		$('.saved').fadeIn(400).delay(1500).fadeOut(400);
	} 
	else {
		//console.log("Workng!");
		
	};

	localStorage.setItem('noteKatCanvas', document.getElementById('stickyCanvas').innerHTML);
	
	var saveNoteTexts = [];
	$(".stickyText").each(function() {
		saveNoteTexts.push(this.value);
	});

	localStorage.setItem('noteTexts', JSON.stringify(saveNoteTexts));
	
};

document.getElementById('load').onclick = function() {
	if (!localStorage.getItem('noteKatCanvas')) {
		alert('No notes here!');
	} 
	else {
		document.getElementById('stickyCanvas').innerHTML = localStorage.getItem('noteKatCanvas');
		
		
		
		// upload_image();
		var stickies = document.getElementsByClassName('sticky');
		$(stickies).each(function() {
			upload_image(this);

		});

		closeTheSticky();
		
		$(".sticky").draggable({
			handle: ".handle"
		});

		
		

		var loadNoteTexts = JSON.parse(localStorage.getItem('noteTexts'));
		//console.log(loadNoteTexts);
		$('.stickyText').each(function(index) {
			//console.log(loadNoteTexts[index]);
			$(this).val(loadNoteTexts[index]);
		});

		loadFont = document.getElementById('stickyText').style.fontFamily;
		if (loadFont.indexOf(' ') > 0) {
			console.log(loadFont);
			// loadFont.slice(1, -1);
			console.log(loadFont);
			document.getElementById("fontSelect").value = loadFont.slice(1, -1);
			//document.getElementById("fontSelect").value = String(loadFont);

		} 
		else {
			console.log(loadFont);
			document.getElementById("fontSelect").value = String(loadFont);
		};

		// document.getElementById("fontSelect").value = document.getElementById('stickyText').style.fontFamily;
		document.getElementById("backgroundColorInput").value = document.getElementById('stickyId').style.backgroundColor;
		document.getElementById("changeFontSize").value = Number(document.getElementById('stickyText').style.fontSize.slice(0, -2));

	};
	
	
};












