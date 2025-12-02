import {
    View,  Text, TextInput, Alert,
    StyleSheet, TouchableOpacity
} from 'react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

// import Header from '../../components/Header'
import Button from '../../components/button'
import {auth} from '../../config'

const handlePress = (email: string, password: string): void => { //Submit押された時に実行。何も返さない。
    //ログイン（後で実装）
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log(userCredential.user.uid)
            router.replace('/memo/list')
        })
        .catch((error)=>{
            const {code, message} = error
            console.log(code, message)
            Alert.alert(message)
        })
}

const Login = (): JSX.Element => { //Indexページの定義
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                {/* <TextInput multiline style={styles.input} value='' /> */}
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
                <Button label='Submit' onPress={()=>{handlePress(email, password)}} />
                <View style={styles.fotter}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    {/* <Link href='/auth/sign_up'>Sign up here!!!</Link> */}
                    <Link href='/auth/sign_up' asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Sign up here!</Text>
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
    // button: {
    //     backgroundColor: '#467FD3',
    //     borderRadius: 4,
    //     alignSelf: 'flex-start',
    //     marginBottom: 24
    // },
    // buttonLabel: {
    //     fontSize: 16,
    //     lineHeight: 32,
    //     color: '#ffffff',
    //     paddingVertical: 8,
    //     paddingHorizontal: 24
    // },
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

export default Login

