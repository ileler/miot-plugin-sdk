'use strict';

import React from 'react';
import {createStackNavigator} from 'react-navigation';

import {Entrance, Package} from "miot";
import TitleBar from "miot/ui/TitleBar";

import MainPage from './MainPage';
import Setting from "./Setting";
import {PluginEntrance} from "./PluginEntrance";

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

function createRootStack(initPage) {
    return createStackNavigator({
            Home: MainPage,
            Setting
        },
        {
            // ThirdPartyDemo
            initialRouteName: initPage,
            navigationOptions: ({navigation}) => {
                return {
                    header: <TitleBar
                        title={navigation.state.params ? navigation.state.params.title : ''}
                        // style={{ backgroundColor: '#fff' }}
                        type='dark'
                        onPressLeft={() => {
                            navigation.goBack();
                        }}/>,
                };
            },
            transitionConfig: () => ({
                screenInterpolator: interpolator,
            }),
        });
}


function interpolator(props) {
    const {layout, position, scene} = props;

    if (!layout.isMeasured) {
        return (props) => {
            const {navigation, scene} = props;

            const focused = navigation.state.index === scene.index;
            const opacity = focused ? 1 : 0;
            // If not focused, move the scene far away.
            const translate = focused ? 0 : 1000000;
            return {
                opacity,
                transform: [{translateX: translate}, {translateY: translate}],
            };
        };
    }
    const interpolate = (props) => {
        const {scene, scenes} = props;
        const index = scene.index;
        const lastSceneIndexInScenes = scenes.length - 1;
        const isBack = !scenes[lastSceneIndexInScenes].isActive;

        if (isBack) {
            const currentSceneIndexInScenes = scenes.findIndex(item => item === scene);
            const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive);
            const targetSceneIndex = scenes[targetSceneIndexInScenes].index;
            const lastSceneIndex = scenes[lastSceneIndexInScenes].index;

            if (
                index !== targetSceneIndex &&
                currentSceneIndexInScenes === lastSceneIndexInScenes
            ) {
                return {
                    first: Math.min(targetSceneIndex, index - 1),
                    last: index + 1,
                };
            } else if (
                index === targetSceneIndex &&
                currentSceneIndexInScenes === targetSceneIndexInScenes
            ) {
                return {
                    first: index - 1,
                    last: Math.max(lastSceneIndex, index + 1),
                };
            } else if (
                index === targetSceneIndex ||
                currentSceneIndexInScenes > targetSceneIndexInScenes
            ) {
                return null;
            } else {
                return {first: index - 1, last: index + 1};
            }
        } else {
            return {first: index - 1, last: index + 1};
        }
    };

    if (!interpolate) return {opacity: 0};
    const p = interpolate(props);
    if (!p) return;
    const {first, last} = p
    const index = scene.index;
    const opacity = position.interpolate({
        inputRange: [first, first + 0.01, index, last - 0.01, last],
        outputRange: [0, 1, 1, 0.85, 0],
    });

    const width = layout.initWidth;
    const translateX = position.interpolate({
        inputRange: [first, index, last],
        outputRange: false ? [-width, 0, width * 0.3] : [width, 0, width * -0.3],
    });
    const translateY = 0;

    return {
        opacity,
        transform: [{translateX}, {translateY}],
    };
};

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.initData()
    }

    /**
     * 也可以在此判断，需要进入插件哪个页面
     */
    initData() {
        this.initPage = "Home";
        switch (Package.entrance) {
            case Entrance.Scene:
                this.initPage = Entrance.Scene;
                break;
            case PluginEntrance.Setting:
                this.initPage = PluginEntrance.Setting;
                break;
            default:
                this.initPage = "Home";
                break;
        }
        if (Package.pageParams && Package.pageParams.isBackToMainPage) {
            // 需要返回到首页，则首先进入到插件首页，然后插件首页中跳转到真正需要跳转到的page页面
            this.initPage = "Home";
        }
    }


    render() {
        let RootStack = createRootStack(this.initPage);
        return <RootStack/>
    }

}
