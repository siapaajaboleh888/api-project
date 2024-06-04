import { Button, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    email: '-',
    nama: '',
  };

  ambilData = () => {
    var url = "https://reqres.in/api/users/6";
    fetch(url)
      .then(data => data.json())
      .then(hasil => {
        console.log(hasil.data.email);
        this.setState({ email: hasil.data.email });
        this.setState({ nama: hasil.data.first_name + " " + hasil.data.last_name });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Email: {this.state.email}</Text>
          <Text style={styles.text}>Nama: {this.state.nama}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title='Ambil Data Dari Internet'
              onPress={() => this.ambilData()}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});