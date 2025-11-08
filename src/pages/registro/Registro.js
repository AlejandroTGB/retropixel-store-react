import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Registro.module.css';
import { authService } from '../../services/authService';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [registrado, setRegistrado] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });

    if (name === 'password') {
      calculatePasswordStrength(value);
    }

    if (registrado) {
      setRegistrado(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    authService.registro(formData.nombre, formData.email, formData.password);
    setRegistrado(true);
    setFormData({
      nombre: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setPasswordStrength(0);
  };

  return (
    <main className={styles.main}>
      <section className={styles.registerSection}>
        <div className={styles.container}>
          <div className={styles.registerContainer}>
            <div className={styles.registerInfo}>
              <div className={styles.infoContent}>
                <h3>🚀 ¡Únete a la Familia Retro!</h3>
                <p className={styles.welcomeText}>Crea tu cuenta y descubre un mundo de nostalgia gaming</p>

                <div className={styles.featuresGrid}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🛒</span>
                    <h4>Compras Rápidas</h4>
                    <p>Checkout en un solo clic</p>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>⭐</span>
                    <h4>Lista de Deseos</h4>
                    <p>Guarda tus juegos favoritos</p>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🎁</span>
                    <h4>Ofertas Exclusivas</h4>
                    <p>Descuentos solo para miembros</p>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>👥</span>
                    <h4>Comunidad</h4>
                    <p>Conecta con otros gamers</p>
                  </div>
                </div>

                <div className={styles.retroDecoration}>
                  <div className={styles.pixelLine}>▓░▓░▓░▓░▓░▓░▓░</div>
                  <div className={styles.gameIcons}>🕹️ 👾 🎯 🏆 ⚡</div>
                  <div className={styles.pixelLine}>░▓░▓░▓░▓░▓░▓░▓</div>
                </div>
              </div>
            </div>

            <div className={styles.registerForm}>
              <h2>📝 Crear Cuenta</h2>
              <p className={styles.registerSubtitle}>¡Comienza tu aventura retro!</p>

              {registrado && (
                <div className={styles.mensajeExito}>
                   Cuenta creada correctamente. ¡Bienvenido a la familia!
                </div>
              )}

              <form className={styles.formRegister} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="nombre">👤 Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">📧 Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu-email@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                    <label htmlFor="password">🔒 Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className={styles.passwordStrength}>
                      <div className={styles.strengthBar}>
                        <div
                          className={styles.strengthFill}
                          style={{
                            width: `${passwordStrength}%`,
                            backgroundColor: passwordStrength < 50 ? '#dc3545' : passwordStrength < 75 ? '#ffc107' : '#28a745'
                          }}
                        ></div>
                      </div>
                      <small id="strengthText">
                        {passwordStrength === 0 && 'Ingresa una contraseña'}
                        {passwordStrength > 0 && passwordStrength < 50 && 'Contraseña débil'}
                        {passwordStrength >= 50 && passwordStrength < 75 && 'Contraseña media'}
                        {passwordStrength >= 75 && 'Contraseña fuerte'}
                      </small>
                    </div>
                  </div>
                  <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                    <label htmlFor="confirmPassword">🔐 Confirmar Contraseña</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.btnRegister}>🎮 Crear Mi Cuenta</button>
              </form>

              <div className={styles.loginDivider}>
                <br />
                <span>o regístrate con</span>
              </div>

              <div className={styles.socialRegister}>
                <button type="button" className={`${styles.btnSocial} ${styles.google}`}>
                  <span>🌐</span> Google
                </button>
                <button type="button" className={`${styles.btnSocial} ${styles.facebook}`}>
                  <span>📘</span> Facebook
                </button>
              </div>

              <div className={styles.loginLink}>
                <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}