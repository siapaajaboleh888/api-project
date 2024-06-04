import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const Detil = ({ route }) => {
  const { NoSurat } = route.params;
  const [dataQuran, setDataQuran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ambilData = async () => {
    try {
      const respon = await fetch(`https://equran.id/api/v2/surat/${NoSurat}`); // Perbaikan di sini
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

  if (isLoading) {
    return <Text>Memuat data...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView>
      {dataQuran.length > 0 ? (
        dataQuran.map((item, i) => {
          return (
            <View style={styles.ayatContainer} key={i}>
              <Text style={styles.teksArab}>{item.teksArab}</Text>
              <Text style={styles.teksIndonesia}>{item.teksIndonesia}</Text>
            </View>
          );
        })
      ) : (
        <Text>Tidak ada data ditemukan.</Text>
      )}
    </ScrollView>
  );
};

export default Detil;

const styles = StyleSheet.create({
  ayatContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  teksArab: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  teksIndonesia: {
    fontSize: 16,
    textAlign: 'left',
  },
});