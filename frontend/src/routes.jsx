import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import WinDialog from "./components/WinDialog/WinDialog";

const routes = [
  {
    path: '/',
    Component: Header ,
    children: [
      {index: true, Component: Game},
      {path: '/test', Component: WinDialog}
    ]
  },
]

export default routes;