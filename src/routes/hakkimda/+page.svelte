<div class="about-gradient">
	<!-- About Section -->
	<section id="about" class="section">
		<div class="container">
			<h2 class="section-title">Hakkımda</h2>

			<div class="about-content">
				<div class="about-image">
					<img src="/images/cv/cv.png" alt="Alperen Şahin Goney" />
				</div>

				<div class="about-text">
					<h3>Yaratıcı Tasarımlar, İnovatif Çözümler</h3>
					<p>
						Ben Alperen Şahin Göney, İç Mimarlık ve Çevre Tasarımı alanında bir tasarımcıyım.
						Tasarım süreçlerimde estetik, fonksiyon ve kullanıcı deneyimini bütüncül bir yaklaşımla
						birleştiriyorum. Bölümüm itibaren modern ve fütürist konseptlerde mekan tasarımı üzerine
						çalıştım; özellikle VR teknolojilerini kullanarak oyunlaştırılmış ve etkileşim odaklı
						mekan deneyimleri geliştirmeye odaklandım.
					</p>
					<p>
						Robotik ve yazılım alanındaki deneyimlerim, tasarım sürecinde analitik düşünceyi
						teknoloji odaklı yaklaşımlarla bütünleştirmemi sağlıyor. TÜBİTAK projeleri kapsamında
						sürdürülebilirlik, deprem güvenliği ve eğitim odaklı çözümler ürettim; halkın
						bilinçlendirilmesine yönelik uygulamalı projelerde aktif rol aldım.
					</p>
					<p>
						Gönüllü olarak katıldığım projelerde toplumsal faydayı ön planda tuttum. Hem saha hem
						masa başı çalışmalarda edindiğim deneyimler sayesinde proje yönetimi, tasarım geliştirme
						ve içerik üretimi süreçlerinde kapsamlı bir perspektife sahibim.
					</p>
					<p>
						Hedefim, estetik ve fonksiyonelliği bir araya getiren, kullanıcı odaklı ve VR
						teknolojisi ile entegre mekanlar tasarlamak. Disiplinler arası iş birliği ve yenilikçi
						çözümler üretme yaklaşımıyla fark yaratan işler ortaya koymayı amaçlıyorum.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section id="skills" class="section">
		<div class="container">
			<h2 class="section-title">Program Becerileri</h2>

			<div class="skills-container">
				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-pen-ruler"></i>
					</div>
					<h3 class="skill-name">Autocad</h3>
					<p>İleri düzey teknik çizim ve projelendirme</p>
				</div>

				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-cube"></i>
					</div>
					<h3 class="skill-name">SketchUp</h3>
					<p>3D modelleme ve görselleştirme</p>
				</div>

				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-building"></i>
					</div>
					<h3 class="skill-name">Lumion</h3>
					<p>Foto-gerçekçi render ve animasyon</p>
				</div>

				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-palette"></i>
					</div>
					<h3 class="skill-name">Photoshop</h3>
					<p>Görsel düzenleme ve post-production</p>
				</div>

				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-video"></i>
					</div>
					<h3 class="skill-name">Premiere Pro</h3>
					<p>Video kurgu ve montaj</p>
				</div>

				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-lightbulb"></i>
					</div>
					<h3 class="skill-name">DIALux</h3>
					<p>Tasarım ve Hesaplama</p>
				</div>

				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-cube"></i>
					</div>
					<h3 class="skill-name">3Ds max</h3>
					<p>3D modelleme ve görselleştirme</p>
				</div>

				<div class="skill-item">
					<div class="skill-icon">
						<i class="fa-solid fa-vr-cardboard"></i>
					</div>
					<h3 class="skill-name">VR/AR Uygulamaları</h3>
					<p>Sanal ve artırılmış gerçeklik deneyimleri</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Keyframe Animations */
	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(200%);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes moveInCircle {
		0% {
			transform: translate(0, 0), rotate(0deg);
		}
		25% {
			transform: translate(100px, -100px);
		}
		50% {
			transform: translate(0, -200px);
		}
		75% {
			transform: translate(-100px, -100px);
		}
		100% {
			transform: translate(0, 0), rotate(360deg);
		}
	}
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
			transform: scale(1.05);
		}
	}

	@keyframes sparkle {
		0%,
		100% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Section Backgrounds */
	.about-gradient {
		background: linear-gradient(
			135deg,
			rgba(0, 119, 255, 0.2) 0%,

			rgba(0, 0, 0, 0) 30%,
			rgba(0, 0, 0, 0) 70%,

			rgba(0, 119, 255, 0.2) 100%
		);
		position: relative;
		overflow: hidden;
		margin-bottom: 4rem;
	}

	.about-gradient::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		animation: shimmer 5.31s infinite;
		animation-direction: alternate;
	}

	/* About Section */
	.about-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 50px;
		align-items: center;
		position: relative;
		z-index: 2;
	}
	.about-image {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		animation: crazyEffect 1s ease-in-out infinite;
	}

	.about-image::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			135deg,
			rgba(0, 119, 255, 0.2) 0%,

			rgba(0, 0, 0, 0) 30%,
			rgba(0, 0, 0, 0) 70%,

			rgba(0, 119, 255, 0.2) 100%
		);
		animation: glow 4s linear infinite;
		border-radius: 20px;
		z-index: -1;
	}

	.about-image img {
		width: 100%;
		height: auto;
		display: block;
		transition: all 0.5s ease;
		border-radius: 20px;
	}

	.about-image:hover img {
		transform: scale(1.05);
		filter: brightness(1.1) contrast(1.1);
	}

	.about-text {
		position: relative;
	}

	.about-text h3 {
		font-size: 1.8rem;
		margin-bottom: 20px;
		background: linear-gradient(90deg, #ffffff, #00bfff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;

		text-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
	}

	.about-text p {
		margin-bottom: 15px;
		line-height: 1.8;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
	}

	/* Skills Section */
	.skills-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 30px;
	}

	.skill-item {
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.05));
		padding: 30px;
		border-radius: 20px;
		text-align: center;
		transition: all 0.3s ease;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
	}

	.skill-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.skill-item:hover::before {
		left: 100%;
	}

	.skill-item:hover {
		transform: translateY(-15px) scale(1.02);
		box-shadow:
			0 25px 50px rgba(0, 191, 255, 0.3),
			0 0 50px rgba(0, 191, 255, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		border-color: rgba(0, 191, 255, 0.3);
	}
	.skill-icon {
		font-size: 3rem;
		background: linear-gradient(45deg, #00bfff, #8a2be2, #ff1493);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 20px;
		animation: pulse 2s ease-in-out infinite;
		filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.3));
	}

	.skill-item:hover .skill-icon {
		animation: pulse 0.5s ease-in-out infinite;
		filter: drop-shadow(0 0 20px rgba(0, 191, 255, 0.6));
	}

	.skill-name {
		font-size: 1.2rem;
		margin-bottom: 10px;
		font-weight: 600;
		color: #fff;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.skills-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			gap: 20px;
		}
	}
</style>
