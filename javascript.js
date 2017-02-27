/*jslint browser: true*/
/*global $, jQuery, alert*/



window.onload = function () {
	'use strict';
	var url = "https://wind-bow.gomix.me/twitch-api",
		usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

	var handleData = function (data, textStatus, jqXHR) {


		if (data.stream === null) {
			var offlineUserDisplay = document.createElement("div");
			offlineUserDisplay.classList.add("well");

			var userDisplay = document.createElement("div");
			userDisplay.classList.add("well");

			document.getElementById("Offline").appendChild(offlineUserDisplay);
			document.getElementById("All").appendChild(userDisplay);
			return;

		} else {
			var link = data.stream.channel.url;
			console.log(link);
			var logoImg = data.stream.channel.logo,
				description = data.stream.channel.status,
				userName = data.stream.channel.name;

			//create well for user information//
			var onlineUserDisplay = document.createElement("div");
			onlineUserDisplay.classList.add("well", "userDisplay");

			//create button to go to user page//		
			var userLogoBtn = document.createElement("a");
			userLogoBtn.setAttribute("href", link);
			userLogoBtn.setAttribute("target", "_blank");
			//setting user's logo image as button//
			var userLogo = document.createElement("img");
			userLogo.setAttribute("src", logoImg);
			userLogo.classList.add("logoImage");
			userLogoBtn.appendChild(userLogo);
			//put image button in user information well//
			onlineUserDisplay.appendChild(userLogoBtn);
			var usernameHeading = document.createElement('h3');
			var userNameNode = document.createTextNode(userName);
			usernameHeading.appendChild(userNameNode);
			onlineUserDisplay.appendChild(usernameHeading);
			//create <p> for streaming information//
			var streamInfoPar = document.createElement("p");
			var streamInfo = document.createTextNode(description);
			streamInfoPar.appendChild(streamInfo);
			onlineUserDisplay.appendChild(streamInfoPar);

			var userDisplay = document.createElement("div");
			userDisplay.classList.add("well");
			document.getElementById("Online").appendChild(onlineUserDisplay);

			document.getElementById("All").appendChild(userDisplay);

		}

	};

	function checkUser(user) {
		$.ajax({
			type: "GET",
			url: "https://wind-bow.gomix.me/twitch-api/streams/" + user,
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			async: "false",
			success: handleData,
			error: function (errorMessage) {
				alert("Unable to retrieve results. Please refresh page.");
			}
		});

	}

	for (var i = 0; i < usernames.length; i++) {
		var user = usernames[i];
		console.log(user);
		checkUser(user);
	}








};
