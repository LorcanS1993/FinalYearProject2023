import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList } from 'react-native'

export default function AccountLogin({ navigation }) {
  const data = [
    {
      id: 1,
      name: 'Lorcan Stakem',
      position: 'G00289865@atu.ie',
      image: 'https://media.licdn.com/dms/image/C4E03AQEp7kE0XVkRZA/profile-displayphoto-shrink_800_800/0/1642088066913?e=2147483647&v=beta&t=VWJRP4fw05Rnh-HCJ8IR1ZcX42ZJKKHrOPs6ZilJI9E',
    },
  ]

  const [users, setUsers] = useState(data)

  const clickEventListener = () => {
    Alert.alert('You are logged in!')
    
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} contentContainerStyle={styles.listContainer} data={users}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                clickEventListener()
              }}>
              <View style={styles.cardHeader}>
              </View>
              <Image style={styles.userImage} source={{ uri: item.image }} />
              <View style={styles.cardFooter}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.position}>{item.position}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "azure",
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  icon: {
    height: 20,
    width: 20,
  },
})