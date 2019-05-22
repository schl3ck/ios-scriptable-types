/* eslint-disable no-console */
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const turndown = require("turndown");


let turndownService = new turndown({
	codeBlockStyle: "fenced",
}).remove("button").addRule("strike", {
	filter: ["del", "s", "strike"],
	replacement: (content) => {
		return `~${content}~`;
	}
});

let definitions = [];

let request = axios.create({
	baseURL: "https://docs.scriptable.app/",
	timeout: 5000
});

request.get("/")
	.then((response) => {
		let $ = cheerio.load(response.data);
		let links = $("div.md-sidebar--primary[data-md-component='navigation'] ul.md-nav__list a.md-nav__link:not(.md-nav__link--active)").map((i, el) => {
			let l = $(el).attr("href");
			return l.startsWith("#") ? undefined : l;
		}).get();

		return Promise.all(
			links.map((link) => {
				return request.get(link).then((response) => cheerio.load(response.data));
			})
		);
	})
	.then((responses) => {
		responses.forEach(($) => {
			let article = $("article.md-content__inner");

			let structure = {
				title: "",
				description: [],
				isClass: true,
				properties: []
			};
			/**
			 * @property {string} title
			 * @property {string[]} description
			 */
			let current;

			article.children().each((i, el) => {
				el = $(el);
				switch (el[0].tagName.toLowerCase()) {
					case "h1":
						structure.title = el.text();
						structure.isClass = /^[A-Z]/.test(structure.title.trim());
						break;
					case "h3":
						if (current) {
							structure.properties.push(current);
							current = {
								description: []
							};
						}
						current = current || {};
						current.title = el.text();
						break;
					case "p":
					case "pre":
						{
							let str = el[0].outerHTML;
							if (current) {
								current.description.push(str);
							} else {
								structure.description.push(str);
							}
						}
						break;
				}
			});

			let str = "";

			if (structure.description) {
				str += "/**\n" + structure.description.map((item) => " * " + turndownService.turndown(item)).join("\n") + "*/";
			}
			// TODO: add other stuff
		});
	});
