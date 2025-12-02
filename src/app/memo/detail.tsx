import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { onSnapshot, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'
import { JSX } from 'react'
import Icon from '../../components/Icon'
import { auth, db } from '../../config'
import { type Memo } from '../../../types/memo'

const handlePress = (id: string): void => {
    // router.push('/memo/edit')
    router.push({pathname:'/memo/edit', params:{id}})
}

const Detail = (): JSX.Element => { //Indexページの定義
    // const params = useLocalSearchParams()
    const id = String(useLocalSearchParams().id)
    console.log(id)
    const [memo, setMemo] = useState<Memo | null>(null)
    useEffect(()=>{
        if (auth.currentUser === null) {return}
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
        const unsubscribe = onSnapshot(ref, (memoDoc)=>{
            // console.log(memoDoc.data())
            const {bodyText, updatedAt} = memoDoc.data() as Memo
            setMemo({
                id: memoDoc.id,
                bodyText,
                updatedAt
            })
        })
        return unsubscribe
    },[])
    return (
      <View style={styles.container}>
        <View style={styles.memoHeader}>
            <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
            <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString('ja-JP')}</Text>
        </View>
        <ScrollView style={styles.memoBody}>
            <Text style={styles.memoBodyText}>
                {memo?.bodyText}
            </Text>
        </ScrollView>
        <CircleButton onPress={()=>{handlePress(id)}} style={{ top:60, bottom:'auto' }}>
        {/* <CircleButton onPress={handlePress} style={{ top:60, bottom:'auto' }}> */}
            <Icon name='pencil' size={40} color='#ffffff' />
            {/* <Feather name='check' size={40} /> */}
            {/* <AntDesign name='plus-circle' size={40} /> */}
        </CircleButton>
      </View>
    )
}

//     return (
//       <View style={styles.container}>
//         <View style={styles.memoHeader}>
//             <Text style={styles.memoTitle} numberOfLines={1}>買い物リスト</Text>
//             <Text style={styles.memoDate}>2025年10月1日 10:00</Text>
//         </View>
//         <ScrollView style={styles.memoBody}>
//             <Text style={styles.memoBodyText}>
//                 買い物リスト
//                 書体やレイアウトなどを確認するために用います。
//                 本文用なので使い方を間違えると不自然に見えることもありますので要注意。
//             </Text>
//         </ScrollView>
//         <CircleButton onPress={handlePress} style={{ top:60, bottom:'auto' }}>
//             <Icon name='pencil' size={40} color='#ffffff' />
//             {/* <Feather name='check' size={40} /> */}
//             {/* <AntDesign name='plus-circle' size={40} /> */}
//         </CircleButton>
//       </View>
//     )
// }


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
        paddingHorizontal: 27
    },
    memoBodyText: {
        paddingVertical: 32,
        fontSize: 16,
        lineHeight: 24,
        color: '#000000'
    }

})

export default Detail