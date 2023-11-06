import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-web';

const Home = ({ navigation }) => {
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
    const renderTodoItem = ({ item }) => (

        <View style={styles.todoItem} >
            <Text style={
                [styles.todoText, { textDecorationLine: item.status ? 'line-through' : 'none' }]} >
                <TouchableOpacity onPress={toggleTodoCompletion(item.id)} >
                    <FontAwesome name={item.status ? 'check-square-o' : 'square-o'}
                        size={20}
                        color="green"
                        style={{ marginRight: 20 }} />
                </TouchableOpacity>
                {item.job} </Text>
            <TouchableOpacity onPress={editTodo(item.id)} >
                <FontAwesome name="edit"
                    size={20}
                    color="red"
                    style={styles.editIcon}
                />
            </TouchableOpacity>
        </View>
    );

    const toggleTodoCompletion = (id) => () => {
        // Tìm đối tượng todo dựa vào id
        var todoToUpdate = data.find((item) => item.id === id);
        if (todoToUpdate) {
            // Đảo ngược giá trị status (hoàn thành/chưa hoàn thành)
            todoToUpdate.status = !todoToUpdate.status;

            // Gửi HTTP PUT request để cập nhật dữ liệu trên API
            fetch(`https://654099b845bedb25bfc225f4.mockapi.io/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoToUpdate),
            })
                .then((response) => response.json())
                .then((updatedTodo) => {
                    todoToUpdate = updatedTodo
                    setData([...data])
                    console.log(updatedTodo)
                })
                .catch((error) => {
                    console.error('Error updating todo:', error);
                });
        }
    };

    const editTodo = (id) => () => {
        // Tìm đối tượng todo dựa vào id
        var todoToUpdate = data.find((item) => item.id === id);
        navigation.navigate('Update', { todoToUpdate });

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
            <View style={styles.searchBar}>
                <FontAwesome name="search" size={25} color="black" style={{ marginLeft: 10 }} />
                <TextInput style={{ marginLeft: 20, width: 270, height: 30 }} placeholder={"Search"}></TextInput>
            </View>
            <FlatList data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTodoItem}
                style={styles.todoList}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Add')}
                style={styles.addButton}>
                <View style={styles.addButtonBackground} >
                    <Text style={{ color: 'white', fontSize: 32, textAlign: 'center' }}>+</Text>
                </View>
            </TouchableOpacity>
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
        justifyContent: 'flex-end',
        marginBottom: 30,
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
    todoList: {
        marginTop: 16,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#171A1F26',
        marginBottom: 20,
        borderRadius: 20,


    },
    todoText: {
        fontWeight: 700,
        fontSize: 16,
        marginLeft: 5,
    },
    editIcon: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    addButton: {
        alignItems: 'center',
        bottom: 16,
    },
    addButtonBackground: {
        backgroundColor: '#00BDD6',
        borderRadius: 40,
        width: 70,
        height: 70,
        justifyContent: 'center',

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
    }
});

export default Home;