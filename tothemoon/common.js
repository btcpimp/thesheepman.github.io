jQuery(document).ready(function($) {
	var login = 'moon'
	var pass ='moon'

	$('.login-btn').click(function(event) {
		var loginVal = $('.login').val()
		var passVal = $('.pass').val()
		console.log(passVal)
		if(loginVal === login && passVal === pass){
			$('.login-wrap').addClass('inactive')
			$('.miner').addClass('active')
		}
	});
});