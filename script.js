document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let diffX = 0, diffY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move the small dot
            if(cursor) {
                cursor.style.left = `${mouseX}px`;
                cursor.style.top = `${mouseY}px`;
            }
        });

        // Smooth follow for the larger circle
        function animateFollower() {
            if(cursorFollower) {
                diffX = mouseX - followerX;
                diffY = mouseY - followerY;
                
                followerX += diffX * 0.1;
                followerY += diffY * 0.1;
                
                cursorFollower.style.left = `${followerX}px`;
                cursorFollower.style.top = `${followerY}px`;
            }
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .project-card, .timeline-content, .skill-tags span');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        // 3D Tilt and Spotlight effect for Project Cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Spotlight glow placement
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                // 3D Tilt math
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // --- Initial Load Animations ---
    const nav = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-content');
    
    setTimeout(() => {
        if(nav) nav.style.opacity = '1';
        if(heroContent) {
            heroContent.style.opacity = '1';
            // Simple slide up
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
        }
    }, 100);

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Navbar Blur & Scroll Progress ---
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.85)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.5)';
            navbar.style.boxShadow = 'none';
        }
        
        // Scroll Progress Bar
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${(totalScroll / windowHeight) * 100}%`;
        if (scrollProgress) {
            scrollProgress.style.width = scroll;
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5,5,5,0.95)';
                navLinks.style.padding = '1rem 2rem';
                navLinks.style.borderBottom = '1px solid #222';
            }
        });
    }

    // --- Typewriter Animation ---
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const roles = ["Software Engineer.", "AI Engineer.", "Dreamer.", "Enthusiast."];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let erasingDelay = 50;
        let newTextDelay = 2000;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? erasingDelay : typingDelay;

            if (!isDeleting && charIndex === currentRole.length) {
                // finished typing
                typeSpeed = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // start new word
                isDeleting = false;
                roleIndex++;
                if (roleIndex >= roles.length) roleIndex = 0;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // --- Space Background Canvas Animation ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resize);
        resize();

        let canvasMouseX = width / 2;
        let canvasMouseY = height / 2;
        window.addEventListener('mousemove', (e) => {
            canvasMouseX = e.clientX;
            canvasMouseY = e.clientY;
        });

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speed = this.size * 0.2; // faster stars are bigger
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.y += this.speed;
                if (this.y > height) {
                    this.y = 0;
                    this.x = Math.random() * width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Asteroid {
            constructor() {
                this.reset();
                this.y = Math.random() * height; // initial random y
                this.x = Math.random() * width;
            }

            reset() {
                if (Math.random() > 0.5) {
                    this.x = Math.random() * width;
                    this.y = -50;
                } else {
                    this.x = Math.random() > 0.5 ? -50 : width + 50;
                    this.y = Math.random() * height;
                }
                this.size = Math.random() * 3 + 1.5; 
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
                
                // pre-calculate shape
                this.vertices = Math.floor(Math.random() * 4) + 5;
                this.radii = [];
                for (let i = 0; i < this.vertices; i++) {
                    this.radii.push(this.size * (0.6 + Math.random() * 0.8));
                }
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;
                
                if (this.y > height + 50 || this.x < -50 || this.x > width + 50) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                // slightly blueish/greyish rocks
                ctx.fillStyle = `rgba(180, 190, 255, ${this.opacity})`;
                ctx.beginPath();
                for (let i = 0; i < this.vertices; i++) {
                    const angle = (i / this.vertices) * Math.PI * 2;
                    const radius = this.radii[i];
                    const px = Math.cos(angle) * radius;
                    const py = Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }

        class FollowerAsteroid {
            constructor() {
                this.x = width / 2;
                this.y = height / 2;
                this.size = Math.random() * 2 + 1; // small
                this.opacity = Math.random() * 0.6 + 0.4;
                this.vertices = Math.floor(Math.random() * 4) + 4;
                this.radii = [];
                for (let i = 0; i < this.vertices; i++) {
                    this.radii.push(this.size * (0.6 + Math.random() * 0.8));
                }
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;
                // keep them orbiting around cursor
                this.offsetX = (Math.random() - 0.5) * 60;
                this.offsetY = (Math.random() - 0.5) * 60;
                this.easing = 0.05 + Math.random() * 0.05;
            }

            update() {
                const targetX = canvasMouseX + this.offsetX;
                const targetY = canvasMouseY + this.offsetY;
                this.x += (targetX - this.x) * this.easing;
                this.y += (targetY - this.y) * this.easing;
                this.rotation += this.rotationSpeed;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = `rgba(180, 190, 255, ${this.opacity})`;
                ctx.beginPath();
                for (let i = 0; i < this.vertices; i++) {
                    const angle = (i / this.vertices) * Math.PI * 2;
                    const radius = this.radii[i];
                    const px = Math.cos(angle) * radius;
                    const py = Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }

        const stars = Array.from({length: 150}, () => new Star());
        const asteroids = Array.from({length: 30}, () => new Asteroid());
        const followerAsteroids = Array.from({length: 3}, () => new FollowerAsteroid()); // 3 small following asteroids

        function animate() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(s => { s.update(); s.draw(); });
            asteroids.forEach(a => { a.update(); a.draw(); });
            followerAsteroids.forEach(fa => { fa.update(); fa.draw(); });
            requestAnimationFrame(animate);
        }
        
        animate();
    }
});
