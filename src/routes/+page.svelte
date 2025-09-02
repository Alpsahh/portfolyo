<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import type { PageData } from './$types';

	let { data } = $props();
</script>

<Hero />

<section id="projects" class="section">
	<div class="container">
		<h2 class="section-title">Projelerim</h2>

		<div class="projects-container">
			{#each data.mapped as project (project.slug)}
				<a href={`/projeler/${project.slug}`} class="project-item" data-project={project.slug}>
					<img src={project.mainImage} alt={project.title} class="project-image" />
					<div class="project-overlay">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-category">{project.category}</p>
					</div>
				</a>
			{/each}
			<a href="/projeler" class="project-item show-all-projects">
				<div class="show-all-content">
					<div class="show-all-icon">📁</div>
					<h3 class="project-title">Tüm Projeler</h3>
					<p class="project-category">Daha Fazla Göster</p>
				</div>
			</a>
		</div>
	</div>
</section>

<style>
	/* Keyframe Animations */
	@keyframes glow {
		0%,
		100% {
			box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
		}
		50% {
			box-shadow:
				0 0 40px rgba(0, 191, 255, 0.8),
				0 0 60px rgba(0, 191, 255, 0.4);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.02);
		}
	}

	/* Section Background */
	#projects {
		background: #111111;
		position: relative;
		overflow: hidden;
	}

	/* Projects Section */
	.projects-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 30px;
		position: relative;
		z-index: 2;
	}

	.project-item {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.3),
			0 0 20px rgba(0, 191, 255, 0.1);
		height: 250px;
		cursor: pointer;
		transition: all 0.5s ease;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.project-item::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(45deg, #00bfff, #8a2be2, #ff1493, #00bfff);
		background-size: 300% 300%;
		border-radius: 20px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-item:hover::before {
		opacity: 1;
	}

	.project-item:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow:
			0 20px 40px rgba(0, 191, 255, 0.3),
			0 0 50px rgba(0, 191, 255, 0.2);
	}

	.project-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.5s ease;
		border-radius: 18px;
	}

	.project-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.9) 0%,
			rgba(0, 191, 255, 0.1) 50%,
			transparent 100%
		);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 30px;
		opacity: 0;
		transition: all 0.3s ease;
		border-radius: 18px;
		backdrop-filter: blur(5px);
	}

	.project-item:hover .project-overlay {
		opacity: 1;
	}

	.project-item:hover .project-image {
		transform: scale(1.1);
		filter: brightness(1.1) contrast(1.1);
	}

	.project-title {
		font-size: 1.3rem;
		margin-bottom: 10px;
		color: white;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
		transform: translateY(20px);
		transition: transform 0.3s ease;
	}

	.project-item:hover .project-title {
		transform: translateY(0);
	}

	.project-category {
		background: linear-gradient(45deg, #00bfff, #8a2be2);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-size: 0.9rem;
		font-weight: 600;
		transform: translateY(20px);
		transition: transform 0.3s ease 0.1s;
	}

	.project-item:hover .project-category {
		transform: translateY(0);
	}

	.show-all-projects {
		background: linear-gradient(145deg, rgba(0, 191, 255, 0.1), rgba(138, 43, 226, 0.1));
		border: 2px dashed rgba(0, 191, 255, 0.3);
	}

	.show-all-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 30px;
	}

	.show-all-icon {
		font-size: 3rem;
		margin-bottom: 10px;
		opacity: 0.7;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.projects-container {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 20px;
		}

		.project-item {
			height: 200px;
		}
	}
</style>
