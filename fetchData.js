import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day } from "https://code4fukui.github.io/day-es/Day.js";
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

const url = "https://push.sabae.cc/817.csv";

const url_basic = "https://push.sabae.cc/876.json";
const url_avail = "https://push.sabae.cc/877.json";

const formatDates = (dates) => {
  if (!dates || dates.trim().length == 0) {
    return "";
  }
  return dates.split(",").map(d => {
    const day = new Day(d);
    return day.month + "/" + day.day;
  }).join("、");
};
const withIn2Weeks = (d) => {
  const today = new Day(new Date());
  const twoweekslater = today.dayAfter(13);
  return new Day(d).includes(today, twoweekslater);
};
const filterDates = (dates) => {
  if (!dates || dates.trim().length == 0) {
    return "";
  }
  return dates.split(",").filter(withIn2Weeks).join(",");
};

  /*
住所: "松原町１−３９"
備考: "定期通院の方優先"
医療機関名: "川上医院"
申込URL: ""
申込先名: "川上医院"
申込期限: ""
申込電話番号: "0770-22-0977"
空き状況: "2021-07-01"

医療機関名、市町名、住所（町域以降）、空き状況、申込先名、申込電話番号、申込URL、申込期限、備考
  */

const fetchDataFukui = async () => {
  const basic1 = await fetchJSON(url_basic);
  const basic = CSV.toJSON(CSV.decode(basic1.CSV));
  
  const avail1 = await fetchJSON(url_avail);
  const avail = CSV.toJSON(CSV.decode(avail1.CSV));
  
  const data3 = {};
  for (const a of avail) {
    if (!data3[a.接種場所ID]) {
      data3[a.接種場所ID] = [];
    }
    data3[a.接種場所ID].push(new Day(a.年月日).toString());
  }
  const data = [];
  Object.keys(data3).forEach(id => {
    const d = basic.find(d => d.接種場所ID == id);
    if (d) {
      const days = filterDates(data3[id].join(","));
      if (days) {
        data.push({
          医療機関名: d.施設名,
          市町名: "福井市",
          住所: d.住所,
          空き状況: formatDates(days),
          申込先名: d.申込先名,
          申込: d.申込URL || "tel:" + d.申込電話番号,
          申込期限: d.申込期限,
          備考: d.備考,
        });
      }
    }
  });
  console.log(data);
  return data;
};
const fetchData = async (city) => {
  if (city && city == "福井市") {
    return await fetchDataFukui();
  }
  const data = CSV.toJSON(await CSV.fetch(url));
  console.log(data);
  data.forEach(d => d.空き状況2週間以内 = filterDates(d.空き状況));
  const data2 = data.filter(d => (city ? d[""] == city : true) && d.空き状況2週間以内).map(d => {
    return {
      医療機関名: d.医療機関名,
      市町名: d[""],
      住所: d.住所,
      空き状況: formatDates(d.空き状況2週間以内),
      申込先名: d.申込先名,
      申込: d.申込URL || "tel:" + d.申込電話番号,
      申込期限: d.申込期限,
      備考: d.備考,
    };
  });
  if (city) {
    return data2;
  }
  const data3 = await fetchDataFukui();
  return data2.concat(data3);
};
export { fetchData };
