import { useState } from 'react';
import styles from './Contacto.module.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contenido: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (enviado) {
      setEnviado(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({ nombre: '', correo: '', contenido: '' });
  };

  return (
    <main className={styles.main}>
      <section className={styles.heroContacto}>
        <div className={styles.container}>
          <h2>RetroPixel Contacto</h2>
          <p>¿Tienes dudas, sugerencias o necesitas ayuda? Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible. ¡Tu opinión es importante para RetroPixel Store!</p>
        </div>
      </section>

      <section className={styles.contactoWrapper}>
        <div className={styles.container}>
          <div className={styles.formularioContacto}>
            <h3>Formulario para contactar</h3>
            
            {enviado && (
              <div className={styles.mensajeExito}>
                Mensaje enviado correctamente. Pronto nos pondremos en contacto.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.campoForm}>
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingresa tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              <div className={styles.campoForm}>
                <label htmlFor="correo">Correo electrónico</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  placeholder="tucorreo@email.com"
                  value={formData.correo}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              <div className={styles.campoForm}>
                <label htmlFor="contenido">Contenido</label>
                <textarea
                  id="contenido"
                  name="contenido"
                  placeholder="Escribe tu mensaje aquí"
                  value={formData.contenido}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.btnPrimary}>ENVIAR MENSAJE</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}