<script>
	import projectsData from '$lib/data/projects.json';

	// JSON objesini array'e çevir ve sıralama için
	const allProjects = Object.entries(projectsData).map(([slug, project]) => ({
		slug,
		...project
	}));

	let projects = allProjects;
	let activeFilter = 'all';
	let searchTerm = '';

	// Mevcut kategorileri al
	const categories = ['all', ...new Set(allProjects.map((p) => p.category))];

	function filterProjects(category) {
		activeFilter = category;
		updateFilteredProjects();
	}

	function updateFilteredProjects() {
		projects = allProjects.filter((project) => {
			const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
			const matchesSearch =
				searchTerm === '' ||
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

			return matchesCategory && matchesSearch;
		});
	}

	// Arama terimi değiştiğinde filtreleri güncelle
	$: if (searchTerm !== undefined) {
		updateFilteredProjects();
	}
</script>

<!-- Projects Detail Page -->
<section id="projects-detail" class="section">
	<div class="container">
		<h2 class="section-title">Tüm Projelerim</h2>

		<!-- Filtre ve Arama -->
		<div class="filter-section">
			<div class="search-container">
				<input
					type="text"
					placeholder="Projeler arasında ara..."
					bind:value={searchTerm}
					class="search-input"
				/>
				<i class="fas fa-search search-icon"></i>
			</div>

			<div class="filter-buttons">
				{#each categories as category}
					<button
						class="filter-btn {activeFilter === category ? 'active' : ''}"
						on:click={() => filterProjects(category)}
					>
						{category === 'all' ? 'Tümü' : category}
					</button>
				{/each}
			</div>
		</div>

		<!-- Sonuç Sayısı -->
		<div class="results-info">
			<p>{projects.length} proje bulundu</p>
		</div>

		<div class="projects-grid">
			{#each projects as project}
				<a
					href="/projeler/{project.slug}"
					class="project-card"
					data-category={project.category.toLowerCase()}
				>
					<div class="project-image-container">
						<img src={project.mainImage} alt={project.title} class="project-image" />
						<div class="project-badge">{project.category}</div>
					</div>
					<div class="project-content">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">
							{project.description}
						</p>
						<div class="project-tags">
							{#each project.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					</div>
				</a>
			{/each}
		</div>

		{#if projects.length === 0}
			<div class="no-results">
				<i class="fas fa-search no-results-icon"></i>
				<h3>Hiç proje bulunamadı</h3>
				<p>Farklı anahtar kelimeler veya filtreler deneyebilirsiniz.</p>
			</div>
		{/if}
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

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Section Background */
	#projects-detail {
		background: linear-gradient(
			135deg,
			rgba(0, 191, 255, 0.05) 0%,
			rgba(138, 43, 226, 0.05) 50%,
			rgba(255, 20, 147, 0.05) 100%
		);
		position: relative;
		overflow: hidden;
		min-height: 100vh;
	}

	.section-title {
		text-align: center;
		font-size: 3rem;
		margin-bottom: 60px;
		background: linear-gradient(90deg, #ffffff, #00bfff);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 40px;
		position: relative;
		z-index: 2;
	}

	.project-card {
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		border-radius: 25px;
		overflow: hidden;
		box-shadow:
			0 15px 35px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(15px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.5s ease;
		position: relative;
		animation: fadeInUp 0.6s ease forwards;
	}

	.project-card::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(45deg, #00bfff, #8a2be2, #ff1493, #00bfff);
		background-size: 300% 300%;
		border-radius: 25px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover::before {
		opacity: 1;
	}

	.project-card:hover {
		transform: translateY(-15px) scale(1.02);
		box-shadow:
			0 25px 50px rgba(0, 191, 255, 0.3),
			0 0 50px rgba(0, 191, 255, 0.2);
	}

	.project-image-container {
		position: relative;
		height: 250px;
		overflow: hidden;
	}

	.project-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.5s ease;
	}

	.project-card:hover .project-image {
		transform: scale(1.1);
		filter: brightness(1.1) contrast(1.1);
	}

	.project-badge {
		position: absolute;
		top: 20px;
		right: 20px;
		background: linear-gradient(45deg, #00bfff, #8a2be2);
		color: white;
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 1px;
		box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
		backdrop-filter: blur(10px);
	}

	.project-content {
		padding: 30px;
	}

	.project-title {
		font-size: 1.5rem;
		margin-bottom: 15px;
		color: #fff;
		font-weight: 700;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}

	.project-description {
		color: #ccc;
		line-height: 1.6;
		margin-bottom: 20px;
		text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.tag {
		background: rgba(0, 191, 255, 0.2);
		color: #00bfff;
		padding: 6px 12px;
		border-radius: 15px;
		font-size: 0.75rem;
		font-weight: 500;
		border: 1px solid rgba(0, 191, 255, 0.3);
		backdrop-filter: blur(5px);
		transition: all 0.3s ease;
	}

	.tag:hover {
		background: rgba(0, 191, 255, 0.3);
		transform: scale(1.05);
		box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
	}

	/* Filter Section Styles */
	.filter-section {
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin-bottom: 50px;
		padding: 30px;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		border-radius: 20px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.search-container {
		position: relative;
		max-width: 500px;
		margin: 0 auto;
	}

	.search-input {
		width: 100%;
		padding: 15px 50px 15px 20px;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 191, 255, 0.05));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 15px;
		color: white;
		font-size: 1rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		outline: none;
	}

	.search-input:focus {
		border-color: rgba(0, 191, 255, 0.3);
		box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.search-icon {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
		pointer-events: none;
	}

	.filter-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		justify-content: center;
	}

	.filter-btn {
		padding: 12px 24px;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 25px;
		color: white;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		text-transform: capitalize;
	}

	.filter-btn:hover {
		background: linear-gradient(45deg, rgba(0, 191, 255, 0.2), rgba(138, 43, 226, 0.2));
		border-color: rgba(0, 191, 255, 0.3);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(0, 191, 255, 0.2);
	}

	.filter-btn.active {
		background: linear-gradient(45deg, #00bfff, #8a2be2);
		border-color: transparent;
		color: white;
		box-shadow: 0 5px 20px rgba(0, 191, 255, 0.4);
	}

	.results-info {
		text-align: center;
		margin-bottom: 30px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9rem;
	}

	.no-results {
		text-align: center;
		padding: 60px 20px;
		color: rgba(255, 255, 255, 0.6);
	}

	.no-results-icon {
		font-size: 4rem;
		margin-bottom: 20px;
		opacity: 0.3;
	}

	.no-results h3 {
		font-size: 1.5rem;
		margin-bottom: 10px;
		color: white;
	}

	.no-results p {
		font-size: 1rem;
		opacity: 0.7;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.section-title {
			font-size: 2rem;
			margin-bottom: 40px;
		}

		.project-image-container {
			height: 200px;
		}

		.project-content {
			padding: 20px;
		}

		.filter-section {
			padding: 20px;
			gap: 20px;
		}

		.filter-buttons {
			justify-content: flex-start;
			gap: 10px;
		}

		.filter-btn {
			padding: 8px 16px;
			font-size: 0.8rem;
		}

		.search-input {
			padding: 12px 45px 12px 15px;
		}
	}
</style>
