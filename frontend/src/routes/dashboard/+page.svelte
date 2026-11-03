<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head><title>Workspace — CCTV Designer</title></svelte:head>

<main class="dashboard-shell">
	<section>
		<span class="dashboard-mark" aria-hidden="true"></span>
		<p class="eyebrow">Login successful</p>
		<h1>Welcome, {data.user.username}.</h1>
		<p class="message">Your CCTV Designer workspace will appear here as the next features are built.</p>
		<div class="actions">
			<a href="/">Return home</a>
			<form method="POST" action="?/logout"><button type="submit">Log out</button></form>
		</div>
	</section>
</main>

<style>
	.dashboard-shell { display: grid; min-height: 100svh; place-items: center; padding: 24px; background: var(--color-bg-page); color: var(--color-text-primary); }
	section { width: min(100%, 680px); padding: clamp(40px, 7vw, 72px); border: 1px solid var(--color-border-default); border-radius: 22px; background: var(--color-bg-elevated); box-shadow: 0 24px 65px color-mix(in srgb, var(--color-primary) 12%, transparent); text-align: center; }
	.dashboard-mark { display: block; width: 54px; height: 54px; margin: 0 auto 24px; border-radius: 50%; background: repeating-conic-gradient(from 5deg, var(--color-primary) 0 34deg, transparent 34deg 48deg); }
	.eyebrow { margin: 0 0 12px; color: var(--color-text-link); font-size: .82rem; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; }
	h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2.4rem, 6vw, 4rem); letter-spacing: -.05em; }
	.message { max-width: 520px; margin: 20px auto 32px; color: var(--color-text-secondary); font-size: 1.08rem; line-height: 1.6; }
	.actions { display: flex; justify-content: center; gap: 14px; }
	.actions a, button { display: inline-flex; min-width: 135px; height: 48px; align-items: center; justify-content: center; padding: 0 20px; border: 1px solid var(--color-accent); border-radius: 9px; cursor: pointer; font: inherit; font-weight: 700; }
	.actions a { background: var(--color-accent); color: var(--color-on-accent); }
	button { background: transparent; color: var(--color-primary); }
	@media (max-width: 480px) { .actions { flex-direction: column; } form, .actions a, button { width: 100%; } }
</style>

