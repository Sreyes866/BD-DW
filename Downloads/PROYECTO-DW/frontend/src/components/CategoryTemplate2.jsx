import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import techVideo from './tecnologia1.mp4';
import scienceVideo from './ciencia1.mp4';
import saludVideo from './salud1.mp4';
import arteVideo from './arte1.mp4';
import negociosVideo from './negocios1.mp4';
import deportesVideo from './deportes1.mp4';
import videosVideo from './videos1.mp4';
import techBg from './Tecnologia1.jpg';
import scienceBg from './Ciencia1.jpg';
import saludBg from './salud1.jpg';
import arteBg from './arte1.jpg';
import negociosBg from './negocios1.jpg';
import deportesBg from './deportes1.jpg';
import videosBg from './videos1.jpg';


const videoMap = {
  'Tecnologia': techVideo,
  'Ciencia': scienceVideo,
  'Salud': saludVideo,
  'Arte y cultura': arteVideo,
  'Negocios y finanzas': negociosVideo,
  'Deportes': deportesVideo,
  'videos': videosVideo,
};


const bgMap = {
  'Tecnologia': techBg,
  'Ciencia': scienceBg,
  'Salud': saludBg,
  'Arte y cultura': arteBg,
  'Negocios y finanzas': negociosBg,
  'Deportes': deportesBg,
  'videos': videosBg,
};


const factsMap = {
  'Tecnologia': "La tecnología sigue avanzando a pasos agigantados, y algunos datos innovadores muestran su impacto en nuestras vidas. Por ejemplo, la inteligencia artificial (IA) está siendo utilizada en medicina para analizar rápidamente imágenes médicas y ayudar en el diagnóstico, lo que puede mejorar la precisión y la velocidad de los resultados. Además, la tecnología de realidad aumentada está transformando la forma en que interactuamos con el mundo, permitiendo experiencias inmersivas que combinan elementos digitales con el entorno físico. En el ámbito de la movilidad, los vehículos autónomos están cada vez más cerca de ser una realidad cotidiana, lo que podría revolucionar la industria del transporte. Estos avances muestran cómo la tecnología sigue evolucionando y mejorando diversos aspectos de nuestras vidas de maneras sorprendentes y transformadoras.",
  'Ciencia': "En el campo de la ciencia, los avances continúan asombrando al mundo. Por ejemplo, la tecnología de edición genética CRISPR-Cas9 ha revolucionado la genética y la biología molecular, permitiendo la edición precisa de genes en organismos vivos, lo que tiene aplicaciones en la cura de enfermedades genéticas y la mejora de cultivos agrícolas. Además, la física cuántica está abriendo nuevas posibilidades en cuanto a la computación cuántica, que promete resolver problemas complejos en una fracción del tiempo que llevaría a las computadoras convencionales. También, la exploración espacial está en auge con el desarrollo de tecnologías que permiten misiones a planetas distantes y la búsqueda de vida en otros lugares del universo. Estos avances muestran el continuo progreso de la ciencia y su capacidad para transformar nuestra comprensión del mundo y nuestras capacidades tecnológicas.",
  'Salud': 'En el ámbito de la salud, la tecnología está impulsando innovaciones significativas. Por ejemplo, la telemedicina ha experimentado un rápido crecimiento, especialmente durante la pandemia de COVID-19, permitiendo a las personas acceder a atención médica de manera remota a través de videoconferencias y aplicaciones móviles. La genómica personalizada se ha vuelto más accesible, lo que permite tratamientos y medicamentos adaptados a la información genética única de un individuo. Además, la inteligencia artificial se está utilizando para analizar grandes conjuntos de datos médicos y mejorar la precisión en el diagnóstico de enfermedades. La impresión 3D de tejidos y órganos también está avanzando, lo que podría revolucionar los trasplantes y la medicina regenerativa. Estas innovaciones están transformando la atención médica y mejorando la calidad de vida de las personas en todo el mundo.',
  'Arte y cultura': 'En el ámbito del arte y la cultura, las innovaciones continúan enriqueciendo nuestras experiencias. La realidad virtual y aumentada están siendo utilizadas para crear experiencias artísticas inmersivas, permitiendo a los espectadores interactuar con obras de arte de formas nunca antes imaginadas. La digitalización está democratizando el acceso a la cultura, con museos y bibliotecas que ofrecen sus colecciones en línea y permiten un acceso global a la herencia cultural. Además, la colaboración en línea está impulsando la creación de obras de arte y proyectos culturales a nivel global, conectando a artistas y creadores de todo el mundo. La tecnología también está influyendo en la forma en que consumimos música, películas y literatura, con plataformas de streaming y publicación digital que están cambiando la industria cultural. Estas innovaciones están ampliando las fronteras del arte y la cultura, permitiendo nuevas formas de expresión y participación a nivel mundial.',
  'Negocios y finanzas': 'En el mundo de los negocios y las finanzas, la tecnología está transformando la forma en que se realizan transacciones y se toman decisiones financieras. La tecnología blockchain, por ejemplo, está revolucionando las transacciones financieras al proporcionar un registro seguro y transparente que elimina intermediarios en las operaciones. La inteligencia artificial se utiliza en la toma de decisiones financieras, automatizando tareas como el análisis de datos y la gestión de carteras de inversión. Las criptomonedas están ganando terreno como una forma alternativa de inversión y pago, lo que cambia la forma en que vemos el dinero y las transacciones. Además, la tecnología financiera, o fintech, está creando soluciones innovadoras en áreas como los préstamos peer-to-peer, la gestión financiera personal y el crowdfunding. Estas innovaciones tecnológicas están remodelando el panorama de los negocios y las finanzas, ofreciendo nuevas oportunidades y desafíos en un mundo cada vez más digital.',
  'Deportes': 'En el ámbito deportivo, la tecnología está teniendo un impacto significativo. El uso de sensores y dispositivos portátiles permite el seguimiento detallado del rendimiento de los atletas, desde la medición de la frecuencia cardíaca hasta el análisis de la biomecánica. Los sistemas de análisis de video, como el VAR (Video Assistant Referee), se utilizan para tomar decisiones precisas en eventos deportivos como el fútbol. Además, la realidad virtual y aumentada se están aplicando para mejorar la formación de atletas y crear experiencias inmersivas para los aficionados. Las tecnologías de transmisión en línea están permitiendo a las personas de todo el mundo seguir eventos deportivos en tiempo real y acceder a contenido exclusivo. Estos avances tecnológicos están elevando el nivel de rendimiento deportivo y mejorando la experiencia de los espectadores en el mundo del deporte.',
  'videos': 'En la industria de los videojuegos, la tecnología sigue impulsando avances notables. La realidad virtual (RV) y la realidad aumentada (RA) están transformando la forma en que experimentamos los juegos, al sumergirnos en entornos virtuales o combinar elementos digitales con el mundo real. Los juegos en la nube están ganando popularidad, permitiendo a los jugadores acceder a juegos de alta calidad en línea sin necesidad de hardware de juego costoso. La inteligencia artificial se utiliza para mejorar la jugabilidad y crear personajes no jugables más realistas. Además, la industria está viendo una mayor convergencia entre videojuegos y deportes electrónicos (esports), con competiciones profesionales y eventos en vivo que atraen a audiencias masivas en todo el mundo. Estos desarrollos tecnológicos están redefiniendo la experiencia de juego y la forma en que interactuamos con el entretenimiento digital.',
};

const CategoryTemplate2 = () => {
  const { category, subCategory } = useParams();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, subcategoriesRes] = await Promise.all([
          axios.get('http://localhost/Articles.php'),
          axios.get('http://localhost/Categories.php'),
          axios.get('http://localhost/Subcategories.php')
        ]);
  
        const approvedArticles = articlesRes.data.filter(article => article.approval_status === 'Approved');
  
        setArticles(approvedArticles);
        setCategories(categoriesRes.data);
        setSubcategories(subcategoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  let filteredArticles = articles;
  if (category) {
    const categoryId = categories.find(cat => cat.name === category)?.id;
    filteredArticles = filteredArticles.filter(article => article.category_id === categoryId);
  }

  if (subCategory && subCategory !== 'all') {
    const subcategoryId = subcategories.find(sub => sub.name === subCategory)?.id;
    filteredArticles = filteredArticles.filter(article => article.sub_category_id === subcategoryId);
  }

  const currentVideo = videoMap[category] || "default_video.mp4";
  const currentBg = bgMap[category] || "default_bg.jpg";
  const currentFacts = factsMap[category] || "Datos generales...";

  const containerStyle = {
    backgroundImage: `url(${currentBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    position: 'relative',
    textAlign: 'center'  // Centro todo el texto
  };

  const containerWithBackgroundStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: '20px',
    textAlign: 'center'  // Centro todo el texto
  };

  const videoStyle = {
    width: '640px',
    height: '360px',
    margin: '0 auto'  // Centro el video
  };

  return (
    <div style={containerStyle}>
      <div style={containerWithBackgroundStyle}>
        <h2>Artículos Más Populares</h2>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {filteredArticles.slice(0, 10).map((article, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <Link to={`/article/${article.id}`}>
                  <h3>{article.title}</h3>
                </Link>
                <p>Autor: {article.author_id}</p>
                <p>Categoría: {categories.find(cat => cat.id === article.category_id)?.name}</p>
                <p>Subcategoría: {subcategories.find(sub => sub.id === article.sub_category_id)?.name}</p>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
        
        <div style={{ padding: '20px' }}>
          <h3>Datos innovadores de las categorías</h3>
          <p style={{ fontSize: '16px' }}>{factsMap[category]}</p>
        </div>
    
        <div style={{ padding: '20px' }}>
          <h3>{category}</h3>
          <video style={videoStyle} controls>
            <source src={videoMap[category] || "default_video.mp4"} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default CategoryTemplate2;







