import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker'

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {

    const { pais, ciudad } = busqueda

    const [animacionBoton] = useState(new Animated.Value(1))

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta()
            return;


        }

        setConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais para la busqueda',
            [{ text: 'Entendido' }]
        )
    }

    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .8
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            friction: 4,
            tension: 30
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }

    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad => setBusqueda({ ...busqueda, ciudad })}
                        placeholder='Ciudad'
                        placeholderTextColor='#666' />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        style={styles.pickerStyle}
                        onValueChange={pais => setBusqueda({ ...busqueda, pais })}
                    >
                        <Picker.Item label='Seleccione un pais' value='' />
                        <Picker.Item label='Estados Unidos' value='US' />
                        <Picker.Item label='Venezuela' value='VE' />
                        <Picker.Item label='Colombia' value='CO' />
                        <Picker.Item label='Argentina' value='AR' />
                        <Picker.Item label='Chile' value='CL' />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View
                        style={[styles.btnBuscar, estiloAnimacion]}
                    >
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    pickerStyle: {
        height: 60,
        backgroundColor: '#fff'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})

export default Formulario
