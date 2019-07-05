import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export default StyleSheet.create({
  buttonContainer: {
    marginBottom: 25,
  },
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    flexDirection: 'column',
  },
  error: {
    ...Fonts.style.normal,
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
  },
  header: {
    ...Fonts.style.h2,
    marginBottom: 10,
    paddingTop: getStatusBarHeight(),
    textAlign: 'center',
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  loading: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    height: 300,
    marginBottom: 25,
    width: '100%',
  },
  saveButton: {
    ...Fonts.style.h3,
    alignItems: 'center',
  },
  text: {
    ...Fonts.style.h3,
    textAlign: 'center',
  },
})
