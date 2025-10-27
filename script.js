// Menu Mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Carrossel de Livros
class BookCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.dotsContainer = document.getElementById('carousel-dots');
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.totalItems = document.querySelectorAll('.book-card').length;
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        
        this.init();
    }
    
    getItemsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }
    
    init() {
        this.createDots();
        this.updateCarousel();
        this.bindEvents();
        
        // Auto-play
        this.startAutoPlay();
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        const dotsCount = this.maxIndex + 1;
        
        for (let i = 0; i <= this.maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel() {
        const cardWidth = 280 + 32; // largura do card + gap
        const translateX = -this.currentIndex * cardWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Atualizar botões
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex === this.maxIndex ? '0.5' : '1';
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        this.updateCarousel();
    }
    
    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop para o início
        }
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.maxIndex; // Loop para o final
        }
        this.updateCarousel();
    }
    
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Touch/Swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            const newItemsPerView = this.getItemsPerView();
            if (newItemsPerView !== this.itemsPerView) {
                this.itemsPerView = newItemsPerView;
                this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
                this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                this.createDots();
                this.updateCarousel();
            }
        });
    }
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Muda a cada 5 segundos
    }
}

// Inicializar carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new BookCarousel();
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .book-card, .testimonial-card, .blog-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header background ao scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Formulário de contato
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio do formulário
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Typeform Logic
class TypeformHandler {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 5;
        this.answers = {};
        
        this.form = document.getElementById('typeform');
        this.progressBar = document.getElementById('progress-bar');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        
        this.init();
    }
    
    init() {
        this.updateProgress();
        this.bindEvents();
        this.focusCurrentInput();
    }
    
    bindEvents() {
        // Navegação com botões
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.prevBtn.addEventListener('click', () => this.prevQuestion());
        
        // Navegação com Enter
        this.form.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.nextQuestion();
            }
        });
        
        // Navegação com setas
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextQuestion();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevQuestion();
            }
        });
        
        // Opções da pergunta 4
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove seleção anterior
                document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                // Adiciona seleção atual
                btn.classList.add('selected');
                // Define valor no input hidden
                document.querySelector('input[name="assunto"]').value = btn.dataset.value;
                // Avança automaticamente após 1 segundo
                setTimeout(() => this.nextQuestion(), 1000);
            });
        });
        
        // Auto-focus nos inputs
        this.form.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.answers[e.target.name] = e.target.value;
            }
        });
    }
    
    nextQuestion() {
        if (!this.validateCurrentQuestion()) return;
        
        if (this.currentQuestion < this.totalQuestions) {
            this.hideQuestion(this.currentQuestion);
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
        } else if (this.currentQuestion === this.totalQuestions) {
            this.submitForm();
        }
        
        this.updateProgress();
        this.updateNavigation();
        this.focusCurrentInput();
    }
    
    prevQuestion() {
        if (this.currentQuestion > 1) {
            this.hideQuestion(this.currentQuestion);
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
            
            this.updateProgress();
            this.updateNavigation();
            this.focusCurrentInput();
        }
    }
    
    showQuestion(questionNumber) {
        const question = document.querySelector(`[data-question="${questionNumber}"]`);
        if (question) {
            setTimeout(() => {
                question.classList.add('active');
            }, 100);
        }
    }
    
    hideQuestion(questionNumber) {
        const question = document.querySelector(`[data-question="${questionNumber}"]`);
        if (question) {
            question.classList.remove('active');
        }
    }
    
    validateCurrentQuestion() {
        const currentQuestionEl = document.querySelector(`[data-question="${this.currentQuestion}"]`);
        const requiredInputs = currentQuestionEl.querySelectorAll('input[required], textarea[required]');
        
        for (let input of requiredInputs) {
            if (!input.value.trim()) {
                input.focus();
                input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.3)';
                setTimeout(() => {
                    input.style.boxShadow = '';
                }, 2000);
                return false;
            }
        }
        
        // Validação especial para email
        const emailInput = currentQuestionEl.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.focus();
                emailInput.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.3)';
                setTimeout(() => {
                    emailInput.style.boxShadow = '';
                }, 2000);
                return false;
            }
        }
        
        return true;
    }
    
    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    updateNavigation() {
        this.prevBtn.disabled = this.currentQuestion === 1;
        
        if (this.currentQuestion === this.totalQuestions) {
            this.nextBtn.innerHTML = '<i class="fas fa-check"></i>';
            this.nextBtn.classList.add('active');
        } else {
            this.nextBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
            this.nextBtn.classList.remove('active');
        }
    }
    
    focusCurrentInput() {
        setTimeout(() => {
            const currentQuestionEl = document.querySelector(`[data-question="${this.currentQuestion}"]`);
            const input = currentQuestionEl.querySelector('input, textarea');
            if (input && input.type !== 'hidden') {
                input.focus();
            }
        }, 600);
    }
    
    submitForm() {
        // Simular envio
        this.hideQuestion(this.currentQuestion);
        this.showQuestion('success');
        this.progressBar.style.width = '100%';
        
        // Aqui você pode adicionar a lógica real de envio
        console.log('Dados do formulário:', this.answers);
    }
}

// Função para resetar o formulário
function resetForm() {
    const typeform = new TypeformHandler();
    
    // Reset visual
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.querySelector('[data-question="1"]').classList.add('active');
    
    // Reset form
    document.getElementById('typeform').reset();
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
}

// Inicializar Typeform quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new TypeformHandler();
});

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        const suffix = target.replace(/[\d.]/g, '');
        
        let current = 0;
        const increment = numericValue / 50;
        
        const updateCounter = () => {
            if (current < numericValue) {
                current += increment;
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Iniciar contador quando a seção de estatísticas for visível
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efeito parallax sutil no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Lazy loading para imagens
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

