import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Registro.module.css';

export default function Registro() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    favoriteGenre: '',
    newsletter: true,
    terms: false,
    privacy: false
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

    if (!formData.terms || !formData.privacy) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    console.log('Registro:', formData);
    setRegistrado(true);
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      favoriteGenre: '',
      newsletter: true,
      terms: false,
      privacy: false
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
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                    <label htmlFor="firstName">👤 Nombre</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Tu nombre"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                    <label htmlFor="lastName">👥 Apellido</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Tu apellido"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="username">🎮 Nombre de Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Tu nombre gamer"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <small className={styles.fieldHint}>Será visible para otros usuarios</small>
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

                <div className={styles.formGroup}>
                  <label htmlFor="birthDate">🎂 Fecha de Nacimiento</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="favoriteGenre">🎯 Género de Juego Favorito</label>
                  <select
                    id="favoriteGenre"
                    name="favoriteGenre"
                    value={formData.favoriteGenre}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona tu género favorito</option>
                    <option value="platformer">🍄 Plataformas</option>
                    <option value="rpg">🗡️ RPG</option>
                    <option value="action">⚡ Acción</option>
                    <option value="puzzle">🧩 Puzzle</option>
                    <option value="racing">🏁 Carreras</option>
                    <option value="fighting">🥊 Lucha</option>
                    <option value="shooter">🔫 Disparos</option>
                    <option value="adventure">🗺️ Aventura</option>
                  </select>
                </div>

                <div className={styles.formCheckboxes}>
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                    📬 Recibir newsletter con ofertas y novedades
                  </label>

                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                    />
                    <span className={styles.checkmark}></span>
                    Acepto los <a href="#" className={styles.termsLink}>términos y condiciones</a>
                  </label>

                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      required
                    />
                    <span className={styles.checkmark}></span>
                    Acepto la <a href="#" className={styles.termsLink}>política de privacidad</a>
                  </label>
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