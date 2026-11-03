<script lang="ts">
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Log in — CCTV Designer</title>
	<meta name="description" content="Log in to continue planning your CCTV system." />
</svelte:head>

<div class="login-page">
	<header class="login-header">
		<a class="login-brand" href="/" aria-label="CCTV Designer home">
			<span class="login-brand-mark" aria-hidden="true"></span>
			<span>CCTV <strong>Designer</strong></span>
		</a>
		<a class="back-link" href="/"><span aria-hidden="true">←</span> Back to home</a>
	</header>

	<div class="orb orb-left" aria-hidden="true"><span></span><i></i></div>
	<div class="orb orb-right" aria-hidden="true"><span></span><i></i></div>
	<svg class="botanical botanical-left" viewBox="0 0 300 480" aria-hidden="true">
		<path d="M18 470C74 350 96 210 70 72M72 248C38 215 20 177 24 131C67 157 86 195 72 248ZM65 350C111 313 161 301 214 315C183 361 132 376 65 350Z" />
		<path d="M67 365C123 269 165 169 190 62M128 255C169 226 205 218 240 227C214 265 176 276 128 255Z" />
	</svg>
	<svg class="botanical botanical-right" viewBox="0 0 330 500" aria-hidden="true">
		<path d="M305 488C270 365 230 235 188 93M238 255C263 198 295 165 329 153C333 214 302 249 238 255ZM264 353C204 312 150 302 101 322C140 367 194 377 264 353Z" />
		<path d="M271 412C211 326 156 229 110 119M184 261C136 236 91 231 50 247C88 284 132 289 184 261Z" />
	</svg>

	<main class="login-main">
		<section class="login-card" aria-labelledby="login-title">
			<p class="login-eyebrow">Welcome back</p>
			<h1 id="login-title">Log in to CCTV Designer</h1>
			<p class="login-copy">Continue planning your CCTV system.</p>

			<form method="POST">
				{#if form?.message}
					<div class="form-error" role="alert">{form.message}</div>
				{/if}

				<label for="identifier">Username or email</label>
				<input
					id="identifier"
					name="identifier"
					type="text"
					autocomplete="username"
					value={form?.identifier ?? ''}
					required
				/>

				<label for="password">Password</label>
				<div class="password-field">
					<input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						autocomplete="current-password"
						required
					/>
					<button
						type="button"
						class="password-toggle"
						onclick={() => (showPassword = !showPassword)}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
						aria-pressed={showPassword}
					>
						{#if showPassword}
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A10.4 10.4 0 0112 4c5.5 0 9 5.5 9 5.5a15.6 15.6 0 01-2.3 2.8M6.6 6.6A15.5 15.5 0 003 9.5S6.5 15 12 15c1 0 2-.2 2.9-.5" /></svg>
						{:else}
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.5-5.5 9-5.5 9 5.5 9 5.5-3.5 5.5-9 5.5S3 12 3 12Z" /><circle cx="12" cy="12" r="2.5" /></svg>
						{/if}
					</button>
				</div>

				<div class="form-options">
					<label class="remember">
						<input type="checkbox" name="remember" checked={form?.remember ?? false} />
						<span>Remember me</span>
					</label>
					<a href="/forgot-password">Forgot password?</a>
				</div>

				<button class="login-button" type="submit">Log in</button>
			</form>

			<p class="register-copy">New here? <a href="/register">Create an account</a></p>
		</section>
	</main>
</div>

<style>
	.login-page { position: relative; min-height: 100svh; overflow: hidden; background: var(--color-bg-page); color: var(--color-text-primary); isolation: isolate; }
	.login-header { position: relative; z-index: 5; display: flex; min-height: 92px; align-items: center; justify-content: space-between; padding: 0 clamp(24px, 7vw, 108px); }
	.login-brand { display: inline-flex; align-items: center; gap: 13px; font-size: clamp(1.25rem, 2vw, 1.7rem); font-weight: 650; letter-spacing: -.05em; }
	.login-brand strong { font-weight: 800; }
	.login-brand-mark { position: relative; display: grid; width: 46px; height: 46px; place-items: center; border-radius: 50%; background: repeating-conic-gradient(from 5deg, var(--color-primary) 0 34deg, transparent 34deg 48deg); }
	.login-brand-mark::before { position: absolute; width: 12px; height: 45px; content: ''; background: var(--color-accent); clip-path: polygon(28% 0, 100% 0, 73% 32%, 50% 50%, 27% 32%); transform: rotate(35deg); }
	.login-brand-mark::after { width: 16px; height: 16px; border-radius: 50%; content: ''; background: var(--color-bg-page); }
	.back-link { display: inline-flex; align-items: center; gap: 12px; font-weight: 700; }
	.back-link span { color: var(--color-text-link); font-size: 1.55rem; transition: transform 180ms ease; }
	.back-link:hover span { transform: translateX(-4px); }
	.login-main { position: relative; z-index: 3; display: grid; min-height: calc(100svh - 92px); place-items: center; padding: 26px 24px 72px; }
	.login-card { width: min(100%, 570px); padding: clamp(34px, 5vw, 58px) clamp(28px, 5vw, 52px) 36px; border: 1px solid var(--color-border-default); border-radius: 18px; background: color-mix(in srgb, var(--color-bg-elevated) 97%, transparent); box-shadow: 0 24px 65px color-mix(in srgb, var(--color-primary) 12%, transparent); }
	.login-eyebrow { margin: 0 0 18px; color: var(--color-text-link); font-size: .82rem; font-weight: 800; letter-spacing: .25em; text-align: center; text-transform: uppercase; }
	h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2rem, 4vw, 2.75rem); letter-spacing: -.045em; line-height: 1.05; text-align: center; }
	.login-copy { margin: 14px 0 36px; color: var(--color-text-secondary); font-size: 1.05rem; text-align: center; }
	form { display: flex; flex-direction: column; }
	form > label { margin: 0 0 9px; font-size: .92rem; font-weight: 750; }
	form > label:not(:first-of-type) { margin-top: 24px; }
	input[type='text'], input[type='password'] { width: 100%; height: 54px; padding: 0 16px; border: 1px solid var(--color-border-default); border-radius: 10px; outline: 0; background: var(--color-bg-elevated); color: var(--color-text-primary); font: inherit; transition: border-color 160ms ease, box-shadow 160ms ease; }
	input[type='text']:focus, input[type='password']:focus { border-color: var(--color-border-focus); box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-border-focus) 18%, transparent); }
	.password-field { position: relative; }
	.password-field input { padding-right: 54px; }
	.password-toggle { position: absolute; top: 50%; right: 7px; display: grid; width: 42px; height: 42px; place-items: center; border: 0; border-radius: 8px; background: transparent; color: var(--color-text-muted); cursor: pointer; transform: translateY(-50%); }
	.password-toggle:hover { background: var(--color-interactive-hover); color: var(--color-text-primary); }
	.password-toggle svg { width: 22px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
	.form-options { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 24px; }
	.remember { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
	.remember input { width: 20px; height: 20px; margin: 0; accent-color: var(--color-primary); }
	.form-options a, .register-copy a { color: var(--color-accent); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
	.login-button { height: 58px; margin-top: 28px; border: 0; border-radius: 10px; background: var(--color-accent); color: var(--color-on-accent); box-shadow: 0 12px 28px color-mix(in srgb, var(--color-accent) 24%, transparent); cursor: pointer; font-family: Georgia, 'Times New Roman', serif; font-size: 1.25rem; font-weight: 700; transition: transform 180ms ease, box-shadow 180ms ease; }
	.login-button:hover { box-shadow: 0 15px 32px color-mix(in srgb, var(--color-accent) 32%, transparent); transform: translateY(-2px); }
	.register-copy { margin: 34px 0 0; padding-top: 28px; border-top: 1px solid var(--color-border-subtle); text-align: center; }
	.form-error { margin-bottom: 22px; padding: 12px 14px; border: 1px solid color-mix(in srgb, var(--color-error) 30%, transparent); border-radius: 9px; background: var(--color-error-bg); color: var(--color-error); font-size: .9rem; line-height: 1.4; }
	.orb { position: absolute; z-index: 0; width: 390px; height: 390px; border: 1px solid color-mix(in srgb, var(--color-primary) 35%, transparent); border-radius: 50%; }
	.orb::before { position: absolute; width: 360px; height: 360px; border-radius: 50%; content: ''; background: color-mix(in srgb, var(--color-bg-subtle) 72%, transparent); }
	.orb span, .orb i { position: absolute; z-index: 2; width: 17px; height: 17px; border-radius: 50%; background: var(--color-border-strong); }
	.orb-left { top: 170px; left: -225px; }
	.orb-left::before { top: 80px; left: -14px; }
	.orb-left span { top: 10px; right: 64px; }
	.orb-left i { right: 76px; bottom: -4px; }
	.orb-right { right: -250px; bottom: 55px; }
	.orb-right::before { top: 20px; right: -60px; }
	.orb-right span { top: 42px; left: 28px; background: var(--color-accent); }
	.orb-right i { bottom: 34px; left: 70px; }
	.botanical { position: absolute; z-index: 1; width: 290px; fill: color-mix(in srgb, var(--color-primary) 50%, transparent); stroke: color-mix(in srgb, var(--color-primary) 46%, transparent); stroke-width: 1.2; }
	.botanical-left { bottom: -34px; left: -25px; }
	.botanical-right { right: -20px; bottom: -16px; }
	:global(:focus-visible) { outline: 3px solid var(--color-border-focus); outline-offset: 3px; }
	@media (max-width: 920px) { .botanical { opacity: .4; } .botanical-left { left: -120px; } .botanical-right { right: -120px; } }
	@media (max-width: 620px) {
		.login-header { min-height: 74px; padding: 0 18px; }
		.login-brand { gap: 9px; font-size: 1.1rem; }
		.login-brand-mark { width: 36px; height: 36px; }
		.back-link { font-size: .85rem; }
		.back-link span { display: none; }
		.login-main { min-height: calc(100svh - 74px); padding: 18px 16px 38px; }
		.login-card { padding: 34px 22px 28px; }
		.login-copy { margin-bottom: 30px; }
		.form-options { align-items: flex-start; flex-direction: column; gap: 14px; }
		.orb { opacity: .65; }
		.botanical { opacity: .22; }
	}
</style>
