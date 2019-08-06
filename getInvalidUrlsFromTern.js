/* eslint-disable no-console */

const axios = require("axios");
const cheerio = require("cheerio");


let request = axios.create({
	baseURL: "https://docs.scriptable.app/",
	timeout: 15000
});

console.log("Loading JSON file...");

class ArrayMap extends Map {
	constructor(iter) {
		super();
		if (iter) {
			for (const iterator of iter) {
				this.add(iterator);
			}
		}
	}

	add(key, value) {
		if (Array.isArray(key) && key.length >= 2 && typeof value == "undefined") {
			value = key.slice(1);
			key = key[0];
		}

		if (this.has(key)) this.get(key).push(value);
		else this.set(key, [value]);
	}

	toObject() {
		let res = {};
		this.forEach((v, k) => {
			res[k] = v;
		});
		return res;
	}
}

function getUrl(o) {
	if (o["!url"]) return o["!url"];
	let res = [];
	for (const v of Object.values(o)) {
		if (typeof v == "object")
			res.push(getUrl(v));
	}
	return res;
}

request.get("/scriptable.json")
	.catch((err) => {
		console.error("There was an error while loading the Tern definition file:\n", err);
		process.exit(1);
	})
	.then((response) => {
		response = response.data;

		let urls = getUrl(response).flat(10).filter((v) => v);
		urls.sort();
		urls = urls.map((url) => url.split("#"));
		urls = new ArrayMap(urls).toObject();

		return Promise.all(Object.entries(urls).map(([url, anchors]) => {
			// console.log("requesting: " + url);
			if (!url.startsWith("http")) return [url, anchors];
			return request.get(url)
				.then((res) => {
					let $ = cheerio.load(res.data);

					return [url, anchors.filter((a) => $("#" + a).length !== 1)];
				});
		}))
			.then((urls) => {
				for (const url of urls) {
					let base = url[0];

					if (!base.startsWith("http"))
						console.log(base);

					let written = false;
					
					for (const anchor of url[1]) {
						if (!anchor) continue;
						console.log(base + "#" + anchor);
						written = true;
					}

					if (written)
						console.log();
				}
			});
	});


