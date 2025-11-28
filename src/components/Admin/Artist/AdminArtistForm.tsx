import styles from "../Common/AdminForm.module.css";

interface AdminArtistFormProps {
  name: string;
  setName: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
  loading: boolean;
  isEditMode: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const AdminArtistForm = (props: AdminArtistFormProps) => {
  const {
    name,
    setName,
    bio,
    setBio,
    imageUrl,
    setImageUrl,
    loading,
    isEditMode,
    handleSubmit,
  } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>
        {isEditMode ? "Sanatçıyı Düzenle" : "Yeni Sanatçı Ekle"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Sanatçı Adı</label>
          <input
            type="text"
            className={styles.input}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Görsel URL (Örn: /images/artists/tarkan.jpg)</label>
          <input
            type="text"
            className={styles.input}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/artists/..."
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Önizleme"
              className={styles.imagePreview}
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Biyografi</label>
          <textarea
            className={styles.input}
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Kaydediliyor..." : isEditMode ? "Güncelle" : "Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default AdminArtistForm;
