'use strict';

import React from 'react';
import {createStackNavigator} from 'react-navigation';

import {Entrance, Package} from "miot";

import MainPage from './MainPage';
import Setting from "./Setting";

function createRootStack(initPage) {
    return createStackNavigator({
        Home: MainPage,
        Setting
    });
}

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
