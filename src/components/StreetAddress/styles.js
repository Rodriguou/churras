import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        gap: 9
    },
    formRow: {
        flexDirection: 'row',
        gap: 15
    },
    form: {
        gap: 9,
        justifyContent: 'space-between'
    },
    streetForm: {
        flex: 1
    },
    label: {
        color: '#0b0e16',
        fontFamily: 'Archivo_400Regular'
    },
    input: {
        borderWidth: 0.9,
        borderColor: '#e4e2e2',
        borderRadius: 3,
        paddingLeft: 9,
        fontFamily: 'Archivo_400Regular',
        color: '#0b0e16'
    },
    button: {
        backgroundColor: '#ff6800',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: 'flex-start'
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff'
    }
})
