import React from 'react'
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

// Components
import {
  optionCategory,
  OptionCategoryType,
  optionWeight,
  optionDestination
} from './ParcelConstants'

// Styles
import styles from './Styles/ParcelStyles'

// Language
import { translate } from '@/Language'
import { Colors, Metrics, Normalize } from '@/Themes'
import { useDispatch, useSelector } from 'react-redux'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { RootState } from '@/Types'

const keyExtractorCategory = (item: OptionCategoryType) =>
  'optionCategory' + item.value

type ParcelProps = {
  setnumberOfDestinations: (value: number) => void
  selectWeight: (value: number) => void
  weight: number
  numberOfDestinations: number
}
import { BookingScreens } from '@/Constants/AppNavigationConstants'


const Parcel = (props: ParcelProps) => {
  const { setnumberOfDestinations, selectWeight, weight, numberOfDestinations } = props

  const onNumofDesChange = (value: number) => {
    console.log(value)
    setnumberOfDestinations(value)
  }

  const onWeightChange = (value: number) => {
    console.log(value)
    selectWeight(value)
  }

  const navigation = useNavigation()

  const { address } = useSelector(
    (state: RootState) => state.map.originAndDestiationInfo.origin
  )

  const navigateListBikersScreen = () => navigation.navigate(BookingScreens.SearchPlacesScreen, {type: 'Origin'})

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{translate('details')}</Text>
      <View style={styles.weight}>
        <Text style={styles.weightText}>{translate('weight')} (Kg)</Text>
        <Picker
          style={styles.picker}
          onValueChange={onWeightChange}
          selectedValue={weight}
          mode={'dropdown'}
        >
          <Picker.Item label={'Choose'} value={-1}/>
          {optionWeight.map((weight) => (
            <Picker.Item
              label={weight.label}
              value={weight.value}
              key={weight.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.weight}>
        <Text style={styles.weightText}>{translate('destinationNumber')}</Text>
        <Picker
          style={styles.picker}
          onValueChange={onNumofDesChange}
          selectedValue={numberOfDestinations}
          mode={'dropdown'}
        >
          <Picker.Item label={'Choose'} value={-1}/>
          {optionDestination.map((num) => (
            <Picker.Item
              label={num.label}
              value={num.value}
              key={num.value}
            />
          ))}
        </Picker>
      </View>

      <View style={{justifyContent: 'center',alignItems: 'flex-start', marginTop: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 14, color: Colors.black}}>Location</Text>
          <Text style={{fontSize: Normalize(14), color: Colors.red}}>*</Text>
        </View>

        <TouchableOpacity
          onPress={navigateListBikersScreen}
          activeOpacity={0.9}
          style={{
            width: '100%',
            height: Normalize(120),
            borderRadius: 5,
            borderColor: Colors.black,
            borderWidth: Normalize(1),
          }}
        >
          <Text 
            style={{
              padding: Normalize(10),
              fontSize: Normalize(22),
              width: '90%',
            }}
          >
           { address }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Parcel
