import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './style.module.css';

const API_BASE_URL = 'http://localhost:3000/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const topicsContainerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        setPosts([]);
      }
    }
    loadPosts();
  }, []);

  useEffect(() => {
    async function loadTopics() {
      try {
        const response = await fetch(`${API_BASE_URL}/topics`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const topicsData = await response.json();
        setTopics(topicsData);
      } catch (error) {
        setTopics([]);
      }
    }
    loadTopics();
  }, []);

  const handleTopicsScroll = () => {
    if (topicsContainerRef.current) {
      topicsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const userId = localStorage.getItem('userId'); // Obtén tu propio ID

  return (
    <div className={styles.snappyBg}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <i className="fas fa-bolt"></i> Snappy
        </div>
        <div className={styles.headerIcons}>
          <i className={`fas fa-bell ${styles.icon}`}></i>
          <div className={styles.profileArea}>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Perfil"
              className={styles.profileThumb}
            />
            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <h1>¡Bienvenido a Snappy!</h1>
          <p>Comparte momentos, descubre temas y conecta con tu comunidad.</p>
        </section>

        <section className={styles.topicsSection}>
          <div className={styles.topicsHeader}>
            <h2 className={styles.sectionTitle}>Temas populares</h2>
            <button className={styles.createTopicBtn}>
              <i className="fas fa-plus"></i> Crear Publicación
            </button>
          </div>
          <div className={styles.topicsContainer} ref={topicsContainerRef}>
            {topics.length === 0 && (
              <div className={styles.topicCard}>Sin temas</div>
            )}
            {topics.map(topic => (
              <div className={styles.topicCard} key={topic._id || topic.name}>
                #{topic.name}
              </div>
            ))}
          </div>
          <div className={styles.topicsNavigation} onClick={handleTopicsScroll}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </section>

        <section className={styles.feedSection}>
          <h2 className={styles.sectionTitle}>Últimas publicaciones</h2>
          {posts.length === 0 && (
            <div className={styles.emptyFeed}>No hay publicaciones aún.</div>
          )}
          {posts.map(post => (
            <article className={styles.postCard} key={post._id}>
              <div className={styles.postHeader}>
                <img
                  src={post.userImg || "https://randomuser.me/api/portraits/men/32.jpg"}
                  alt={post.username}
                  className={styles.profileThumb}
                />
                <span className={styles.username}>{post.username}</span>
                <span className={styles.postDate}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.postMedia}>
                <img src={post.imageUrl} alt="Publicación" />
              </div>
              <div className={styles.postActions}>
                <button className={styles.actionBtn}><i className="far fa-heart"></i> {post.likes ?? 0}</button>
                <button className={styles.actionBtn}><i className="far fa-comment"></i> {post.comments ?? 0}</button>
                <button className={styles.actionBtn}><i className="fas fa-share-alt"></i></button>
              </div>
              <div className={styles.postText}>{post.text}</div>
            </article>
          ))}
        </section>
      </main>

      <nav className={styles.footerNav}>
        <Link to="/" className={styles.navItem}>
          <i className="fas fa-home"></i><span>Inicio</span>
        </Link>
        <Link to="/publicar" className={styles.navItem}>
          <i className="fas fa-plus-circle"></i><span>Publicar</span>
        </Link>
        <Link to={userId ? `/chat/${userId}` : "/"} className={styles.navItem}>
          <i className="fas fa-user-friends"></i><span>Chat</span>
        </Link>
        <Link to="/perfil" className={styles.navItem}>
          <i className="fas fa-cog"></i><span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

export default Home;