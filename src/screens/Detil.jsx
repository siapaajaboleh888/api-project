import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Sound from 'react-native-sound';


const Detil = ({ route }) => {
  const { NoSurat } = route.params;
  const [dataQuran, setDataQuran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fontSize, setFontSize] = useState(16);

  const ambilData = async () => {
    try {
      const respon = await fetch(`https://equran.id/api/v2/surat/${NoSurat}`);
      const dataJson = await respon.json();
      setDataQuran(dataJson.data.ayat);
    } catch (error) {
      setError('Terjadi kesalahan saat mengambil data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ambilData();
  }, []);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  const playAudio = (audioUrl) => {
    const sound = new Sound(audioUrl, '', (error) => {
      if (error) {
        console.log('Gagal memuat audio', error);
        return;
      }
      sound.play();
    });
  };

  if (isLoading) {
    return <Text>Memuat data...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={decreaseFontSize}>
          -
        </Text>
        <Text style={styles.buttonText} onPress={increaseFontSize}>
          +
        </Text>
      </View>
      {dataQuran.length > 0 ? (
        dataQuran.map((item, i) => {
          return (
            <View style={styles.ayatContainer} key={i}>
              <View style={styles.nomorAyatContainer}>
                <Text style={[styles.nomorAyat, { fontSize }]}>{item.nomorAyat}.</Text>
              </View>
              <View style={styles.teksContainer}>
                <Text style={[styles.teksArab, { fontSize }]}>{item.teksArab}</Text>
                <Text style={[styles.teksIndonesia, { fontSize }]}>{item.teksIndonesia}</Text>
                <Text style={styles.audioButton} onPress={() => playAudio(item.audioUrl)}>
                  Putar Audio
                </Text>
              </View>
            </View>
          );
        })
      ) : (
        <Text style={[styles.noDataText, { fontSize }]}>Tidak ada data ditemukan.</Text>
      )}
    </ScrollView>
  );
};

export default Detil;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  ayatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  nomorAyatContainer: {
    marginRight: 16,
    alignSelf: 'flex-start',
  },
  nomorAyat: {
    fontWeight: 'bold',
  },
  teksContainer: {
    flex: 1,
  },
  teksArab: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },
  teksIndonesia: {
    textAlign: 'left',
  },
  noDataText: {
    textAlign: 'center',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  audioButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});