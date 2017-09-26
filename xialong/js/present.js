$(document).ready(function(){

	let object = JSON.parse(localStorage.getItem('postavkiby'));
    let now = new Date().getTime().toString();

    if (object && object.timestamp > now) {
    	if (object.value == 0) {
            visibleWindow();
		}
    } else {
        //let newObject = {value: 0, timestamp: new Date().addHours(168 * 4).getTime()};
        let newObject = {value: 0, timestamp: new Date().addHours(0.1).getTime()};
        localStorage.setItem("postavkiby", JSON.stringify(newObject));
	}

    let newObject = {value: 0, timestamp: new Date().addHours(0.1).getTime()};
    localStorage.setItem("postavkiby", JSON.stringify(newObject));

});

function visibleWindow() {
	setTimeout(function(){
        $('#video-window').fadeIn(500);
	}, 30000);
}

$('#video-window .close').click(function(){
	$('#video-window').fadeOut(500);
});

$('#video-window .seen-already').click(function(){
    let object = {value: 1, timestamp: new Date().addHours(168 * 4).getTime()};
    localStorage.setItem("postavkiby", JSON.stringify(object));

    $('#video-window').fadeOut(500);
});

$('#video-window .click-zone').click(function(){
    let newObject = {value: 1, timestamp: new Date().addHours(168 * 4).getTime()};
    localStorage.setItem("postavkiby", JSON.stringify(newObject));
    $('#video-window').fadeOut(500);
});