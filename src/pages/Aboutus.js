import React from 'react';
import { StyleSheet, Text, View } from "react-native";
const Aboutus = () => {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          margin:10,
          textAlign: 'center'
        },
        box:{ 
            flex: 2, 
            backgroundColor: "#7cabbf", 
            padding:10, 
            margin:10,
            borderRadius:20
        },
        heading:{ 
            color:'black',
            textAlign: 'center',
            fontSize:20,
            padding:5
        },
        body:{ 
            color:'white',
            fontSize:15,
            padding:5
        },
        contacttext:{
            fontSize:18,
            textAlign: 'center',
            color:'black',
            padding:4
        }
      });
      
  return (
    <>
      
      <View style={[styles.container, {
      
        flexDirection: "column"
        }]}>
        <View style={styles.box} >
            <Text style={styles.heading}>Working Partner</Text>
            <Text style={styles.body}>Help every business and workers with their transportations and hence, acts as a working partner</Text>
        </View>
        <View style={styles.box} >
            <Text style={styles.heading}>Car Rental</Text>
            <Text style={styles.body}>We rent cars/trucks for all requirements of people at affordable prices</Text>
        </View>
        <View style={styles.box} >
            <Text style={styles.heading}>Taxi Service</Text>
            <Text style={styles.body}>We also provide general Taxi Services for your easy mobility within city.</Text>
        </View>
        </View>
        <View style={styles.contact}>
            <Text style={styles.contacttext}>Email Us : support@easygo.com</Text>
            <Text style={styles.contacttext}>Toll Free No : 1800 401 401</Text>
        </View>
        
    </>
  );
};

export default Aboutus;
