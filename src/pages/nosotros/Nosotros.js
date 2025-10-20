import styles from "./Nosotros.module.css";

export default function Nosotros() {
  return (
    <main className={styles.main}>
      <section className={styles.heroNosotros}>
        <div className={styles.container}>
          <h2>Sobre Nosotros</h2>
          <p>Conoce la historia detrás de RetroPixel Store</p>
        </div>
      </section>

      <section className={styles.contenido}>
        <div className={styles.container}>
          <div className={styles.textoNosotros}>
            <h3>Nuestra Historia</h3>
            <p>
              Todo comenzó con una idea simple: conectar a los gamers con los mejores juegos para PC, de manera fácil y accesible. En nuestros primeros días, éramos solo una pequeña cuenta de Instagram, compartiendo novedades, memes y, por supuesto, ofertas de videojuegos digitales. Poco a poco, nuestra comunidad fue creciendo; las recomendaciones y buenas experiencias de nuestros clientes nos impulsaron a soñar más grande.
            </p>

            <h3>Nuestra Misión</h3>
            <p>
              Hoy, esa misma pasión nos llevó a dar el siguiente paso y crear nuestra propia página web. Aquí, queremos que vivas una experiencia diferente: un catálogo actualizado, compras seguras, promociones exclusivas y atención personalizada, pero ahora con la comodidad y rapidez que solo una web puede ofrecer.
            </p>

            <h3>Nuestro Compromiso</h3>
            <p>
              Sabemos lo importante que es encontrar ese juego que tanto esperabas, por eso seguimos esforzándonos cada día para ofrecerte variedad, buenos precios y un servicio confiable. Si eres parte de nuestra comunidad desde Instagram, ¡gracias por acompañarnos en esta evolución! Y si recién llegas, te damos la bienvenida a este espacio hecho por y para gamers.
            </p>

            <p className={styles.cierre}>
              ¡Sigamos jugando juntos! 🎮
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}