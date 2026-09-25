import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';
import { useLearner } from './LearnerContext';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const { learnerId } = useLearner();
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    try {
      const data = await api.getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.error('Failed to load bookmarks:', err);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, [learnerId]);

  const isBookmarked = (itemId) => {
    return bookmarks.some(b => b.item_id === itemId);
  };

  const toggleBookmark = async (itemType, itemId, title, metaInfo = null) => {
    const existing = bookmarks.find(b => b.item_id === itemId);
    if (existing) {
      setBookmarks(prev => prev.filter(b => b.item_id !== itemId));
      await api.removeBookmark(existing.id);
    } else {
      const newBm = { id: itemId, item_type: itemType, item_id: itemId, title, meta_info: metaInfo };
      setBookmarks(prev => [newBm, ...prev]);
      await api.addBookmark(itemType, itemId, title, metaInfo);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, loadBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
