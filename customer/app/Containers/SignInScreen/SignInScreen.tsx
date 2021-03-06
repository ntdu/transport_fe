import React, { useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  Keyboard,
  Text,
  TouchableOpacity
} from 'react-native'
import { Formik } from 'formik'

// Navigation type
import { RootStackParams } from '@/Navigation/AppNavigationType';

// Navigation
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { AuthStackParams } from '@/Navigation/AppNavigationType'
import {
  AppStacks,
  AuthScreens,
  MainScreens
} from '@/Constants/AppNavigationConstants'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import AuthActions from '@/Redux/AuthRedux'
import { RootState } from '@/Types'

// Components
import {
  BLabelTextInput,
  BButton,
  BActivityIndicator,
  BBackButton
} from '@/Components'

// Functions
import { refTextInputFocus } from '@/Functions/RefFunctions'
import { setAsyncStorage } from '@/Functions/AsyncStorageFunctions'

// import ValidateSignIn from '@/Functions/Validates/ValidateSignIn'
import { confirmAlert } from '@/Functions/AlertFunctions'

// Styles
import styles from './Styles/SignInScreenStyles'

// Constants
import { USER_NAME } from '@/Constants/AsyncStorageKey'

// Language
import { translate } from '@/Language'

type SignInScreenNavigationProp = StackNavigationProp<
  AuthStackParams,
  AuthScreens.SignInScreen
>

type Value = {
  userName: string
  password: string
}

type NavigationProp = StackNavigationProp<RootStackParams, AppStacks.AuthStack>

let isSignIn = false
const SignInScreen = () => {
  console.log("SignInScreen")
  const navigation = useNavigation<NavigationProp>()

  const dispatch = useDispatch()

  const [tempUserName, setTempUserName] = useState('') // Hook

  const { fetchingSignInRequest, errorSignIn } = useSelector(
    (state: RootState) => state.auth
  )
  // Redux

  const passwordRef = useRef<TextInput>(null)

  const onPhoneNumberSubmitEditing = () => refTextInputFocus(passwordRef)

  const onPressSignInButton = (values: Value) => {
    Keyboard.dismiss()
    const { userName, password } = values
    dispatch(AuthActions.signInRequest(userName, password))
    setTempUserName(userName)
    isSignIn = true
  }

  // const navigateToOTPScreen = () =>
  //   navigation.navigate(AuthScreens.OTPScreen, {
  //     userName: tempUserName
  //   })

  const navigateToHomeScreen = () => 
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainStack',
          params: { screen: MainScreens.HomeScreen }
        }
      ]
    })


  const navigateToForgotPassword = () => {}
  // navigation.navigate(AuthScreens.ForgotPasswordScreen)

  useEffect(() => {
    if (!fetchingSignInRequest && isSignIn) {
      isSignIn = false
      if (errorSignIn) {
        return confirmAlert({
          title: 'Error Sign In',
          content: 'Your username and password is wrong!',
          onPressOK: () => {}
        })
      }
      setAsyncStorage(USER_NAME, tempUserName)
      navigateToHomeScreen()
    }
  }, [isSignIn, fetchingSignInRequest, errorSignIn])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.contentWrapper}
        behavior={'padding'}
        keyboardVerticalOffset={0}
        enabled={Platform.OS === 'ios'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <BBackButton wrapperStyle={styles.bBackButton} />
          <Text style={styles.signInText}>{translate('signIn')}</Text>
          {/* <Text style={styles.signInText}>signIn</Text> */}
          <Formik
            initialValues={{
              userName: '0354471332',
              password: 'Kaaa@m11e23f58Z!AV44!!'
            }}
            onSubmit={(values) => onPressSignInButton(values)}
            // onSubmit={values => console.log(values)}
            // validationSchema={ValidateSignIn}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <BLabelTextInput
                  value={values.userName}
                  label={translate('userName')}
                  // label={'userName'}
                  wrapperStyle={styles.textInput}
                  errorMessage={errors.userName}
                  isRequired
                  returnKeyType={'next'}
                  keyboardType={'number-pad'}
                  onChangeText={handleChange('userName')}
                  onSubmitEditing={onPhoneNumberSubmitEditing}
                />
                <BLabelTextInput
                  ref={passwordRef}
                  value={values.password}
                  label={translate('password')}
                  // label={'password'}
                  wrapperStyle={styles.textInput}
                  errorMessage={errors.password}
                  isRequired
                  secureTextEntry
                  returnKeyType={'done'}
                  onChangeText={handleChange('password')}
                />
                <BButton
                  content={translate('SignIn')}
                  // content={'SignIn'}
                  buttonStyle={styles.buttonStyle}
                  onPressButton={handleSubmit}
                />
                <TouchableOpacity
                  onPress={navigateToForgotPassword}
                  style={styles.forgotPasswordButton}
                >
                  <Text style={styles.forgotPassword}>
                    {translate('forgotPassword').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      {fetchingSignInRequest && <BActivityIndicator/>}
    </SafeAreaView>
  )
}

export default SignInScreen
