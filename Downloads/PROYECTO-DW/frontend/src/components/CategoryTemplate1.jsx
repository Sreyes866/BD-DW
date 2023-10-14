import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import techBackground from './Tecnologia.jpg';  
import scienceBackground from './ciencia.jpg'; 
import saludBackground from './salud.jpg';  
import arteBackground from './arte.jpg';  
import negociosBackground from './negocios.jpg';  
import deportesBackground from './deportes.jpg'; 
import videosBackground from './videos.jpg'; 
import tecnologiaVideo from './tecnologia.mp4';
import cienciaVideo from './ciencia.mp4';
import saludVideo from './salud.mp4';
import arteVideo from './arte.mp4';
import negociosVideo from './negocios.mp4';
import deportesVideo from './deportes.mp4';
import videosVideo from './videos.mp4';
import image1 from './image1.jpg';
import image2 from './image2.jpg';


const categoryBackgrounds = {
  'Tecnologia': techBackground,
  'Ciencia': scienceBackground,
  'Salud': saludBackground,
  'Arte y cultura': arteBackground,
  'Negocios y finanzas': negociosBackground,
  'Deportes': deportesBackground,
  'videos': videosBackground,
};

const categoryVideos = {
  'Tecnologia': tecnologiaVideo, 
  'Ciencia': cienciaVideo,
  'Salud': saludVideo,
  'Arte y cultura': arteVideo,
  'Negocios y finanzas': negociosVideo,
  'Deportes': deportesVideo,
  'videos': videosVideo,
};

const categoryDescriptions = {
  'Tecnologia': 'Esta categoría se dedica a explorar las últimas tendencias, innovaciones y avances en el campo de la tecnología. Desde inteligencia artificial hasta computación en la nube, pasando por desarrollo de software y ciberseguridad, aquí encontrarás artículos detallados que te mantendrán al día en este mundo en constante evolución.',
  'Ciencia': 'Las Ciencias engloban un conjunto diverso de disciplinas que estudian la naturaleza y el mundo que nos rodea. Esto incluye la biología, la química, la física, la geología y la astronomía, entre otras. Estas ciencias se centran en comprender los fenómenos naturales y las leyes que rigen el universo, sin limitarse a un tema específico.',
  'Salud': 'La salud se refiere al estado de bienestar físico, mental y social de una persona. Es un estado en el cual el individuo no solo está libre de enfermedades o dolencias, sino que también goza de un equilibrio emocional y social satisfactorio. La salud implica no solo la ausencia de enfermedad, sino también la capacidad de funcionar y desempeñarse de manera óptima en la vida diaria. Es un concepto amplio que abarca aspectos físicos, psicológicos y sociales, y es fundamental para una vida plena y satisfactoria.',
  'Arte y cultura': 'El arte y la cultura están intrínsecamente entrelazados, formando un tejido rico y diverso que define la identidad de una sociedad. La cultura representa el conjunto de valores, tradiciones y expresiones compartidas por una comunidad, mientras que el arte, en sus diversas formas, actúa como el medio a través del cual se transmiten y celebran estos aspectos culturales. El arte refleja la esencia de una cultura, contando sus historias, emociones y visiones del mundo, y a su vez, la cultura nutre y da forma al arte, proporcionándole un contexto y un propósito arraigados en la historia y la experiencia colectiva de una sociedad. Juntos, el arte y la cultura enriquecen nuestras vidas, fomentan la diversidad y la comprensión, y son testigos de la creatividad y la humanidad en su máxima expresión.',
  'Negocios y finanzas': 'En el ámbito de negocios y finanzas, los negocios representan las actividades económicas que se llevan a cabo para generar ingresos, ya sea a través de la venta de productos o servicios. Las finanzas, por su parte, se centran en la gestión y el uso eficiente del dinero, incluyendo aspectos como la inversión, la contabilidad, el presupuesto y la planificación financiera. Estas dos áreas están estrechamente relacionadas, ya que la toma de decisiones financieras sólidas es esencial para el éxito y la sostenibilidad de los negocios. La comprensión de las finanzas permite a las empresas gestionar sus recursos de manera efectiva y tomar decisiones estratégicas que afectan a su rentabilidad y crecimiento a largo plazo.',
  'Deportes': 'Los deportes pueden abarcar una amplia variedad de disciplinas, como fútbol, baloncesto, tenis, atletismo, natación, y muchos otros. Además de promover la actividad física y la salud, los deportes a menudo fomentan la competencia, el espíritu de equipo y el entretenimiento tanto para los participantes como para los espectadores. Los eventos deportivos de alto nivel, como los Juegos Olímpicos y las ligas profesionales, son seguidos en todo el mundo y tienen un gran impacto cultural y económico.',
  'videos': 'Los videojuegos son una forma popular de entretenimiento digital que involucra la interacción de los jugadores con una plataforma electrónica a través de la cual controlan personajes o elementos en un mundo virtual. Estos juegos pueden ser de una amplia variedad de géneros, desde aventuras, disparos y estrategia hasta deportes y simuladores. Los videojuegos han evolucionado enormemente a lo largo de los años y se han convertido en una forma importante de narrativa y arte interactivo. Además de proporcionar diversión y entretenimiento, los videojuegos también tienen aplicaciones en la educación, la terapia y la industria del esports, donde los jugadores compiten profesionalmente a nivel mundial. La industria de los videojuegos es una de las más grandes y de más rápido crecimiento en el mundo del entretenimiento.',
};


const CategoryTemplate1 = () => {
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

        setArticles(articlesRes.data);
        setCategories(categoriesRes.data);
        setSubcategories(subcategoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  const backgroundImage = categoryBackgrounds[category];

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    position: 'relative',
  };
  
  let filteredArticles = articles;
  if (category) {
    const categoryId = categories.find(cat => cat.name === category)?.id;
    filteredArticles = filteredArticles.filter(article => article.category_id === categoryId);
  }
  if (subCategory && subCategory !== 'all') {
    const subcategoryId = subcategories.find(sub => sub.name === subCategory)?.id;
    filteredArticles = filteredArticles.filter(article => article.sub_category_id === subcategoryId);
  }


  const textStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
    width: '100%'  
  };

  const carouselContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  };

  const carouselStyle = {
    maxWidth: '80%',  
  };

  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  };
  
  const itemStyle = {
    flex: '0 0 calc(33.333% - 10px)', 
    marginBottom: '20px'
  };

  const titleStyle = {
    textAlign: 'center', 
    marginBottom: '20px' 
  };

  const videoStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'  
  };

  const carouselImageStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',  
  };

  const containerWithBackgroundStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
  };
  
  const flexContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
     <div style={containerWithBackgroundStyle}></div> 
      <div style={textStyle}>
      <h2 style={titleStyle}>Descripcion de la categoria</h2>
      <p>{categoryDescriptions[category]}</p>
        <h2 style={titleStyle}>Los 10 Artículos Más Recientes</h2>
        
        <div style={listStyle}>
          {filteredArticles.map((article, index) => (  
            <div style={itemStyle} key={index}>
              <Link to={`/article/${article.id}`}>
                <h3>{article.title}</h3>
              </Link>
              <p>Autor: {article.author_id}</p>
            </div>
          ))}
        </div>
        <div style={flexContainerStyle}></div>
        <div>
        <h3 style={titleStyle}>{category}</h3>
        <video style={videoStyle} controls>
        <source src={categoryVideos[category]} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      </div>
    </div>
    
    <div style={carouselContainerStyle}>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={carouselStyle}>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={image1} alt="Descripción de la primera imagen" style={carouselImageStyle} />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={image2} alt="Descripción de la segunda imagen" style={carouselImageStyle} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTemplate1;






