// Movie Data
const movies = [
    {
        title: "The Midnight Reel (1978)",
        description: "A horror film that allegedly drove its crew insane. Only one copy exists.",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        year: 1978,
        genre: "horror",
        status: "cursed",
        director: "Unknown",
        runtime: "92 min"
    },
    {
        title: "Kodak Ghost (1992)",
        description: "A movie that disappears from its own film reels when played.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        year: 1992,
        genre: "mystery",
        status: "lost",
        director: "Elias Vinter",
        runtime: "88 min"
    },
    {
        title: "The Final Cut (Unfinished)",
        description: "A director's last project that seems to edit reality itself.",
        image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        year: 1987,
        genre: "experimental",
        status: "unfinished",
        director: "Alden Voss",
        runtime: "N/A"
    },
    {
        title: "London After Midnight (1927)",
        description: "Lost Lon Chaney film. Only still photographs survive.",
        image: "https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1038&q=80",
        year: 1927,
        genre: "horror",
        status: "lost",
        director: "Tod Browning",
        runtime: "65 min"
    },
    {
        title: "The Day the Clown Cried (1972)",
        description: "Jerry Lewis's unreleased Holocaust drama.",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        year: 1972,
        genre: "drama",
        status: "suppressed",
        director: "Jerry Lewis",
        runtime: "90 min"
    },
    {
        title: "Song of the South (1946)",
        description: "Disney's controversial film withheld from official release.",
        image: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        year: 1946,
        genre: "musical",
        status: "suppressed",
        director: "Harve Foster",
        runtime: "94 min"
    }
];

// DOM Elements
const movieContainer = document.getElementById('movie-container');
const carousel = document.getElementById('movie-carousel');
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const yearFilter = document.getElementById('year-filter');
const genreFilter = document.getElementById('genre-filter');
const loadMoreBtn = document.getElementById('load-more');
const newsletterForm = document.getElementById('newsletter-form');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// State Variables
let displayedMovies = 6;
let isDark = false;

// Initialize the App
function init() {
    loadMovies(movies.slice(0, displayedMovies));
    setupCarousel();
    setupEventListeners();
    setupScrollAnimations();
}

// Load Movies into Grid
function loadMovies(moviesToLoad) {
    movieContainer.innerHTML = '';
    moviesToLoad.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.style.animationDelay = `${index * 0.1}s`;
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" loading="lazy">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span>${movie.runtime}</span>
                </div>
            </div>
            <div class="card-buttons">
                <button><i class="fas fa-info-circle"></i> Details</button>
                <button><i class="fas fa-bookmark"></i> Save</button>
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}

// Setup Featured Carousel
function setupCarousel() {
    const featuredMovies = movies.slice(0, 4);
    carousel.innerHTML = '';
    
    featuredMovies.forEach(movie => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <button>View Details</button>
                </div>
            </div>
        `;
        carousel.appendChild(item);
    });
}

// Filter Movies
function filterMovies() {
    const yearValue = yearFilter.value;
    const genreValue = genreFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    const filtered = movies.filter(movie => {
        const yearMatch = yearValue === 'all' || 
            (movie.year >= parseInt(yearValue) && movie.year < parseInt(yearValue) + 10);
        const genreMatch = genreValue === 'all' || movie.genre === genreValue;
        const searchMatch = movie.title.toLowerCase().includes(searchValue) || 
            movie.description.toLowerCase().includes(searchValue);
        
        return yearMatch && genreMatch && searchMatch;
    });
    
    loadMovies(filtered.slice(0, displayedMovies));
    loadMoreBtn.style.display = filtered.length > displayedMovies ? 'block' : 'none';
}

// Setup Scroll Animations
function setupScrollAnimations() {
    const animateOnScroll = () => {
        document.querySelectorAll('.movie-card, .feature').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('dark-mode', isDark);
        themeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i> Light Mode' : 
            '<i class="fas fa-moon"></i> Dark Mode';
    });
    
    // Search and Filters
    searchBtn.addEventListener('click', filterMovies);
    searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && filterMovies());
    yearFilter.addEventListener('change', filterMovies);
    genreFilter.addEventListener('change', filterMovies);
    
    // Load More
    loadMoreBtn.addEventListener('click', () => {
        displayedMovies += 6;
        filterMovies();
    });
    
    // Mobile Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Newsletter Form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        alert(`Thanks for subscribing with ${email}! We'll keep you updated.`);
        newsletterForm.reset();
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);