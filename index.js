//загружаем module page https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/page.js
var page = require('movian/page');
//каждый плагин должен быть с уникальным id который мы указываем в URI
var PREFIX = 'zona.plus';

// api 1 https://movian.tv/projects/movian/wiki/JSAPI_plugin#createServiceString-Title-String-URL-String-Type-Boolean-Enabled-String-Icon
// api 2 https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/service.js#L27
// создаем сервис (title, url, type, enabled, icon)
// title = 'название плагина на заглавной'
// url = у нас URI PREFIX + ':start' после выбора плагина на заглавной будет вызов URI PREFIX + ':start' строка 24
// type = video
// enable = true
// icon = Plugin.path + 'logo.svg' путь к файлу картинки
require('movian/service').create('zona.plus', PREFIX + ':start', 'video', true, Plugin.path + 'logo.svg');

//создаем URI PREFIX + ':start'
//1. стартовая страница которая будет открывается после выбора плагина с главной страницы Movian.
//api 1 https://movian.tv/projects/movian/wiki/JSAPI_plugin#addURIString-Regexp-Function-Handler
//api 2 https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/page.js#L384
//Route(String Regexp, Function Handler)
//Regexp - регулярка для URI
//Handler - функция которая будет выполнена при открытии URI
//Handler с одним или более аргументами первым всегда идет object page второй и далее string отвечающий регулярке
new page.Route(PREFIX + ':start', function(page) {
    //https://movian.tv/projects/movian/wiki/JSAPI_page#The-page-object
    //первая страница плагина у нас тут список "папок" значит тип страницы будет directory
    page.type = 'directory';
    //https://movian.tv/projects/movian/wiki/JSAPI_page#metadata
    //title: название страницы у нас используется переменая PREFIX
    page.metadata.title = PREFIX;
    //icon: картинка будет на верху страницы рядом с названием страницы
    page.metadata.icon = Plugin.path + 'logo.svg';
    //logo: картинка будет использована в закладке
    page.metadata.logo = Plugin.path + 'logo.svg';
    // api 1 https://movian.tv/projects/movian/wiki/JSAPI_page#appendItemString-URI-String-type-Object-metadata
    // api 2 https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/page.js#L299
    //appendItem(String URI, [String type], [Object metadata])
    //добовляем первый итем на страницу c типом search и URI PREFIX + ':search:'
    page.appendItem(PREFIX + ':search:', 'search', {
        title: 'Search ' + PREFIX,
    });

    // [...document.getElementsByClassName('l-wrap')[1].children].forEach(function(i) {
    //         console.log("page.appendItem(PREFIX + ':list:" + i.getElementsByTagName('a')[0].attributes[1].value +
    //             ":" + i.getElementsByTagName('a')[0].attributes[2].value + "','directory', {title:'" +
    //             i.getElementsByTagName('a')[0].attributes[2].value + "',});")
    //     })
    //добовляем еще итем на страницу c типом directory и URI PREFIX + ':list:(.*):(.*)' 
    //тут у нас в URI передоются доп аргументы href и title 
    page.appendItem(PREFIX + ':list:/collections/new-year:Новогодняя подборка', 'directory', {
        title: 'Новогодняя подборка',
    });
    page.appendItem(PREFIX + ':list:/movies/filter/year-2022:Популярные новинки фильмов', 'directory', {
        title: 'Популярные новинки фильмов',
    });
    page.appendItem(PREFIX + ':list:/tvseries:Популярные сериалы', 'directory', {
        title: 'Популярные сериалы',
    });
    page.appendItem(PREFIX + ':list:/updates/movies:Добавленные недавно фильмы', 'directory', {
        title: 'Добавленные недавно фильмы',
    });
    page.appendItem(PREFIX + ':list:/updates/tvseries:Новые серии', 'directory', {
        title: 'Новые серии',
    });

    page.loading = false;
});
// 2. листинг страница со списком фильмов/сериалов на которую мы попадаем со стартовой страницы.
new page.Route(PREFIX + ':list:(.*):(.*)', function(page, href, title) {
    console.log('открыта list c:' + href + ' и ' + title);
    page.type = 'directory';
    //title: название страницы у нас используется переменая title
    page.metadata.title = title;
    page.metadata.icon = Plugin.path + 'logo.svg';
    page.metadata.logo = Plugin.path + 'logo.svg';
    console.log('открыта list');
    page.loading = false;
});
// 3. «moviePage» страница с «контентом» на которую мы попадаем с листинга
new page.Route(PREFIX + ':moviaPage', function(page) {
    page.type = 'directory';
    page.metadata.title = PREFIX;
    page.metadata.icon = Plugin.path + 'logo.svg';
    page.metadata.logo = Plugin.path + 'logo.svg';
    console.log('открыта moviaPage');
    page.loading = false;
});
// 4. play страница которая «воспроизводит» файл
new page.Route(PREFIX + ':play', function(page) {
    page.type = 'directory';
    page.metadata.title = PREFIX;
    page.metadata.icon = Plugin.path + 'logo.svg';
    page.metadata.logo = Plugin.path + 'logo.svg';
    //https://github.com/andoma/movian/blob/master/res/ecmascript/modules/movian/page.js#L341
    page.redirect('https://dlcache4.vibio.tv/56a0ad0e80ce5465a6651628108806bd/2847/2847696/output.lq.mp4')
});