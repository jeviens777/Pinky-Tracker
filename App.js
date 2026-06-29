import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
  Keyboard
} from 'react-native';
import { AsyncStorage } from 'react-native'; 

const HABITS_STORAGE_KEY = '@habit_tracker_habits';
const THEME_STORAGE_KEY = '@habit_tracker_darkmode';

const CATEGORIES = ['Kesehatan 🌸', 'Produktivitas ✨', 'Belajar 📚'];

export default function App() {
  const [habits, setHabits] = useState([]);
  const [inputHabit, setInputHabit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Kesehatan 🌸');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      
      if (savedHabits !== null) {
        setHabits(JSON.parse(savedHabits));
      }
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Gagal memuat data di Snack');
    }
  };

  const saveHabitsToStorage = async (latestHabits) => {
    try {
      await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(latestHabits));
    } catch (error) {
      console.log('Gagal menyimpan data di Snack');
    }
  };

  const toggleTheme = async () => {
    try {
      const nextTheme = !isDarkMode;
      setIsDarkMode(nextTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(nextTheme));
    } catch (error) {
      console.log('Gagal menyimpan tema di Snack');
    }
  };

  const addHabit = () => {
    if (inputHabit.trim() === '') {
      Alert.alert('Peringatan 💖', 'Nama kebiasaan tidak boleh kosong ya!');
      return;
    }

    const newHabit = {
      id: Date.now().toString(),
      title: inputHabit.trim(),
      category: selectedCategory,
      isCompleted: false,
      streak: 0,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    };

    const updatedHabits = [newHabit, ...habits];
    setHabits(updatedHabits);
    saveHabitsToStorage(updatedHabits);
    
    setInputHabit('');
    Keyboard.dismiss();
  };

  const toggleCompleteHabit = (id) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        const nextStatus = !habit.isCompleted;
        return {
          ...habit,
          isCompleted: nextStatus,
          streak: nextStatus ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    });

    setHabits(updatedHabits);
    saveHabitsToStorage(updatedHabits);
  };

  const deleteHabit = (id) => {
    Alert.alert(
      'Hapus Catatan? 🎀',
      'Apakah kamu yakin ingin menghapus kebiasaan manis ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            const filteredHabits = habits.filter((habit) => habit.id !== id);
            setHabits(filteredHabits);
            saveHabitsToStorage(filteredHabits);
          }
        }
      ]
    );
  };

  const filteredHabits = habits.filter((habit) =>
    habit.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const themeContainer = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const themeText = isDarkMode ? styles.darkText : styles.lightText;
  const themeCard = isDarkMode ? styles.darkCard : styles.lightCard;
  const themeInput = isDarkMode ? styles.darkInput : styles.lightInput;

  return (
    <SafeAreaView style={[styles.container, themeContainer]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, themeText]}>Pinky Tracker 🎀</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>{isDarkMode ? '🌸 Light Pink' : '🔮 Berry Dark'}</Text>
        </TouchableOpacity>
      </View>

      {/* Input Form */}
      <View style={[styles.formContainer, themeCard]}>
        <TextInput
          style={[styles.input, themeInput]}
          placeholder="Tulis kebiasaan barumu... 💕"
          placeholderTextColor={isDarkMode ? '#ffccd5' : '#ffb3c1'}
          value={inputHabit}
          onChangeText={setInputHabit}
        />
        
        {/* Kategori */}
        <View style={styles.categoryContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBadge,
                selectedCategory === cat ? styles.categoryBadgeActive : (isDarkMode ? styles.categoryBadgeInactiveDark : styles.categoryBadgeInactiveLight)
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryBadgeText, 
                { color: selectedCategory === cat ? '#FFF' : (isDarkMode ? '#ffccd5' : '#c9184a') }
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addHabit}>
          <Text style={styles.addButtonText}>Tambah Kebiasaan ✨</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={[styles.searchBar, themeInput]}
        placeholder="🔎 Cari kebiasaan cantarmu..."
        placeholderTextColor={isDarkMode ? '#ffccd5' : '#ffb3c1'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* List Kebiasaan */}
      <FlatList
        data={filteredHabits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, themeText]}>
              {searchQuery ? 'Kebiasaan tidak ditemukan 😢' : 'Belum ada list nih. Yuk buat satu! 🌸'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.habitCard, themeCard]}>
            <View style={styles.habitInfo}>
              <TouchableOpacity onPress={() => toggleCompleteHabit(item.id)}>
                <Text
                  style={[
                    styles.habitTitle,
                    themeText,
                    item.isCompleted && styles.completedText
                  ]}
                >
                  {item.isCompleted ? '💖 ' : '🤍 '}
                  {item.title}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.metaContainer}>
                <Text style={styles.tagText}>{item.category}</Text>
                <Text style={styles.dateText}>📅 {item.createdAt}</Text>
              </View>
            </View>

            <View style={styles.habitActions}>
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>🔥 {item.streak}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteHabit(item.id)}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  lightContainer: {
    backgroundColor: '#fff0f3', // Latar belakang pink pastel super lembut
  },
  darkContainer: {
    backgroundColor: '#4c0519', // Latar belakang merah berry gelap estetik
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#800f2f', // Teks utama warna maroon-pink pekat
  },
  darkText: {
    color: '#fff0f3', // Teks utama mode gelap putih pinkish
  },
  themeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#ff4d6d',
  },
  themeButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  formContainer: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
  },
  lightCard: {
    backgroundColor: '#FFF',
    shadowColor: '#ffb3c1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  darkCard: {
    backgroundColor: '#5c0620',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  lightInput: {
    borderColor: '#ffccd5',
    color: '#800f2f',
    backgroundColor: '#fff5f6',
  },
  darkInput: {
    borderColor: '#800f2f',
    color: '#fff0f3',
    backgroundColor: '#4c0519',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryBadge: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryBadgeActive: {
    backgroundColor: '#ff4d6d', // Badge aktif warna pink cerah
  },
  categoryBadgeInactiveLight: {
    backgroundColor: '#ffe5ec',
  },
  categoryBadgeInactiveDark: {
    backgroundColor: '#800f2f',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#ff758f',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 15,
  },
  habitCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
  },
  habitInfo: {
    flex: 1,
    paddingRight: 10,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#ffb3c1',
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#ff4d6d',
    marginRight: 10,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 11,
    color: '#a4163d',
  },
  habitActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakBadge: {
    backgroundColor: '#fff0f3',
    borderWidth: 1,
    borderColor: '#ffccd5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 10,
  },
  streakText: {
    color: '#ff4d6d',
    fontWeight: 'bold',
    fontSize: 12,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});