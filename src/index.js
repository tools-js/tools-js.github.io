/*jshint browser: true, devel: true, jquery: true*/
$.ajax({
	url: "src/data.json",
	success: function (data) {
		$.ajax({
			url: "src/ignore.txt",
			success: function (ignore) {
				$.ajax({
					url: "src/platforms.txt",
					success: function (platforms) {
						ready(data, ignore.split(/[\r\n]+/g), platforms.split(/[\r\n]+/g));
					},
					error: function (xhr, a, b) {
						alert("Error loading src/platforms.txt: " + b);
					}
				});
			},
			error: function (xhr, a, b) {
				alert("Error loading src/ignore.txt: " + b);
			}
		});
	},
	error: function (xhr, a, b) {
		alert("Error loading src/data.json: " + b);
	}
});

function ready (data, ignore_words, platforms) {
	"use strict";
	
	var keys = [],
		search = $("#search");

	search.keydown(function (e) {
		if (e.which === 13) {
			update1(search.val());
			search.blur();
			keys = [];
			return;
		}
		keys.push(1);
		setTimeout(function () {
			if (keys.length === 0) return;
			keys.shift();
			if (keys.length === 0) {
				update1(search.val());
			}
		}, 1500);
		
		var text = search.val();
		setTimeout(function () {
			if (search.is(":focus") && $("#input").val() !== text) {
				$("#results").fadeOut(300);
			}
		}, 500);
	});
	
	function update1(text) {
		if (!text) {
			return;
		}
		$("#results").html("");
		var scores = {},
			plafs = [],
			name, item;
		platforms.forEach(function (plaf) {
			if (new RegExp("\\b" + plaf + "\\b", "i").test(text)) {
				plafs.push(plaf);
			}
		});
		
		function score (word) {
			var reg = new RegExp("\\b" + word.replace(/e?s$/, "(?:$&)?") + "\\b", "i"),
				ignore = false;
			ignore_words.forEach(function (word2) {
				ignore |= reg.test(word2);
			});
			if (ignore) {
				return;
			}
			platforms.forEach(function (plaf) {
				if (new RegExp("\\b" + word + "\\b", "i").test(plaf)) {
					ignore = true;
				}
			});
			if (ignore) {
				return;
			}
			if (reg.test(name)) {
				scores[name] += 30;
			}
			if (reg.test(item.types)) {
				scores[name] += 50;
			}
			if (reg.test(item.categories)) {
				scores[name] += 20;
			}
			if (reg.test(item.keywords)) {
				scores[name] += 10;
			}
			if (reg.test(item.use)) {
				scores[name] += 3;
			}
			item.features.forEach(function (feat) {
				if (reg.test(feat)) {
					scores[name] += 5;
				}
			});
		}
		
		for (name in data) if (data.hasOwnProperty(name)) {
			item = data[name];
			scores[name] = 0;
			text.match(/[\w-]+/g).forEach(score);
		}
		var sorted = [];
		for (name in scores) {
			// loop through plafs and return if it doesn't contain any of them
			var ignore = 1;
			plafs.forEach(function (plaf)  {
				ignore &= new RegExp("\\b" + plaf + "\\b", "i").test(data[name].types);
			});
			if (!ignore || scores[name] === 0) continue;
			for (var i = 0; i < sorted.length && scores[name] <= scores[sorted[i]]; ++i);
			sorted.splice(i, 0, name);
		}
		sorted.forEach(function (name) {
			var features = $("<ul class='features'></ul>");
			data[name].features.forEach(function (feat) {
				features.append("<li>" + feat + "</li>");
			});
			$("#results").append(
				$('<div class="result"></div>')
				.append("<h3><a href='" + data[name].url + "'>" + name + "</a></h3>")
				.append($("<div></div>")
						.append("<b>Used for:</b>&ensp;" + data[name].use + "<br>")
						.append("<b>Resource type:</b>&ensp;" + data[name].types + "<br>")
						.append($("<a href='#'>Show more</a>")
							   .click(function () {
									$("#more-" + name).slideToggle(500);
								}))
						.append($("<div id='more-" + name + "'></div>")
								.append("<b>Features:</b>")
								.append(features)
								.each(function () {
									var that = this;
									setTimeout(function () {
										$(that).css('height', $(that).height() - 20);
									}, 1);
								})
								.hide()
						)
				)
			);
		});
		if(sorted.length === 0) {
			$("#results").append(
				$('<div class="result"></div>')
				.append("<p>" + (/everything/i.test(text) ? "Be a little more specific, please." : /nothing/i.test(text) ? "Here you go:" : "No results found.") + "</p>")
			);
		}
		$("#results").fadeIn(300);
	}
	
	$("#loader").fadeOut();
}
