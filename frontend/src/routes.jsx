import { Children, Component } from "react";
import Header from "./components/Header/Header";
import Game from "./components/Game/Game";

const routes = [
  {
    path: '/',
    Component: Header ,
    children: [
      {index: true, Component: Game}
    ]
  },
]

export default routes;