// TUN.UZ Main JavaScript

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    alert('Qidiruv: ' + query);
                }
            }
        });
    }

    // Language button
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            alert('Til tanlash: UZ / RU / EN');
        });
    }
});
