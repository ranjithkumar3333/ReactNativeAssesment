import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const PostFeed = () => {
    const [postData, setPostData] = useState({
        id: '',
        userId: "",
        title: '',
        newsFeed: ''
    })

    const handlePost = async () => {
        if (!postData.userId || !postData.title || !postData.newsFeed) {
            Alert.alert("Please Enter All Fields")
        } else {
            const storedData = await AsyncStorage.getItem('postedFeed');
            const parsedData = JSON.parse(storedData);
            let data = [];
            if (storedData === null) {
                data = [postData]
            } else {
                data = parsedData.concat([postData])
            }
            await AsyncStorage.setItem('postedFeed', JSON.stringify(data));
            Alert.alert('News Feed Posted Successfully');

            setPostData({
                id: '',
                userId: "",
                title: '',
                newsFeed: ''
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.cardTitle}>Post Feed</Text>
            <View style={styles.innerContainer}>
                <Card style={styles.card}>

                    <TextInput
                        style={styles.textInput}
                        placeholder="User_Id"
                        value={postData.userId}
                        onChangeText={(text) => setPostData({ ...postData, userId: text })}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{ ...styles.textInput, height: 80 }}
                        placeholder="Title"
                        value={postData.title}
                        onChangeText={(text) => setPostData({ ...postData, title: text })}
                        autoCapitalize="none"
                        multiline={true}
                        numberOfLines={4}
                    />
                    <TextInput
                        style={{ ...styles.textInput, height: 150 }}
                        placeholder="Add feed here"
                        value={postData.newsFeed}
                        onChangeText={(text) => setPostData({ ...postData, newsFeed: text })}
                        autoCapitalize="none"
                        multiline={true}
                        numberOfLines={15}
                    />

                    <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                        <Text style={styles.btnText}>Post</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </SafeAreaView>
    )
}

export default PostFeed;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    innerContainer: {
        justifyContent: 'center',
    },
    card: {
        marginHorizontal: '3%',
        marginVertical: '2%',
    },
    cardTitle: {
        fontSize: 24,
        color: '#130F73',
        textAlign: 'center',
        marginVertical: '4%',
        fontWeight: '500'
    },
    textInput: {
        height: 50,
        marginHorizontal: "2%",
        marginVertical: "3%",
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8',
        elevation: 1.5,
    },
    postBtn: {
        backgroundColor: "#7949A9",
        width: '50%',
        height: "10%",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: '3%'
    },
    btnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400'
    }
})
