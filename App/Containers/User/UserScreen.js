import React from 'react'
import { ScrollView, Platform, Text, View, Button, ActivityIndicator, TouchableOpacity, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PropTypes } from 'prop-types'
import UserActions from 'App/Stores/User/Actions'
import FriendActions from 'App/Stores/Friend/Actions'
import Style from './UserScreenStyle'
import Colors from 'App/Theme/Colors'
import { Images } from 'App/Theme'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Parse from 'parse/react-native'

class UserScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username:'',
      password: ''
    }
  }

  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.fetchFriendRequest()
  }

  renderFriendRequests = () => {
    const { friendRequests } = this.props;
    if(friendRequests.length == 0){
      return(
        <>
          <Text style={Style.text}>You have no friend requests.</Text>
        </>
      )
    } else {
      return friendRequests.map((request, index) => {
        return (
          <View key={index} style={Style.friendRequestContainer}>
            <TouchableOpacity style={Style.friendRequestButton} onPress={() => this.props.navigation.navigate('AddFriend')}>
              <Icon style={Style.friendRequestButton} name="user-plus" size={30} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={Style.friendRequestTitle}>
              {request.from.username}
            </Text>
            <TouchableOpacity style={Style.friendRequestButton} onPress={() => this.props.navigation.navigate('AddFriend')}>
              <Icon style={Style.friendRequestButton} name="user-plus" size={30} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )
      });
    }
  }

  renderUserDetailsOrLoginOrSignUp = () => {
    const { user, userLoggedIn, userErrorMessage } = this.props;
    const { username, password } = this.state;
    if(userLoggedIn == true && Object.keys(user).length > 0){
      return (
        <>
          <View style={Style.headerContainer}>
            <TouchableOpacity style={Style.headerButton} onPress={() => this.props.navigation.navigate('MainScreen')}>
              <Icon style={Style.headerButton} name="arrow-circle-left" size={30} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={Style.headerTitle}>{user.username}</Text>
            <TouchableOpacity style={Style.headerButton} onPress={() => this.props.navigation.navigate('AddFriend')}>
              <Icon style={Style.headerButton} name="user-plus" size={30} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={Style.container}>
            <View style={Style.checkInButtons}>
              <Button onPress={() => { this.props.logOutUser()}} title="Log Out" />
            </View>
          </View>
          <ScrollView>
            <View style={Style.container}>
              <View style={Style.headerContainer}>
                <Text style={Style.headerTitle}>Friend Requests</Text>
              </View>
              {this.renderFriendRequests()}
            </View>
          </ScrollView>
        </>
      )
    } else {
      return (
        <>
          <KeyboardAvoidingView style={Style.formContainer} behavior="padding" enabled>
            <View style={Style.formSectionContainer}>
              <Text style={Style.headerTitle}>Log In or Sign up</Text>
            </View>
            <View style={Style.formSectionContainer}>
              <Text style={Style.formSectionText}>Username</Text>
              <TextInput style={Style.formSectionInput} placeholder="Username" autoCapitalize="none" autoCompleteType="username" onChangeText={(text) => this.setState({username: text})}/>
            </View>
            <View style={Style.formSectionContainer}>
              <Text style={Style.formSectionText}>Password</Text>
              <TextInput style={Style.formSectionInput} placeholder="Password" autoCapitalize="none" secureTextEntry={true} autoCompleteType="password" onChangeText={(text) => this.setState({password: text})}/>
            </View>
            {userErrorMessage != '' &&
              <Text style={Style.error}>{userErrorMessage}</Text>
            }
            <View style={Style.checkInButtons}>
              <Button onPress={() => { this.props.signUpUser(username, password)}} title="Sign Up" />
              <Button onPress={() => { this.props.logInUser(username, password)}} title="Log In" />
            </View>
          </KeyboardAvoidingView>
        </>
      )
    }
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          this.renderUserDetailsOrLoginOrSignUp()
        )}
      </View>
    )
  }
}

UserScreen.propTypes = {
  user: PropTypes.object,
  userLoggedIn: PropTypes.bool,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  signUpUser: PropTypes.func,
  logInUser: PropTypes.func,
  logOutUser: PropTypes.func,
  fetchFriendRequest: PropTypes.func
}

const mapStateToProps = (state) => ({
  friendRequests: state.friendRequest.friendRequests,
  user: state.user.user,
  userLoggedIn: state.user.userLoggedIn,
  userIsLoading: state.user.userIsLoading,
  userErrorMessage: state.user.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (username, password) => dispatch(UserActions.signUpUser(username, password)),
  logInUser: (username, password) => dispatch(UserActions.logInUser(username, password)),
  logOutUser: () => dispatch(UserActions.logOutUser()),
  fetchFriendRequest: () => dispatch(FriendActions.fetchFriendRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen)
