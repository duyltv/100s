import React, { Component } from 'react'
import { ToastAndroid, Text , Animated,StyleSheet, View,Easing} from 'react-native'
import PropTypes from 'prop-types'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import I18n from '../i18n'
import {
  selectIsGameLoading,
  selectIsUpdating,
  selectUpdateProgress,
} from '../store/selectors'
import { Button } from '../components'
import BackgroundView from '../components/BackgroundView'
import ProgressBar from '../components/ProgressBar'
import {
  playGamePressed,
  settingsPressed,
  checkUpdatesPressed,
} from '../store/navigation/actions'

const screenStyles = {
  padding: 30,
  flex: 3 ,
}

const buttonStyles = {
  margin: 10,
  borderRadius: 6,
  backgroundColor:'#D2691E'
}

const spaceStyles = {
  marginTop: 5,
  marginBottom: 10,
  paddingLeft: 10,
}

const fixedBottomStyles = {
  marginTop:10,
  textAlign: 'center'
}

@connect(
  state => ({
    isLoading: selectIsGameLoading(state),
    isUpdating: selectIsUpdating(state),
    updateProgress: selectUpdateProgress(state),
  }),
  {
    playGamePressed,
    checkUpdatesPressed,
    settingsPressed,
  },
)
export default class Menu extends Component {
  constructor(props){
    super(props)
    this.state={
      move1: new Animated.Value(-700),
      move2: new Animated.Value(-700),
      color1: new Animated.Value(0),
      trans: new Animated.Value(0),
    }
  }

  static navigationOptions = ({ screenProps }) => ({
    title: I18n.t('menu.header', screenProps.language),
  });

  static propTypes = {
    playGamePressed: PropTypes.func.isRequired,
    checkUpdatesPressed: PropTypes.func.isRequired,
    settingsPressed: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    updateProgress: PropTypes.number.isRequired,
  };

  onGamePlayPressed = () => {
    this.props.playGamePressed()
  };

  onSettingsPressed = () => {
    this.props.settingsPressed()
  };

  onUpdatePressed = () => {
    this.props.checkUpdatesPressed()
    .catch(err => ToastAndroid.show(err.message, ToastAndroid.LONG))
  };

  componentDidMount() {
    const ani1 = Animated.timing(
        this.state.move1,
        {
            toValue: 0,
            duration: 2000,
            easing: Easing.bounce
        }
    );
    const ani2 = Animated.timing(
        this.state.move2,
        {
            toValue: 0,
            duration: 2000,
            easing: Easing.bounce
        }
    );
    const aniColor1 = Animated.timing(
        this.state.color1,
        {
            toValue: 1,
            duration: 2000,
        }
    );
    const aniColor2 = Animated.timing(
        this.state.color1,
        {
            toValue: 0,
            duration: 2000,
        }
    );
    const trans1 = Animated.timing(
        this.state.trans,
        {
            toValue: 1,
            duration: 2000,
        }
    );
    const trans2 = Animated.timing(
        this.state.trans,
        {
            toValue: 0,
            duration: 2000,
        }
    );
    Animated.stagger(200, [ani1, ani2]).start();
    Animated.loop(Animated.sequence([aniColor1, aniColor2])).start();
    Animated.loop(Animated.sequence([trans1, trans2])).start();
  }
  render() {
    const marginLeft1 = this.state.move1;
    const marginLeft2 = this.state.move2;
    const backgroundColor = this.state.color1.interpolate({
        inputRange: [0, 1],
        outputRange: ['blue', 'yellow']
    });
    const trans = this.state.trans.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['15deg', '0deg', '-15deg']
    })
    const { isLoading, isUpdating, updateProgress } = this.props
    const disableButtons = isLoading || isUpdating
    return (
      
          <BackgroundView style={screenStyles}>
            <View style={{flex:2}} >
              <Text style={spaceStyles}>
                  This is Quiz Appplications which was built by five dogs team. With varied of questions about life subject, fun subject...
              </Text>

              <Text style={spaceStyles}>
                Now, you can start game to explore and feeling by way click on Play Game button below.
              </Text>

              <Button
                style={buttonStyles}
                disabled={disableButtons}
                title={I18n.t('btn.playGame')}
                onPress={this.onGamePlayPressed}
              />
              <Button
                style={buttonStyles}
                disabled={disableButtons}
                title={I18n.t('btn.checkUpdates')}
                onPress={this.onUpdatePressed}
              />
              <Button
                style={buttonStyles}
                disabled={disableButtons}
                title={I18n.t('btn.settings')}
                onPress={this.onSettingsPressed}
              />

              <Text style={fixedBottomStyles}>
                Five Dogs Team.
              </Text>

              {disableButtons && <Spinner />}
              {isUpdating && <ProgressBar progress={updateProgress} />}
            </View>
            <View style={sty.container}>
              <Animated.View style={{
                width: 80 ,
                height: 70,
                backgroundColor,
                        //opacity
                marginLeft: marginLeft1,
                marginBottom: 20,
                transform: [
                  { rotate: trans },
                ],

                        // ...this.props.style
              }} >
                <Text style={sty.text}>good</Text>
              </Animated.View>

              <Animated.View style={{
                width: 80,
                height: 70,
                backgroundColor,
                      
                marginLeft: marginLeft2,
                transform: [
                  { rotate: trans },
                ],

                        
              }} >

                <Text style={sty.text}>luck</Text>


              </Animated.View>
          </View>
        </BackgroundView>
       
    )
  }
}

const sty = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightyellow'
  },
  ani: {
      width: 100,
      height: 100,
      backgroundColor: 'blue',
      //opacity: opacity
  },
  text: {
      fontSize: 25,
      color: 'red',
      marginTop: 20,
      marginLeft: 18,
  },
})