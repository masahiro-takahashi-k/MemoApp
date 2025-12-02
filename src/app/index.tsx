import {Redirect, router} from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

import {auth} from '../config'

const Index = (): JSX.Element  => {
    useEffect(()=> {
        onAuthStateChanged(auth, (user)=>{
            if(user !== null) { //ユーザーが存在している場合
                router.replace('/memo/list')
            }
        })
    }, [])

    return <Redirect href='auth/log_in' />
    // return <Redirect href='auth/sign_up' />
    // return <Redirect href='memo/list' />
    // return <Redirect href='memo/edit' />
    // return <Redirect href='memo/detail' />
    // return <Redirect href='memo/create' />

}

export default Index


// import {View,  StyleSheet} from 'react-native'

// import Header from '../components/Header'
// import MemoListItem from '../components/MemoListItem'
// import CircleButton from '../components/CircleButton'

// const Index = (): JSX.Element => { //Indexページの定義
//     return (
//         <View style={styles.container}>
//             <Header />
//             <View>
//                 <MemoListItem />
//                 <MemoListItem />
//                 <MemoListItem />
//             </View>
//             <CircleButton>＋</CircleButton>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff'
//         // justifyContent: 'center',
//         // alignItems: 'center'
//     }
// })

// export default Index