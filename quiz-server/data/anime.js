import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Animated
} from 'react-native';


class App extends React.Component {

  state={
    scrollY:new Animated.Value(0),
    color:'red'
  }
  render()
  {
    const animationHeight=this.state.scrollY.interpolate({
      inputRange:[0,450,942],
      outputRange:[100,50,0],
      extrapolate:'clamp'
    });
    const animationColor=this.state.scrollY.interpolate({
      inputRange:[0,942],
      outputRange:['red','green']
    })
    const animationTransform=this.state.scrollY.interpolate({
      inputRange:[0,180,360,540,942],
      outputRange:['0deg', '90deg','180deg','270deg','360deg']
    })
  return (
    <>
      <StatusBar barStyle="green" />
      <Animated.View 
      style={{ 
        width:'100%', 
        height:100, 
        backgroundColor:animationColor 
        }}>
          <Animated.Text 
          style={{ 
            fontSize:20, 
            textAlign:'center', 
            marginTop:20,
            transform:[{
              rotate:animationTransform
            }]
            }}>sankhadip</Animated.Text>
        </Animated.View>

      <ScrollView
      scrollEventThrottle={16}
      onScroll={
        Animated.event(
        [
          {nativeEvent:{contentOffset:{y:this.state.scrollY}}}
        ]
        )}>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      <Text>sankhadip</Text>
      </ScrollView>
    </>
  );
  }
};

const styles = StyleSheet.create({
  
});

export default App;

