const indexPath = '/'

function parse__a(str) {
    let list
    if (typeof str === 'string' && str) {
        try {
            list = JSON.parse(str)
        }catch (e) {
        }
    }
    return Array.isArray(list) ? list : []
}
export default {
    computed: {
        pageParams () {
            const {$route} = this

            return $route ? {
                ...$route.params,
                ...$route.query
            } : {}
        }
    },
    methods: {
        // 路由前进页面（第一级使用）
        routerGoPage (location, onComplete, onAbort) {
            const {$router} = this
            $router && $router.replace(location, onComplete, onAbort)
        },
        // 路由后退页面（第二级使用）
        routerBackPage (location, onComplete, onAbort) {
            const {$router} = this
            $router && $router.replace(location || indexPath, onComplete, onAbort)
        },
        // 嵌套路由前进页面（一般第二级开始使用）
        routerNestGoPage (location, onComplete, onAbort) {
            const {$router} = this
            $router && $router.push(location, onComplete, onAbort)
        },
        // 嵌套路由前进页面（一般第二级开始使用，带url参数到目标url）
        routerNestQueryGoPage (location, onComplete, onAbort) {
            const {$router, $route} = this
            if ($router) {
                if (typeof location === 'string') {
                    location = {
                        path: location
                    }
                }
                location.query = location.query || {}
                let query = {...$route.query}
                if (Object.keys(query).length) {
                    let __a = parse__a(query.__a)
                    delete query.__a
                    location.query.__a = __a.concat({
                        p: $route.path,
                        q: query
                    })
                } else {
                    location.query.__a = [{
                        p: $route.path
                    }]
                }
                location.query.__a = JSON.stringify(location.query.__a)
                $router.replace(location, onComplete, onAbort)
            }
        },
        // 嵌套路由后退页面（一般第三级开始使用）
        routerNestBackPage () {
            const {$router, $route} = this
            if ($router) {
                let query = $route.query
                let __a = parse__a(query.__a)
                let param = __a.pop()

                if (param && param.p) {
                    $router.replace({
                        path: param.p,
                        query: param.q || {}
                    })
                } else {
                    // 只能回退
                    $router.go(-1)
                }
            }
        }
    }
}
