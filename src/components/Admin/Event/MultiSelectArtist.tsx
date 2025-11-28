import type { ArtistResponse } from "../../../models/Artist/Responses/ArtistResponse";
import { useEffect, useRef, useState } from "react";
import styles from "./MultiSelectArtist.module.css";

interface MultiSelectArtistProps {
  options: ArtistResponse[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

const MultiSelectArtist = ({
  options,
  selectedIds,
  onChange,
}: MultiSelectArtistProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div
        className={`${styles.selectionBox} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedIds.length === 0 && (
          <span className={styles.placeholder}>Sanatçı seçiniz...</span>
        )}

        {selectedIds.map((id) => {
          const artist = options.find((a) => a.id === id);
          return artist ? (
            <span key={id} className={styles.tag}>
              {artist.name}
              <span
                className={styles.removeTag}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelection(id);
                }}
              >
                ×
              </span>
            </span>
          ) : null;
        })}
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((artist) => (
            <div
              key={artist.id}
              className={`${styles.option} ${
                selectedIds.includes(artist.id) ? styles.selected : ""
              }`}
              onClick={() => toggleSelection(artist.id)}
            >
              <span>{artist.name}</span>
              {selectedIds.includes(artist.id) && (
                <span className={styles.checkIcon}>✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectArtist;
