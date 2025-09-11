<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import projectsData from '$lib/data/projects.json';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let currentImageIndex = $state(0);
	let lightboxOpen = $state(false);
	let lightboxImageIndex = $state(0);
	let imageScale = $state(1);
	let imageTranslateX = $state(0);
	let imageTranslateY = $state(0);
	let isDragging = $state(false);
	let lastMouseX = $state(0);
	let lastMouseY = $state(0);
	let touchStartX = $state(0);
	let touchStartY = $state(0);
	let lastTouchDistance = $state(0);

	const project = $derived(data.project);

	function nextImage() {
		if (project?.gallery) {
			currentImageIndex = (currentImageIndex + 1) % project.gallery.length;
		}
	}

	function prevImage() {
		if (project?.gallery) {
			currentImageIndex =
				currentImageIndex === 0 ? project.gallery.length - 1 : currentImageIndex - 1;
		}
	}

	// Lightbox functions
	function openLightbox(index: number) {
		lightboxImageIndex = index;
		lightboxOpen = true;
		imageScale = 1;
		imageTranslateX = 0;
		imageTranslateY = 0;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		lightboxOpen = false;
		imageScale = 1;
		imageTranslateX = 0;
		imageTranslateY = 0;
		document.body.style.overflow = 'auto';
	}

	function nextLightboxImage() {
		if (project?.gallery) {
			lightboxImageIndex = (lightboxImageIndex + 1) % project.gallery.length;
			resetImagePosition();
		}
	}

	function prevLightboxImage() {
		if (project?.gallery) {
			lightboxImageIndex =
				lightboxImageIndex === 0 ? project.gallery.length - 1 : lightboxImageIndex - 1;
			resetImagePosition();
		}
	}

	function resetImagePosition() {
		imageScale = 1;
		imageTranslateX = 0;
		imageTranslateY = 0;
	}

	function zoomIn() {
		imageScale = Math.min(imageScale * 1.2, 3);
	}

	function zoomOut() {
		imageScale = Math.max(imageScale / 1.2, 0.5);
	}

	function resetZoom() {
		imageScale = 1;
		imageTranslateX = 0;
		imageTranslateY = 0;
	}

	function handleMouseDown(event: MouseEvent) {
		if (imageScale > 1) {
			isDragging = true;
			lastMouseX = event.clientX;
			lastMouseY = event.clientY;
			event.preventDefault();
			event.stopPropagation();
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging && imageScale > 1) {
			const deltaX = event.clientX - lastMouseX;
			const deltaY = event.clientY - lastMouseY;
			imageTranslateX += deltaX;
			imageTranslateY += deltaY;
			lastMouseX = event.clientX;
			lastMouseY = event.clientY;
			event.preventDefault();
			event.stopPropagation();
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	// Touch support for mobile
	function handleTouchStart(event: TouchEvent) {
		if (event.touches.length === 1 && imageScale > 1) {
			// Single touch for dragging
			isDragging = true;
			touchStartX = event.touches[0].clientX;
			touchStartY = event.touches[0].clientY;
			lastMouseX = touchStartX;
			lastMouseY = touchStartY;
			event.preventDefault();
			event.stopPropagation();
		} else if (event.touches.length === 2) {
			// Two touches for pinch-to-zoom
			isDragging = false;
			const touch1 = event.touches[0];
			const touch2 = event.touches[1];
			lastTouchDistance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
			);
			event.preventDefault();
			event.stopPropagation();
		}
	}

	function handleTouchMove(event: TouchEvent) {
		if (event.touches.length === 1 && isDragging && imageScale > 1) {
			// Single touch dragging
			const deltaX = event.touches[0].clientX - lastMouseX;
			const deltaY = event.touches[0].clientY - lastMouseY;
			imageTranslateX += deltaX;
			imageTranslateY += deltaY;
			lastMouseX = event.touches[0].clientX;
			lastMouseY = event.touches[0].clientY;
			event.preventDefault();
			event.stopPropagation();
		} else if (event.touches.length === 2) {
			// Pinch-to-zoom
			const touch1 = event.touches[0];
			const touch2 = event.touches[1];
			const currentDistance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
			);

			if (lastTouchDistance > 0) {
				const scaleFactor = currentDistance / lastTouchDistance;
				const newScale = Math.min(Math.max(imageScale * scaleFactor, 0.5), 3);
				imageScale = newScale;
			}

			lastTouchDistance = currentDistance;
			event.preventDefault();
			event.stopPropagation();
		}
	}

	function handleTouchEnd() {
		isDragging = false;
		lastTouchDistance = 0;
	}

	function handleWheel(event: WheelEvent) {
		event.preventDefault();
		event.stopPropagation();
		if (event.deltaY < 0) {
			zoomIn();
		} else {
			zoomOut();
		}
	}

	// Keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (!lightboxOpen) return;

		switch (event.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowLeft':
				prevLightboxImage();
				break;
			case 'ArrowRight':
				nextLightboxImage();
				break;
			case '+':
			case '=':
				zoomIn();
				break;
			case '-':
				zoomOut();
				break;
			case '0':
				resetZoom();
				break;
		}
	}

	$effect(() => {
		project;
		currentImageIndex = 0;
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>{project.title} | Alperen Portfolyo</title>
	<meta name="description" content={project.description} />
</svelte:head>

<svelte:window
	onkeydown={handleKeydown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
/>

<section class="project-hero">
	<div class="container">
		<div class="breadcrumb">
			<a href="/">Ana Sayfa</a>
			<span>/</span>
			<a href="/projeler">Projeler</a>
			<span>/</span>
			<span>{project.title}</span>
		</div>

		<h1 class="project-main-title">{project.title}</h1>
		<p class="project-subtitle">{project.subtitle}</p>

		<div class="project-badges">
			{#each project.badges as badge, index}
				<span class="badge badge-{index % 3}">{badge}</span>
			{/each}
		</div>
	</div>
</section>

<section class="project-content">
	<div class="container">
		<div class="content-grid">
			<div class="project-info">
				<div class="info-card">
					<h3>Proje Hakkında</h3>
					{#if Array.isArray(project.about)}
						{#each project.about as paragraph}
							<p>{paragraph}</p>
						{/each}
					{:else}
						<p>{project.description}</p>
					{/if}
				</div>

				{#if project.features}
					<div class="info-card">
						<h3>Özellikler</h3>
						<ul class="features-list">
							{#each project.features as feature}
								<li>
									<span class="feature-icon">{feature.icon}</span>
									<div class="feature-content">
										<strong>{feature.title}</strong>
										{#if feature.description}
											<p>{feature.description}</p>
										{/if}
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if project.details}
					<div class="info-card">
						<h3>Proje Detayları</h3>
						<div class="details-grid">
							{#if project.details.duration}
								<div class="detail-item">
									<span class="detail-label">Süre</span>
									<span class="detail-value">{project.details.duration}</span>
								</div>
							{/if}
							{#if project.details.team}
								<div class="detail-item">
									<span class="detail-label">Ekip</span>
									<span class="detail-value">{project.details.team}</span>
								</div>
							{/if}
							{#if project.details.budget}
								<div class="detail-item">
									<span class="detail-label">Bütçe</span>
									<span class="detail-value">{project.details.budget}</span>
								</div>
							{/if}
							{#if project.details.status}
								<div class="detail-item">
									<span class="detail-label">Durum</span>
									<span class="detail-value status">{project.details.status}</span>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<div class="project-gallery">
				<div class="gallery-container">
					<div class="gallery-main">
						<div class="image-wrapper">
							<button
								class="gallery-image-button"
								onclick={() => openLightbox(currentImageIndex)}
								type="button"
								aria-label="Galeri resmini büyütmek için tıklayın"
							>
								<img
									src={project.gallery[currentImageIndex]}
									alt={project.title}
									class="gallery-image"
								/>
								<div class="zoom-hint">🔍 Büyütmek için tıklayın</div>
							</button>
							{#if project.gallery.length > 1}
								<button
									class="gallery-nav prev"
									onclick={prevImage}
									type="button"
									aria-label="Önceki resim">‹</button
								>
								<button
									class="gallery-nav next"
									onclick={nextImage}
									type="button"
									aria-label="Sonraki resim">›</button
								>
							{/if}
						</div>
					</div>

					<div class="gallery-controls">
						{#if project.gallery.length > 1}
							<div class="image-counter">
								{currentImageIndex + 1} / {project.gallery.length}
							</div>
						{/if}
					</div>
					{#if project.gallery.length > 1}
						<div class="gallery-thumbnails">
							{#each project.gallery as image, index}
								<button
									class="thumbnail {index === currentImageIndex ? 'active' : ''}"
									onclick={() => (currentImageIndex = index)}
									type="button"
									aria-label="Resim {index + 1}'i görüntüle"
								>
									<img src={image} alt="Thumbnail {index + 1}" />
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

{#if project.impact}
	<section class="project-impact">
		<div class="container">
			<h3>Proje Etkisi</h3>
			<div class="impact-grid">
				{#each project.impact as impactItem, index}
					<div class="impact-item">
						<div class="impact-number">{index + 1}</div>
						<p>{impactItem}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<section class="related-projects">
	<div class="container">
		<h3>İlgili Projeler</h3>
		<div class="related-grid">
			{#each data.relatedProjects.slice(0, 3) as relatedProject}
				<a href="/projeler/{relatedProject.slug}" class="related-card">
					<img src={relatedProject.mainImage} alt={relatedProject.title} />
					<div class="related-content">
						<h4>{relatedProject.title}</h4>
						<p>{relatedProject.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Lightbox Modal -->
{#if lightboxOpen}
	<div
		class="lightbox-overlay"
		onclick={(e) => {
			if (e.target === e.currentTarget) {
				closeLightbox();
			}
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				closeLightbox();
			}
		}}
		role="dialog"
		aria-modal="true"
		aria-label="Resim büyütme"
		tabindex="-1"
	>
		<div class="lightbox-container">
			<button
				class="lightbox-close"
				onclick={(e) => {
					e.stopPropagation();
					closeLightbox();
				}}
				type="button"
				aria-label="Lightbox'ı kapat">×</button
			>

			<div class="lightbox-zoom-controls">
				<button
					class="zoom-control"
					onclick={(e) => {
						e.stopPropagation();
						zoomOut();
					}}
					type="button"
					aria-label="Uzaklaştır"
					disabled={imageScale <= 0.5}
				>
					−
				</button>
				<span class="zoom-level">{Math.round(imageScale * 100)}%</span>
				<button
					class="zoom-control"
					onclick={(e) => {
						e.stopPropagation();
						zoomIn();
					}}
					type="button"
					aria-label="Yakınlaştır"
					disabled={imageScale >= 3}
				>
					+
				</button>
				<button
					class="zoom-control reset"
					onclick={(e) => {
						e.stopPropagation();
						resetZoom();
					}}
					type="button"
					aria-label="Sıfırla"
				>
					⌂
				</button>
			</div>

			<div
				class="lightbox-image-wrapper"
				onmousedown={handleMouseDown}
				onwheel={handleWheel}
				ontouchstart={handleTouchStart}
				aria-label="Büyütülmüş resim - sürükleyerek hareket ettirin, tekrar tıklayarak kapatın"
				onclick={(e) => {
					e.stopPropagation();
					if (imageScale === 1 && !isDragging) closeLightbox();
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						e.stopPropagation();
						if (imageScale === 1) closeLightbox();
					}
				}}
				role="button"
				tabindex="0"
			>
				<img
					src={project.gallery[lightboxImageIndex]}
					alt="{project.title} - Görsel {lightboxImageIndex + 1}"
					class="lightbox-image {imageScale > 1 ? 'draggable' : ''}"
					style="transform: scale({imageScale}) translate({imageTranslateX /
						imageScale}px, {imageTranslateY / imageScale}px);"
					draggable="false"
				/>
			</div>

			{#if project.gallery.length > 1}
				<button
					class="lightbox-nav prev"
					onclick={(e) => {
						e.stopPropagation();
						prevLightboxImage();
					}}
					type="button"
					aria-label="Önceki resim"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="15,18 9,12 15,6"></polyline>
					</svg>
				</button>
				<button
					class="lightbox-nav next"
					onclick={(e) => {
						e.stopPropagation();
						nextLightboxImage();
					}}
					type="button"
					aria-label="Sonraki resim"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="9,6 15,12 9,18"></polyline>
					</svg>
				</button>
			{/if}

			<div class="lightbox-counter">
				{lightboxImageIndex + 1} / {project.gallery.length}
			</div>

			<div class="lightbox-controls">
				<div class="lightbox-thumbnails">
					{#each project.gallery as image, index}
						<button
							class="lightbox-thumb {index === lightboxImageIndex ? 'active' : ''}"
							onclick={(e) => {
								e.stopPropagation();
								lightboxImageIndex = index;
								resetImagePosition();
							}}
							type="button"
							aria-label="Resim {index + 1}'e geç"
						>
							<img src={image} alt="Thumbnail {index + 1}" />
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	/* Hero Section */
	.project-hero {
		background: linear-gradient(
			135deg,
			rgba(0, 191, 255, 0.1) 0%,
			rgba(138, 43, 226, 0.1) 50%,
			rgba(255, 20, 147, 0.1) 100%
		);
		padding: 100px 0 50px;
		text-align: center;
	}

	.breadcrumb {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-bottom: 30px;
		font-size: 0.9rem;
		opacity: 0.8;
	}

	.breadcrumb a {
		color: var(--primary);
		text-decoration: none;
		transition: opacity 0.3s ease;
	}

	.breadcrumb a:hover {
		opacity: 0.7;
	}

	.project-main-title {
		font-size: 3.5rem;
		margin-bottom: 20px;
		background: linear-gradient(90deg, #ffffff, #00bfff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.2;
	}

	.project-subtitle {
		font-size: 1.3rem;
		color: var(--gray);
		margin-bottom: 40px;
		font-weight: 300;
	}

	.project-badges {
		display: flex;
		justify-content: center;
		gap: 15px;
		flex-wrap: wrap;
	}

	.badge {
		padding: 8px 20px;
		border-radius: 25px;
		font-size: 0.9rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.badge-0 {
		background: linear-gradient(45deg, var(--primary), #0099cc);
		color: white;
	}

	.badge-1 {
		background: linear-gradient(45deg, var(--secondary), #8a2be2);
		color: white;
	}

	.badge-2 {
		background: linear-gradient(45deg, #ff1493, #ff69b4);
		color: white;
	}

	/* Content Section */
	.project-content {
		padding: 80px 0;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: start;
	}

	.info-card {
		background: rgba(30, 30, 30, 0.8);
		border-radius: 15px;
		padding: 30px;
		margin-bottom: 30px;
		border: 1px solid rgba(0, 191, 255, 0.1);
		backdrop-filter: blur(10px);
	}

	.info-card h3 {
		color: var(--primary);
		margin-bottom: 20px;
		font-size: 1.5rem;
	}

	.info-card p {
		line-height: 1.7;
		margin-bottom: 15px;
		color: var(--light);
	}

	.features-list {
		list-style: none;
		padding: 0;
	}

	.features-list li {
		display: flex;
		align-items: flex-start;
		gap: 15px;
		margin-bottom: 20px;
		padding: 15px;
		background: rgba(0, 191, 255, 0.05);
		border-radius: 10px;
		border-left: 3px solid var(--primary);
	}

	.feature-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.feature-content strong {
		color: var(--light);
		display: block;
		margin-bottom: 5px;
	}

	.feature-content p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--gray);
	}

	.details-grid {
		display: grid;
		gap: 15px;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 0;
		border-bottom: 1px solid rgba(0, 191, 255, 0.1);
	}

	.detail-label {
		font-weight: 600;
		color: var(--primary);
	}

	.detail-value {
		color: var(--light);
	}

	.detail-value.status {
		color: var(--primary);
		font-weight: 500;
	}

	/* Gallery */
	.project-gallery {
		position: relative;
		height: 100%;
	}

	.gallery-container {
		position: sticky;
		top: 120px;
	}

	.gallery-container::-webkit-scrollbar {
		display: none; /* Chrome/Safari/Webkit */
	}

	.gallery-main {
		position: relative;
		border-radius: 15px;
		overflow: hidden;
		margin-bottom: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.image-wrapper {
		position: relative;
		cursor: pointer;
	}

	.gallery-image {
		width: 100%;
		height: 400px;
		object-fit: cover;
		display: block;
		transition: transform 0.3s ease;
	}

	.gallery-image.clickable {
		cursor: pointer;
	}

	.gallery-image.clickable:hover {
		transform: scale(1.05);
	}

	.zoom-hint {
		position: absolute;
		bottom: 15px;
		right: 15px;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 8px 12px;
		border-radius: 20px;
		font-size: 0.8rem;
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.image-wrapper:hover .zoom-hint {
		opacity: 1;
	}

	.gallery-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.7);
		color: white;
		border: none;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		font-size: 1.5rem;
		opacity: 0.8;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.gallery-nav:hover {
		opacity: 1;
		background: rgba(0, 191, 255, 0.8);
		transform: translateY(-50%) scale(1.1);
	}

	.gallery-nav.prev {
		left: 20px;
	}

	.gallery-nav.next {
		right: 20px;
	}

	.gallery-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 15px;
		padding: 0 10px;
	}

	.image-counter {
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 8px 16px;
		border-radius: 15px;
		font-size: 0.9rem;
		backdrop-filter: blur(10px);
	}

	.gallery-thumbnails {
		display: flex;
		gap: 10px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.thumbnail {
		width: 80px;
		height: 60px;
		border-radius: 8px;
		overflow: hidden;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		background: none;
		padding: 0;
		position: relative;
	}

	.thumbnail.active {
		border-color: var(--primary);
		transform: scale(1.1);
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		cursor: pointer;
	}

	.thumbnail:hover {
		transform: scale(1.05);
		border-color: rgba(0, 191, 255, 0.5);
	}

	/* Impact Section */
	.project-impact {
		background: rgba(30, 30, 30, 0.5);
		padding: 80px 0;
	}

	.project-impact h3 {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 50px;
		color: var(--primary);
	}

	.impact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
	}

	.impact-item {
		text-align: center;
		padding: 30px;
		background: rgba(0, 191, 255, 0.05);
		border-radius: 15px;
		border: 1px solid rgba(0, 191, 255, 0.1);
	}

	.impact-number {
		width: 50px;
		height: 50px;
		background: var(--primary);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1.2rem;
		margin: 0 auto 20px;
	}

	/* Related Projects */
	.related-projects {
		padding: 80px 0;
	}

	.related-projects h3 {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 50px;
		color: var(--primary);
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.related-card {
		background: rgba(30, 30, 30, 0.8);
		border-radius: 15px;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		border: 1px solid rgba(0, 191, 255, 0.1);
	}

	.related-card:hover {
		transform: translateY(-10px);
		border-color: var(--primary);
		box-shadow: 0 20px 40px rgba(0, 191, 255, 0.2);
	}

	.related-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.related-card:hover img {
		transform: scale(1.1);
	}

	.related-content {
		padding: 20px;
	}

	.related-content h4 {
		margin-bottom: 10px;
		color: var(--primary);
		font-size: 1.2rem;
	}

	.related-content p {
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--gray);
		margin: 0;
	}

	/* Lightbox Styles */
	.lightbox-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.95);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		animation: fadeIn 0.3s ease;
	}

	.lightbox-container {
		position: relative;
		max-width: 95vw;
		max-height: 95vh;
		cursor: default;
		user-select: none;
		z-index: 10000;
	}

	.lightbox-image-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 90vw;
		max-height: 80vh;
		position: relative;
		overflow: hidden;
		border: none;
		background: none;
		padding: 0;
		cursor: grab;
		outline: none;
	}

	.lightbox-image-wrapper:active {
		cursor: grabbing;
	}

	.lightbox-image-wrapper:focus {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}

	/* Prevent text selection on touch devices */
	.lightbox-image-wrapper {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-touch-callout: none;
		-webkit-tap-highlight-color: transparent;
	}

	.lightbox-image {
		max-width: 100%;
		max-height: 80vh;
		object-fit: contain;
		border-radius: 10px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		transition: transform 0.1s ease-out;
		transform-origin: center center;
	}

	.lightbox-image.draggable {
		cursor: grab;
	}

	.lightbox-image.draggable:active {
		cursor: grabbing;
	}

	.lightbox-zoom-controls {
		position: absolute;
		top: -70px;
		left: 0;
		display: flex;
		gap: 10px;
		align-items: center;
		background: rgba(0, 0, 0, 0.8);
		padding: 8px 16px;
		border-radius: 25px;
		backdrop-filter: blur(10px);
		z-index: 10001;
	}

	.zoom-control {
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		font-size: 1.2rem;
		font-weight: bold;
	}

	.zoom-control:hover:not(:disabled) {
		background: var(--primary);
		border-color: var(--primary);
		transform: scale(1.1);
	}

	.zoom-control:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.zoom-control:active:not(:disabled) {
		transform: scale(0.95);
		background: rgba(0, 191, 255, 0.8);
	}

	.zoom-control.reset {
		font-size: 1rem;
	}

	.zoom-level {
		color: white;
		font-size: 0.9rem;
		font-weight: 500;
		min-width: 50px;
		text-align: center;
	}

	.lightbox-close {
		position: absolute;
		top: -60px;
		right: 0;
		background: none;
		border: none;
		color: white;
		font-size: 3rem;
		cursor: pointer;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.3s ease;
		z-index: 10001;
	}

	.lightbox-close:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: scale(1.1);
	}

	.lightbox-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: none;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		z-index: 10001;
	}

	.lightbox-nav:hover {
		background: var(--primary);
		transform: translateY(-50%) scale(1.1);
	}

	.lightbox-nav:active {
		transform: translateY(-50%) scale(0.95);
	}

	.lightbox-nav.prev {
		left: -80px;
	}

	.lightbox-nav.next {
		right: -80px;
	}

	.lightbox-counter {
		position: absolute;
		bottom: -60px;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		background: rgba(0, 0, 0, 0.7);
		padding: 10px 20px;
		border-radius: 25px;
		font-size: 0.9rem;
		backdrop-filter: blur(10px);
	}

	.lightbox-controls {
		position: absolute;
		bottom: -120px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 600px;
	}

	.lightbox-thumbnails {
		display: flex;
		gap: 10px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.lightbox-thumb {
		width: 60px;
		height: 45px;
		border-radius: 5px;
		overflow: hidden;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		background: none;
		padding: 0;
	}

	.lightbox-thumb.active {
		border-color: var(--primary);
		transform: scale(1.1);
	}

	.lightbox-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.lightbox-thumb:hover {
		transform: scale(1.05);
		border-color: rgba(0, 191, 255, 0.5);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.gallery-container {
			top: 60px;
			max-height: calc(100vh - 120px);
		}
	}

	@media (max-width: 768px) {
		.content-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.project-main-title {
			font-size: 2.5rem;
		}

		.project-badges {
			gap: 10px;
		}

		.gallery-container {
			position: static;
			top: auto;
			max-height: none;
			overflow-y: visible;
		}

		.gallery-image {
			height: 250px;
		}

		.gallery-nav {
			width: 40px;
			height: 40px;
		}

		.gallery-nav.prev {
			left: 10px;
		}

		.gallery-nav.next {
			right: 10px;
		}

		.thumbnail {
			width: 60px;
			height: 45px;
		}

		.lightbox-nav.prev {
			left: 20px;
		}

		.lightbox-nav.next {
			right: 20px;
		}

		.lightbox-nav {
			width: 50px;
			height: 50px;
			z-index: 10001;
		}

		.breadcrumb {
			flex-wrap: wrap;
		}

		.lightbox-controls {
			bottom: -150px;
		}

		.lightbox-counter {
			bottom: -40px;
		}

		.lightbox-close {
			top: 20px;
			right: 20px;
			font-size: 2rem;
			width: 40px;
			height: 40px;
			position: fixed;
			z-index: 10002;
		}

		.lightbox-zoom-controls {
			top: 20px;
			left: 50%;
			transform: translateX(-50%);
			position: fixed;
			z-index: 10002;
		}

		.zoom-control {
			width: 40px;
			height: 40px;
			font-size: 1.2rem;
		}

		.zoom-level {
			font-size: 0.9rem;
			min-width: 50px;
		}

		.lightbox-image-wrapper {
			max-width: 95vw;
			max-height: 70vh;
		}

		.lightbox-image {
			max-height: 70vh;
		}
	}

	/* Utilities */
	.clickable {
		cursor: pointer;
	}

	/* Gallery Image Button */
	.gallery-image-button {
		display: block;
		width: 100%;
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		position: relative;
		outline: none;
	}

	.gallery-image-button:focus {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}

	.gallery-image-button:hover .gallery-image {
		transform: scale(1.05);
	}

	.gallery-image-button:hover .zoom-hint {
		opacity: 1;
	}
</style>
