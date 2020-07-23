import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'


const Clima = ({ resultado }) => {

    const { name, main } = resultado;

    // grados kelvin
    const kelvin = 273.15

    if (!name) return null;
    return (
        <>
            <View style={styles.clima}>
                <Text
                    style={[styles.texto, styles.actual]}
                >{parseInt(main.temp - kelvin)}
                    <Text style={styles.temperatura}>
                        &#x2103;
                </Text>
                    <Image
                        style={{ width: 66, height: 58 }}
                        source={{ uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png` }}
                    />
                </Text>
                <View style={styles.temperaturas}>
                    <Text styles={styles.texto}> Min{' '}
                        <Text style={styles.temperatura}>
                            {parseInt(main.temp_min - kelvin)} &#x2103;
                        </Text>
                    </Text>

                    <Text styles={styles.texto}> Max{' '}
                        <Text style={styles.temperatura}>
                            {parseInt(main.temp_max - kelvin)} &#x2103;
                        </Text>
                    </Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    clima: {
        marginBottom: 20
    },
    texto: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temperatura: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 20

    },
    temperaturas: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default Clima
