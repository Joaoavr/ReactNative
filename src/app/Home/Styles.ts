import { StyleSheet } from 'react-native';


 export const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#d0d2d8',
  paddingTop: 62,
},
logo: {
  height: 34,
  width: 134,
},
form: {
  width: '100%',
  paddingHorizontal: 16,
  gap: 7,
  marginTop: 42,
},
content : {
  flex: 1,
  width: '100%',
  backgroundColor: '#fff',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding : 24,
  paddingTop: 32,
  marginTop: 24,
},
filters:{
  width : '100%',
  flexDirection : 'row',
  gap : 12,
  borderBottomWidth : 1,
  borderBottomColor : '#e4e6ec',
  paddingBottom : 12,
},
clearButton : {
  marginLeft : 'auto',
},
clearText : {
  color : '#828282',
  fontSize : 12,
  fontWeight : 600,
},
separator: {
  width: '100%',
  height: 1,
  backgroundColor: '#eef0f5',
  marginVertical: 12,
},
listContent: {
  paddingBottom: 62,
  paddingTop: 24,
},
emptyListText: {
  textAlign: 'center',
  color: '#808080',
  fontSize: 14,
}
});