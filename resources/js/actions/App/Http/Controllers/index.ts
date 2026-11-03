import Admin from './Admin'
import DashboardController from './DashboardController'
import Teams from './Teams'
import SentimentoController from './SentimentoController'
import PedidoAjudaController from './PedidoAjudaController'
import ConteudoBemEstarController from './ConteudoBemEstarController'
import DaviChatController from './DaviChatController'
import Settings from './Settings'
const Controllers = {
    Admin: Object.assign(Admin, Admin),
DashboardController: Object.assign(DashboardController, DashboardController),
Teams: Object.assign(Teams, Teams),
SentimentoController: Object.assign(SentimentoController, SentimentoController),
PedidoAjudaController: Object.assign(PedidoAjudaController, PedidoAjudaController),
ConteudoBemEstarController: Object.assign(ConteudoBemEstarController, ConteudoBemEstarController),
DaviChatController: Object.assign(DaviChatController, DaviChatController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers