import {View, Text, Button} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {GlassView} from "expo-glass-effect";
import {useRouter} from "expo-router";

const NewPost = () => {
    const insets = useSafeAreaInsets();
    const router =useRouter()
    return (
        <View className="bg-white flex-1 pl-7" style={{ paddingTop: insets.top+70 }}>
            <Text>New post screen </Text>
            <GlassView
                glassEffectStyle="regular"

                style={{
                    paddingHorizontal: 0,
                    height: 70,
                    width: "90%",
                    paddingTop: 0,
                    overflow: "visible",
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button title={"Navigate"} onPress={() => {
                  router.push("/(new_post_stepper)")
                }}/>
            </GlassView>
        </View>
    )
}
export default NewPost