import EventCard from "../../components/Event/EventCard";
import { useEvents } from "../../hooks/Event/useEvents";
import styles from "../Home/HomePage.module.css";

const HomePage = () => {
  const { events, loading, error } = useEvents();

  if (loading) {
    return <div>Etkinlikler Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Hata: {error}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Yaklaşan Etkinlikler</h1>
      {/* İleride buraya Filtreleme Çubuğu (FilterBar) bileşeni gelecek.
        Bu filtre çubuğu, 'useCities' ve 'useEventTypes' hook'larını kullanacak.
      */}

      {/* <div className={styles.eventGrid}> */}
      <div className={styles.eventGrid}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
