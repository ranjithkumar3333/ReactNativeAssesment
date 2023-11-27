import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedData } from '../Redux/Reducer/feedSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ViewFeed = () => {
    const dispatch = useDispatch();
    const { feedData } = useSelector((state) => state.feedSlice);
    const [retreivedData, setRetreivedData] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getData()
    }, [])

    const fetchData = () => {
        dispatch(fetchFeedData());
    };

    const getData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('postedFeed');

            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                setRetreivedData(parsedData);

            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {retreivedData && retreivedData?.map((item, index) => (
                    <Card key={index} style={styles.card}>
                        <Card.Content>
                            <Text style={styles.userID}>UserId - {item.userId}</Text>
                            <Text style={styles.title} variant="titleLarge">{item.title}</Text>
                            <Text style={styles.body} variant="bodyMedium">{item.body}</Text>
                        </Card.Content>
                    </Card>
                ))
                }

                {feedData && feedData?.map((item, index) => (
                    <Card key={index} style={styles.card}>
                        <Card.Content>
                            <Text style={styles.userID}>UserId - {item.userId}</Text>
                            <Text style={styles.title} variant="titleLarge">{item.title}</Text>
                            <Text style={styles.body} variant="bodyMedium">{item.body}</Text>
                        </Card.Content>
                    </Card>
                ))
                }
            </ScrollView>
        </SafeAreaView >
    );
};

export default ViewFeed;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height - 50,
    },
    card: {
        marginVertical: "2%",
        marginHorizontal: '3%'
    },
    userID: {
        textAlign: 'center',
        color: '#130F73',
        fontSize: 18,
        fontWeight: '500'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#130F73',
        marginVertical: '2%',
        textTransform: 'capitalize'
    },
    body: {
        textAlign: 'justify',
        fontSize: 14,
        fontWeight: '400'
    }
});
