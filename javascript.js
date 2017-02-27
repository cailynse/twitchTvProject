/*jslint browser: true*/
/*global $, jQuery, alert*/

function userView(evt, users) {
	// Declare all variables
	console.log(users);
	var i, tabcontent, tablinks;
	var onlineUsers = document.getElementsByClassName("online");
	var offlineUsers = document.getElementsByClassName("offline");

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	if (evt === Offline) {
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "none";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "block";
		}
	} else if (evt === Online) {
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "none";
		}
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "block";
		}

	} else {
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "block";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "block";
		}


	}

	// Show the current tab, and add an "active" class to the link that opened the tab
	document.getElementById(users).style.display = "block";
	evt.currentTarget.className += " active";
}

window.onload = function () {
	'use strict';
	var url = "https://wind-bow.gomix.me/twitch-api",
		usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

	var handleData = function (data, textStatus, jqXHR) {


		if (data.stream === null) {
			var offlineUserDisplay = document.createElement("div");
			offlineUserDisplay.classList.add("well");
			offlineUserDisplay.setAttribute("display", "block");

			document.getElementById("All").appendChild(offlineUserDisplay);
			return;

		} else {
			var link = data.stream.channel.url,
				logoImg = data.stream.channel.logo,
				description = data.stream.channel.status,
				userName = data.stream.channel.name;

			//create well for user information//
			var onlineUserDisplay = document.createElement("div");
			onlineUserDisplay.classList.add("well", "userDisplay", "online");

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


			document.getElementsByClassName("tabcontent").appendChild(onlineUserDisplay);



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
