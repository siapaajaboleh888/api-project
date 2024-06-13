import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

const Utama = ({ navigation }) => {
  const [dataQuran, setDataQuran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ambilData = async () => {
    try {
      const respon = await fetch('https://equran.id/api/v2/surat');
      const dataJson = await respon.json();
      setDataQuran(dataJson.data);
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
      {dataQuran.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('Detil', { NoSurat: item.nomor, NamaSurat: item.nama })}
          style={styles.suratContainer}
        >
          <Text style={styles.nomorSurat}>{item.nomor}.</Text>
          <Text style={styles.teks}>
            {item.nama} ({item.namaLatin})
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Utama;

const styles = StyleSheet.create({
  teks: {
    fontSize: 24,
  },
  nomorSurat: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  suratContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
});