const menuLinks = document.querySelectorAll('.menu-list a');
const sections = document.querySelectorAll('div[id]'); // 获取所有有 ID 的 div
let isClick = false;
const offset = 100; // 设置偏移值（例如：100px）

// 创建 Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.menu-list a[href="#${id}"]`);
        if (entry.isIntersecting) {
            // 当前元素在视口中
            if (link && !isClick) {
                menuLinks.forEach(item => item.classList.remove('active')); // 移除所有 active 类
                link.classList.add('active'); // 为当前链接添加 active 类
            }
        }
    });
}, {
    threshold: 0.9 // 视口中至少 50% 的元素可见时触发
});

// 观察每个锚点元素
sections.forEach(section => {
    observer.observe(section);
});

// 点击导航链接时滚动到对应锚点
menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认锚点跳转

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) {
            // 获取 data-href 属性的值
            const dataHref = this.getAttribute('data-href');
            // 跳转到 data-href 属性的值
            location.href = dataHref;
            return;
        }
        if (!isClick) {
            isClick = true;
            menuLinks.forEach(item => item.classList.remove('active')); // 移除所有 active 类
            this.classList.add('active'); // 为当前点击的链接添加 active 类
        }

        if (targetElement) {
            // 获取目标元素的位置
            const rect = targetElement.getBoundingClientRect();
            // 计算需要滚动到的位置
            const scrollToPosition = rect.top + window.scrollY - offset;

            // 使用 window.scrollTo 执行平滑滚动
            window.scrollTo({
                top: scrollToPosition,
                behavior: "smooth" // 平滑滚动
            });

            setTimeout(() => {
                isClick = false;
            }, 1000);
        }
    });
});


const tagsRow = document.querySelectorAll('.tags-row');
tagsRow && tagsRow.forEach((row) => {
    const tabs = row.querySelectorAll('.tab-link');
    const tabItems = row.querySelectorAll('.tab-item');
    tabs && tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('is-link'));
            tab.classList.add('is-link');
            tabItems.forEach((item) => item.classList.remove('active'));
            tabItems[index].classList.add('active');
        });
    });
});