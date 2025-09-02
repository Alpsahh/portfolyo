<script>
	import Logo from './logo.svelte';
</script>

<footer>
	<div class="container">
		<div class="footer-container">
			<div class="footer-about">
				<Logo />
				<p class="footer-about">
					Modern ve fütürist tasarımlar üzerine çalışan bir iç mimarlık öğrencisiyim. Teknoloji, VR
					ve içerik üretimi üzerine projeler geliştiriyorum.
				</p>
				<div class="social-links">
					<a
						href="https://www.instagram.com/chosensworld1"
						target="_blank"
						class="social-link"
						aria-label="Instagram"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
							/>
						</svg>
					</a>
					<a href="#" target="_blank" class="social-link"><i class="fab fa-twitter"></i></a>
					<a href="#" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
					<a href="#" class="social-link"><i class="fab fa-behance"></i></a>
				</div>
			</div>

			<div class="footer-links">
				<h3>Hızlı Linkler</h3>
				<ul>
					<li><a href="/">Ana Sayfa</a></li>
					<li><a href="/hakkimda">Hakkımda</a></li>
					<li><a href="/projeler">Projeler</a></li>
					<li><a href="/iletisim">İletişim</a></li>
				</ul>
			</div>

			<div class="footer-newsletter">
				<h3>Bülten</h3>
				<p>Yeni projelerim ve çalışmalarımdan haberdar olmak için bültene abone olun.</p>
				<form class="newsletter-form">
					<input type="email" class="newsletter-input" placeholder="Email adresiniz" required />
					<button type="submit" class="newsletter-btn"><i class="fas fa-paper-plane"></i></button>
				</form>
			</div>
		</div>

		<div class="copyright">
			<p>&copy; 2023 Alperen Şahin Goney. Tüm Hakları Saklıdır.</p>
		</div>
	</div>
</footer>

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

	/* Footer */
	footer {
		background: linear-gradient(
			135deg,
			rgba(30, 30, 30, 0.9) 0%,
			rgba(18, 18, 18, 0.9) 50%,
			rgba(30, 30, 30, 0.9) 100%
		);
		padding: 60px 0 30px;
		position: relative;
		overflow: hidden;
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(0, 191, 255, 0.1);
	}

	footer::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.05), transparent);
	}

	.footer-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 40px;
		margin-bottom: 40px;
		position: relative;
		z-index: 2;
	}

	.footer-logo {
		font-family: 'Windpath', sans-serif;
		font-size: 2rem;
		background: linear-gradient(45deg, #00bfff, #8a2be2, #ff1493);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 20px;
		display: inline-block;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.footer-logo:hover {
		transform: scale(1.05);
		filter: drop-shadow(0 0 15px rgba(0, 191, 255, 0.6));
	}

	.footer-about {
		margin-bottom: 20px;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
		line-height: 1.6;
	}

	.social-links {
		display: flex;
		gap: 15px;
	}

	.social-link {
		width: 40px;
		height: 40px;
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
	}

	.social-link:hover {
		background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
		transform: translateY(-5px) scale(1.1);
		box-shadow: 0 10px 25px rgba(0, 191, 255, 0.4);
		border-color: rgba(0, 191, 255, 0.3);
	}

	.footer-links h3,
	.footer-newsletter h3 {
		font-size: 1.2rem;
		margin-bottom: 20px;
		color: var(--light);
		text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
		position: relative;
	}

	.footer-links h3::after,
	.footer-newsletter h3::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 40px;
		height: 2px;
		background: linear-gradient(90deg, #ffffff, #00bfff);

		border-radius: 2px;
		box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
	}

	.footer-links ul {
		list-style: none;
	}

	.footer-links li {
		margin-bottom: 10px;
	}

	.footer-links a {
		color: var(--gray);
		text-decoration: none;
		transition: all 0.3s ease;
		text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
	}

	.footer-links a:hover {
		color: #00bfff;
		text-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
		transform: translateX(5px);
	}

	.newsletter-form {
		display: flex;
		margin-top: 15px;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}

	.newsletter-input {
		flex: 1;
		padding: 12px;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 191, 255, 0.02));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0;
		color: var(--light);
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		outline: none;
	}

	.newsletter-input:focus {
		border-color: rgba(0, 191, 255, 0.3);
		box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
	}

	.newsletter-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.newsletter-btn {
		padding: 0 15px;
		background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
		color: white;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.newsletter-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.newsletter-btn:hover::before {
		left: 100%;
	}

	.newsletter-btn:hover {
		transform: scale(1.05);
		box-shadow: 0 5px 15px rgba(0, 191, 255, 0.4);
	}

	.copyright {
		text-align: center;
		padding-top: 30px;
		border-top: 1px solid rgba(0, 191, 255, 0.1);
		color: var(--gray);
		position: relative;
		z-index: 2;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.footer-container {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.newsletter-form {
			flex-direction: column;
			border-radius: 10px;
		}

		.newsletter-input {
			border-radius: 10px 10px 0 0;
			margin-bottom: 0;
		}

		.newsletter-btn {
			border-radius: 0 0 10px 10px;
			padding: 12px;
		}
	}
</style>
