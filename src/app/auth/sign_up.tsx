import {
    View,  Text, TextInput, StyleSheet, Alert, TouchableOpacity
} from 'react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'

// import Header from '../../components/Header'
import {auth} from '../../config'
import Button from '../../components/button'

const handlePress = (email: string, password: string): void => { //Submit押された時に実行。何も返さない。
    //会員登録（後で実装）
    console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password) //Firebaseにユーザー登録する（Firebaseコンソールで確認できる）
        .then((userCredential)=>{
            console.log(userCredential.user.uid)
            router.replace('/memo/list')
        })
        .catch((error)=>{
            const {code, message} = error
            // console.log(error)
            console.log(code, message)
            Alert.alert(message)
        })
}

const SignUp = (): JSX.Element => { //Indexページの定義
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                {/* <TextInput multiline style={styles.input} value='' /> */}
                {/* <TextInput style={styles.input} value='Email address' />
                <TextInput style={styles.input} value='Password' /> */}

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text)=>{setEmail(text)}}
                    autoCapitalize='none' //自動で先頭大文字にしない
                    keyboardType='email-address' //@などが表示されるキーボード
                    placeholder='Email Address'
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text)=>{setPassword(text)}}
                    autoCapitalize='none' //自動で先頭大文字にしない
                    secureTextEntry //パスワード隠す
                    placeholder='Password' //何も入力しない時に表示
                    textContentType='password'
                />

                {/* <Button label='Submit' onPress={()=>{Alert.alert('Pressed!')}} /> */}
                {/* <Button label='Submit' onPress={handlePress} /> */}
                <Button label='Submit' onPress={()=>{handlePress(email, password)}} />
                <View style={styles.fotter}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <Link href='/auth/log_in' asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log in</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#ffffff',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16
    },
    fotter: {
        flexDirection: 'row',
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#000000'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3'
    }
})

export default SignUp

