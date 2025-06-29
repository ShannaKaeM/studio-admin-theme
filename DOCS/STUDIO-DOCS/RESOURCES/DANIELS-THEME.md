:root {
    /* ===== BASE SEMANTIC VARIABLES ===== */
    
    /* Core Colors */
    --color-core-dark: #000;
    --color-core-light: #fff;
    
    /* Shadow Colors */
    --color-shadow-dark: 220 3% 15%;
    --shadow-strength: 1%;
    
    /* ===== TYPOGRAPHY ===== */
    
    /* Font Families */
    --font-sans: system-ui, sans-serif;
    --font-serif: Charter, Bitstream Charter, Sitka Text, Cambria, serif;
    --font-mono: Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, Cascadia Code, Menlo, Consolas, DejaVu Sans Mono, monospace;
    --font-display: Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif;
    --font-handwriting: Segoe Print, Bradley Hand, Chilanka, TSCu_Comic, casual, cursive;
    
    /* Font Sizes - Semantic Naming */
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-base: 1rem;
    --text-base--line-height: calc(1.5 / 1);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --text-4xl: 2.25rem;
    --text-4xl--line-height: calc(2.5 / 2.25);
    --text-5xl: 3rem;
    --text-5xl--line-height: 1;
    --text-6xl: 3.75rem;
    --text-6xl--line-height: 1;
    --text-7xl: 4.5rem;
    --text-7xl--line-height: 1;
    --text-8xl: 6rem;
    --text-8xl--line-height: 1;
    --text-9xl: 8rem;
    --text-9xl--line-height: 1;
    
    /* Fluid Font Sizes */
    --text-fluid-xs: clamp(0.75rem, 2vw, 1rem);
    --text-fluid-sm: clamp(1rem, 4vw, 1.5rem);
    --text-fluid-md: clamp(1.5rem, 6vw, 2.5rem);
    --text-fluid-lg: clamp(2rem, 9vw, 3.5rem);
    
    /* Font Weights */
    --font-weight-thin: 100;
    --font-weight-extralight: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --font-weight-black: 900;
    
    /* Letter Spacing */
    --tracking-tighter: -0.05em;
    --tracking-tight: -0.025em;
    --tracking-normal: 0em;
    --tracking-wide: 0.025em;
    --tracking-wider: 0.05em;
    --tracking-widest: 0.1em;
    
    /* Line Heights */
    --leading-none: 1;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --leading-loose: 2;
    
    /* ===== SPACING & SIZING ===== */
    
    /* Base Spacing Unit */
    --spacing: 0.25rem;
    
    /* Spacing Scale - Semantic */
    --space-px: 1px;
    --space-0: 0;
    --space-0_5: calc(var(--spacing) * 0.5);
    --space-1: calc(var(--spacing) * 1);
    --space-1_5: calc(var(--spacing) * 1.5);
    --space-2: calc(var(--spacing) * 2);
    --space-2_5: calc(var(--spacing) * 2.5);
    --space-3: calc(var(--spacing) * 3);
    --space-3_5: calc(var(--spacing) * 3.5);
    --space-4: calc(var(--spacing) * 4);
    --space-5: calc(var(--spacing) * 5);
    --space-6: calc(var(--spacing) * 6);
    --space-7: calc(var(--spacing) * 7);
    --space-8: calc(var(--spacing) * 8);
    --space-9: calc(var(--spacing) * 9);
    --space-10: calc(var(--spacing) * 10);
    --space-11: calc(var(--spacing) * 11);
    --space-12: calc(var(--spacing) * 12);
    --space-14: calc(var(--spacing) * 14);
    --space-16: calc(var(--spacing) * 16);
    --space-20: calc(var(--spacing) * 20);
    --space-24: calc(var(--spacing) * 24);
    --space-28: calc(var(--spacing) * 28);
    --space-32: calc(var(--spacing) * 32);
    --space-36: calc(var(--spacing) * 36);
    --space-40: calc(var(--spacing) * 40);
    --space-44: calc(var(--spacing) * 44);
    --space-48: calc(var(--spacing) * 48);
    --space-52: calc(var(--spacing) * 52);
    --space-56: calc(var(--spacing) * 56);
    --space-60: calc(var(--spacing) * 60);
    --space-64: calc(var(--spacing) * 64);
    --space-72: calc(var(--spacing) * 72);
    --space-80: calc(var(--spacing) * 80);
    --space-96: calc(var(--spacing) * 96);
    
    /* Fluid Spacing */
    --space-fluid-xs: clamp(0.5rem, 1vw, 1rem);
    --space-fluid-sm: clamp(1rem, 2vw, 1.5rem);
    --space-fluid-md: clamp(1.5rem, 3vw, 2rem);
    --space-fluid-lg: clamp(2rem, 4vw, 3rem);
    --space-fluid-xl: clamp(4rem, 5vw, 5rem);
    --space-fluid-2xl: clamp(5rem, 7vw, 7.5rem);
    --space-fluid-3xl: clamp(7.5rem, 10vw, 10rem);
    --space-fluid-4xl: clamp(10rem, 20vw, 15rem);
    --space-fluid-5xl: clamp(15rem, 30vw, 20rem);
    --space-fluid-6xl: clamp(20rem, 40vw, 30rem);
    
    /* Size Scale */
    --size-0: 0;
    --size-px: 1px;
    --size-0_5: 0.125rem;
    --size-1: 0.25rem;
    --size-1_5: 0.375rem;
    --size-2: 0.5rem;
    --size-2_5: 0.625rem;
    --size-3: 0.75rem;
    --size-3_5: 0.875rem;
    --size-4: 1rem;
    --size-5: 1.25rem;
    --size-6: 1.5rem;
    --size-7: 1.75rem;
    --size-8: 2rem;
    --size-9: 2.25rem;
    --size-10: 2.5rem;
    --size-11: 2.75rem;
    --size-12: 3rem;
    --size-14: 3.5rem;
    --size-16: 4rem;
    --size-20: 5rem;
    --size-24: 6rem;
    --size-28: 7rem;
    --size-32: 8rem;
    --size-36: 9rem;
    --size-40: 10rem;
    --size-44: 11rem;
    --size-48: 12rem;
    --size-52: 13rem;
    --size-56: 14rem;
    --size-60: 15rem;
    --size-64: 16rem;
    --size-72: 18rem;
    --size-80: 20rem;
    --size-96: 24rem;
    
    /* Container Sizes */
    --container-3xs: 16rem;
    --container-2xs: 18rem;
    --container-xs: 20rem;
    --container-sm: 24rem;
    --container-md: 28rem;
    --container-lg: 32rem;
    --container-xl: 36rem;
    --container-2xl: 42rem;
    --container-3xl: 48rem;
    --container-4xl: 56rem;
    --container-5xl: 64rem;
    --container-6xl: 72rem;
    --container-7xl: 80rem;
    --container-8xl: 88rem;
    --container-9xl: 96rem;
    
    /* Content Widths */
    --prose-sm: 20ch;
    --prose-base: 45ch;
    --prose-lg: 60ch;
    --prose-xl: 75ch;
    
    /* Fractions */
    --w-1_2: 50%;
    --w-1_3: 33.333333%;
    --w-2_3: 66.666667%;
    --w-1_4: 25%;
    --w-3_4: 75%;
    --w-1_5: 20%;
    --w-2_5: 40%;
    --w-3_5: 60%;
    --w-4_5: 80%;
    --w-full: 100%;
    
    /* ===== LAYOUT ===== */
    
    /* Breakpoints */
    --breakpoint-sm: 40rem;
    --breakpoint-md: 48rem;
    --breakpoint-lg: 64rem;
    --breakpoint-xl: 80rem;
    --breakpoint-2xl: 96rem;
    
    /* Border Radius */
    --radius-none: 0;
    --radius-xs: 0.125rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-3xl: 1.5rem;
    --radius-4xl: 2rem;
    --radius-full: 9999px;
    
    /* Aspect Ratios */
    --aspect-square: 1 / 1;
    --aspect-video: 16 / 9;
    --aspect-photo: 4 / 3;
    --aspect-ultrawide: 21 / 9;
    
    /* ===== SHADOWS & EFFECTS ===== */
    
    /* Box Shadows */
    --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
    --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    
    /* Complex Shadows with Theme Colors */
    --shadow-theme-sm: 0 1px 2px -1px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 9%));
    --shadow-theme-md: 0 3px 5px -2px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 3%)), 0 7px 14px -5px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 5%));
    --shadow-theme-lg: 0 -1px 3px 0 hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 2%)), 0 1px 2px -5px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 2%)), 0 2px 5px -5px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 4%)), 0 4px 12px -5px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 5%)), 0 12px 15px -5px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 7%));
    
    /* Inner Shadows */
    --shadow-inner-highlight: inset 0 -0.5px 0 0 #fff, inset 0 0.5px 0 0 #0001;
    --shadow-inner-xs: inset 0 0 0 1px hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 9%));
    --shadow-inner-sm: inset 0 1px 2px 0 hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 9%)), var(--shadow-inner-highlight);
    --shadow-inner-md: inset 0 1px 4px 0 hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 9%)), var(--shadow-inner-highlight);
    --shadow-inner-lg: inset 0 2px 8px 0 hsl(var(--color-shadow-dark) / calc(var(--shadow-strength) + 9%)), var(--shadow-inner-highlight);
    
    /* Inset Shadows */
    --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
    --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
    --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);
    
    /* Drop Shadows */
    --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);
    --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);
    --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);
    --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);
    --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);
    --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);
    
    /* Text Shadows */
    --text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);
    --text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);
    --text-shadow-sm: 0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);
    --text-shadow-md: 0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1);
    --text-shadow-lg: 0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1);
    
    /* Blur Effects */
    --blur-xs: 4px;
    --blur-sm: 8px;
    --blur-md: 12px;
    --blur-lg: 16px;
    --blur-xl: 24px;
    --blur-2xl: 40px;
    --blur-3xl: 64px;
    
    /* ===== MOTION & ANIMATION ===== */
    
    /* Transition Curves */
    --ease-linear: linear;
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Duration */
    --duration-75: 75ms;
    --duration-100: 100ms;
    --duration-150: 150ms;
    --duration-200: 200ms;
    --duration-300: 300ms;
    --duration-500: 500ms;
    --duration-700: 700ms;
    --duration-1000: 1000ms;
    
    /* Animations */
    --animate-spin: spin 1s linear infinite;
    --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    --animate-bounce: bounce 1s infinite;
    
    /* ===== 3D & PERSPECTIVE ===== */
    
    /* Perspective */
    --perspective-dramatic: 100px;
    --perspective-near: 300px;
    --perspective-normal: 500px;
    --perspective-midrange: 800px;
    --perspective-distant: 1200px;
    
    /* ===== THEME COLORS (Shadcn/UI Light Theme) ===== */
    
    --background: 240 4.8% 95.9%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 220 13% 18%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    
    /* ===== SEMANTIC THEME MAPPINGS ===== */
    
    /* Base Colors */
    --color-white: hsl(var(--card));
    --color-black: hsl(var(--foreground));
    --color-transparent: transparent;
    
    /* Surface Colors */
    --color-base-50: hsl(var(--background));
    --color-base-100: hsl(var(--card));
    --color-base-200: hsl(var(--secondary));
    --color-base-300: hsl(var(--muted));
    --color-base-content: hsl(var(--foreground));
    
    /* Brand Colors */
    --color-primary: hsl(var(--primary));
    --color-primary-content: hsl(var(--primary-foreground));
    --color-secondary: hsl(var(--secondary));
    --color-secondary-content: hsl(var(--secondary-foreground));
    --color-accent: hsl(var(--accent));
    --color-accent-content: hsl(var(--accent-foreground));
    
    /* Neutral Colors */
    --color-neutral: hsl(var(--muted));
    --color-neutral-content: hsl(var(--muted-foreground));
    
    /* Status Colors */
    --color-info: hsl(var(--chart-1));
    --color-info-content: hsl(var(--primary-foreground));
    --color-success: hsl(var(--chart-2));
    --color-success-content: hsl(var(--primary-foreground));
    --color-warning: hsl(var(--chart-4));
    --color-warning-content: hsl(var(--primary-foreground));
    --color-error: hsl(var(--destructive));
    --color-error-content: hsl(var(--destructive-foreground));
    
    /* ===== SEMANTIC THEME VARIABLES ===== */
    
    /* Default Styling */
    --radius: var(--radius-lg);
    --radius-input: var(--radius-sm);
    --radius-button: var(--radius-md);
    --radius-card: var(--radius-lg);
    
    /* Spacing Presets */
    --space-section: var(--space-20);
    --space-component: var(--space-12);
    --space-element: var(--space-6);
    
    /* ===== DEFAULTS ===== */
    
    --default-transition-duration: var(--duration-150);
    --default-transition-timing-function: var(--ease-out);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
}

/* ===== DARK THEME ===== */
@media (prefers-color-scheme: dark) {
    :root {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        --card: 222.2 84% 4.9%;
        --card-foreground: 210 40% 98%;
        --popover: 222.2 84% 4.9%;
        --popover-foreground: 210 40% 98%;
        --primary: 220 13% 18%;
        --primary-foreground: 210 40% 98%;
        --secondary: 217.2 32.6% 17.5%;
        --secondary-foreground: 210 40% 98%;
        --muted: 217.2 32.6% 17.5%;
        --muted-foreground: 215 20.2% 65.1%;
        --accent: 217.2 32.6% 17.5%;
        --accent-foreground: 210 40% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 210 40% 98%;
        --border: 217.2 32.6% 17.5%;
        --input: 217.2 32.6% 17.5%;
        --ring: 212.7 26.8% 83.9%;
        --chart-1: 220 70% 50%;
        --chart-2: 160 60% 45%;
        --chart-3: 30 80% 55%;
        --chart-4: 280 65% 60%;
        --chart-5: 340 75% 55%;
    }
}

/* Alternative class-based dark mode */
.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 220 13% 18%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
}



/* ===== PROSE CONTENT STYLING ===== */
/* Content typography and styling using our design system variables */

.prose {
    /* ===== PROSE COMPONENT VARIABLES ===== */
    
    /* Typography */
    --prose-font-family: var(--default-font-family);
    --prose-font-size: var(--text-base); /* 1rem base */
    --prose-line-height: var(--leading-relaxed); /* 1.625 */
    --prose-color: hsl(var(--foreground));
    
    /* Spacing */
    --prose-spacing-unit: var(--space-6); /* 1.5rem base spacing */
    --prose-paragraph-spacing: var(--prose-spacing-unit);
    --prose-heading-spacing-top: calc(var(--prose-spacing-unit) * 3);
    --prose-heading-spacing-bottom: var(--prose-spacing-unit);
    --prose-list-spacing: var(--prose-spacing-unit);
    
    /* Headings */
    --prose-h1-size: var(--text-5xl); /* 3rem */
    --prose-h1-weight: var(--font-weight-extrabold);
    --prose-h1-line-height: var(--leading-none);
    --prose-h1-color: hsl(var(--foreground));
    
    --prose-h2-size: var(--text-4xl); /* 2.25rem */
    --prose-h2-weight: var(--font-weight-bold);
    --prose-h2-line-height: var(--leading-tight);
    --prose-h2-color: hsl(var(--foreground));
    
    --prose-h3-size: var(--text-3xl); /* 1.875rem */
    --prose-h3-weight: var(--font-weight-semibold);
    --prose-h3-line-height: var(--leading-tight);
    --prose-h3-color: hsl(var(--foreground));
    
    --prose-h4-size: var(--text-xl); /* 1.25rem */
    --prose-h4-weight: var(--font-weight-semibold);
    --prose-h4-line-height: var(--leading-snug);
    --prose-h4-color: hsl(var(--foreground));
    
    --prose-h5-size: var(--text-lg); /* 1.125rem */
    --prose-h5-weight: var(--font-weight-medium);
    --prose-h5-line-height: var(--leading-snug);
    --prose-h5-color: hsl(var(--muted-foreground));
    
    --prose-h6-size: var(--text-base); /* 1rem */
    --prose-h6-weight: var(--font-weight-medium);
    --prose-h6-line-height: var(--leading-snug);
    --prose-h6-color: hsl(var(--muted-foreground));
    
    /* Links */
    --prose-link-color: hsl(var(--primary));
    --prose-link-decoration: underline;
    --prose-link-decoration-thickness: 1px;
    --prose-link-underline-offset: 2px;
    --prose-link-hover-color: hsl(var(--primary));
    --prose-link-hover-decoration: underline;
    
    /* Lists */
    --prose-list-margin: var(--prose-list-spacing) 0;
    --prose-list-padding: 0 0 0 var(--space-6);
    --prose-list-item-spacing: calc(var(--prose-spacing-unit) * 0.5);
    --prose-list-marker-color: hsl(var(--muted-foreground));
    
    /* Code */
    --prose-code-font: var(--default-mono-font-family);
    --prose-code-size: var(--text-sm); /* 0.875rem */
    --prose-code-color: hsl(var(--foreground));
    --prose-code-bg: hsl(var(--muted));
    --prose-code-padding: calc(var(--space-1) * 0.5) var(--space-2);
    --prose-code-radius: var(--radius-sm);
    --prose-code-border: 1px solid hsl(var(--border));
    
    /* Code blocks */
    --prose-pre-font: var(--default-mono-font-family);
    --prose-pre-size: var(--text-sm);
    --prose-pre-color: hsl(var(--foreground));
    --prose-pre-bg: hsl(var(--muted));
    --prose-pre-padding: var(--space-5);
    --prose-pre-radius: var(--radius-xl);
    --prose-pre-border: 1px solid hsl(var(--border));
    --prose-pre-margin: var(--prose-spacing-unit) 0;
    --prose-pre-overflow: auto;
    
    /* Blockquotes */
    --prose-quote-color: hsl(var(--muted-foreground));
    --prose-quote-border: 4px solid hsl(var(--border));
    --prose-quote-padding: 0 var(--space-6);
    --prose-quote-margin: var(--prose-spacing-unit) 0;
    --prose-quote-font-style: italic;
    --prose-quote-font-size: var(--text-lg);
    
    /* Tables */
    --prose-table-border: 1px solid hsl(var(--border));
    --prose-table-border-radius: var(--radius-md);
    --prose-table-margin: var(--prose-spacing-unit) 0;
    --prose-table-cell-padding: var(--space-3) var(--space-4);
    --prose-th-bg: hsl(var(--muted));
    --prose-th-color: hsl(var(--foreground));
    --prose-th-weight: var(--font-weight-semibold);
    --prose-td-border-top: 1px solid hsl(var(--border));
    
    /* Images */
    --prose-img-margin: var(--prose-spacing-unit) 0;
    --prose-img-radius: var(--radius-xl);
    --prose-img-shadow: var(--shadow-sm);
    
    /* Horizontal Rules */
    --prose-hr-color: hsl(var(--border));
    --prose-hr-margin: calc(var(--prose-spacing-unit) * 2) 0;
    --prose-hr-width: 100%;
    --prose-hr-height: 1px;
    
    /* Apply base styles */
    font-family: var(--prose-font-family);
    font-size: var(--prose-font-size);
    line-height: var(--prose-line-height);
    color: var(--prose-color);
    max-inline-size: var(--prose-lg);
    margin: 0 auto;
}

/* ===== PROSE ELEMENT STYLES ===== */

/* Paragraphs */
.prose p {
    margin: var(--prose-paragraph-spacing) 0;
}

.prose p:first-child {
    margin-top: 0;
}

.prose p:last-child {
    margin-bottom: 0;
}

/* Headings */
.prose h1 {
    font-size: var(--prose-h1-size);
    font-weight: var(--prose-h1-weight);
    line-height: var(--prose-h1-line-height);
    color: var(--prose-h1-color);
    margin: var(--prose-heading-spacing-top) 0 var(--prose-heading-spacing-bottom) 0;
}

.prose h2 {
    font-size: var(--prose-h2-size);
    font-weight: var(--prose-h2-weight);
    line-height: var(--prose-h2-line-height);
    color: var(--prose-h2-color);
    margin: var(--prose-heading-spacing-top) 0 var(--prose-heading-spacing-bottom) 0;
}

.prose h3 {
    font-size: var(--prose-h3-size);
    font-weight: var(--prose-h3-weight);
    line-height: var(--prose-h3-line-height);
    color: var(--prose-h3-color);
    margin: var(--prose-heading-spacing-top) 0 var(--prose-heading-spacing-bottom) 0;
}

.prose h4 {
    font-size: var(--prose-h4-size);
    font-weight: var(--prose-h4-weight);
    line-height: var(--prose-h4-line-height);
    color: var(--prose-h4-color);
    margin: var(--prose-heading-spacing-top) 0 var(--prose-heading-spacing-bottom) 0;
}

.prose h5 {
    font-size: var(--prose-h5-size);
    font-weight: var(--prose-h5-weight);
    line-height: var(--prose-h5-line-height);
    color: var(--prose-h5-color);
    margin: var(--prose-heading-spacing-top) 0 var(--prose-heading-spacing-bottom) 0;
}

.prose h6 {
    font-size: var(--prose-h6-size);
    font-weight: var(--prose-h6-weight);
    line-height: var(--prose-h6-line-height);
    color: var(--prose-h6-color);
    margin: var(--prose-heading-spacing-top) 0 var(--prose-heading-spacing-bottom) 0;
}

/* First heading has no top margin */
.prose h1:first-child,
.prose h2:first-child,
.prose h3:first-child,
.prose h4:first-child,
.prose h5:first-child,
.prose h6:first-child {
    margin-top: 0;
}

/* Links */
.prose a {
    color: var(--prose-link-color);
    text-decoration: var(--prose-link-decoration);
    text-decoration-thickness: var(--prose-link-decoration-thickness);
    text-underline-offset: var(--prose-link-underline-offset);
    transition: color var(--default-transition-duration) var(--default-transition-timing-function);
}

.prose a:hover {
    color: var(--prose-link-hover-color);
    text-decoration: var(--prose-link-hover-decoration);
    filter: brightness(0.8);
}

/* Lists */
.prose ul,
.prose ol {
    margin: var(--prose-list-margin);
    padding: var(--prose-list-padding);
}

.prose li {
    margin: var(--prose-list-item-spacing) 0;
}

.prose li p {
    margin: calc(var(--prose-spacing-unit) * 0.25) 0;
}

.prose ul {
    list-style-type: disc;
}

.prose ol {
    list-style-type: decimal;
}

.prose ul ul,
.prose ol ol,
.prose ul ol,
.prose ol ul {
    margin: calc(var(--prose-spacing-unit) * 0.25) 0;
}

.prose li::marker {
    color: var(--prose-list-marker-color);
}

/* Inline Code */
.prose code:not(pre code) {
    font-family: var(--prose-code-font);
    font-size: var(--prose-code-size);
    color: var(--prose-code-color);
    background: var(--prose-code-bg);
    padding: var(--prose-code-padding);
    border-radius: var(--prose-code-radius);
    border: var(--prose-code-border);
}

/* Code Blocks */
.prose pre {
    font-family: var(--prose-pre-font);
    font-size: var(--prose-pre-size);
    color: var(--prose-pre-color);
    background: var(--prose-pre-bg);
    padding: var(--prose-pre-padding);
    border-radius: var(--prose-pre-radius);
    border: var(--prose-pre-border);
    margin: var(--prose-pre-margin);
    overflow: var(--prose-pre-overflow);
}

.prose pre code {
    background: transparent;
    border: none;
    padding: 0;
    font-size: inherit;
    color: inherit;
}

/* Blockquotes */
.prose blockquote {
    color: var(--prose-quote-color);
    border-left: var(--prose-quote-border);
    padding: var(--prose-quote-padding);
    margin: var(--prose-quote-margin);
    font-style: var(--prose-quote-font-style);
    font-size: var(--prose-quote-font-size);
}

.prose blockquote p:first-child {
    margin-top: 0;
}

.prose blockquote p:last-child {
    margin-bottom: 0;
}

/* Tables */
.prose table {
    width: 100%;
    border-collapse: collapse;
    border: var(--prose-table-border);
    border-radius: var(--prose-table-border-radius);
    margin: var(--prose-table-margin);
    overflow: hidden;
}

.prose th,
.prose td {
    padding: var(--prose-table-cell-padding);
    text-align: left;
}

.prose th {
    background: var(--prose-th-bg);
    color: var(--prose-th-color);
    font-weight: var(--prose-th-weight);
}

.prose td {
    border-top: var(--prose-td-border-top);
}

.prose tbody tr:first-child td {
    border-top: none;
}

/* Images */
.prose img {
    margin: var(--prose-img-margin);
    border-radius: var(--prose-img-radius);
    box-shadow: var(--prose-img-shadow);
    max-width: 100%;
    height: auto;
}

/* Horizontal Rules */
.prose hr {
    border: none;
    background: var(--prose-hr-color);
    margin: var(--prose-hr-margin);
    width: var(--prose-hr-width);
    height: var(--prose-hr-height);
}

/* Text Formatting */
.prose strong {
    font-weight: var(--font-weight-semibold);
    color: hsl(var(--foreground));
}

.prose em {
    font-style: italic;
}

.prose small {
    font-size: var(--text-sm);
    color: hsl(var(--muted-foreground));
}

/* ===== PROSE SCOPED OVERRIDES ===== */

/* Dark prose variant */
.prose-dark .prose {
    --prose-color: hsl(var(--foreground));
    --prose-code-bg: hsl(var(--secondary));
    --prose-pre-bg: hsl(var(--secondary));
}

/* Large prose variant */
.prose-lg .prose {
    --prose-font-size: var(--text-lg); /* 1.125rem */
    --prose-spacing-unit: var(--space-7); /* Larger spacing */
    --prose-h1-size: var(--text-7xl); /* 4.5rem */
    --prose-h2-size: var(--text-5xl); /* 3rem */
    --prose-h3-size: var(--text-4xl); /* 2.25rem */
}

/* Small prose variant */
.prose-sm .prose {
    --prose-font-size: var(--text-sm); /* 0.875rem */
    --prose-spacing-unit: var(--space-4); /* Smaller spacing */
    --prose-h1-size: var(--text-3xl); /* 1.875rem */
    --prose-h2-size: var(--text-2xl); /* 1.5rem */
    --prose-h3-size: var(--text-xl); /* 1.25rem */
}

/* Centered prose variant */
.prose-center .prose {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.prose-center .prose h1,
.prose-center .prose h2,
.prose-center .prose h3,
.prose-center .prose h4,
.prose-center .prose h5,
.prose-center .prose h6 {
    text-align: center;
}

/* Lead paragraph styling */
.prose .lead {
    font-size: var(--text-xl); /* 1.25rem */
    line-height: var(--leading-normal);
    color: hsl(var(--muted-foreground));
    margin: calc(var(--prose-spacing-unit) * 1.5) 0;
}

/* Dropcap styling */
.prose .dropcap:first-letter {
    font-size: var(--text-8xl); /* 6rem */
    font-weight: var(--font-weight-bold);
    line-height: 1;
    float: left;
    margin: 0 var(--space-3) var(--space-2) 0;
    color: hsl(var(--primary));
}


/* ===== BASE COMPONENT CLASSES ===== */
/* Using our scoped component architecture with KISS principles */

/* Wrapper - Main container component */
.wrapper {
    --wrapper-max-width: var(--container-9xl);
    --wrapper-padding: var(--space-fluid-md);
    --wrapper-background: white;
    --wrapper-margin: 0 auto;
    --wrapper-border-radius: 0;
    --wrapper-border: none;
    --wrapper-shadow: none;
    
    max-width: var(--wrapper-max-width);
    padding: var(--wrapper-padding);
    background: var(--wrapper-background);
    margin: var(--wrapper-margin);
    border-radius: var(--wrapper-border-radius);
    border: var(--wrapper-border);
    box-shadow: var(--wrapper-shadow);
}

/* Typography Components */
.h1 {
    --h1-size: var(--text-8xl);
    --h1-weight: var(--font-weight-semibold);
    --h1-color: hsl(var(--foreground));
    --h1-margin: 0 0 var(--space-5) 0;
    --h1-line-height: var(--leading-tight);
    
    font-size: var(--h1-size);
    font-weight: var(--h1-weight);
    color: var(--h1-color);
    margin: var(--h1-margin);
    line-height: var(--h1-line-height);
}

.h2 {
    --h2-size: var(--text-6xl);
    --h2-weight: var(--font-weight-semibold);
    --h2-color: hsl(var(--foreground));
    --h2-margin: var(--space-8) 0 var(--space-5) 0;
    --h2-line-height: var(--leading-snug);
    
    font-size: var(--h2-size);
    font-weight: var(--h2-weight);
    color: var(--h2-color);
    margin: var(--h2-margin);
    line-height: var(--h2-line-height);
}

.h3 {
    --h3-size: var(--text-5xl);
    --h3-weight: var(--font-weight-semibold);
    --h3-color: hsl(var(--foreground));
    --h3-margin: var(--space-6) 0 var(--space-4) 0;
    --h3-line-height: var(--leading-snug);
    
    font-size: var(--h3-size);
    font-weight: var(--h3-weight);
    color: var(--h3-color);
    margin: var(--h3-margin);
    line-height: var(--h3-line-height);
}

.lead {
    --lead-size: var(--text-4xl);
    --lead-color: hsl(var(--muted-foreground));
    --lead-margin: 0 0 var(--space-6) 0;
    --lead-line-height: var(--leading-normal);
    --lead-weight: var(--font-weight-normal);
    
    font-size: var(--lead-size);
    color: var(--lead-color);
    margin: var(--lead-margin);
    line-height: var(--lead-line-height);
    font-weight: var(--lead-weight);
}

.text {
    --text-size: var(--text-3xl);
    --text-color: hsl(var(--muted-foreground));
    --text-margin: 0 0 var(--space-4) 0;
    --text-line-height: var(--leading-normal);
    
    font-size: var(--text-size);
    color: var(--text-color);
    margin: var(--text-margin);
    line-height: var(--text-line-height);
}

/* Button Component - ShadCN Style */
.btn {
    --btn-background: hsl(var(--primary));
    --btn-color: hsl(var(--primary-foreground));
    --btn-padding: var(--space-2) var(--space-6);
    --btn-border: 1px solid transparent;
    --btn-border-radius: var(--radius-md);
    --btn-font-size: var(--text-sm);
    --btn-font-weight: var(--font-weight-medium);
    --btn-line-height: 1;
    --btn-transition: all var(--default-transition-duration);
    --btn-cursor: pointer;
    --btn-display: inline-flex;
    --btn-align: center;
    --btn-justify: center;
    --btn-gap: var(--space-2);
    --btn-text-decoration: none;
    --btn-margin: 0;
    --btn-align-self: flex-start;
    --btn-height: 40px;
    --btn-min-width: auto;
    --btn-shadow: none;
    
    background: var(--btn-background);
    color: var(--btn-color);
    padding: var(--btn-padding);
    border: var(--btn-border);
    border-radius: var(--btn-border-radius);
    font-size: var(--btn-font-size);
    font-weight: var(--btn-font-weight);
    font-family: inherit;
    line-height: var(--btn-line-height);
    transition: var(--btn-transition);
    cursor: var(--btn-cursor);
    display: var(--btn-display);
    align-items: var(--btn-align);
    justify-content: var(--btn-justify);
    gap: var(--btn-gap);
    text-decoration: var(--btn-text-decoration);
    margin: var(--btn-margin);
    align-self: var(--btn-align-self);
    height: var(--btn-height);
    min-width: var(--btn-min-width);
    box-shadow: var(--btn-shadow);
}

.btn:hover {
    --btn-background: hsl(var(--primary) / 0.9);
}

.btn:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
}

/* Button Variants */
.btn.secondary {
    --btn-background: hsl(var(--secondary));
    --btn-color: hsl(var(--secondary-foreground));
}

.btn.secondary:hover {
    --btn-background: hsl(var(--secondary) / 0.8);
}

.btn.outline {
    --btn-background: transparent;
    --btn-color: hsl(var(--primary));
    --btn-border: 1px solid hsl(var(--input));
}

.btn.outline:hover {
    --btn-background: hsl(var(--accent));
    --btn-color: hsl(var(--accent-foreground));
}

.btn.ghost {
    --btn-background: transparent;
    --btn-color: hsl(var(--primary));
    --btn-border: 1px solid transparent;
}

.btn.ghost:hover {
    --btn-background: hsl(var(--accent));
    --btn-color: hsl(var(--accent-foreground));
}

.btn.link {
    --btn-background: transparent;
    --btn-color: hsl(var(--primary));
    --btn-border: 1px solid transparent;
    --btn-padding: 0;
    --btn-height: auto;
    --btn-text-decoration: underline;
}

.btn.link:hover {
    --btn-text-decoration: none;
}

.btn.destructive {
    --btn-background: hsl(var(--destructive));
    --btn-color: hsl(var(--destructive-foreground));
}

.btn.destructive:hover {
    --btn-background: hsl(var(--destructive) / 0.9);
}

/* Button Sizes */
.btn.sm {
    --btn-height: 36px;
    --btn-padding: var(--space-2) var(--space-5);
    --btn-font-size: var(--text-xs);
}

.btn.lg {
    --btn-height: 44px;
    --btn-padding: var(--space-3) var(--space-8);
    --btn-font-size: var(--text-lg);
}

.btn.icon {
    --btn-height: 40px;
    --btn-width: 40px;
    --btn-padding: 0;
    --btn-min-width: 40px;
    
    width: var(--btn-width);
}

.btn.icon.sm {
    --btn-height: 36px;
    --btn-width: 36px;
    --btn-min-width: 36px;
    
    width: var(--btn-width);
}

.btn.icon.lg {
    --btn-height: 44px;
    --btn-width: 44px;
    --btn-min-width: 44px;
    
    width: var(--btn-width);
}

/* Button States */
.btn[data-state="disabled"],
.btn:disabled {
    --btn-background: hsl(var(--muted));
    --btn-color: hsl(var(--muted-foreground));
    --btn-border: 1px solid hsl(var(--border));
    --btn-cursor: not-allowed;
    
    pointer-events: none;
}

.btn[data-state="loading"] {
    --btn-cursor: not-allowed;
    
    position: relative;
    pointer-events: none;
    color: transparent;
}

.btn[data-state="loading"]::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid transparent;
    border-top: 2px solid hsl(var(--primary-foreground));
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Button Icons */
.btn-icon {
    --icon-size: 16px;
    
    width: var(--icon-size);
    height: var(--icon-size);
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
}

.btn.sm .btn-icon {
    --icon-size: 14px;
}

.btn.lg .btn-icon {
    --icon-size: 18px;
}

/* Grid System - Responsive Foundation */
.grid {
    --grid-columns: repeat(auto-fit, minmax(var(--container-md), 1fr));
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

/* Base Grid Classes (1-6 columns) */
.grid-1 {
    --grid-columns: 1fr;
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

.grid-2 {
    --grid-columns: repeat(2, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

.grid-3 {
    --grid-columns: repeat(3, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

.grid-4 {
    --grid-columns: repeat(4, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

.grid-5 {
    --grid-columns: repeat(5, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

.grid-6 {
    --grid-columns: repeat(6, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

/* Responsive Grid Classes - Desktop > Tablet > Mobile */
/* 6-3-2: 6 columns on desktop, 3 on tablet, 2 on mobile */
.grid-6-3-2 {
    --grid-columns: repeat(6, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

@media (max-width: 64rem) {
    .grid-6-3-2 {
        --grid-columns: repeat(3, 1fr);
    }
}

@media (max-width: 48rem) {
    .grid-6-3-2 {
        --grid-columns: repeat(2, 1fr);
    }
}

/* 4-2-1: 4 columns on desktop, 2 on tablet, 1 on mobile */
.grid-4-2-1 {
    --grid-columns: repeat(4, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

@media (max-width: 64rem) {
    .grid-4-2-1 {
        --grid-columns: repeat(2, 1fr);
    }
}

@media (max-width: 48rem) {
    .grid-4-2-1 {
        --grid-columns: 1fr;
    }
}

/* 3-2-1: 3 columns on desktop, 2 on tablet, 1 on mobile */
.grid-3-2-1 {
    --grid-columns: repeat(3, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

@media (max-width: 64rem) {
    .grid-3-2-1 {
        --grid-columns: repeat(2, 1fr);
    }
}

@media (max-width: 48rem) {
    .grid-3-2-1 {
        --grid-columns: 1fr;
    }
}

/* 2-1-1: 2 columns on desktop, 1 on tablet, 1 on mobile */
.grid-2-1-1 {
    --grid-columns: repeat(2, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

@media (max-width: 64rem) {
    .grid-2-1-1 {
        --grid-columns: 1fr;
    }
}

/* 6-2-1: 6 columns on desktop, 2 on tablet, 1 on mobile */
.grid-6-2-1 {
    --grid-columns: repeat(6, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

@media (max-width: 64rem) {
    .grid-6-2-1 {
        --grid-columns: repeat(2, 1fr);
    }
}

@media (max-width: 48rem) {
    .grid-6-2-1 {
        --grid-columns: 1fr;
    }
}

/* 5-3-2: 5 columns on desktop, 3 on tablet, 2 on mobile */
.grid-5-3-2 {
    --grid-columns: repeat(5, 1fr);
    --grid-gap: var(--space-6);
    --grid-margin: var(--space-6) 0;
    
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: var(--grid-gap);
    margin: var(--grid-margin);
}

@media (max-width: 64rem) {
    .grid-5-3-2 {
        --grid-columns: repeat(3, 1fr);
    }
}

@media (max-width: 48rem) {
    .grid-5-3-2 {
        --grid-columns: repeat(2, 1fr);
    }
}

/* Card Component */
.card {
    --card-background: transparent;
    --card-border: none;
    --card-border-radius: 0;
    --card-padding: 0;
    --card-shadow: none;
    --card-margin: var(--space-6) 0;
    --card-gap: var(--space-element);
    
    background: var(--card-background);
    border: var(--card-border);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    box-shadow: var(--card-shadow);
    margin: var(--card-margin);
    display: flex;
    flex-direction: column;
    gap: var(--card-gap);
}

/* Actions Container */
.actions {
    --actions-display: flex;
    --actions-gap: var(--space-4);
    --actions-flex-wrap: wrap;
    --actions-justify: flex-start;
    --actions-align: center;
    --actions-margin: var(--space-6) 0 0 0;
    
    display: var(--actions-display);
    gap: var(--actions-gap);
    flex-wrap: var(--actions-flex-wrap);
    justify-content: var(--actions-justify);
    align-items: var(--actions-align);
    margin: var(--actions-margin);
}

/* Section Component */
.section {
    --section-margin: 0 0 var(--space-section) 0;
    --section-gap: var(--space-element);
    
    margin: var(--section-margin);
    display: flex;
    flex-direction: column;
    gap: var(--section-gap);
}

/* Accordion Component - ShadCN Style */
.accordion {
    --accordion-background: transparent;
    --accordion-gap: 0;
    
    background: var(--accordion-background);
    display: flex;
    flex-direction: column;
    gap: var(--accordion-gap);
}

.accordion-item {
    --accordion-item-border-bottom: 1px solid hsl(var(--border));
    --accordion-item-background: transparent;
    
    border-bottom: var(--accordion-item-border-bottom);
    background: var(--accordion-item-background);
}

.accordion-trigger {
    --trigger-background: transparent;
    --trigger-color: hsl(var(--foreground));
    --trigger-padding: var(--space-4) 0;
    --trigger-border: none;
    --trigger-font-size: var(--text-lg);
    --trigger-font-weight: var(--font-weight-normal);
    --trigger-cursor: pointer;
    --trigger-transition: all var(--default-transition-duration);
    --trigger-text-align: left;
    --trigger-width: 100%;
    --trigger-display: flex;
    --trigger-justify: space-between;
    --trigger-align: center;
    
    background: var(--trigger-background);
    color: var(--trigger-color);
    padding: var(--trigger-padding);
    border: var(--trigger-border);
    font-size: var(--trigger-font-size);
    font-weight: var(--trigger-font-weight);
    font-family: inherit;
    cursor: var(--trigger-cursor);
    transition: var(--trigger-transition);
    text-align: var(--trigger-text-align);
    width: var(--trigger-width);
    display: var(--trigger-display);
    justify-content: var(--trigger-justify);
    align-items: var(--trigger-align);
}

.accordion-trigger:hover {
    --trigger-text-decoration: underline;
    
    text-decoration: var(--trigger-text-decoration);
}

.accordion-content {
    --content-padding: 0 0 var(--space-4) 0;
    --content-background: transparent;
    --content-overflow: hidden;
    --content-transition: all var(--default-transition-duration);
    --content-color: hsl(var(--muted-foreground));
    --content-line-height: var(--leading-4);
    --content-font-size: var(--text-sm);
    
    padding: var(--content-padding);
    background: var(--content-background);
    overflow: var(--content-overflow);
    transition: var(--content-transition);
    color: var(--content-color);
    line-height: var(--content-line-height);
    font-size: var(--content-font-size);
}

.accordion-content[aria-hidden="true"] {
    --content-padding: 0;
    --content-max-height: 0;
    
    padding: var(--content-padding);
    max-height: var(--content-max-height);
}

.accordion-icon {
    --icon-size: 16px;
    --icon-transition: transform var(--default-transition-duration);
    --icon-color: hsl(var(--muted-foreground));
    --icon-stroke-width: 2;
    
    width: var(--icon-size);
    height: var(--icon-size);
    transition: var(--icon-transition);
    color: var(--icon-color);
    stroke: currentColor;
    stroke-width: var(--icon-stroke-width);
    fill: none;
}

.accordion-trigger[aria-expanded="true"] .accordion-icon {
    transform: rotate(180deg);
}

/* Tabs Component - ShadCN Style */
.tabs {
    --tabs-background: transparent;
    --tabs-width: 100%;
    
    background: var(--tabs-background);
    width: var(--tabs-width);
}

.tabs-list {
    --tabs-list-display: inline-flex;
    --tabs-list-background: hsl(var(--muted));
    --tabs-list-border-radius: var(--radius-md);
    --tabs-list-padding: var(--space-1);
    --tabs-list-gap: 0;
    --tabs-list-margin: 0 0 var(--space-6) 0;
    --tabs-list-list-style: none;
    --tabs-list-height: 40px;
    --tabs-list-align: center;
    --tabs-list-justify: start;
    
    display: var(--tabs-list-display);
    background: var(--tabs-list-background);
    border-radius: var(--tabs-list-border-radius);
    padding: var(--tabs-list-padding);
    gap: var(--tabs-list-gap);
    margin: var(--tabs-list-margin);
    list-style: var(--tabs-list-list-style);
    height: var(--tabs-list-height);
    align-items: var(--tabs-list-align);
    justify-content: var(--tabs-list-justify);
}

.tabs-trigger {
    --tab-background: transparent;
    --tab-color: hsl(var(--muted-foreground));
    --tab-padding: var(--space-2) var(--space-3);
    --tab-border: none;
    --tab-border-radius: var(--radius-sm);
    --tab-font-size: var(--text-sm);
    --tab-font-weight: var(--font-weight-medium);
    --tab-cursor: pointer;
    --tab-transition: all var(--default-transition-duration);
    --tab-text-decoration: none;
    --tab-display: inline-flex;
    --tab-align: center;
    --tab-justify: center;
    --tab-height: 32px;
    --tab-min-width: 80px;
    
    background: var(--tab-background);
    color: var(--tab-color);
    padding: var(--tab-padding);
    border: var(--tab-border);
    border-radius: var(--tab-border-radius);
    font-size: var(--tab-font-size);
    font-weight: var(--tab-font-weight);
    font-family: inherit;
    cursor: var(--tab-cursor);
    transition: var(--tab-transition);
    text-decoration: var(--tab-text-decoration);
    display: var(--tab-display);
    align-items: var(--tab-align);
    justify-content: var(--tab-justify);
    height: var(--tab-height);
    min-width: var(--tab-min-width);
}

.tabs-trigger:hover {
    --tab-color: hsl(var(--foreground));
}

.tabs-trigger[aria-selected="true"] {
    --tab-background: white;
    --tab-color: hsl(var(--foreground));
    --tab-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    
    background: var(--tab-background);
    color: var(--tab-color);
    box-shadow: var(--tab-box-shadow);
}

.tabs-content {
    --tab-content-padding: var(--space-6);
    --tab-content-background: white;
    --tab-content-border: 1px solid hsl(var(--border));
    --tab-content-border-radius: var(--radius-md);
    --tab-content-min-height: 200px;
    
    padding: var(--tab-content-padding);
    background: var(--tab-content-background);
    border: var(--tab-content-border);
    border-radius: var(--tab-content-border-radius);
    min-height: var(--tab-content-min-height);
}

.tabs-content[aria-hidden="true"] {
    display: none;
}

/* Alert Component - ShadCN Style */
.alert {
    --alert-background: hsl(var(--card));
    --alert-border: 1px solid hsl(var(--border));
    --alert-border-radius: var(--radius-md);
    --alert-padding: var(--space-4);
    --alert-gap: var(--space-3);
    --alert-color: hsl(var(--card-foreground));
    
    background: var(--alert-background);
    border: var(--alert-border);
    border-radius: var(--alert-border-radius);
    padding: var(--alert-padding);
    display: flex;
    gap: var(--alert-gap);
    align-items: flex-start;
    color: var(--alert-color);
}

.alert-icon {
    --icon-size: 16px;
    --icon-color: inherit;
    --icon-flex-shrink: 0;
    --icon-margin-top: 2px;
    
    width: var(--icon-size);
    height: var(--icon-size);
    color: var(--icon-color);
    flex-shrink: var(--icon-flex-shrink);
    margin-top: var(--icon-margin-top);
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
}

.alert-content {
    --content-flex: 1;
    --content-gap: var(--space-1);
    
    flex: var(--content-flex);
    display: flex;
    flex-direction: column;
    gap: var(--content-gap);
}

.alert-title {
    --title-font-size: var(--text-sm);
    --title-font-weight: var(--font-weight-medium);
    --title-color: inherit;
    --title-margin: 0;
    --title-line-height: var(--leading-snug);
    
    font-size: var(--title-font-size);
    font-weight: var(--title-font-weight);
    color: var(--title-color);
    margin: var(--title-margin);
    line-height: var(--title-line-height);
}

.alert-description {
    --description-font-size: var(--text-sm);
    --description-color: hsl(var(--muted-foreground));
    --description-margin: 0;
    --description-line-height: var(--leading-normal);
    
    font-size: var(--description-font-size);
    color: var(--description-color);
    margin: var(--description-margin);
    line-height: var(--description-line-height);
}

/* Alert Variants */
.alert.success {
    --alert-background: hsl(142 76% 36% / 0.1);
    --alert-border: 1px solid hsl(142 76% 36% / 0.2);
    --alert-color: hsl(142 76% 36%);
}

.alert.success .alert-description {
    --description-color: hsl(142 76% 30%);
}

.alert.destructive {
    --alert-background: hsl(0 84% 60% / 0.1);
    --alert-border: 1px solid hsl(0 84% 60% / 0.2);
    --alert-color: hsl(0 84% 60%);
}

.alert.destructive .alert-description {
    --description-color: hsl(0 84% 50%);
}

.alert.warning {
    --alert-background: hsl(43 96% 56% / 0.1);
    --alert-border: 1px solid hsl(43 96% 56% / 0.2);
    --alert-color: hsl(43 96% 46%);
}

.alert.warning .alert-description {
    --description-color: hsl(43 96% 40%);
}

.alert.info {
    --alert-background: hsl(204 94% 94%);
    --alert-border: 1px solid hsl(204 94% 80%);
    --alert-color: hsl(204 94% 45%);
}

.alert.info .alert-description {
    --description-color: hsl(204 94% 40%);
}



