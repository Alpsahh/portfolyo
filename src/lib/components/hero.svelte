<!-- Hero Section -->
<section id="home" class="hero">
	<div class="video-background">
		<video autoplay muted loop playsinline id="bgVideo">
			<source src="a.webm" type="video/webm" />
		</video>
		<div class="video-overlay"></div>
	</div>
	<div class="container hero-content">
		<h1 class="hero-title">CHOSEN'S WORLD</h1>
		<h2 class="hero-subtitle">İç Mimar & İçerik Üreticisi</h2>
		<p class="hero-description">
			Modern ve fütürist tasarımlar üzerine çalışan bir iç mimarlık öğrencisiyim. Teknoloji, VR ve
			içerik üretimi üzerine projeler geliştiriyorum.
		</p>
		<a href="#projects" class="btn">Projelerimi İncele</a>
	</div>
</section>

<style>
	/* Keyframe Animations */
	@keyframes glow {
		0%, 100% { 
			text-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
		}
		50% { 
			text-shadow: 0 0 40px rgba(0, 191, 255, 0.8), 
						 0 0 60px rgba(0, 191, 255, 0.4);
		}
	}

	/* Hero Section */
	.hero {
		height: 100vh;
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		padding-top: 80px;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, 
		rgba(0, 119, 255, 0.5) 0%,
			
			rgba(0, 0, 0, 0) 50%,
			
			rgba(0, 119, 255, 0.5) 100%);
		z-index: -1;
	}

	.hero-content {
		max-width: 800px;
		z-index: 1;
		position: relative;
	}


	.hero-title {
		font-size: 4rem;
		margin-bottom: 20px;
		background: linear-gradient(90deg, #ffffff, #00bfff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 1s ease forwards, glow 2s ease-in-out infinite;
		text-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
	}

	.hero-subtitle {
		font-size: 1.5rem;
		margin-bottom: 30px;
		color: var(--light);
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 1s ease 0.2s forwards;
		text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
	}

	.hero-description {
		font-size: 1.1rem;
		margin-bottom: 40px;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 1s ease 0.4s forwards;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(5px);
		padding: 20px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.video-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -3;
		overflow: hidden;
	}

	#bgVideo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.7) contrast(1.2);
	}

	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		z-index: 1;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 3rem;
		}
		
		.hero-subtitle {
			font-size: 1.2rem;
		}
		
		.hero-description {
			font-size: 1rem;
		}
	}
</style>
