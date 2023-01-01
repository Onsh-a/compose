"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const vue_router_1 = require("vue-router");
const Main_vue_1 = __importDefault(require("./views/Main.vue"));
const ChordApplicature_vue_1 = __importDefault(require("./views/ChordApplicature.vue"));
const NotFound_vue_1 = __importDefault(require("./views/NotFound.vue"));
const Tuner_vue_1 = __importDefault(require("./views/Tuner.vue"));
exports.routes = [
    {
        path: '/',
        component: Main_vue_1.default,
        isAvailableInMenu: true,
        name: 'Main',
    },
    {
        path: '/chord-applicature',
        component: ChordApplicature_vue_1.default,
        isAvailableInMenu: true,
        name: 'Chord Applicature',
    },
    {
        path: '/tuner',
        component: Tuner_vue_1.default,
        isAvailableInMenu: true,
        name: 'Tuner',
    },
    {
        path: '/not-found',
        component: NotFound_vue_1.default,
        isAvailableInMenu: false,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/not-found',
        isAvailableInMenu: false,
    }
];
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHashHistory)(),
    routes: exports.routes,
});
exports.default = router;
