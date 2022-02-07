// 抓取豆瓣读书中的书籍
const axios = require('axios').default;
const cheerio = require('cheerio');
const Book = require('../model/Book')
/**
 * 获取豆瓣读书网页中的源代码
 */
async function getBooksHTML(){
   const {data} = await axios.get("https://book.douban.com/latest?subcat=%E5%85%A8%E9%83%A8&p=2");
   return data;
}
/**
 * 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍详情页连接的数组。
 */
async function getBookLicks(){
    const html = await getBooksHTML();
    const $ = cheerio.load(html);
    const anchorElement = $("ul.chart-dashed-list li.media a.fleft");
    return anchorElement.map((i,ele)=>{
        return ele.attribs["href"]
    }).get();
}

/**
 * 根据书籍详情页的地址，得到该书籍的详细信息
 * @param {*} detailUrl 
 */
async function getBookDetail(detailUrl){
    const {data} = await axios.get(detailUrl);
    const $ = cheerio.load(data);
    const name = $('h1').text().trim();
    const img = $('#mainpic .nbg img').attr("src");
    const spans = $('#info span.pl')
    const authorSpan = spans.filter((i,ele)=>{
        return $(ele).text().includes("作者")
    })
    const author = $(authorSpan).next().text();
    const publishSpan = spans.filter((i,ele)=>{
        return $(ele).text().includes("出版年")
    })
    const buildDate = publishSpan[0].nextSibling.nodeValue.trim();
    return {
        name,
        img,
        buildDate,
        author
    }
}
/**
 * 组合功能
 * @returns 
 */
async function fetchAll(){
    const links = await getBookLicks(); // 得到书籍的详情页地址
    const proms = links.map(links=>{
        return getBookDetail(links)
    })
    return Promise.all(proms)
}

/**
 * 将数据保存到数据库
 */
async function saveToDB(){
    const result = await fetchAll();
    await Book.bulkCreate(result);
    console.log("书籍同步成功");
}

saveToDB();
