import { ImageSourcePropType, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value, },
      { translateY: translateY.value, },
    ],
  }))

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
      </Animated.View>
    </GestureDetector>
  );
}
