<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from './logo.svelte';

	let isMenuOpen = false;
	let hamburger: HTMLElement | null;
	let navMenu: HTMLElement | null;
	let overlay: HTMLElement | null;

	onMount(() => {
		hamburger = document.querySelector('.hamburger');
		navMenu = document.querySelector('.nav-menu');

		if (hamburger && navMenu) {
			hamburger.addEventListener('click', toggleMenu);
		}

		// Close menu when clicking on nav links
		const navLinks = document.querySelectorAll('.nav-link');
		navLinks.forEach((link) => {
			link.addEventListener('click', closeMenu);
		});

		// Close menu when clicking overlay
		document.addEventListener('click', (e: Event) => {
			const target = e.target as HTMLElement;
			overlay = document.querySelector('.menu-overlay');

			if (overlay && target === overlay) {
				closeMenu();
			}
		});

		return () => {
			hamburger?.removeEventListener('click', toggleMenu);
			navLinks.forEach((link) => {
				link.removeEventListener('click', closeMenu);
			});
		};
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		hamburger?.classList.toggle('active');
		navMenu?.classList.toggle('active');

		// Get overlay element dynamically
		overlay = document.querySelector('.menu-overlay');
		overlay?.classList.toggle('active');

		// Prevent body scroll when menu is open
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		hamburger?.classList.remove('active');
		navMenu?.classList.remove('active');

		// Get overlay element dynamically
		overlay = document.querySelector('.menu-overlay');
		overlay?.classList.remove('active');
		document.body.style.overflow = '';
	}
</script>

<header id="header">
	<div class="container nav-container">
		<Logo />

		<nav>
			<ul class="nav-menu">
				<li class="nav-item"><a href="/" class="nav-link">Ana Sayfa</a></li>
				<li class="nav-item"><a href="/hakkimda" class="nav-link">Hakkımda</a></li>
				<li class="nav-item"><a href="/projeler" class="nav-link">Projeler</a></li>
				<li class="nav-item"><a href="/iletisim" class="nav-link">İletişim</a></li>
			</ul>

			<div class="hamburger">
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</div>
		</nav>
	</div>

	<div class="menu-overlay"></div>
</header>

<style>
	/* Keyframe Animations */
	@keyframes glow {
		0%,
		100% {
			text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
		}
		50% {
			text-shadow:
				0 0 40px rgba(255, 255, 255, 0.8),
				0 0 60px rgba(255, 255, 255, 0.4);
		}
	}

	:global(header) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background: linear-gradient(
			90deg,
			rgba(26, 26, 26, 0.9) 0%,
			rgba(30, 30, 30, 0.9) 50%,
			rgba(26, 26, 26, 0.9) 100%
		);
		backdrop-filter: blur(15px);
		box-shadow:
			0 2px 20px rgba(0, 0, 0, 0.3),
			0 0 40px rgba(0, 191, 255, 0.1);
		transition: all 0.3s ease;
		border-bottom: 1px solid rgba(0, 191, 255, 0.1);
	}

	:global(header::before) {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.05), transparent);
	}

	:global(header.scrolled) {
		padding: 10px 0;
		background: linear-gradient(
			90deg,
			rgba(18, 18, 18, 0.95) 0%,
			rgba(22, 22, 22, 0.95) 50%,
			rgba(18, 18, 18, 0.95) 100%
		);
		box-shadow:
			0 2px 25px rgba(0, 0, 0, 0.4),
			0 0 50px rgba(0, 191, 255, 0.15);
	}

	:global(.nav-container) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		position: relative;
		z-index: 2;
	}

	@media (max-width: 768px) {
		:global(.nav-container) {
			padding: 15px 0;
		}
	}

	.nav-menu {
		display: flex;
		list-style: none;
	}

	.nav-item {
		margin-left: 30px;
	}

	.nav-link {
		color: var(--light);
		text-decoration: none;
		font-weight: 500;
		position: relative;
		padding: 5px 0;
		transition: all 0.3s ease;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
	}

	.nav-link:hover {
		color: #00bfff;
		text-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
		transform: translateY(-2px);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, #00bfff, #8a2be2);
		transition: width 0.3s ease;
		box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.hamburger {
		display: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.hamburger:hover {
		transform: scale(1.1);
	}

	.bar {
		display: block;
		width: 25px;
		height: 3px;
		margin: 5px auto;
		background: linear-gradient(45deg, #00bfff, #8a2be2);
		transition: all 0.3s ease;
		border-radius: 2px;
		box-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
	}

	:global(.menu-overlay) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);
		z-index: 1;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		backdrop-filter: blur(3px);
		display: none;
	}

	:global(.menu-overlay.active) {
		opacity: 1;
		visibility: visible;
		display: block;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		:global(.menu-overlay) {
			display: block;
		}

		:global(.nav-menu) {
			position: fixed;
			top: 0;
			right: -100%;
			width: 80%;
			max-width: 320px;
			height: 100vh;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: linear-gradient(
				135deg,
				rgba(26, 26, 26, 0.85) 0%,
				rgba(30, 30, 30, 0.85) 50%,
				rgba(26, 26, 26, 0.85) 100%
			);
			backdrop-filter: blur(20px);
			border-left: 1px solid rgba(0, 191, 255, 0.3);
			z-index: 16;
			padding: 40px 30px;
			transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
			box-shadow:
				-10px 0 30px rgba(0, 0, 0, 0.3),
				0 0 20px rgba(0, 191, 255, 0.1);
			display: flex !important;
		}

		:global(.nav-menu.active) {
			right: 0;
		}

		:global(.nav-item) {
			margin: 2rem 0;
			opacity: 0;
			transform: translateX(50px);
			transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
			list-style: none;
			width: 100%;
		}

		:global(.nav-menu.active .nav-item) {
			opacity: 1;
			transform: translateX(0);
		}

		:global(.nav-menu.active .nav-item:nth-child(1)) {
			transition-delay: 0.1s;
		}
		:global(.nav-menu.active .nav-item:nth-child(2)) {
			transition-delay: 0.2s;
		}
		:global(.nav-menu.active .nav-item:nth-child(3)) {
			transition-delay: 0.3s;
		}
		:global(.nav-menu.active .nav-item:nth-child(4)) {
			transition-delay: 0.4s;
		}

		:global(.nav-link) {
			font-size: 1.3rem;
			padding: 18px 25px;
			display: block;
			border-radius: 15px;
			margin: 0;
			width: 100%;
			text-align: center;
			transition: all 0.3s ease;
			color: var(--light);
			text-decoration: none;
			position: relative;
			overflow: hidden;
			border: 1px solid transparent;
		}

		:global(.nav-link::before) {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.15), transparent);
			transition: left 0.6s ease;
		}

		:global(.nav-link:hover::before) {
			left: 100%;
		}

		:global(.nav-link:hover) {
			background: rgba(0, 191, 255, 0.1);
			border-color: rgba(0, 191, 255, 0.3);
			transform: translateX(-5px);
			color: #00bfff;
			box-shadow:
				0 5px 20px rgba(0, 191, 255, 0.2),
				inset 0 0 20px rgba(0, 191, 255, 0.05);
		}

		.hamburger {
			display: block;
			z-index: 17;
			position: relative;
		}

		:global(.hamburger.active .bar:nth-child(2)) {
			opacity: 0;
		}

		:global(.hamburger.active .bar:nth-child(1)) {
			transform: translateY(8px) rotate(45deg);
		}

		:global(.hamburger.active .bar:nth-child(3)) {
			transform: translateY(-8px) rotate(-45deg);
		}
	}
</style>
