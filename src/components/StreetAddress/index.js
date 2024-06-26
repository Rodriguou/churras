import React, { useContext } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'

import SectionTitle from '../SectionTitle'
import { styles } from './styles'
import { AddressContext } from '../../contexts/AddressContext'

export default function StreetAddress() {
    const { address, updateAddress, fetchCepData } = useContext(AddressContext)

    const handleNumericInputChange = (text, field) => {
        const newText = text.replace(/[^0-9]/g, '')

        if (field === 'cep') {
            updateAddress({
                cep: newText,
                rua: '',
                bairro: '',
                cidade: '',
            })
        } else {
            updateAddress({ [field]: newText })
        }
    }

    const handleCepSearch = async () => {
        const cepData = await fetchCepData(address.cep)

        if (cepData) {
            updateAddress({
                rua: cepData.logradouro,
                bairro: cepData.bairro,
                cidade: cepData.localidade,
            })
        }
    }

    return (
        <View style={styles.container}>
            <SectionTitle title={'Endereço'} number={'06'} />

            <View style={styles.form}>
                <Text style={styles.label}>CEP*</Text>

                <TextInput
                    style={styles.input}
                    maxLength={8}
                    inputMode='numeric'
                    cursorColor={'#0b0e16'}
                    onChangeText={(text) => handleNumericInputChange(text, 'cep')}
                    value={address.cep}
                />

                <TouchableOpacity style={styles.button} onPress={handleCepSearch}>
                    <Text style={styles.buttonText}>BUSCAR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.formRow}>
                <View style={[styles.form, styles.streetForm]}>
                    <Text style={styles.label}>Rua*</Text>

                    <TextInput
                        style={styles.input}
                        value={address.rua}
                        editable={false}
                    />
                </View>

                <View style={styles.form}>
                    <Text>Número*</Text>

                    <TextInput
                        style={styles.input}
                        maxLength={5}
                        inputMode='numeric'
                        cursorColor={'#0b0e16'}
                        value={address.numero}
                        onChangeText={(text) => handleNumericInputChange(text, 'numero')}
                    />
                </View>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Bairro*</Text>

                <TextInput
                    style={styles.input}
                    value={address.bairro}
                    editable={false}
                />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Cidade*</Text>

                <TextInput
                    style={styles.input}
                    value={address.cidade}
                    editable={false}
                />
            </View>
        </View>
    )
}
