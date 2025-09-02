<script>
	let formData = {
		firstName: '',
		lastName: '',
		email: '',
		subject: '',
		message: ''
	};
	let isSubmitting = false;
	let submitMessage = '';
	let isSuccess = false;

	async function handleSubmit(event) {
		event.preventDefault();
		isSubmitting = true;
		submitMessage = '';

		try {
			// Form verilerini konsola yazdır (gerçek projede burada API çağrısı yapılır)
			console.log('Form Data:', formData);

			// Simülasyon için 2 saniye bekle
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Başarılı mesaj
			isSuccess = true;
			submitMessage = 'Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağım.';

			// Formu temizle
			formData = {
				firstName: '',
				lastName: '',
				email: '',
				subject: '',
				message: ''
			};
		} catch (error) {
			isSuccess = false;
			submitMessage = 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.';
		} finally {
			isSubmitting = false;
			// 5 saniye sonra mesajı temizle
			setTimeout(() => {
				submitMessage = '';
			}, 5000);
		}
	}
</script>

<!-- Contact Page -->
<section id="contact" class="section">
	<div class="container">
		<h2 class="section-title">İletişim</h2>

		<div class="contact-content">
			<div class="contact-info">
				<h3>Benimle İletişime Geçin</h3>
				<p>
					Projeleriniz, iş birliği önerileri veya herhangi bir sorunuz için bana ulaşabilirsiniz.
					Size en kısa sürede geri dönüş yapacağım.
				</p>

				<div class="contact-methods">
					<div class="contact-item">
						<div class="contact-icon">
							<i class="fas fa-envelope"></i>
						</div>
						<div class="contact-details">
							<h4>E-posta</h4>
							<a href="mailto:alperen@example.com">
								<p>alperen@example.com</p>
							</a>
						</div>
					</div>

					<div class="contact-item">
						<div class="contact-icon">
							<i class="fas fa-phone"></i>
						</div>
						<div class="contact-details">
							<h4>Telefon</h4>
							<p>+90 (555) 123 45 67</p>
						</div>
					</div>

					<div class="contact-item">
						<div class="contact-icon">
							<i class="fas fa-map-marker-alt"></i>
						</div>
						<div class="contact-details">
							<h4>Konum</h4>
							<p>İstanbul, Türkiye</p>
						</div>
					</div>

					<div class="contact-item">
						<div class="contact-icon">
							<i class="fab fa-linkedin"></i>
						</div>
						<div class="contact-details">
							<h4>LinkedIn</h4>
							<p>linkedin.com/in/alperen-goney</p>
						</div>
					</div>
				</div>

				<div class="social-links">
					<a
						href="https://www.instagram.com/chosensworld1"
						target="_blank"
						class="social-link"
						aria-label="Instagram"
					>
						<i class="fab fa-instagram"></i>
					</a>
					<a href="#" target="_blank" class="social-link" aria-label="Twitter">
						<i class="fab fa-twitter"></i>
					</a>
					<a href="#" target="_blank" class="social-link" aria-label="LinkedIn">
						<i class="fab fa-linkedin-in"></i>
					</a>
					<a href="#" class="social-link" aria-label="Behance">
						<i class="fab fa-behance"></i>
					</a>
				</div>
			</div>

			<div class="contact-form-container">
				<form class="contact-form" on:submit={handleSubmit}>
					{#if submitMessage}
						<div class="alert {isSuccess ? 'alert-success' : 'alert-error'}">
							{submitMessage}
						</div>
					{/if}

					<div class="form-row">
						<div class="form-group">
							<label for="firstName">Ad</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								bind:value={formData.firstName}
								required
							/>
						</div>
						<div class="form-group">
							<label for="lastName">Soyad</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								bind:value={formData.lastName}
								required
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="email">E-posta</label>
						<input type="email" id="email" name="email" bind:value={formData.email} required />
					</div>

					<div class="form-group">
						<label for="subject">Konu</label>
						<select id="subject" name="subject" bind:value={formData.subject} required>
							<option value="">Konu seçiniz</option>
							<option value="collaboration">İş Birliği</option>
							<option value="project">Proje Talebi</option>
							<option value="consultation">Danışmanlık</option>
							<option value="other">Diğer</option>
						</select>
					</div>

					<div class="form-group">
						<label for="message">Mesajınız</label>
						<textarea
							id="message"
							name="message"
							rows="6"
							placeholder="Mesajınızı buraya yazın..."
							bind:value={formData.message}
							required
						></textarea>
					</div>

					<button type="submit" class="submit-btn" disabled={isSubmitting}>
						{#if isSubmitting}
							<span>Gönderiliyor...</span>
							<i class="fas fa-spinner fa-spin"></i>
						{:else}
							<span>Mesaj Gönder</span>
							<i class="fas fa-paper-plane"></i>
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- Map Section -->
<section id="map" class="map-section">
	<div class="container">
		<h3>Konum</h3>
		<div class="map-container">
			<div class="map-placeholder">
				<i class="fas fa-map-marked-alt"></i>
				<p>İstanbul, Türkiye</p>
			</div>
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

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	/* Section Background */
	#contact {
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

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
	}

	.contact-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: start;
	}

	.contact-info h3 {
		font-size: 2rem;
		margin-bottom: 20px;
		color: #fff;
		text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
	}

	.contact-info p {
		color: #ccc;
		line-height: 1.6;
		margin-bottom: 40px;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
	}

	.contact-methods {
		margin-bottom: 40px;
	}

	.contact-item {
		display: flex;
		align-items: center;
		margin-bottom: 30px;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		padding: 20px;
		border-radius: 15px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		animation: fadeInUp 0.6s ease forwards;
	}

	.contact-item:hover {
		transform: translateX(10px);
		box-shadow: 0 10px 25px rgba(0, 191, 255, 0.2);
		border-color: rgba(0, 191, 255, 0.3);
	}

	.contact-icon {
		width: 50px;
		height: 50px;
		background: linear-gradient(45deg, #00bfff, #8a2be2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20px;
		color: white;
		font-size: 1.2rem;
		box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
	}

	.contact-details h4 {
		color: #fff;
		margin-bottom: 5px;
		font-size: 1.1rem;
	}

	.contact-details p {
		color: #00bfff;
		margin: 0;
		font-weight: 500;
	}

	.social-links {
		display: flex;
		gap: 15px;
	}

	.social-link {
		width: 50px;
		height: 50px;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 191, 255, 0.05));
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--light);
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-decoration: none;
		font-size: 1.2rem;
	}

	.social-link:hover {
		background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
		transform: translateY(-5px) scale(1.1);
		box-shadow: 0 10px 25px rgba(0, 191, 255, 0.4);
		border-color: rgba(0, 191, 255, 0.3);
	}

	/* Alert Styles */
	.alert {
		padding: 15px 20px;
		margin-bottom: 20px;
		border-radius: 10px;
		backdrop-filter: blur(10px);
		border: 1px solid;
		animation: slideDown 0.3s ease;
	}

	.alert-success {
		background: linear-gradient(145deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
		border-color: rgba(34, 197, 94, 0.3);
		color: #22c55e;
	}

	.alert-error {
		background: linear-gradient(145deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
		border-color: rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Contact Form */
	.contact-form-container {
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		padding: 40px;
		border-radius: 20px;
		backdrop-filter: blur(15px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group label {
		color: #fff;
		margin-bottom: 8px;
		font-weight: 500;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 12px 15px;
		color: #fff;
		font-size: 1rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		outline: none;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		border-color: rgba(0, 191, 255, 0.5);
		box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(0, 191, 255, 0.05));
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.submit-btn {
		background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
		color: white;
		border: none;
		padding: 15px 30px;
		border-radius: 30px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
		position: relative;
		overflow: hidden;
	}

	.submit-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.submit-btn:hover::before {
		left: 100%;
	}

	.submit-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(0, 191, 255, 0.4);
	}

	/* Map Section */
	.map-section {
		background: linear-gradient(135deg, rgba(138, 43, 226, 0.05) 0%, rgba(0, 191, 255, 0.05) 100%);
		padding: 80px 0;
	}

	.map-section h3 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 40px;
		color: #fff;
		text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
	}

	.map-container {
		max-width: 800px;
		margin: 0 auto;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
	}

	.map-placeholder {
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		height: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(15px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.map-placeholder i {
		font-size: 3rem;
		color: #00bfff;
		margin-bottom: 15px;
		animation: pulse 2s ease-in-out infinite;
	}

	.map-placeholder p {
		color: #fff;
		font-size: 1.2rem;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.contact-content {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.form-row {
			grid-template-columns: 1fr;
			gap: 15px;
		}

		.section-title {
			font-size: 2rem;
			margin-bottom: 40px;
		}

		.contact-form-container {
			padding: 30px 20px;
		}

		.contact-item {
			flex-direction: column;
			text-align: center;
		}

		.contact-icon {
			margin-right: 0;
			margin-bottom: 15px;
		}

		.social-links {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.contact-info h3 {
			font-size: 1.5rem;
		}

		.contact-form-container {
			padding: 20px 15px;
		}

		.map-placeholder {
			height: 200px;
		}

		.map-placeholder i {
			font-size: 2rem;
		}
	}
</style>
