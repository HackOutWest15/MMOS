function gotoView(from, to) {
	stopSong();

	if(to == 'createWrapper')
		init();

	if(to == 'welcomeWrapper')
		$('#backButton').hide();
	else
		$('#backButton').show();

	if(from == '') {
		$('#browseWrapper').fadeOut(1000);
		$('#createWrapper').fadeOut(1000);
	} else
		$('#' + from).fadeOut(1000);

	if(to == 'browseWrapper')
		playSong(false);

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
		$('#keyParagraph').html(songs[currentSong].key);
		$('#bpmParagraph').html(songs[currentSong].bpm);
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

		if(timeSpent >= 60000)
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

var songs = [
	{
		'title': 'I see fire (cover)',
		'key': 'A#',
		'bpm': 110,
		'audio': 'public/audio/iseefire.mp3',
		'alternate': 'public/audio/test1.wav',
		'items': [
			{
				'type': 'Vocals',
				'tracks': [
					{
						'genres': ['Pop'],
						'nationality': 'italy',
						'video': 'public/video/iseefire.mp4'
					}
				]
			},
			{
				'type': 'Main riff',
				'tracks': [
					{
						'genres': ['Rock', 'Pop'],
						'nationality': 'Sweden',
						'video': 'public/video/iseefire2.mp4'
					}
				]
			},
			{
				'type': 'Beat',
				'tracks': []
			},
			{
				'type': 'Baseline',
				'tracks': []
			},
			{
				'type': 'Wildcard',
				'tracks': []
			}
		]
	},
	{
		'title': 'Best of you (cover)',
		'key': 'C',
		'bpm': 100,
		'audio': 'public/audio/bestofyou.mp3',
		'alternate': 'public/audio/test1.wav',
		'items': [
			{
				'type': 'Vocals',
				'tracks': [
					{
						'genres': ['Rock'],
						'nationality': 'Sweden',
						'video': 'public/video/bestofyou2.mp4'
					}
				]
			},
			{
				'type': 'Main riff',
				'tracks': [
					{
						'genres': ['Rock'],
						'nationality': 'ivorycoast',
						'video': 'public/video/bestofyou.mp4'
					}
				]
			},
			{
				'type': 'Beat',
				'tracks': []
			},
			{
				'type': 'Baseline',
				'tracks': []
			},
			{
				'type': 'Wildcard',
				'tracks': []
			}
		]
	},
	{
		'title': 'A very fine title3',
		'key': 'C#',
		'bpm': 120,
		'audio': 'public/audio/test1.wav',
		'alternate': 'public/audio/test1.wav',
		'items': [
			{
				'type': 'Vocals',
				'tracks': [
					{
						'genres': ['Rock', 'Pop'],
						'nationality': 'Sweden',
						'video': 'public/video/test.mov'
					}
				]
			},
			{
				'type': 'Main riff',
				'tracks': [
					{
						'genres': ['Rock', 'Pop'],
						'nationality': 'Sweden',
						'video': 'public/video/test.mov'
					}
				]
			},
			{
				'type': 'Beat',
				'tracks': [
					{
						'genres': ['Rock', 'Pop'],
						'nationality': 'Sweden',
						'video': 'public/video/test.mov'
					}
				]
			},
			{
				'type': 'Baseline',
				'tracks': [
					{
						'genres': ['Rock', 'Pop'],
						'nationality': 'Sweden',
						'video': 'public/video/test.mov'
					}
				]
			},
			{
				'type': 'Wildcard',
				'tracks': [
					{
						'genres': ['Rock', 'Pop'],
						'nationality': 'Sweden',
						'video': 'public/video/test.mov'
					}
				]
			}
		]
	}
];

var currentSong = 0;
var currentTracks = [0,0,0,0,0];


function changeSong(next) {
	console.log('Changing song');
	stopSong();
	if(next && currentSong < songs.length - 1) {
		currentSong++;
		loadSong(songs[currentSong]);
	} else if(!next && currentSong > 0) {
		currentSong--;
		loadSong(songs[currentSong]);
	}
	playSong(false);
}

function loadSong(song) {
	console.log('loading song');
	currentTracks = [0,0,0,0,0];

	$('#browseInnerWrapper h3').html(song.title);
	$('#browseInnerWrapper p').html(getGenres(song));

	var numberOfCircles = 0;

	for(var i = 0; i < 5; i++) {
		if(song.items[i].tracks.length > 0)
			numberOfCircles++;
	}

	var circleClass = '';
	if(numberOfCircles == 1)
		circleClass = 'oneCircle';
	else if(numberOfCircles == 2)
		circleClass = 'twoCircles';
	else if(numberOfCircles == 3)
		circleClass = 'threeCircles';
	else if(numberOfCircles == 4)
		circleClass = 'fourCircles';
	else if(numberOfCircles == 5)
		circleClass = 'fiveCircles';

	$('#browseCircleWrapper').removeClass('oneCircle')
	$('#browseCircleWrapper').removeClass('twoCircles')
	$('#browseCircleWrapper').removeClass('threeCircles')
	$('#browseCircleWrapper').removeClass('fourCircles')
	$('#browseCircleWrapper').removeClass('fiveCircles')
	$('#browseCircleWrapper').addClass(circleClass);

	var circleIndex = 0;
	for(var i = 0; i < 5; i++) {
		if(song.items[i].tracks.length > 0) {
			loadTrack(i, 0);
			$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (i+1) + ') .browseSmallCircleLeftArrow').hide();
			if(song.items[i].tracks.length <= 1)
				$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (i+1) + ') .browseSmallCircleRightArrow').hide();
			else
				$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (i+1) + ') .browseSmallCircleRightArrow').show();
			$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (i+1) + ') .browseSmallCircleFlag').css('background-image', "url('../public/images/flags/" + song.items[i].tracks[0].nationality + ".png')");
			circleIndex++;
		}
	}

	if(currentSong == 0)
		$('#prevSongWrapper p').fadeOut();
	else
		$('#prevSongWrapper p').fadeIn();
	
	if(currentSong == songs.length - 1)
		$('#nextSongWrapper p').fadeOut();
	else
		$('#nextSongWrapper p').fadeIn();
}

function getGenres(song) {
	var genres = [];
	for(var i = 0; i < song.items.length; i++) {
		for(var j = 0; j < song.items[i].tracks.length; j++) {
			for(var k = 0; k < song.items[i].tracks[j].genres.length; k++) {
				if(genres.indexOf(song.items[i].tracks[j].genres[k]) == -1)
					genres.push(song.items[i].tracks[j].genres[k]);
			}
		}
	}

	var str = '';
	for(var i = 0; i < genres.length; i++) {
		if(i < genres.length - 1)
			str += genres[i] + ', ';
		else
			str += genres[i];
	}
	return str;
}

function changeTrack(index, next) {
	console.log('change track');
	stopSong();
	if(next && currentTracks[index] < songs[currentSong].items[index].tracks.length - 1) {
		currentTracks[index]++;
		$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (index+1) + ') .browseSmallCircleLeftArrow').show();
	} else
		$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (index+1) + ') .browseSmallCircleLeftArrow').hide();

	if(!next && currentTracks[index] > 0) {
		currentTracks[index]--;
		$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (index+1) + ') .browseSmallCircleRightArrow').show();
	} else
		$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (index+1) + ') .browseSmallCircleRightArrow').hide();

	$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (index+1) + ') .browseSmallCircleFlag').css('background-image', "url('../public/images/flags/" + songs[currentSong].items[index].tracks[currentTracks[index]].nationality + ".png')");
	loadTrack(index, currentTracks[index]);
	playSong(currentTracks[index] > 0);
}

function loadTrack(index, trackIndex) {
	$('#browseCircleWrapper .browseSmallCircle:nth-of-type(' + (index+1) + ') video').attr('src', songs[currentSong].items[index].tracks[trackIndex].video);
}

var playAudio = '';
function playSong(alternate) {
	console.log('play song delay');
	var i = setInterval(function() {
		console.log('playing song...');
		if(alternate)
			playAudio = new Audio(songs[currentSong].alternate);
		else
			playAudio = new Audio(songs[currentSong].audio);

		$('#browseCircleWrapper .browseSmallCircle:nth-child(1) video')[0].play();
		$('#browseCircleWrapper .browseSmallCircle:nth-child(2) video')[0].play();
		$('#browseCircleWrapper .browseSmallCircle:nth-child(3) video')[0].play();
		$('#browseCircleWrapper .browseSmallCircle:nth-child(4) video')[0].play();
		$('#browseCircleWrapper .browseSmallCircle:nth-child(5) video')[0].play();

		playAudio.play();
		clearInterval(i);
	}, 2000);
}

function stopSong() {
	if(playAudio != '') {
		console.log('stopping song.');
		playAudio.pause();
		playAudio.currentTime = 0;
	}
}

loadSong(songs[0]);


