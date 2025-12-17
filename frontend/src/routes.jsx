import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import WinDialog from "./components/WinDialog/WinDialog";
import Leaderboard from "./components/Leaderboard/Leaderboard";

const routes = [
  {
    path: '/',
    Component: Header ,
    children: [
      {index: true, Component: Game},
      {path: '/test', Component: WinDialog},
      {path: '/leaderboard', Component: Leaderboard}
    ]
  },
]

export default routes;