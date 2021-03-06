import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

export default class Game extends Component {
  state = {
    secret : 0,
    input: '',
    inputDisplay: '',
    feedback: '',
    userChances: 5,
    guessButton: ''
  }

  //generate random number function
  generateRandom() {
    return Math.round( Math.random() * 100 )
  }

  //initialize game function
  init() {
    const userChances = 5;
    const secretNumber = this.generateRandom()
    const userGuesses = this.state.userChances;
    let guessButton = this.state.guessButton;

    if (userGuesses == 5) {
      this.setState({ feedback: 'New game started!'})
      this.setState({ guessButton: 'First guess'})
    }
    else if (userGuesses == 1) {
      this.setState({ feedback: 'You Lost!'})
      this.setState({ guessButton: 'First guess'})
   
    }
    else {
      this.setState({ feedback: 'You Win!'})
      this.setState({ guessButton: 'First guess'})
    }

    this.setState({ secret: secretNumber })
    this.setState({ userChances: userChances})
    
  }

  
  //lifecycle function
  componentDidMount() {
    this.init()
  }

  //update input state function
  updateInput = (value) => { 
    this.setState({ input: value })
  }

  userGuesses = () => {
    //get users chances
    const userChances = this.state.userChances;
    this.setState({ userChances: userChances - 1})
  }

  //compare users guess function
  checkGuess = () => {

    this.userGuesses();
    const userChances = this.state.userChances;
    if (userChances == 1) {
      this.init();
      return
    }
    else {
      //store inout in userGuess before clearing
      const userGuess = parseInt(this.state.input);
      this.setState({ guessButton: 'Submit guess'});
      //clear the input
      this.setState({input: ''})
      //store the secret in secretNumber
      const secretNumber = this.state.secret;
      //see if answer is right
      if (userGuess == secretNumber) {
        this.setState({ feedback: 'You Win!'})
        this.init()
        return
      }
      //see if answer is smaller
      if (userGuess < secretNumber) {
        this.setState({ feedback: 'The number is larger than: ' + userGuess})
        return
      }
      //see if answer is larger
      if (userGuess > secretNumber) {
        this.setState({ feedback: 'The number is smaller than: ' + userGuess})
        return
      } 
    }
  }

  render() {
    return (
      <View style={styles.container}>

          

        <View style={styles.game}>
        <Text style={styles.title}> You have: {this.state.userChances} guesses left! </Text>
          <Text style={styles.title}>Guess my number!</Text>

          <TextInput
          style={styles.input}
          keyboardType='numeric'
          onChangeText={this.updateInput}
          value={this.state.input}
          onSubmitEditing={this.checkGuess}>
          </TextInput>

          <TouchableHighlight
          style={styles.button}
          underlayColor='white'
          onPress={this.checkGuess}>

          <Text>{this.state.guessButton}</Text>
          </TouchableHighlight>


          <Text style={styles.feedback}>{this.state.feedback}</Text>


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  game: {
    marginTop: 200,
    alignItems: 'center',
    backgroundColor: '#660066',
    padding: 20,
    borderRadius: 30,
    minHeight: 300,
    minWidth: 300
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fcfcbd'
  },
  button: {
    width: 200,
    padding: 10,
    backgroundColor: 'lightblue',
    marginTop: 20,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: '#ff33ff',
    fontSize: 32
  },
  input: {
    backgroundColor: '#ffffff',
    width: 200,
    marginTop: 20,
    padding: 10,
    textAlign: 'center'
  },
  feedback: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 20
  }

});
