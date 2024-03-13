import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import FlatListNetworks from './components/FlatListNetworks';
import Loading from '../../../../kernel/components/Loading';
import api from '../../../../config/util/axios-client'

export default function Networks() {

 
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/restaurant');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])


  return (

    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <FlatListRestaurants
            image={item.image}
            title={item.title}
            description={item.description}
            rating={item.rating}
          />
        }
        keyExtractor={item => item.uid.toString()}
      />
      <Loading isShow={loading} title="Cargando restaurantes" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});