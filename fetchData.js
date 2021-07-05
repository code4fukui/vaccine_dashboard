import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day } from "https://code4fukui.github.io/day-es/Day.js";

const url = "https://push.sabae.cc/817.csv";

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
const fetchData = async (city) => {
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
  return data2;
};
export { fetchData };
