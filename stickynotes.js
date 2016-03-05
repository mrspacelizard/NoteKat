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
	var myStickyText = document.createElement('textarea');
	var closeSticky = document.createElement('img');
	var insertImage = document.createElement('i');
	mySticky.appendChild(myStickyText);
	mySticky.appendChild(closeSticky);
	mySticky.appendChild(insertImage);
	document.getElementById('stickyCanvas').appendChild(mySticky);
	myStickyText.id = 'stickyText';
	closeSticky.id = 'closeSticky';
	insertImage.id = 'insertImage';
	mySticky.id = 'stickyId';
	myStickyText.className = 'stickyText mdl-textfield__input';
	mySticky.className = 'sticky';
	insertImage.className = 'material-icons';
	insertImage.textContent = 'insert_photo';
	closeSticky.src = 'x-button.png';
	insertImage.src = 'insertimg.png';

	

	upload_image(mySticky);

	closeTheSticky();

	$(".sticky").draggable();

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
	localStorage.setItem('noteKatCanvas', document.getElementById('stickyCanvas').innerHTML);
	
	var saveNoteTexts = [];
	$(".stickyText").each(function() {
		saveNoteTexts.push(this.value);
	});

	localStorage.setItem('noteTexts', JSON.stringify(saveNoteTexts));
	$('.saved').fadeIn(400).delay(1500).fadeOut(400);
};

document.getElementById('load').onclick = function() {
	if (!localStorage.getItem('noteKatCanvas')) {
		alert('No notes here!');
	} 
	else {
		document.getElementById('stickyCanvas').innerHTML = localStorage.getItem('noteKatCanvas');
		
		$('.sticky').draggable();
		
		// upload_image();
		var stickies = document.getElementsByClassName('sticky');
		$(stickies).each(function() {
			upload_image(this);
		});

		closeTheSticky();

		var loadNoteTexts = JSON.parse(localStorage.getItem('noteTexts'));
		console.log(loadNoteTexts);
		$('.stickyText').each(function(index) {
			console.log(loadNoteTexts[index]);
			$(this).val(loadNoteTexts[index]);
		});

		document.getElementById("fontSelect").value = document.getElementById('stickyText').style.fontFamily;
		document.getElementById("backgroundColorInput").value = document.getElementById('stickyId').style.backgroundColor;
		document.getElementById("changeFontSize").value = Number(document.getElementById('stickyText').style.fontSize.slice(0, -2));
					
	};
	
};












