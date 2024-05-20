import React, { useContext } from 'react'
import { Text, ScrollView, View } from 'react-native'

import Header from '../../components/Header'
import ResultButton from '../../components/ResultButton'
import { CalculatorContext } from '../../contexts/CalculatorContext'
import { AddressContext } from '../../contexts/AddressContext'
import { styles } from './styles'

export default function Result() {
    const { getGuests, getTotalGuests, selectedMeats, selectedDrinks, totalMeatKg, totalDrinkVolume, totalKgPerMeat, volumePerDrink, individualPrice, totalMeatPrice, totalDrinkPrice, totalConsumablesPrice, totalSideDishesPrice, selectedConsumables, selectedSideDishes, totalPrice } = useContext(CalculatorContext)

    const { address } = useContext(AddressContext)

    const formatKg = (number) => {
        return number.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + ' kg'
    }

    const formatLiters = (volume) => {
        if (volume >= 1000) {
            return (volume / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' l'
        } else {
            return volume.toLocaleString('pt-BR') + ' ml'
        }
    }
    
    const formatPrice = (price) => {
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const guestTypeMapping = {
        man: 'Homem',
        woman: 'Mulher',
        kid: 'Criança'
    }

    const addressFieldMapping = {
        numero: 'Número',
        cep: 'CEP',
        nomeResponsavel: 'Nome do Responsável',
        contatoResponsavel: 'Contato'
    }

    const formatCep = (cep) => {
        return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
    }

    const formatPhoneNumber = (phone) => {
        if (phone.length === 11) {
            return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
        } else if (phone.length === 10) {
            return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
        }
        return phone
    }

    const getNonEmptyAddressFields = (address) => {
        return Object.keys(address).filter(key => address[key] !== '').reduce((obj, key) => {
            obj[key] = address[key]

            return obj
        }, {})
    }

    const nonEmptyAddressFields = getNonEmptyAddressFields(address)

    const totalGuests = getTotalGuests()

    return (
        <View style={styles.container}>
            <Header showMenu={false} />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text style={styles.resultTitle}>Consumo de Carnes</Text>

                    {selectedMeats.map((meat, index) => (
                        <View
                            style={styles.resultContent}
                            key={index}
                        >
                            <Text style={styles.resultText}>{meat.name}</Text>

                            <Text style={styles.resultText}>{formatKg(totalKgPerMeat)}</Text>
                        </View>
                    ))}

                    <View
                        style={styles.resultContent}
                    >
                        <Text style={styles.resultText}>Total</Text>

                        <Text style={styles.resultText}>{formatKg(totalMeatKg)}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.resultTitle}>Consumo de Bebidas</Text>

                    {selectedDrinks.map((drink, index) => (
                        <View
                            style={styles.resultContent}
                            key={index}
                        >
                            <Text style={styles.resultText}>{drink.name}</Text>

                            <Text style={styles.resultText}>{formatLiters(volumePerDrink[drink.name])}</Text>
                        </View>
                    ))}

                    <View
                        style={styles.resultContent}
                    >
                        <Text style={styles.resultText}>Total</Text>

                        <Text style={styles.resultText}>{formatLiters(totalDrinkVolume)}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.resultTitle}>Convidados</Text>
                    {getGuests().map((guest, index) => (
                        <View style={styles.resultContent} key={index}>
                            <Text style={styles.resultText}>{guestTypeMapping[guest.type]}</Text>

                            <Text style={styles.resultText}>{guest.count}</Text>
                        </View>
                    ))}
                    <View style={styles.resultContent}>
                        <Text style={styles.resultText}>Total</Text>

                        <Text style={styles.resultText}>{totalGuests}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.resultTitle}>Valor de Rateio</Text>

                    {Object.keys(individualPrice).map((type, index) => (
                        <View
                            style={styles.resultContent}
                            key={index}
                        >
                            <Text style={styles.resultText}>{guestTypeMapping[type]}</Text>

                            <Text style={styles.resultText}>{formatPrice(individualPrice[type])}</Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.resultTitle}>Valor Gasto</Text>

                    <View style={styles.resultContent}>
                        <Text style={styles.resultText}>Carnes</Text>

                        <Text style={styles.resultText}>{formatPrice(totalMeatPrice)}</Text>
                    </View>

                    <View style={styles.resultContent}>
                        <Text style={styles.resultText}>Bebidas</Text>

                        <Text style={styles.resultText}>{formatPrice(totalDrinkPrice)}</Text>
                    </View>

                    {selectedConsumables.length > 0 && (
                        <View style={styles.resultContent}>
                            <Text style={styles.resultText}>Consumíveis</Text>

                            <Text style={styles.resultText}>{formatPrice(totalConsumablesPrice)}</Text>
                        </View>
                    )}

                    {selectedSideDishes.length > 0 && (
                        <View style={styles.resultContent}>
                            <Text style={styles.resultText}>Acompanhamentos</Text>

                            <Text style={styles.resultText}>{formatPrice(totalSideDishesPrice)}</Text>
                        </View>
                    )}

                    <View style={styles.resultContent}>
                        <Text style={styles.resultText}>Total</Text>

                        <Text style={styles.resultText}>{formatPrice(totalPrice)}</Text>
                    </View>
                </View>


                <View>
                    <Text style={styles.resultTitle}>Endereço</Text>

                    {Object.keys(nonEmptyAddressFields).map((key, index) => (
                        <View
                            style={styles.resultContent}
                            key={index}
                        >
                            <Text style={styles.resultText}>{addressFieldMapping[key] || key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                            
                            <Text style={styles.resultText}>
                                {key === 'cep' ? formatCep(nonEmptyAddressFields[key]) : key === 'contatoResponsavel' ? formatPhoneNumber(nonEmptyAddressFields[key]) : nonEmptyAddressFields[key]}
                            </Text>
                        </View>
                    ))}
                </View>

                <ResultButton />
            </ScrollView>
        </View>
    )
}
