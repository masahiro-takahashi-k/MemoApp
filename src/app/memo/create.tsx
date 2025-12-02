import {
    View,  TextInput, StyleSheet
} from 'react-native'
    //TextInputでテキスト入力できる
import { router } from 'expo-router'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState } from 'react'

import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import {db, auth} from '../../config'

const handlePress = (bodyText: string): void => {
    if (auth.currentUser === null) {return}
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`) //``で文字列の中で変数を使う
    addDoc(ref, {
        // bodyText: bodyText
        bodyText, //キーとバリューが同じなら省略できる
        // updatedAt: new Date()
        updatedAt: Timestamp.fromDate(new Date()) //firestoreで時刻扱う方法の推奨
    })
        .then((docRef)=>{
            console.log('success', docRef.id)
            router.back()
        })
        .catch((error)=>{
            console.log(error)
        })
}

    //awaitを使った書き方
    // const handlePress = async (): void => {
    //     await addDoc(collection(db,'memos'), {
    //         bodyText: 'test2'
    //     })
    //         .catch((error)=>{
    //             console.log(error)
    //         })
    //     router.back()
    // }

const Create = (): JSX.Element => { //Indexページの定義

    const [bodyText, setBodyText] = useState('')

    return (
        // <KeyboardAvoidingView behavior='height' style={styles.container}>
        <KeyboardAvoidingView  style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText ={(text)=>{setBodyText(text)}}
                    autoFocus //開いた瞬間に自動的に入力箇所をフォーカス
                />
            </View>
            <CircleButton onPress={()=>{handlePress(bodyText)}}>
                <Icon name='check' size={40} color='#ffffff' />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }
})

export default Create
