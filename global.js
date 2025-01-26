console.log("IT’S ALIVE!");

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

const navLinks = $$("nav a");

const currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
);

currentLink?.classList.add("current");

/* Nav Bar*/
const pages = [
    { url: "index.html", title: "Home" },
    { url: "projects/index.html", title: "Projects" },
    { url: "cv/index.html", title: "CV" },
    { url: "contact/index.html", title: "Contact" },
    { url: "https://github.com/jiy016", title: "GitHub" },
];


let nav = document.createElement('nav');
const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
    let url = p.url;
    if (!ARE_WE_HOME && !url.startsWith('http')) {
        url = '../' + url;
    }
    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${p.title}</a>`);
}

document.body.prepend(nav);

/*Dark Mode*/
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
    `
);

const select = document.querySelector('select');
select.addEventListener('input', (event) => {
    document.documentElement.style.setProperty('color-scheme', event.target.value);
});

/*Keep Dark Mode*/
// 定义设置颜色模式的函数
function setColorScheme(colorScheme) {
    document.documentElement.style.setProperty('color-scheme', colorScheme);
    localStorage.setItem('colorScheme', colorScheme); // 保存到 localStorage
}

// 页面加载时应用保存的颜色模式
document.addEventListener('DOMContentLoaded', () => {
    const savedColorScheme = localStorage.getItem('colorScheme') || 'light dark'; // 默认值为自动模式
    setColorScheme(savedColorScheme);
    const select = document.querySelector('select');
    select.value = savedColorScheme; // 同步下拉菜单的选中项

    // 添加下拉菜单的事件监听器
    select.addEventListener('input', (event) => {
        const colorScheme = event.target.value;
        setColorScheme(colorScheme);
    });
});

