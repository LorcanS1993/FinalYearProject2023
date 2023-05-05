import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

const data = [
  {
    id: "1",
    image: "https://cdn1.iconfinder.com/data/icons/fast-food-cafe-colored/96/cider_apple_drinks_craft_96-512.png",
    title: "Cider - 4.5% ",
    subtitle: "Increases BAC by about 0.02% after 1 drink",
  },
  {
    id: "2",
    image: "https://static.vecteezy.com/system/resources/previews/018/931/018/original/cartoon-beer-icon-png.png",
    title: "Beer - 4%",
    subtitle: "Drinking 2 standard lagers in the first hour raises BAC above legal limit of 0.05% in Ireland.",
  },
  {
    id: "3",
    image: "https://dl2.macupdate.com/images/icons256/17376.png?time=1638440528",
    title: "Wine - 13%",
    subtitle: "Drinking over one standard drink of wine per hour can increase BAC above the legal limit in Ireland.",
  },
  {
    id: "4",
    image: "https://cdn-icons-png.flaticon.com/128/920/920623.png",
    title: "Spirits - 40%",
    subtitle: "One vodka can result in a BAC of 0.02-0.05% in most individuals.",
  },
];

const renderItem = ({ item, index }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.infoImage} />
      <View style={styles.textContainer}>
        <Text style={styles.infoTitle}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

export default function AlcoholInformation() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Alcohol Information</Text>
       <Text style={styles.subheading}>How many drinks until you are over the BAC Limit?</Text>
      <FlatList
        data={data}
        contentContainerStyle={styles.infoContainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
  },
  heading: {
    fontSize: 32,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 20,
    color: "#222",
    textTransform: "uppercase",
  },
  infoContainer: {
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 8,
  },
  textContainer: {
    padding: 10,
  },
  subheading: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
});
