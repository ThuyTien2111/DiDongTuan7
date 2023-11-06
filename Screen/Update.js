import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Update = ({ navigation }) => {
    const route = useRoute();
    var { todoToUpdate } = route.params;

    var [data, setData] = useState([])
    useEffect(() => {
        fetch('https://654099b845bedb25bfc225f4.mockapi.io/todo')
            .then((response) => response.json())
            .then((json) => {
                data = json;
                // console.log(data.at(1))
                setData(json)
            });
    })

    var [todo, setToDo] = useState(todoToUpdate.job)
    const updateTodo = (text) => {
        todoToUpdate.job=text;
        // Gửi HTTP PUT request để cập nhật dữ liệu trên API
        fetch(`https://654099b845bedb25bfc225f4.mockapi.io/todo/${todoToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoToUpdate),
        })
            .then((response) => response.json())
            .then((updatedTodo) => {
                console.log(updatedTodo) 
            })
            .catch((error) => {
                console.error('Error updating todo:', error);
            });
        navigation.navigate('Home')
    };

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Image source={require('./img/Rectangle.png')} style={{ borderRadius: 30, height: 50, width: 50 }} />
                <View>
                    <Text style={styles.user}>Hi Twinkle</Text>
                    <Text>Have a greate day a head</Text>
                </View>
            </View>
            <Text style={styles.title}>ADD YOUR JOB</Text>
            <View style={styles.searchBar}>
                <Foundation name="clipboard-notes" size={25} color="green" style={{ marginLeft: 10 }} />
                <TextInput
                    value={todo}
                    onChangeText={(value) => setToDo(value)}
                    style={{ marginLeft: 20, width: 270, height: 30 }} />
            </View>
            <TouchableOpacity onPress={() => { updateTodo(todo) }}
                style={styles.addButton}>
                <View style={styles.addButtonBackground} >
                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontWeight: '400' }}>FINISH</Text>
                </View>
            </TouchableOpacity>
            <Image source={require('./img/Image 96.png')} style={{ width: 200, height: 170, marginTop: 40, alignSelf: 'center' }} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    user: {
        width: 101,
        height: 30,
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center'
    },
    userDes: {
        width: 168,
        height: 22,
        // color:'gray',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
        opacity: '75%'
    },
    title: {
        width: 300,
        height: 48,
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 48,
        textAlign: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        borderWidth: 1,
        width: 334,
        height: 44,
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom: 20,

    },
    addButton: {
        alignItems: 'center',
        bottom: 16,
    },
    addButtonBackground: {
        marginTop: 50,
        backgroundColor: '#00BDD6',
        borderRadius: 15,
        width: 200,
        height: 50,
        justifyContent: 'center',

    },
});

export default Update;