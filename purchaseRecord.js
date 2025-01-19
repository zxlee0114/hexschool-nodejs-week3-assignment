const members = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Evan",
  "Fiona",
  "George",
  "Hannah",
];

const COURSE_PRICING_TIERS = {
  BASIC: { min: 1, max: 10, price: 1500 },
  STANDARD: { min: 11, max: 20, price: 1300 },
  PREMIUM: { min: 21, price: 1100 },
};

const ERROR_MESSAGES = {
  INVALID_MEMBER: "請輸入有效的會員名稱",
  INVALID_COURSE_COUNT: "請輸入有效的課程數量",
};

const purchaseRecords = [];
let totalPrice = 0;
let noPurchaseMembers = [];

function calculateCoursePrice(courseCount) {
  if (!Number.isInteger(courseCount) || courseCount <= 0)
    throw new Error(ERROR_MESSAGES.INVALID_COURSE_COUNT);

  if (courseCount >= COURSE_PRICING_TIERS.PREMIUM.min)
    return COURSE_PRICING_TIERS.PREMIUM.price;

  if (courseCount >= COURSE_PRICING_TIERS.STANDARD.min)
    return COURSE_PRICING_TIERS.STANDARD.price;

  return COURSE_PRICING_TIERS.BASIC.price;
}

function createPurchaseRecord(memberName, purchaseCourseCount, coursePerPrice) {
  const courseTotalPrice = coursePerPrice * purchaseCourseCount;
  return {
    會員名稱: memberName,
    購買課程數量: purchaseCourseCount,
    課程單價: coursePerPrice,
    總金額: courseTotalPrice,
  };
}

// 一、新增會員購買課程的記錄，並依購買數量套用優惠價格
function addPurchaseRecord(memberName, purchaseCourseCount) {
  if (!members.includes(memberName))
    throw new Error(ERROR_MESSAGES.INVALID_MEMBER);

  const coursePerPrice = calculateCoursePrice(purchaseCourseCount);

  const purchaseRecordInfo = createPurchaseRecord(
    memberName,
    purchaseCourseCount,
    coursePerPrice
  );
  purchaseRecords.push(purchaseRecordInfo);

  console.log(
    `新增購買記錄成功！會員 ${memberName} 購買 ${purchaseCourseCount} 堂課，` +
      `總金額為 ${purchaseRecordInfo.總金額.toLocaleString("zh-TW")} 元。`
  );
  return purchaseRecords;
}

// 二、計算目前的總營業額
function calculateTotalPrice() {
  totalPrice = purchaseRecords.reduce(
    (total, record) => total + record.總金額,
    0
  );
  console.log(`目前總營業額為 ${totalPrice.toLocaleString("zh-TW")} 元`);
  return totalPrice;
}

// 三、篩選未購買過課程的會員
function filterNoPurchaseMember() {
  noPurchaseMembers = members.filter(
    (member) => !purchaseRecords.some((record) => record.會員名稱 === member)
  );
  console.log(`未購買課程的會員有：${noPurchaseMembers.join("、")}`);
  return noPurchaseMembers;
}

// 執行測試
addPurchaseRecord("Alice", 4);
addPurchaseRecord("Bob", 12);
addPurchaseRecord("Charlie", 25);
addPurchaseRecord("Hannah", 50);
// addPurchaseRecord("名稱", 11);
// addPurchaseRecord("Evan", "數量");
calculateTotalPrice();
filterNoPurchaseMember();
console.log(purchaseRecords, totalPrice, noPurchaseMembers);

/* 
一、
新增會員購買課程的記錄，並依購買數量套用優惠價格

購買數量 / 單價 (每堂課)
1-10 堂 / 1500 元
11-20 堂 / 1300 元
21 堂以上 / 1100 元 

記錄內容：
會員名稱 (name)：字串
購買課程數量 (courses)：數字
課程單價（自動計算）
總金額（courses × 單價）

功能要求：
使用陣列 purchaseRecords 儲存每筆記錄。
如果輸入無效（如名稱為空或數值不正確），提示輸入錯誤，並不儲存該記錄。
成功新增後，印出「新增購買記錄成功！會員 [會員名稱] 購買 [數量] 堂課，總金額為 [金額] 元。」

eg. addPurchaseRecord("名稱", “課程數量”); >> 印出 console.log 文字為 輸入錯誤，請輸入有效的會員名稱和課程數量。

二、
新增函式 calculateTotalPrice，計算目前的總營業額為多少。
印出 console.log 文字為 目前總營業額為 ${totalPrice} 元


三、
新增函式 filterNoPurchaseMember，篩選特定條件的會員記錄。例如：未購買過課程的會員，並依序列出
印出 console.log 文字為 未購買課程的會員有：.......
*/
