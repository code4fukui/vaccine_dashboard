import { style, css, h1, add, create, link, hr } from "https://js.sabae.cc/stdom.js";
import { fetchData } from "./fetchData.js";

const TABULARMAP_SRC = `
	あわら市	勝山市	大野市
坂井市	福井市	永平寺町	池田町
越前町	鯖江市	越前市	南越前町
高浜町	若狭町	美浜町	敦賀市
おおい町	小浜市		`;

onload = async () => {
	css();
	style({ body: { "max-width": "90vw" }, h1: { margin: "1.2em 0" }});

	const data = await fetchData();

	const tbl = makeTabularMap(TABULARMAP_SRC);
	document.body.appendChild(tbl);
	//tmtitle.textContent = "福井県";
	//document.getElementById("鯖江市").style.backgroundColor = "#ebb"
	linkCells(tbl, data);
	hr();
	link("FUKUIワクチンダッシュボード by Code for Fukui (src on GitHub)", "https://github.com/code4fukui/vaccine_dashboard/");
};

const linkCells = (div, data) => {
	const tbody = div.childNodes[0]; // .childNodes[0];
	for (const tr of tbody.childNodes) {
		for (const td of tr.childNodes) {
			const name = td.textContent;
			if (name.length > 0 && data.find(d => d["市町名"] == name)) {
				//const url = "https://ja.wikipedia.org/wiki/" + encodeURIComponent(name);
				const url = "./#" + encodeURIComponent(name);;
				td.innerHTML = "<a href=" + url + ">" + name + "</a>";
			}
		}
	}
};

const makeTabularMap = function(src) {
	const items = [];
	const ssrc = src.substring(1).split('\n');
	for (let ss of ssrc) {
		items.push(ss.split('\t'));
	}
	const s = [];
	let maxcol = 0;
	let nmaxcol = -1;
	s.push('<table class=tabularmaps>');
	for (let row of items) {
		s.push('<tr>');
		for (let item of row) {
			if (item.length == 0) {
				let s2 = s[s.length - 1]
				if (s2.startsWith("<td class=tmnull colspan=")) {
					s.pop();
					const ncol = parseInt(s2.substring("<td class=tmnull colspan=".length)) + 1;
					s.push('<td class=tmnull colspan=' + ncol + '</td>');
					if (maxcol < ncol) {
						maxcol = ncol;
						nmaxcol = s.length - 1;
					}
				} else {
					s.push('<td class=tmnull colspan=1></td>');
					if (maxcol < 1) {
						maxcol = 1;
						nmaxcol = s.length - 1;
					}
				}
			} else {
				s.push('<td id="' + item + '">' + item + '</td>')
			}
		}
		s.push('</tr>')
	}
	s[nmaxcol] = s[nmaxcol].replace('<td class=tmnull colspan=', '<td class=tmnull id=tmtitle colspan=')
	s.push('</table>')
	const tbl = create("table");
	tbl.innerHTML = s.join('');
	tbl.className = "tabularmaps";
	return tbl;
};
