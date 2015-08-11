function gotoView(from, to) {
	if(to == 'createWrapper')
		init();
	$('#' + from).fadeOut(1000);
	$('#' + to).fadeIn(1000);
}

function updateCreateWrapper(i) {
	if(i == 0) {
		$('#createTitle').html('Record your masterpiece.');
		$('#songSettingsInnerWrapper input, #songSettingsInnerWrapper select').show();
		$('#songNameWrapper').show();
		$('#keyParagraph').hide();
		$('#bpmParagraph').hide();
		$('#createSongWrapper .button').html('Submit song!');
	} else {
		$('#createTitle').html('Contribute to this masterpiece.');
		$('#songSettingsInnerWrapper input, #songSettingsInnerWrapper select').hide();
		$('#songNameWrapper').hide();
		$('#keyParagraph').html('A#');
		$('#bpmParagraph').html('100');
		$('#keyParagraph').show();
		$('#bpmParagraph').show();
		$('#createSongWrapper .button').html('Contribute to song!');
	}
}

navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
window.URL = window.URL || window.webkitURL;

var video = document.getElementById('videoElement');

function gotStream(stream) {
	if (window.URL) {
		video.src = window.URL.createObjectURL(stream);
	} else {
		video.src = stream;
	}
}

function startRecording() {
	$('#videoShader').fadeIn();
	$('#videoElement').fadeIn();
	$('#videoOverlay').fadeIn();
	$('#videoOverlay span').html('Starting in:');

	var i = setInterval(function() {
		startMetronome();
		clearInterval(i);
	}, 3000);
}

function stopRecording(completed) {
	$('#videoShader').fadeOut();
	$('#videoElement').fadeOut();
	$('#videoOverlay').fadeOut();

	if(completed)
		$('#createSongWrapper .button').fadeIn();

	stopMetronome(completed);
}

function init() {
	if (!navigator.getUserMedia) {
		document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
		return;
	}
	navigator.getUserMedia({video: true}, gotStream, function(err) {});
}

var audio = new Audio('public/audio/tick.wav');
var interval = null;

function startMetronome() {
	var fadeIn = true;
	var bpmVal = $('#bpmInput').val();

	var intervalTime = 60 / parseFloat(bpmVal);
	intervalTime *= 1000;

	//Toggle between fadein and fadeout
	intervalTime /= 2;

	var countdownIndex = 1;
	var timeSpent = 0;
	var running = false;

	interval = setInterval(function() {
		if(fadeIn) {
			fadeIn = false;

			if(countdownIndex < 5) {
				$('#videoOverlay span').html('' + countdownIndex);
				countdownIndex++;
			} else {
				$('#videoOverlay').fadeOut();
				running = true;
			}

			$('#videoElement').css('outline', '1px solid #770000');
			audio.play();
		} else {
			fadeIn = true;
			$('#videoElement').css('outline', '0');
		}

		if(timeSpent >= 1000)
			stopRecording(true);
		if(running)
			timeSpent += intervalTime;
	}, intervalTime);
}

function stopMetronome(completed) {
	clearInterval(interval);

	if(completed) {
		$('#startRecordingButton').hide();
		$('#completedRecording').fadeIn();
		var date = new Date();
		$('#completedRecording p').html(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
	}
}
