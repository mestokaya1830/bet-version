import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _434f1472 = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _58baa290 = () => interopDefault(import('../pages/home/account.vue' /* webpackChunkName: "pages/home/account" */))
const _27f205da = () => interopDefault(import('../pages/home/account/index.vue' /* webpackChunkName: "pages/home/account/index" */))
const _a2b1658e = () => interopDefault(import('../pages/home/account/basketinplaymarkets.vue' /* webpackChunkName: "pages/home/account/basketinplaymarkets" */))
const _6e882ebe = () => interopDefault(import('../pages/home/account/basketliverate.vue' /* webpackChunkName: "pages/home/account/basketliverate" */))
const _7ca8ba1c = () => interopDefault(import('../pages/home/account/basketmarkets.vue' /* webpackChunkName: "pages/home/account/basketmarkets" */))
const _1f6eeb96 = () => interopDefault(import('../pages/home/account/basketrate.vue' /* webpackChunkName: "pages/home/account/basketrate" */))
const _47a5e954 = () => interopDefault(import('../pages/home/account/basketratelimit.vue' /* webpackChunkName: "pages/home/account/basketratelimit" */))
const _6c29c888 = () => interopDefault(import('../pages/home/account/boss.vue' /* webpackChunkName: "pages/home/account/boss" */))
const _88d09c9e = () => interopDefault(import('../pages/home/account/branch.vue' /* webpackChunkName: "pages/home/account/branch" */))
const _753d0dda = () => interopDefault(import('../pages/home/account/codelist.vue' /* webpackChunkName: "pages/home/account/codelist" */))
const _2c232cec = () => interopDefault(import('../pages/home/account/creditlog.vue' /* webpackChunkName: "pages/home/account/creditlog" */))
const _2c8ee23a = () => interopDefault(import('../pages/home/account/detailsaccount.vue' /* webpackChunkName: "pages/home/account/detailsaccount" */))
const _c77bbe26 = () => interopDefault(import('../pages/home/account/detailscomission.vue' /* webpackChunkName: "pages/home/account/detailscomission" */))
const _c366afda = () => interopDefault(import('../pages/home/account/gamelog.vue' /* webpackChunkName: "pages/home/account/gamelog" */))
const _069f7709 = () => interopDefault(import('../pages/home/account/generalset.vue' /* webpackChunkName: "pages/home/account/generalset" */))
const _55c5bc7d = () => interopDefault(import('../pages/home/account/info.vue' /* webpackChunkName: "pages/home/account/info" */))
const _4f54650a = () => interopDefault(import('../pages/home/account/loginlog.vue' /* webpackChunkName: "pages/home/account/loginlog" */))
const _41f2aa24 = () => interopDefault(import('../pages/home/account/nextgoals.vue' /* webpackChunkName: "pages/home/account/nextgoals" */))
const _64ea7fdf = () => interopDefault(import('../pages/home/account/paycupons.vue' /* webpackChunkName: "pages/home/account/paycupons" */))
const _0097d7ac = () => interopDefault(import('../pages/home/account/profile.vue' /* webpackChunkName: "pages/home/account/profile" */))
const _4ab19072 = () => interopDefault(import('../pages/home/account/register.vue' /* webpackChunkName: "pages/home/account/register" */))
const _06791930 = () => interopDefault(import('../pages/home/account/setlimit.vue' /* webpackChunkName: "pages/home/account/setlimit" */))
const _27fa34a0 = () => interopDefault(import('../pages/home/account/settime.vue' /* webpackChunkName: "pages/home/account/settime" */))
const _c38fe7f2 = () => interopDefault(import('../pages/home/account/singelbets.vue' /* webpackChunkName: "pages/home/account/singelbets" */))
const _6780dff6 = () => interopDefault(import('../pages/home/account/soccerinplaymarkets.vue' /* webpackChunkName: "pages/home/account/soccerinplaymarkets" */))
const _7ab6d3c4 = () => interopDefault(import('../pages/home/account/soccerliverate.vue' /* webpackChunkName: "pages/home/account/soccerliverate" */))
const _92357122 = () => interopDefault(import('../pages/home/account/soccermarkets.vue' /* webpackChunkName: "pages/home/account/soccermarkets" */))
const _9f370250 = () => interopDefault(import('../pages/home/account/soccerrate.vue' /* webpackChunkName: "pages/home/account/soccerrate" */))
const _698f8493 = () => interopDefault(import('../pages/home/account/soccerratelimit.vue' /* webpackChunkName: "pages/home/account/soccerratelimit" */))
const _ae3a11ae = () => interopDefault(import('../pages/home/account/Users.vue' /* webpackChunkName: "pages/home/account/Users" */))
const _65f25874 = () => interopDefault(import('../pages/home/account/users/_id.vue' /* webpackChunkName: "pages/home/account/users/_id" */))
const _7cc2a2b4 = () => interopDefault(import('../pages/home/basketfixture.vue' /* webpackChunkName: "pages/home/basketfixture" */))
const _4cc308cc = () => interopDefault(import('../pages/home/basketinplay.vue' /* webpackChunkName: "pages/home/basketinplay" */))
const _924f59ba = () => interopDefault(import('../pages/home/soccerfixture.vue' /* webpackChunkName: "pages/home/soccerfixture" */))
const _75b460af = () => interopDefault(import('../pages/home/soccerinplay.vue' /* webpackChunkName: "pages/home/soccerinplay" */))
const _1a5cb646 = () => interopDefault(import('../pages/resetpass.vue' /* webpackChunkName: "pages/resetpass" */))
const _0f837ac2 = () => interopDefault(import('../pages/welcome.vue' /* webpackChunkName: "pages/welcome" */))
const _7ad0bd4f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _434f1472,
    name: "home",
    children: [{
      path: "account",
      component: _58baa290,
      children: [{
        path: "",
        component: _27f205da,
        name: "home-account"
      }, {
        path: "basketinplaymarkets",
        component: _a2b1658e,
        name: "home-account-basketinplaymarkets"
      }, {
        path: "basketliverate",
        component: _6e882ebe,
        name: "home-account-basketliverate"
      }, {
        path: "basketmarkets",
        component: _7ca8ba1c,
        name: "home-account-basketmarkets"
      }, {
        path: "basketrate",
        component: _1f6eeb96,
        name: "home-account-basketrate"
      }, {
        path: "basketratelimit",
        component: _47a5e954,
        name: "home-account-basketratelimit"
      }, {
        path: "boss",
        component: _6c29c888,
        name: "home-account-boss"
      }, {
        path: "branch",
        component: _88d09c9e,
        name: "home-account-branch"
      }, {
        path: "codelist",
        component: _753d0dda,
        name: "home-account-codelist"
      }, {
        path: "creditlog",
        component: _2c232cec,
        name: "home-account-creditlog"
      }, {
        path: "detailsaccount",
        component: _2c8ee23a,
        name: "home-account-detailsaccount"
      }, {
        path: "detailscomission",
        component: _c77bbe26,
        name: "home-account-detailscomission"
      }, {
        path: "gamelog",
        component: _c366afda,
        name: "home-account-gamelog"
      }, {
        path: "generalset",
        component: _069f7709,
        name: "home-account-generalset"
      }, {
        path: "info",
        component: _55c5bc7d,
        name: "home-account-info"
      }, {
        path: "loginlog",
        component: _4f54650a,
        name: "home-account-loginlog"
      }, {
        path: "nextgoals",
        component: _41f2aa24,
        name: "home-account-nextgoals"
      }, {
        path: "paycupons",
        component: _64ea7fdf,
        name: "home-account-paycupons"
      }, {
        path: "profile",
        component: _0097d7ac,
        name: "home-account-profile"
      }, {
        path: "register",
        component: _4ab19072,
        name: "home-account-register"
      }, {
        path: "setlimit",
        component: _06791930,
        name: "home-account-setlimit"
      }, {
        path: "settime",
        component: _27fa34a0,
        name: "home-account-settime"
      }, {
        path: "singelbets",
        component: _c38fe7f2,
        name: "home-account-singelbets"
      }, {
        path: "soccerinplaymarkets",
        component: _6780dff6,
        name: "home-account-soccerinplaymarkets"
      }, {
        path: "soccerliverate",
        component: _7ab6d3c4,
        name: "home-account-soccerliverate"
      }, {
        path: "soccermarkets",
        component: _92357122,
        name: "home-account-soccermarkets"
      }, {
        path: "soccerrate",
        component: _9f370250,
        name: "home-account-soccerrate"
      }, {
        path: "soccerratelimit",
        component: _698f8493,
        name: "home-account-soccerratelimit"
      }, {
        path: "Users",
        component: _ae3a11ae,
        name: "home-account-Users"
      }, {
        path: "users/:id?",
        component: _65f25874,
        name: "home-account-users-id"
      }]
    }, {
      path: "basketfixture",
      component: _7cc2a2b4,
      name: "home-basketfixture"
    }, {
      path: "basketinplay",
      component: _4cc308cc,
      name: "home-basketinplay"
    }, {
      path: "soccerfixture",
      component: _924f59ba,
      name: "home-soccerfixture"
    }, {
      path: "soccerinplay",
      component: _75b460af,
      name: "home-soccerinplay"
    }]
  }, {
    path: "/resetpass",
    component: _1a5cb646,
    name: "resetpass"
  }, {
    path: "/welcome",
    component: _0f837ac2,
    name: "welcome"
  }, {
    path: "/",
    component: _7ad0bd4f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
