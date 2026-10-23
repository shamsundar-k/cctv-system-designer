<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'green-light' | 'gold-light';
	let theme = $state<Theme>('green-light');

	onMount(() => {
		theme = document.documentElement.dataset.theme === 'gold-light' ? 'gold-light' : 'green-light';
	});

	function setTheme(nextTheme: Theme) {
		theme = nextTheme;
		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem('cctv-theme', nextTheme);
	}
</script>

<svelte:head>
	<title>CCTV Designer — Plan with confidence</title>
	<meta name="description" content="Plan your CCTV system, select equipment, and estimate storage and bandwidth in one place." />
</svelte:head>

<div class="site-shell min-h-screen bg-ui-bg-page text-ui-text-primary">
	<header class="site-header">
		<a class="brand" href="#top" aria-label="CCTV Designer home">
			<span class="brand-mark" aria-hidden="true"></span>
			<span>CCTV <strong>Designer</strong></span>
		</a>

		<nav class="primary-nav" aria-label="Primary navigation">
			<a href="#features">Features</a>
			<a href="#how-it-works">How it works</a>
			<a href="#login">Log in</a>
			<a class="nav-cta" href="#register">Register</a>
			<div class="theme-switcher" aria-label="Choose colour theme">
				<button type="button" class:active={theme === 'green-light'} aria-label="Use forest and orange theme" aria-pressed={theme === 'green-light'} onclick={() => setTheme('green-light')}>
					<span class="theme-dot forest"></span><span class="theme-dot orange"></span>
				</button>
				<button type="button" class:active={theme === 'gold-light'} aria-label="Use charcoal and gold theme" aria-pressed={theme === 'gold-light'} onclick={() => setTheme('gold-light')}>
					<span class="theme-dot charcoal"></span><span class="theme-dot gold"></span>
				</button>
			</div>
		</nav>
	</header>

	<main id="top">
		<section class="hero" aria-labelledby="hero-title">
			<div class="hero-orbit orbit-left" aria-hidden="true"><span></span></div>
			<div class="hero-orbit orbit-right" aria-hidden="true"><span></span></div>
			<div class="leaf-shape leaf-one" aria-hidden="true"></div>
			<div class="leaf-shape leaf-two" aria-hidden="true"></div>
			<div class="hero-content">
				<p class="eyebrow">CCTV system planning</p>
				<h1 id="hero-title">Better planning.<br />Smarter CCTV design.</h1>
				<p class="hero-copy">Plan your CCTV system, select equipment, and estimate<br class="desktop-break" /> storage and bandwidth in one place.</p>
				<div class="hero-actions">
					<a id="register" class="button button-primary" href="#features">Register <span>→</span></a>
					<a id="login" class="button button-secondary" href="#features">Log in</a>
				</div>
			</div>
		</section>

		<section id="features" class="feature-band" aria-labelledby="features-title">
			<div class="feature-intro">
				<span class="accent-line" aria-hidden="true"></span>
				<h2 id="features-title">Everything you need<br />to plan with confidence.</h2>
				<p>A simple, powerful way to plan your CCTV system. Select the right equipment, understand your storage and bandwidth requirements, and keep your project organised — all in one place.</p>
			</div>

			<div class="feature-grid">
				<article class="feature-card">
					<div class="product-stage"><span class="stage-disc"></span><span class="stage-dot"></span><img src="/images/cctv-camera.png" alt="White outdoor CCTV bullet camera" /></div>
					<h3>Camera selection</h3><p>Choose equipment for your project.</p><a href="#camera-planning" aria-label="Explore camera selection">→</a>
				</article>
				<article class="feature-card">
					<div class="product-stage storage-stage" aria-hidden="true"><span class="stage-disc"></span><span class="stage-dot"></span><div class="storage-stack"><span></span><span></span><span></span></div></div>
					<h3>Storage &amp; bandwidth</h3><p>Estimate recording and network needs.</p><a href="#storage-planning" aria-label="Explore storage and bandwidth">→</a>
				</article>
				<article class="feature-card">
					<div class="product-stage"><span class="stage-disc"></span><span class="stage-dot"></span><img class="server-image" src="/images/cctv-server.png" alt="Compact CCTV recording server" /></div>
					<h3>Equipment planning</h3><p>Organise your system components.</p><a href="#equipment-planning" aria-label="Explore equipment planning">→</a>
				</article>
			</div>
		</section>

		<section id="how-it-works" class="closing-line" aria-label="Planning process"><span></span><p>From initial idea to a well-planned system.</p><span></span></section>
	</main>
</div>
