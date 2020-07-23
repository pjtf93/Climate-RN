import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert

} from 'react-native';

import Formulario from './components/Formulario'
import Clima from './components/Clima'

const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const { pais, ciudad } = busqueda

  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)')

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = '4a35c6e67513569eb7df4e22a704b6f0'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          console.log(resultado);
          setResultado(resultado)
          setConsultar(false)

          // Modifica los colores basado en la tempratura

          const kelvin = 273.15
          const { main } = resultado
          const actual = main.temp - kelvin

          if (actual < 10) {
            console.log(actual);
            setBgcolor('rgb(105,108,149)');
          } else if (actual >= 10 && actual < 25) {
            setBgcolor('rgb(71,149,212)')
          } else {
            setBgcolor('rgb(178,28,61)')
          }

          console.log(bgcolor);

        } catch (error) {
          mostrarAlerta()
        }


      }
    }
    consultarClima()
  }, [consultar])

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'La ciudad no existe, intenta con otra ciudad',
      [{ text: 'Ok' }]
    )
  }

  const ocultarTeclado = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima
              resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setConsultar={setConsultar}
              setBusqueda={setBusqueda} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
