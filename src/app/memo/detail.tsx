import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'
import { JSX } from 'react'
import Icon from '../../components/Icon'

const Detail = (): JSX.Element => { //Indexページの定義
    const handlePress = (): void => {
        router.push('/memo/edit')
    }
    return (
      <View style={styles.container}>
        <View style={styles.memoHeader}>
            <Text style={styles.memoTitle}>買い物リスト</Text>
            <Text style={styles.memoDate}>2025年10月1日 10:00</Text>
        </View>
        <ScrollView style={styles.memoBody}>
            <Text style={styles.memoBodyText}>
                買い物リスト
                書体やレイアウトなどを確認するために用います。
                本文用なので使い方を間違えると不自然に見えることもありますので要注意。
            </Text>
        </ScrollView>
        <CircleButton onPress={handlePress} style={{ top:60, bottom:'auto' }}>
            <Icon name='pencil' size={40} color='#ffffff' />
            {/* <Feather name='check' size={40} /> */}
            {/* <AntDesign name='plus-circle' size={40} /> */}
        </CircleButton>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {  //外側の枠の定義
        flex: 1, //画面いっぱいに要素を広げる
        backgroundColor: '#ffffff'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19
    },
    memoTitle: {
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold'
    },
    memoDate: {
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 16,
    },
    memoBody: {
        paddingVertical: 32,
        paddingHorizontal: 27
    },
    memoBodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#000000'
    }

})

export default Detail