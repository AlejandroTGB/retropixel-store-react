import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [logueado, setLogueado] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (logueado) {
      setLogueado(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    setLogueado(true);
    setFormData({ email: '', password: '' });
  };

  const togglePassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  return (
    <main className={styles.main}>
      <section className={styles.loginSection}>
        <div className={styles.container}>
          <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
              <h2>🎮 Iniciar Sesión</h2>
              <p className={styles.loginSubtitle}>¡Bienvenido de vuelta, gamer!</p>

              {logueado && (
                <div className={styles.mensajeExito}>
                  Sesión iniciada correctamente. Bienvenido!
                </div>
              )}

              <form className={styles.formLogin} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">📧 Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu-email@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">🔒 Contraseña</label>
                  <div className={styles.passwordToggle}>
                    <input
                      type={mostrarPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                    <button
                      type="button"
                      className={styles.showPassword}
                      onClick={togglePassword}
                    >
                      👁️ {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                </div>

                <div className={styles.formOptions}>
                  <label className={styles.checkboxContainer}>
                    <input type="checkbox" name="remember" />
                    <span className={styles.checkmark}></span>
                    Recordarme
                  </label>
                  <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
                </div>

                <button type="submit" className={styles.btnLogin}>🚀 Iniciar Sesión</button>
              </form>

              <div className={styles.loginDivider}>
                <br /><br />
                <span>o continúa con</span>
              </div>

              <div className={styles.socialLogin}>
                <button type="button" className={`${styles.btnSocial} ${styles.google}`}>
                  Google
                </button>
                <button type="button" className={`${styles.btnSocial} ${styles.facebook}`}>
                  Facebook
                </button>
                <button type="button" className={`${styles.btnSocial} ${styles.discord}`}>
                  Discord
                </button>
              </div>

              <div className={styles.registerLink}>
                <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
              </div>
            </div>

            <div className={styles.loginInfo}>
              <div className={styles.infoContent}>
                <h3>🏆 Únete a la Comunidad Retro</h3>
                <ul className={styles.benefitsList}>
                  <li>💾 Guarda tus juegos favoritos</li>
                  <li>🛒 Compras más rápidas</li>
                  <li>📈 Sigue tu historial de pedidos</li>
                  <li>🎁 Accede a ofertas exclusivas</li>
                  <li>⭐ Recibe recomendaciones personalizadas</li>
                  <li>👥 Conecta con otros gamers retro</li>
                </ul>
                <div className={styles.pixelArt}>
                  🕹️ 👾 🎯 🏁 ⚡ 🍄 🗡️ 🔥
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}