import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from './components/pages/IndexPage.vue'
import Cursos from './components/pages/Cursos.vue'
import Turmas from './components/pages/Turmas.vue'
import Arquivo from './components/pages/Arquivo.vue'
import Estatisticas from './components/pages/Estatisticas.vue'
import Estudantes from './components/pages/Estudantes.vue'
import Marcacao from './components/pages/Marcacao.vue'
import Login from './components/Login.vue'


import CSSPage from './assets/docs/CSSPage.vue';
import ComponentsPage from './assets/docs/ComponentsPage.vue';
import AdvancedPage from './assets/docs/AdvancedPage.vue';

// FREE
import HomePage from './assets/docs/HomePage.vue';
import GridPage from './assets/docs/GridPage.vue';
import BadgePage from './assets/docs/BadgePage.vue';
import CardPage from './assets/docs/CardPage.vue';
import ButtonPage from './assets/docs/ButtonPage.vue';
import TablePage from './assets/docs/TablePage.vue';
import TableAdditionalPage from './assets/docs/TableAdditionalPage.vue';
import DataTablePage from './assets/docs/DataTablePage.vue';
import TableResponsivePage from './assets/docs/TableResponsivePage.vue';
import TablePaginationPage from './assets/docs/TablePaginationPage.vue';
import TableScrollPage from './assets/docs/TableScrollPage.vue';
import TableSearchPage from './assets/docs/TableSearchPage.vue';
import TableSortPage from './assets/docs/TableSortPage.vue';
import DropdownPage from './assets/docs/DropdownPage.vue';
import JumbotronPage from './assets/docs/JumbotronPage.vue';
import CarouselPage from './assets/docs/CarouselPage.vue';
import BreadcrumbPage from './assets/docs/BreadcrumbPage.vue';
import FaPage from './assets/docs/FaPage.vue';
import InputsPage from './assets/docs/InputsPage.vue';
import LiveDemoPage from './assets/docs/LiveDemoPage.vue';
import MediaPage from './assets/docs/MediaPage.vue';
import ListGroupPage from './assets/docs/ListGroupPage.vue';
import NavbarPage from './assets/docs/NavbarPage.vue';
import NavigationPage from './assets/docs/NavigationPage.vue';
import CollapsePage from './assets/docs/CollapsePage.vue';
import PaginationPage from './assets/docs/PaginationPage.vue';
import PanelPage from './assets/docs/PanelPage.vue';
import ChartPage from './assets/docs/ChartPage.vue';
import ProgressBarsPage from './assets/docs/ProgressBarsPage.vue';
import TooltipPage from './assets/docs/TooltipPage.vue';
import PopoverPage from './assets/docs/PopoverPage.vue';
import EdgeHeaderPage from './assets/docs/EdgeHeaderPage.vue';
import MasksPage from './assets/docs/MasksPage.vue';
import HoverPage from './assets/docs/HoverPage.vue';
import VideoCarouselPage from './assets/docs/VideoCarouselPage.vue';
import ModalPage from './assets/docs/ModalPage.vue';
import FormsPage from './assets/docs/FormsPage.vue';
import SearchPage from './assets/docs/SearchPage.vue';
import ValidationPage from './assets/docs/ValidationPage.vue';
import FooterPage from './assets/docs/FooterPage.vue';


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/',
        name: 'IndexPage',
        component: IndexPage
    }, {
        path: '/cursos',
        name: 'Cursos',
        component: Cursos
    }, {
        path: '/turmas',
        name: 'Turmas',
        component: Turmas
    }, {
        path: '/estudantes',
        name: 'Estudantes',
        component: Estudantes
    }, {
        path: '/marcacao',
        name: 'Marcacao',
        component: Marcacao
    }, {
        path: '/estatisticas',
        name: 'Estatisticas',
        component: Estatisticas
    }, {
        path: '/arquivo',
        name: 'Arquivo',
        component: Arquivo
    },

        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }


        //TEMPLATE ROUTES

        {
            path: '/demo',
            name: 'Home',
            component: HomePage
        },

        // PAGES
        {
            path: '/css',
            name: 'CSSPage',
            component: CSSPage
        }, {
            path: '/components',
            name: 'ComponentsPage',
            component: ComponentsPage
        }, {
            path: '/advanced',
            name: 'AdvancedPage',
            component: AdvancedPage
        },

        // FREE
        {
            path: '/components/badge',
            name: 'BadgePage',
            component: BadgePage
        }, {
            path: '/components/grid',
            name: 'GridPage',
            component: GridPage
        }, {
            path: '/components/card',
            name: 'CardPage',
            component: CardPage
        }, {
            path: '/components/button',
            name: 'ButtonPage',
            component: ButtonPage
        }, {
            path: '/css/table',
            name: 'TablePage',
            component: TablePage
        }, {
            path: '/css/table-additional',
            name: 'TableAdditionalPage',
            component: TableAdditionalPage
        }, {
            path: '/advanced/datatable',
            name: 'DataTablePage',
            component: DataTablePage
        }, {
            path: '/advanced/table-pagination',
            name: 'TablePaginationPage',
            component: TablePaginationPage
        }, {
            path: '/css/table-responsive',
            name: 'TableResponsviePage',
            component: TableResponsivePage
        }, {
            path: '/advanced/table-search',
            name: 'TableSearchPage',
            component: TableSearchPage
        }, {
            path: '/advanced/table-sort',
            name: 'TableSortPage',
            component: TableSortPage
        }, {
            path: '/advanced/table-scroll',
            name: 'TableScrollPage',
            component: TableScrollPage
        }, {
            path: '/components/dropdown',
            name: 'DropdownPage',
            component: DropdownPage
        }, {
            path: '/css/jumbotron',
            name: 'JumbotronPage',
            component: JumbotronPage
        }, {
            path: '/advanced/carousel',
            name: 'CarouselPage',
            component: CarouselPage
        }, {
            path: '/components/breadcrumb',
            name: 'BreadcrumbPage',
            component: BreadcrumbPage
        }, {
            path: '/css/hover',
            name: 'HoverPagePage',
            component: HoverPage
        }, {
            path: '/css/icons',
            name: 'FaPage',
            component: FaPage
        }, {
            path: '/components/inputs',
            name: 'InputsPage',
            component: InputsPage
        }, {
            path: '/components/liveDemo',
            name: 'LiveDemoPage',
            component: LiveDemoPage
        }, {
            path: '/components/media',
            name: 'MediaPage',
            component: MediaPage
        }, {
            path: '/components/listgroup',
            name: 'ListGroupPage',
            component: ListGroupPage
        }, {
            path: '/components/navbar',
            name: 'NavbarPage',
            component: NavbarPage
        }, {
            path: '/components/navigation',
            name: 'NavigationPage',
            component: NavigationPage
        }, {
            path: '/advanced/collapse',
            name: 'CollapsePage',
            component: CollapsePage
        }, {
            path: '/components/pagination',
            name: 'PaginationPage',
            component: PaginationPage
        }, {
            path: '/components/panel',
            name: 'PanelPage',
            component: PanelPage
        }, {
            path: '/advanced/chart',
            name: 'ChartPage',
            component: ChartPage
        }, {
            path: '/components/progress-bars',
            name: 'ProgressBarsPage',
            component: ProgressBarsPage
        }, {
            path: '/advanced/tooltip',
            name: 'TooltipPage',
            component: TooltipPage
        }, {
            path: '/advanced/popover',
            name: 'PopoverPage',
            component: PopoverPage
        }, {
            path: '/components/edge-header',
            name: 'EdgeHeaderPage',
            component: EdgeHeaderPage
        }, {
            path: '/css/masks',
            name: 'MasksPage',
            component: MasksPage
        }, {
            path: '/advanced/validation',
            name: 'ValidationPage',
            component: ValidationPage
        }, {
            path: '/advanced/videocarousel',
            name: 'VideoCarouselPage',
            component: VideoCarouselPage
        }, {
            path: '/advanced/modal',
            name: 'ModalPage',
            component: ModalPage
        }, {
            path: '/components/forms',
            name: 'FormsPage',
            component: FormsPage
        }, {
            path: '/components/search',
            name: 'SearchPage',
            component: SearchPage
        }, {
            path: '/components/footer',
            name: 'FooterPage',
            component: FooterPage
        }
    ]
})
