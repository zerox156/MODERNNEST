// Adsterra Direct Link (ඔයා එවපු විදිහටම)
const ADSTERRA_DIRECT_LINK = "https://your-adsterra-link.com";

const postData = [
    { title: "The Art of Japanese Minimalism", category: "INTERIOR", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800", desc: "Discover how Eastern aesthetics are redefining modern homes with simple lines and serene spaces.", affiliateLink: "https://amazon.com/item1" },
    { title: "Industrial Kitchen Masterpiece", category: "KITCHEN", image: "https://images.unsplash.com/photo-1556911220-e15224bbafb0?w=800", desc: "Raw materials meets high-end functionality in this urban design concept for modern homes.", affiliateLink: "https://amazon.com/item2" },
    { title: "Scandinavian Living Comfort", category: "LIVING", image: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=800", desc: "Cozy textures and light woods define this classic Northern style of living.", affiliateLink: "https://amazon.com/item3" },
    { title: "Earth Tones in Bedroom Decor", category: "BEDROOM", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800", desc: "Bringing nature indoors for a more restful and grounded sleep experience.", affiliateLink: "https://amazon.com/item4" }
];

function handleDirectClick(event, originalLink) {
    event.preventDefault();
    window.open(originalLink, '_blank');
    window.location.href = ADSTERRA_DIRECT_LINK;
}

// Hero Slider (ඔයා එවපු විදිහටම)
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function initSlider() {
    const dotsContainer = document.querySelector('.slider-dots');
    if(!dotsContainer) return;
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(i === 0) dot.classList.add('active');
        dot.onclick = () => { slideIndex = i; updateSlider(); };
        dotsContainer.appendChild(dot);
    });
    setInterval(() => { slideIndex = (slideIndex + 1) % slides.length; updateSlider(); }, 5000);
}

function updateSlider() {
    slides.forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    if(slides[slideIndex]) slides[slideIndex].classList.add('active');
    if(document.querySelectorAll('.dot')[slideIndex]) document.querySelectorAll('.dot')[slideIndex].classList.add('active');
}

// Render Posts (ඔයා එවපු විදිහටම)
function renderPosts(filter = "ALL") {
    const container = document.getElementById('blog-wrapper');
    if(!container) return;
    
    const filteredData = filter === "ALL" ? postData : postData.filter(p => p.category === filter);
    
    container.innerHTML = filteredData.map(post => `
        <article class="grid-item">
            <div class="img-holder">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="item-info">
                <span class="cat-label">${post.category}</span>
                <h2>${post.title}</h2>
                <p>${post.desc}</p>
                <div class="action-links">
                    <a class="read-story" href="post.html">READ STORY</a>
                    <a class="read-story" style="color: var(--accent-color);" onclick="handleDirectClick(event, '${post.affiliateLink}')">GET THE LOOK —</a>
                </div>
            </div>
        </article>
    `).join('');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
    }, { threshold: 0.1 });

    document.querySelectorAll('.grid-item').forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    initSlider();

    // Category Filter (ඔයා එවපු විදිහටම)
    document.querySelectorAll('.cat-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            renderPosts(this.getAttribute('data-filter'));
        });
    });

    // Theme Toggle (ඔයා එවපු විදිහටම)
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
        themeToggle.onchange = (e) => {
            const isDark = e.target.checked;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };
    }

    // Search Logic (ඔයා එවපු විදිහටම)
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.grid-item').forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(term) ? "flex" : "none";
            });
        });
    }

    // Sticky Header Logic (ඔයා එවපු විදිහටම)
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if(header) {
            if (window.scrollY > 80) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });

    // Preloader (ඔයා එවපු විදිහටම)
    window.onload = () => {
        const preloader = document.getElementById('preloader');
        if(preloader) preloader.classList.add('fade-out');
    };

    // -------------------------------------------------------------------
    // [ADDED] NEW SIDEBAR LOGIC (කිසිවක් ඉවත් කර නැත)
    // -------------------------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    if(menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if(closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
    if(overlay) overlay.addEventListener('click', toggleSidebar);

    // Sidebar එකේ තියෙන category එකක් click කළාම Sidebar එක වැසීමට
    document.querySelectorAll('.sidebar .cat-item').forEach(item => {
        item.addEventListener('click', () => {
            toggleSidebar();
        });
    });
});
