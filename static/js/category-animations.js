/**
 * Visual Category Theory - GSAP Animations and SVG Utilities
 *
 * This module provides interactive animations for category theory diagrams
 * using GSAP (GreenSock Animation Platform) and custom SVG manipulation.
 *
 * @author Serge Youmbi
 * @licence MIT
 *
 * References:
 * - GSAP Documentation: https://greensock.com/docs/
 * - SVG Specification: https://www.w3.org/TR/SVG2/
 */

// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Animations will be disabled.');
        return;
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

    // ============================================================
    // CATEGORY DIAGRAM ANIMATIONS
    // ============================================================

    /**
     * Animate morphism arrows with smooth drawing effect
     */
    function animateMorphismArrows() {
        const arrows = document.querySelectorAll('.morphism-arrow');

        arrows.forEach((arrow, index) => {
            gsap.fromTo(arrow,
                {
                    strokeDasharray: arrow.getTotalLength(),
                    strokeDashoffset: arrow.getTotalLength()
                },
                {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: "power2.inOut",
                    delay: index * 0.3,
                    scrollTrigger: {
                        trigger: arrow,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    /**
     * Animate object nodes with pulsing glow effect
     */
    function animateObjectNodes() {
        const objects = document.querySelectorAll('.category-object');

        objects.forEach((obj) => {
            // Initial fade in
            gsap.from(obj, {
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: obj,
                    start: "top 85%"
                }
            });

            // Continuous subtle pulse
            gsap.to(obj, {
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)",
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }

    /**
     * Animate commutative diagram squares
     */
    function animateCommutativeDiagrams() {
        const diagrams = document.querySelectorAll('.commutative-diagram');

        diagrams.forEach((diagram) => {
            const paths = diagram.querySelectorAll('path, line');
            const labels = diagram.querySelectorAll('text, .diagram-label');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: diagram,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate paths sequentially
            paths.forEach((path, i) => {
                tl.fromTo(path,
                    {
                        strokeDasharray: path.getTotalLength ? path.getTotalLength() : 100,
                        strokeDashoffset: path.getTotalLength ? path.getTotalLength() : 100
                    },
                    {
                        strokeDashoffset: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    },
                    i * 0.2
                );
            });

            // Fade in labels
            tl.from(labels, {
                opacity: 0,
                y: 10,
                duration: 0.4,
                stagger: 0.1
            }, "-=0.3");
        });
    }

    /**
     * Animate functor mappings between categories
     */
    function animateFunctorMappings() {
        const functorDiagrams = document.querySelectorAll('.functor-diagram');

        functorDiagrams.forEach((diagram) => {
            const sourceCategory = diagram.querySelector('.source-category');
            const targetCategory = diagram.querySelector('.target-category');
            const functorArrow = diagram.querySelector('.functor-arrow');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: diagram,
                    start: "top 70%"
                }
            });

            if (sourceCategory) {
                tl.from(sourceCategory, {
                    opacity: 0,
                    x: -50,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }

            if (functorArrow) {
                tl.fromTo(functorArrow,
                    { scaleX: 0, transformOrigin: "left center" },
                    { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
                    "-=0.3"
                );
            }

            if (targetCategory) {
                tl.from(targetCategory, {
                    opacity: 0,
                    x: 50,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4");
            }
        });
    }

    /**
     * Natural transformation animation - morphing between functors
     */
    function animateNaturalTransformations() {
        const ntDiagrams = document.querySelectorAll('.natural-transformation');

        ntDiagrams.forEach((diagram) => {
            const components = diagram.querySelectorAll('.nt-component');
            const naturality = diagram.querySelector('.naturality-square');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: diagram,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate components appearing
            tl.from(components, {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                stagger: 0.15,
                ease: "back.out(1.5)"
            });

            // Highlight the naturality square
            if (naturality) {
                tl.to(naturality, {
                    fill: "rgba(99, 102, 241, 0.1)",
                    stroke: "#6366f1",
                    strokeWidth: 2,
                    duration: 0.8,
                    ease: "power2.inOut"
                }, "-=0.2");
            }
        });
    }

    /**
     * Interactive hover effects for diagram elements
     */
    function setupInteractiveHovers() {
        // Object hover
        document.querySelectorAll('.category-object, .diagram-node').forEach((node) => {
            node.addEventListener('mouseenter', () => {
                gsap.to(node, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            node.addEventListener('mouseleave', () => {
                gsap.to(node, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Arrow hover - highlight path
        document.querySelectorAll('.morphism-arrow, .diagram-arrow').forEach((arrow) => {
            arrow.addEventListener('mouseenter', () => {
                gsap.to(arrow, {
                    strokeWidth: "+=1",
                    stroke: "#6366f1",
                    duration: 0.2
                });
            });

            arrow.addEventListener('mouseleave', () => {
                gsap.to(arrow, {
                    strokeWidth: "-=1",
                    stroke: arrow.dataset.originalColor || "#333",
                    duration: 0.2
                });
            });
        });
    }

    /**
     * Composition animation - showing f ∘ g
     */
    function animateComposition() {
        const compositionDiagrams = document.querySelectorAll('.composition-diagram');

        compositionDiagrams.forEach((diagram) => {
            const arrow1 = diagram.querySelector('.arrow-f');
            const arrow2 = diagram.querySelector('.arrow-g');
            const composedArrow = diagram.querySelector('.arrow-composed');
            const playBtn = diagram.querySelector('.play-composition');

            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    const tl = gsap.timeline();

                    // First, highlight g
                    if (arrow2) {
                        tl.to(arrow2, {
                            stroke: "#10b981",
                            strokeWidth: 3,
                            duration: 0.5
                        });
                    }

                    // Then highlight f
                    if (arrow1) {
                        tl.to(arrow1, {
                            stroke: "#f59e0b",
                            strokeWidth: 3,
                            duration: 0.5
                        });
                    }

                    // Show the composed arrow
                    if (composedArrow) {
                        tl.fromTo(composedArrow,
                            { opacity: 0, strokeDashoffset: 100 },
                            {
                                opacity: 1,
                                strokeDashoffset: 0,
                                stroke: "#6366f1",
                                strokeWidth: 3,
                                duration: 0.8,
                                ease: "power2.inOut"
                            }
                        );
                    }

                    // Reset after a delay
                    tl.to([arrow1, arrow2], {
                        stroke: "#333",
                        strokeWidth: 2,
                        duration: 0.3
                    }, "+=1");
                });
            }
        });
    }

    /**
     * Monad unit and multiplication animation
     */
    function animateMonadOperations() {
        const monadDiagrams = document.querySelectorAll('.monad-diagram');

        monadDiagrams.forEach((diagram) => {
            const unitArrow = diagram.querySelector('.monad-unit');
            const multArrow = diagram.querySelector('.monad-mult');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: diagram,
                    start: "top 70%"
                },
                repeat: -1,
                repeatDelay: 2
            });

            // Animate unit: η
            if (unitArrow) {
                tl.fromTo(unitArrow,
                    { opacity: 0.3 },
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.inOut"
                    }
                );
            }

            // Animate multiplication: μ
            if (multArrow) {
                tl.fromTo(multArrow,
                    { opacity: 0.3 },
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.inOut"
                    },
                    "-=0.3"
                );
            }
        });
    }

    /**
     * Adjunction animation - showing the bijection
     */
    function animateAdjunctions() {
        const adjDiagrams = document.querySelectorAll('.adjunction-diagram');

        adjDiagrams.forEach((diagram) => {
            const leftAdj = diagram.querySelector('.left-adjoint');
            const rightAdj = diagram.querySelector('.right-adjoint');
            const bijection = diagram.querySelector('.adjunction-bijection');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: diagram,
                    start: "top 70%"
                }
            });

            // Animate the L ⊣ R relationship
            if (leftAdj && rightAdj) {
                tl.from([leftAdj, rightAdj], {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.2
                });
            }

            // Show the bijection symbol
            if (bijection) {
                tl.from(bijection, {
                    scale: 0,
                    rotation: 180,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.2");
            }
        });
    }

    // ============================================================
    // SVG DIAGRAM UTILITIES
    // ============================================================

    /**
     * Create an animated arrow SVG element
     * @param {number} x1 - Start x coordinate
     * @param {number} y1 - Start y coordinate
     * @param {number} x2 - End x coordinate
     * @param {number} y2 - End y coordinate
     * @param {string} label - Arrow label (optional)
     * @param {Object} options - Styling options
     * @returns {SVGElement} The arrow group element
     */
    window.createAnimatedArrow = function(x1, y1, x2, y2, label = '', options = {}) {
        const defaults = {
            strokeColor: '#333',
            strokeWidth: 2,
            arrowHeadSize: 8,
            labelOffset: 10,
            curved: false,
            curvature: 0.2
        };

        const opts = { ...defaults, ...options };

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        svg.classList.add('diagram-arrow', 'morphism-arrow');

        let pathD;
        if (opts.curved) {
            // Create a curved path using quadratic Bézier
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const perpX = -(y2 - y1) * opts.curvature;
            const perpY = (x2 - x1) * opts.curvature;
            const ctrlX = midX + perpX;
            const ctrlY = midY + perpY;
            pathD = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;
        } else {
            pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathD);
        path.setAttribute('stroke', opts.strokeColor);
        path.setAttribute('stroke-width', opts.strokeWidth);
        path.setAttribute('fill', 'none');
        path.setAttribute('marker-end', 'url(#arrowhead)');
        path.dataset.originalColor = opts.strokeColor;

        svg.appendChild(path);

        // Add label if provided
        if (label) {
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const labelX = (x1 + x2) / 2 + Math.sin(angle) * opts.labelOffset;
            const labelY = (y1 + y2) / 2 - Math.cos(angle) * opts.labelOffset;

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelX);
            text.setAttribute('y', labelY);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('class', 'diagram-label');
            text.textContent = label;

            svg.appendChild(text);
        }

        return svg;
    };

    /**
     * Create a category object node
     * @param {number} x - Center x coordinate
     * @param {number} y - Center y coordinate
     * @param {string} label - Object label
     * @param {Object} options - Styling options
     * @returns {SVGElement} The object node element
     */
    window.createObjectNode = function(x, y, label, options = {}) {
        const defaults = {
            radius: 25,
            fillColor: '#fff',
            strokeColor: '#6366f1',
            strokeWidth: 2,
            fontSize: 16
        };

        const opts = { ...defaults, ...options };

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('category-object', 'diagram-node');
        g.setAttribute('transform', `translate(${x}, ${y})`);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', opts.radius);
        circle.setAttribute('fill', opts.fillColor);
        circle.setAttribute('stroke', opts.strokeColor);
        circle.setAttribute('stroke-width', opts.strokeWidth);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('font-size', opts.fontSize);
        text.setAttribute('font-family', 'KaTeX_Math, Times New Roman, serif');
        text.setAttribute('font-style', 'italic');
        text.textContent = label;

        g.appendChild(circle);
        g.appendChild(text);

        return g;
    };

    /**
     * Create SVG arrowhead marker definition
     * @returns {SVGElement} The defs element containing arrowhead marker
     */
    window.createArrowheadDef = function() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', '#333');

        marker.appendChild(polygon);
        defs.appendChild(marker);

        return defs;
    };

    // ============================================================
    // PAGE LOAD ANIMATIONS
    // ============================================================

    /**
     * Animate page elements on load
     */
    function animatePageLoad() {
        // Hero section animation
        const hero = document.querySelector('.hero, .page-header');
        if (hero) {
            gsap.from(hero.children, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }

        // Feature cards stagger animation
        const cards = document.querySelectorAll('.feature-card, .list-item, .card');
        if (cards.length > 0) {
            gsap.from(cards, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cards[0].parentElement,
                    start: "top 80%"
                }
            });
        }

        // Section headers
        document.querySelectorAll('h2, h3').forEach((heading) => {
            gsap.from(heading, {
                opacity: 0,
                x: -20,
                duration: 0.5,
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%"
                }
            });
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        gsap.to(window, {
                            duration: 0.8,
                            scrollTo: { y: target, offsetY: 80 },
                            ease: "power2.inOut"
                        });
                    }
                }
            });
        });
    }

    // ============================================================
    // INITIALISATION
    // ============================================================

    // Run all animation setups
    animateMorphismArrows();
    animateObjectNodes();
    animateCommutativeDiagrams();
    animateFunctorMappings();
    animateNaturalTransformations();
    setupInteractiveHovers();
    animateComposition();
    animateMonadOperations();
    animateAdjunctions();
    animatePageLoad();
    setupSmoothScroll();

    console.log('Visual Category Theory animations initialised');
});
