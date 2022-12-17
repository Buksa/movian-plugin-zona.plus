//загружаем module page https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/page.js
var page = require('movian/page');
//каждый плагин должен быть с уникальным id который мы указываем в URI
var PREFIX = 'zona.plus';

// создаем URI
//1. стартовая страница которая будет открывается после выбора плагина с главной страницы Movian.
//https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/page.js#L384
new page.Route(PREFIX + ':start', function(page) {
    console.log('открыта start');
});
// 2. листинг страница со списком фильмов/сериалов на которую мы попадаем со стартовой страницы.
new page.Route(PREFIX + ':list', function(page) {
    console.log('открыта list');
});
// 3. «moviePage» страница с «контентом» на которую мы попадаем с листинга
new page.Route(PREFIX + ':moviaPage', function(page) {
    console.log('открыта moviaPage');

});
// 4. play страница которая «воспроизводит» файл
new page.Route(PREFIX + ':play', function(page) {
    console.log('открыта play');
    //https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/page.js#L341
    page.redirect('https://dlcache4.vibio.tv/56a0ad0e80ce5465a6651628108806bd/2847/2847696/output.lq.mp4')
});