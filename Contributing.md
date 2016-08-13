# Contributing

- [The basic process](#the-basic-process)
- [Anatomy of the project](#anatomy-of-the-project)
- [Adding tools](#adding-tools)
- [Helping with anything else](#helping-with-anything-else)

## The basic process

1. Fork this repository.
2. Make your changes.
3. Submit a pull request, and explain what you changed/why you changed it (unless it's just adding one or more tools).
4. Your request should get merged or closed within 24 hours, but don't worry if it doesn't.
5. If the request is accepted, your name will be added to the Contributor list on the Readme.

Note: By submitting a pull request, you automatically agree to have your contributions distributed under the MIT license with the rest of the project.

## Anatomy of the project

- [index.html](/index.html): The main page, housing the basic HTML elements and wrappers.
- [style/style.css](/style/style.css): Makes index.html look good. Need improvement.
- [src/index.js](/src/index.js): The meat of the website, doing all of the searching, sorting, and DOM-updating.
- [src/data.json](/src/data.json): The database of tools.
- [src/platforms.txt](/src/platforms.txt): The database of platforms the tools can run on. Currently very incomplete.
- [src/ignore.txt](/src/ignore.txt): The list of words ignored in the search terms.

## Adding tools

Tool data is found in [src/data.json](/src/data.json). The best way to add a tool is to just copy-paste an existing one and modify the information. As an example, take a look at jQuery:

	"jQuery": {
		"use": "easily manipulating HTML at runtime",
		"types": "web library",
		"categories": "DOM",
		"keywords": "DOM HTML manipulate manipulation",
		"url": "https://jquery.com",
		"dependencies": [],
		"features": [
			"HTML/DOM manipulation",
			"CSS manipulation",
			"HTML event methods",
			"Effects and animations",
			"AJAX",
			"Utilities"
		]
	}

- `use`: A basic description of what the tool does. Shows in the search result as "Used for:".
- `types`: A list of the resource types in which it's available, separated by the string ", ". Shows in the search result as "Resource type". If the search contains a type keyword (e.g. "node") and `types` doesn't contain this keyword, the tool won't appear in the results.
- `categories`: Currently, these are just extra-strong keywords, separated by the string ", ". Contributes to the search, but doesn't show in the search result.
- `keywords`: A space-separated list of keywords. Words that go here should be very much related to the tool. Contributes to the search.
- `url`: The website of the tool. The search result directly links here.
- `dependencies`: Any tools that the tool depends on. Currently serves no purpose.
- `features`: A list of the features of the tool. Contributes to the search, and shows in the search result, under "Show more".

## Helping with anything else

Hopefully enough information has been provided [above](#anatomy-of-the-project) for you to understand what each of the files does. Feel free to help out in any way you can!
